// The digital twin's brain.
//
// Goal: answer like the site's owner would in a chat, not like a search result. That means
//   - first person, contractions, short messages ("bubbles") instead of one block of text,
//   - a few different ways of saying each thing, and noticing when something was already asked,
//   - several questions in one message get several answers ("What's your stack and how do I reach you?"),
//   - follow-ups like "tell me more" / "why?" continue the last topic,
//   - honesty: it only uses facts from src/data/profile.js, says so when it doesn't know,
//     and admits it is a twin if asked.
//
// Pacing (thinking time, typing speed, pauses between bubbles) lives in pace.js / useTwinChat.js, not here.
//
// With REACT_APP_TWIN_API_URL set, a real model answers instead (twin-api/: a Cloudflare Worker calling the
// Claude API), streamed bubble by bubble. The rules below stay as the fallback whenever that API can't answer,
// and as the whole twin when the variable isn't set. The UI only depends on askTwin()'s contract:
// (question, history, { onBubble }) => Promise<{ text, bubbles, expression, followups?, topic? }>.

import { person, education, experience, projects, projectCategories, passions } from '../data/profile';
import { readEvents, toBubbles } from './twinStream';

export { toBubbles };

const API_URL = process.env.REACT_APP_TWIN_API_URL;

// Short, Petersen-style prompts. The first three show before anything is asked; one tap on ↻ brings the
// recruiter set (fit, recent work, the project worth remembering). After each answer the twin suggests
// three that fit the conversation and haven't been asked yet.
const QUESTION_POOL = [
  'Favorite project?',
  "What's your background?",
  'What drives you?',
  'What roles are you looking for?',
  'What did you do at Wells Fargo?',
  'Which project are you proudest of?',
  "What's your tech stack?",
  'What are you working on now?',
  'Tell me about Grocery Agent',
  'How do I reach you?',
];

const FOLLOWUPS_BY_TOPIC = {
  roles: ["What's your tech stack?", 'What did you do at Wells Fargo?', 'How do I reach you?'],
  live: ['Tell me about Grocery Agent', 'Which project are you proudest of?', 'What roles are you looking for?'],
  twin: ['Tell me about Grocery Agent', "What's your tech stack?", 'What roles are you looking for?'],
  projects: ['Tell me more', 'Another project?', 'What did you do at Wells Fargo?'],
  project: ['Tell me more', 'Another project?', "What's your tech stack?"],
  hackathon: ['Tell me more', 'Another project?', 'What roles are you looking for?'],
  background: ['Where have you worked?', 'What drives you?', 'What roles are you looking for?'],
  experience: ['What did you do at Wells Fargo?', 'Tell me more', 'What roles are you looking for?'],
  company: ['Tell me more', 'Which project are you proudest of?', "What's your tech stack?"],
  passion: ['Tell me more', 'Which project are you proudest of?', 'What are you working on now?'],
  skills: ['Tell me more', 'What did you do at Wells Fargo?', 'How do I reach you?'],
  now: ['What did you do at Wells Fargo?', 'What roles are you looking for?', 'How do I reach you?'],
  contact: ['What roles are you looking for?', 'Which project are you proudest of?', "What's your tech stack?"],
};

export const suggestedQuestions = QUESTION_POOL.slice(0, 3);

export function pickFollowups(asked, topic) {
  const seen = new Set(asked.map((q) => q.toLowerCase()));
  const pool = [...(FOLLOWUPS_BY_TOPIC[topic] || []), ...QUESTION_POOL];
  const fresh = [...new Set(pool)].filter((q) => !seen.has(q.toLowerCase()) || /^(tell me more|another)/i.test(q));
  return (fresh.length >= 3 ? fresh : QUESTION_POOL).slice(0, 3);
}

// ------------------------------------------------------------------------------------------- helpers

const pick = (arr, rng) => arr[Math.floor(rng() * arr.length) % arr.length];
const lower1 = (s) => s.charAt(0).toLowerCase() + s.slice(1);
const article = (w) => (/^[AEIOU]/.test(w) ? 'an' : 'a');
const listing = (xs, and = 'and') => (xs.length < 2 ? xs.join('') : `${xs.slice(0, -1).join(', ')} ${and} ${xs[xs.length - 1]}`);

// "Built a thing that..." -> "I built a thing that..."; ongoing work ("Researching how...") -> "I'm researching how..."
const ongoing = (bullet) => /^\w+ing\b/.test(bullet);
const firstPerson = (bullet) => `${ongoing(bullet) ? "I'm" : 'I'} ${lower1(bullet)}`;

const featured = projects.filter((p) => p.featured);
const byId = Object.fromEntries(projects.map((p) => [p.id, p]));
// a project is recognised by its title or its id ("grocery-agent" also matches "grocery agent")
const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const projectRe = (p) =>
  new RegExp(`${escapeRe(p.title).replace(/\s+/g, '\\s*')}|\\b${escapeRe(p.id).replace(/-/g, '[\\s-]*')}\\b`, 'i');
const linkWord = (p) => {
  const ls = (p.links || []).map((l) => (l.label === 'GitHub' ? 'GitHub' : l.label.toLowerCase()));
  if (!ls.length) return '';
  return ls.length === 1 ? ` There's a ${ls[0]} link on my Projects page.` : ` There are ${listing(ls)} links on my Projects page.`;
};

// Blurbs are written as captions ("An agent that...", "Turns raw..."); say them like a person would.
export function asSpoken(blurb) {
  const [first, ...rest] = toBubbles(blurb);
  const keepCase = (w) => (/^[A-Z]{2}|^[A-Z][a-z]*[A-Z]/.test(w) ? w : lower1(w));
  let spoken;
  if (/^(An?|The)\s/.test(first)) spoken = `It's ${lower1(first)}`;
  else if (/^[A-Z][a-z]+s\s/.test(first)) spoken = `It ${lower1(first)}`;
  else spoken = `Basically: ${keepCase(first)}`;
  return [spoken, ...rest];
}

const fmtPeriod = (period) => {
  const m = period.match(/^(\w+) (\d{4}) – (\w+) (\d{4})$/);
  return m && m[2] === m[4] ? `${m[1]} to ${m[3]} ${m[2]}` : period.replace(' – ', ' to ');
};

function projectIntro(p, rng) {
  const open = pick([`Oh, ${p.title}!`, `${p.title}, sure.`, `Ah, ${p.title}. I like talking about this one.`], rng);
  return [open, ...asSpoken(p.blurb), linkWord(p).trim()].filter(Boolean);
}

function projectMore(p) {
  return [
    `The main pieces were ${listing(p.tags)}.`,
    `If you want to see it, it's on my Projects page under ${projectCategories.find((c) => c.id === p.category).label}${p.links?.length ? ', with a link to the code' : ''}.`,
  ];
}

const firstName = person.name.split(' ')[0];
const [masters, bachelors] = education;
const gradDate = masters.period.split('–')[1].trim();
const companies = [...new Set(experience.map((e) => e.company))];
const COMPANY_RE = /wells\s*fargo|bajaj|cips|legal\s*ai|land[\s-]*dispute|research lab/i;

// ------------------------------------------------------------------------------------------- intents
// Each intent: match (regex), label (used when answering several questions at once), topic, and
// say({ rng, times, ctx, part }) -> bubbles. `times` = how often this topic came up before.

const INTENTS = [
  {
    id: 'identity',
    match: /are you (a |an )?(real|human|bot|ai|robot|person)|who are you/i,
    label: 'who I am',
    say: () => [
      `I'm the AI version of ${firstName}: he built me, and I know his work.`,
      `I try to answer the way he would, but for anything important, email the real me at ${person.email}.`,
    ],
  },
  {
    id: 'twin',
    match: /how (did|do) you (build|make)|how (was|is) (this|it|the site) (built|made)|how (does|do) (this|you|the twin) work|this (site|website|twin)|digital twin|tech behind/i,
    label: 'how this twin works',
    topic: 'twin',
    say: () => [
      `When I'm fully connected, I'm Claude talking as ${firstName}: a Cloudflare Worker gives the model my profile and notes and streams the reply back one message at a time.`,
      "Right now you're getting my offline mode, which answers from notes built into the site.",
    ],
  },
  {
    id: 'roles',
    match: /\broles?\b|looking for|open to|full[- ]time|position|hiring|sponsor|visa|work authori[sz]ation|relocat|start date|when can you start/i,
    label: "what I'm looking for",
    topic: 'roles',
    say: () => [
      `Full-time data scientist, ML engineer or GenAI roles. I finished my master's at ASU in ${gradDate}.`,
      `I'm open to relocating. For anything about work authorization, email me at ${person.email}.`,
    ],
  },
  {
    id: 'live',
    match: /what can i (try|play|see|use)|try (it|them|out|something)|\blive (demo|version|link|site)s?|can i (try|play with)|any demos?|deployed/i,
    label: 'what you can try live',
    topic: 'live',
    say: ({ ctx }) => {
      ctx.project = featured[0].id;
      return [
        'Nothing is hosted live right now, to be honest.',
        `The code for most of my projects is on GitHub though, and my Projects page links to each repo. ${featured[0].title} is a good one to start with.`,
      ];
    },
  },
  {
    id: 'greeting',
    match: /^(hi|hey|hello|yo|hiya|good (morning|afternoon|evening))\b/i,
    label: 'hi',
    say: ({ rng, times }) => {
      if (times) return ['Hi again!', 'What else do you want to know?'];
      return [pick(['Hey, hi!', 'Hi there!', 'Hello!'], rng), `I'm ${firstName} (well, my twin). Ask me anything about my work, projects or what I'm up to.`];
    },
  },
  {
    id: 'howareyou',
    match: /how are you|how's it going|how are things/i,
    label: 'how I am',
    say: () => [
      'Pretty good, thanks for asking!',
      "I wrapped up my master's at ASU this year, so these days I'm doing legal AI research there and looking for my next data science role. What do you want to know?",
    ],
  },
  {
    id: 'thanks',
    match: /^(thanks|thank you|thx|ty|cool|great|nice|awesome|got it)\b/i,
    label: 'thanks',
    say: ({ rng }) => [pick(['Of course!', 'Anytime!', 'Glad that helped!'], rng), "Anything else you're curious about?"],
  },
  {
    id: 'bye',
    match: /^(bye|goodbye|see you|see ya|later)\b/i,
    label: 'bye',
    say: () => ['Bye! Thanks for stopping by.', `If you want to keep talking, I'm at ${person.email}.`],
  },
  {
    id: 'more',
    match: /^(more|go on|and|why|how|how so|really|like what|such as|example|details?)\W*$|tell me more|more about (that|it)|elaborate/i,
    label: 'more on that',
    say: (args) => moreAbout(args),
  },
  {
    id: 'another',
    match: /another (one|project)|other projects?|what else have you built/i,
    label: 'another project',
    topic: 'project',
    say: ({ rng, ctx }) => {
      const seen = ctx.mentioned || [];
      const next = projects.find((p) => !seen.includes(p.id) && p.id !== ctx.project) || pick(projects, rng);
      ctx.project = next.id;
      return [pick(['Okay, another one:', 'Sure, how about this one:'], rng), ...projectIntro(next, rng).slice(1)];
    },
  },
  {
    id: 'hackathon',
    match: /hackathon|awards?\b|prize|\bwin\b|\bwon\b/i,
    label: 'hackathons and awards',
    topic: 'hackathon',
    say: ({ ctx }) => {
      ctx.project = 'grid-forecasting';
      return [
        "A few! I was runner-up at Voxel51's Visual AI Hackathon with a hazard zone monitoring system built on YOLOv8.",
        'At the APS AI for Energy hackathon I built a GNN + LSTM model that forecasts load on a 132-bus power grid.',
        'And my fraud detection project won the Outstanding Project Award in a data-intensive computing course at ASU.',
      ];
    },
  },
  {
    id: 'project',
    match: new RegExp(projects.map((p) => projectRe(p).source).join('|'), 'i'),
    label: 'that project',
    topic: 'project',
    say: ({ rng, ctx, part }) => {
      const p = projects.find((x) => projectRe(x).test(part));
      ctx.project = p.id;
      return projectIntro(p, rng);
    },
  },
  {
    id: 'projects',
    match: /project|\bbuilt\b|proud of|portfolio/i,
    label: "the project I'm proudest of",
    topic: 'projects',
    // my favorite work was on the job, so the answer leads with that and then names a side project
    say: ({ times, ctx }) => {
      const side = featured[0];
      ctx.project = side.id;
      if (times) return ['Still the churn model, I think!', `On the side-project front it's ${side.title}. Want to hear about that one?`];
      return [
        'Honestly, my favorite work has been on the job more than on the side.',
        "The one I'm proudest of is the churn model at Bajaj Finance. I led it from data to deployment on an app with 40M+ users, and it lifted retention by 3.8%.",
        `Outside work it's ${side.title}. ${asSpoken(side.blurb)[0]}`,
      ];
    },
  },
  {
    id: 'company',
    match: COMPANY_RE,
    label: 'that job',
    topic: 'company',
    say: ({ part, ctx }) => {
      const key = (part.match(COMPANY_RE) || [''])[0].toLowerCase();
      const e = experience.find((x) => x.company.toLowerCase().startsWith(key.replace(/\s+/g, ' '))) || experience[0];
      ctx.company = e.company;
      const current = /present$/i.test(e.period);
      const lines = [
        current
          ? `At ${e.company} I'm ${article(e.role)} ${e.role} (since ${e.period.split(' – ')[0]}).`
          : `At ${e.company} I was ${article(e.role)} ${e.role} (${fmtPeriod(e.period)}).`,
        firstPerson(e.bullets[0]),
      ];
      if (e.bullets[1]) lines.push(`${ongoing(e.bullets[1]) ? "I'm also" : 'I also'} ${lower1(e.bullets[1])}`);
      return lines;
    },
  },
  {
    id: 'experience',
    match: /\bwork(ed)?\b|intern|\bjobs?\b|experience|compan(y|ies)|career|employ/i,
    label: "where I've worked",
    topic: 'experience',
    say: ({ times, ctx }) => {
      const wf = experience.find((e) => e.company === 'Wells Fargo');
      ctx.company = wf.company;
      if (times) return ['Same places as before!', `${listing(companies)}. Pick one and I'll go deeper.`];
      return [
        "Right now I'm a volunteer researcher at ASU's CIPS-AI lab, working on legal AI.",
        `Before that I was a Gen AI intern at ${wf.company} (${fmtPeriod(wf.period)}), building an assistant that lets bankers query customer data in plain English.`,
        'And before grad school I spent two and a half years at Bajaj Finance as a data scientist. My churn model on their 40M+ user app lifted retention by 3.8%.',
        'Want details on any of them?',
      ];
    },
  },
  {
    id: 'now',
    match: /working on|currently|right now|these days|up to\b|busy with|looking for|open to/i,
    label: "what I'm up to now",
    topic: 'now',
    say: ({ ctx }) => {
      ctx.company = experience[0].company;
      return [
        "I'm a volunteer researcher at ASU's CIPS-AI lab, working on legal AI.",
        'We are building a pipeline that uses LLMs to turn the reasoning in Supreme Court of India land-dispute judgments into structured, verifiable representations. It is early, so there are no results to share yet.',
        "Alongside that I'm looking for full-time data scientist, ML engineer or GenAI roles, and I'm open to relocating.",
      ];
    },
  },
  {
    id: 'background',
    match: /background|education|school|study|studied|degree|\basu\b|arizona state|\bvit\b|vellore|universit|college|graduat/i,
    label: 'my background',
    topic: 'background',
    say: ({ times }) => {
      if (times) return [`Quick recap: ${masters.degree} at ASU, and a B.Tech. from VIT before that.`, 'Anything specific you want to know?'];
      return [
        `I did my ${masters.degree} at ${masters.school} (${masters.detail}), finishing in ${gradDate}.`,
        `Before that I did my undergrad in India: a ${bachelors.degree} at ${bachelors.school}, on a merit scholarship.`,
        'In between I spent two and a half years building ML at Bajaj Finance, and later did a GenAI internship at Wells Fargo.',
      ];
    },
  },
  {
    id: 'passion',
    match: /passion|\blove\b|drives? you|motivat|inspire|what makes you|enjoy/i,
    label: 'what drives me',
    topic: 'passion',
    say: () => passions,
  },
  {
    id: 'skills',
    match: /skill|stack|\btech|language|\btools?\b|framework|python|\bsql\b/i,
    label: 'my stack',
    topic: 'skills',
    say: () => [
      "Day to day it's mostly Python and SQL, with PySpark and Pandas for the heavy data work.",
      'On the ML side I use scikit-learn, TensorFlow and PyTorch, plus a lot of forecasting and time series.',
      'For GenAI I build RAG with FAISS, LangChain and LangGraph, and I ship with Databricks, MLflow, Docker and AWS.',
    ],
  },
  {
    id: 'contact',
    match: /contact|e-?mail|linkedin|github|\bhire\b|reach|get in touch|connect|resume|\bcv\b/i,
    label: 'how to reach me',
    topic: 'contact',
    say: () => [
      `Email is easiest: ${person.email}.`,
      `I'm also on LinkedIn, and my code lives on GitHub (${person.github.split('/').pop()}).`,
      "If it's about a role, I'd love to hear from you!",
    ],
  },
  {
    id: 'location',
    match: /where (are you|do you live)|based in|located|which city/i,
    label: "where I'm based",
    say: () => [`I'm in ${person.location}, and happy to relocate for the right role.`],
  },
  {
    id: 'fun',
    match: /hobb|for fun|free time|outside (of )?work|weekend|interests?\b/i,
    label: 'what I do for fun',
    say: () => [
      "The off-screen stuff isn't on the site yet (my Life page literally says it's coming), so I'll leave that one to the real me.",
      'Ask me about my work instead: I have good stories from Bajaj Finance and Wells Fargo.',
    ],
  },
];

function moreAbout({ rng, ctx }) {
  const topic = ctx.topic;
  if (['project', 'projects', 'hackathon', 'now'].includes(topic) && ctx.project && byId[ctx.project]) {
    const p = byId[ctx.project];
    return [pick(['Sure!', 'Happy to.', 'Okay, a bit more:'], rng), ...projectMore(p)];
  }
  if ((topic === 'experience' || topic === 'company') && ctx.company) {
    const i = experience.findIndex((e) => e.company === ctx.company);
    const e = experience[i];
    if (topic === 'company' && e.bullets[2]) return [`One more from ${e.company}:`, firstPerson(e.bullets[2])];
    const next = experience[(i + 1) % experience.length];
    ctx.company = next.company;
    ctx.topic = 'company';
    return [`Before that I was at ${next.company} as ${article(next.role)} ${next.role}.`, firstPerson(next.bullets[0])];
  }
  if (topic === 'passion') {
    return [
      'A good example is the notification engine I built at Bajaj Finance.',
      'It replaced manual campaign work across 40 business teams and lifted click-through by 25%. That kind of thing makes me really happy.',
    ];
  }
  if (topic === 'background') {
    return [
      `VIT was ${bachelors.period}, and I started at ASU in ${masters.period.split('–')[0].trim()}.`,
      'In between I worked as a data scientist at Bajaj Finance, so it has been a busy few years!',
    ];
  }
  if (topic === 'skills') {
    return [
      "Lately it's mostly been GenAI: hybrid retrieval with BM25 and FAISS, LangGraph agents, and LLM evaluation with DeepEval and DSPy.",
      'At Wells Fargo that hybrid RAG pipeline cut retrieval latency by 85%.',
    ];
  }
  return ["Happy to! More on what, though: my projects, where I've worked, or what I'm up to now?"];
}

// ------------------------------------------------------------------------------------------- routing

function detect(part) {
  return INTENTS.find((i) => i.match.test(part)) || null;
}

// Split a message into separate questions, but only where both halves mean something different.
export function splitQuestions(message) {
  const raw = message
    .split(/[?]+|\s*;\s*|\s+(?:and also|also|plus)\s+/i)
    .map((s) => (s || '').trim())
    .filter((s) => s.length > 1);
  const parts = [];
  for (const r of raw) {
    const halves = r.split(/\s+and\s+/);
    if (halves.length === 2) {
      const a = detect(halves[0]);
      const b = detect(halves[1]);
      if (a && b && a.id !== b.id && b.id !== 'more') {
        parts.push(halves[0], halves[1]);
        continue;
      }
    }
    parts.push(r);
  }
  // drop exact repeats of the same intent ("tell me your stack? your tech?"), keep distinct projects
  const out = [];
  for (const p of parts) {
    const i = detect(p);
    if (i && i.id !== 'project' && out.some((o) => detect(o) === i)) continue;
    out.push(p);
  }
  return (out.length ? out : [message.trim()]).slice(0, 3);
}

function fallback({ rng, times }) {
  const p = pick(featured, rng);
  if (times) return ["That one's outside what I know too, sorry!", `Ask me about my projects (${p.title} is a good one), my work, or how to reach me.`];
  return pick(
    [
      ["Hmm, I don't think I can answer that one well.", "I only know about my work, projects and background, and I'd rather not make things up.", `Want to hear about ${p.title} or what I'm working on now?`],
      ["Ooh, that's outside what I know, sorry!", `Ask me about my projects (${p.title} is a good one), my work, or how to reach me.`],
    ],
    rng
  );
}

// history: [{ role: 'user'|'assistant', content, topic?, topics?, project?, company? }]
export function respond(message, history = [], rng = Math.random) {
  const assistant = history.filter((h) => h.role === 'assistant');
  const last = assistant[assistant.length - 1] || {};
  const ctx = { topic: last.topic, project: last.project, company: last.company, mentioned: assistant.map((h) => h.project).filter(Boolean) };
  const topicsSoFar = assistant.flatMap((h) => h.topics || [h.topic]);
  const parts = splitQuestions(message);
  let bubbles = [];
  const topics = [];
  parts.forEach((part, idx) => {
    const intent = detect(part);
    const topic = intent ? intent.topic || intent.id : 'fallback';
    const times = topicsSoFar.concat(topics).filter((t) => t === topic).length;
    const said = intent ? intent.say({ rng, times, ctx, part }) : fallback({ rng, times });
    if (intent && intent.id !== 'more') ctx.topic = topic;
    topics.push(topic);
    if (idx > 0) {
      const lead = intent ? pick([`Oh, and ${intent.label}?`, `And ${intent.label}:`], rng) : 'And your other question:';
      bubbles.push(lead);
    }
    bubbles = bubbles.concat(said);
  });
  const mainTopic = ctx.topic || topics[topics.length - 1];
  return {
    text: bubbles.join('\n\n'),
    bubbles,
    expression: topics.every((t) => t === 'fallback') ? 'think' : 'smile',
    topic: mainTopic,
    topics,
    project: ctx.project,
    company: ctx.company,
    followups: pickFollowups(
      history.filter((h) => h.role === 'user').map((h) => h.content).concat(message),
      mainTopic
    ),
  };
}

// Ask the model. Bubbles are handed to onBubble as they arrive; resolves once the answer is complete.
// Throws only if nothing at all came back, so a reply cut off halfway still keeps what was said.
async function askModel(question, history, onBubble) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: question, messages: history.map(({ role, content }) => ({ role, content })) }),
    signal: AbortSignal.timeout?.(45000),
  });
  if (!res.ok || !res.body) throw new Error(`twin api ${res.status}`);
  const bubbles = [];
  let followups;
  try {
    for await (const e of readEvents(res.body)) {
      if (e.type === 'bubble') {
        bubbles.push(e.text);
        onBubble(e.text);
      } else if (e.type === 'followups') followups = e.questions;
      else if (e.type === 'error') throw new Error(`twin api: ${e.message}`);
    }
  } catch (err) {
    if (!bubbles.length) throw err;
  }
  if (!bubbles.length) throw new Error('twin api: empty answer');
  return { text: bubbles.join('\n\n'), bubbles, expression: 'smile', followups: followups?.length ? followups : undefined };
}

export async function askTwin(question, history = [], { rng, onBubble = () => {} } = {}) {
  if (API_URL) {
    try {
      return await askModel(question, history, onBubble);
    } catch (err) {
      console.warn('[twin] API unavailable, answering from the built-in rules:', err.message);
    }
  }
  return respond(question, history, rng);
}
