import { askTwin, asSpoken, respond, splitQuestions, toBubbles } from './twinAgent';

const rng = () => 0; // deterministic variant choice

test('routes project names and generic questions to the right answer', async () => {
  expect((await askTwin('Tell me about Grocery Agent', [], { rng })).text).toMatch(/Grocery Agent/);
  expect((await askTwin('Tell me about the fraud detection system', [], { rng })).text).toMatch(/Fraud Detection System/);
  expect((await askTwin('What is the STaR project?', [], { rng })).text).toMatch(/LLaMA 3B/);
  expect((await askTwin('What was your last job?', [], { rng })).text).toMatch(/CIPS-AI lab.*Wells Fargo.*Bajaj Finance/s);
  expect((await askTwin('What are you working on now?', [], { rng })).text).toMatch(/land-dispute judgments.*no results to share yet/s);
  expect((await askTwin('Tell me about the legal AI research', [], { rng })).text).toMatch(/I'm a Generative AI Research Volunteer.*I'm researching how LLMs.*I'm also prototyping/s);
});

test('answers come as short chat bubbles in first person', () => {
  const r = respond("What's your background?", [], rng);
  expect(r.bubbles.length).toBeGreaterThan(1);
  r.bubbles.forEach((b) => expect(b.length).toBeLessThan(260));
  expect(r.text).toMatch(/\bI('m| )/);
  expect(respond("What's your tech stack?", [], rng).text).not.toMatch(/Programming & Data:|Generative AI:/); // no key: value dumps
});

test('several questions in one message get several answers, in order', () => {
  expect(splitQuestions("What's your background and how do I reach you?")).toHaveLength(2);
  const r = respond("What's your tech stack? How do I reach you?", [], rng);
  expect(r.topics).toEqual(['skills', 'contact']);
  expect(r.text.indexOf('Python')).toBeLessThan(r.text.indexOf('@'));
});

test('a single question is not split', () => {
  expect(splitQuestions('Tell me about Grocery Agent')).toEqual(['Tell me about Grocery Agent']);
  expect(splitQuestions('What are you working on now?')).toHaveLength(1);
});

test('"tell me more" continues the last topic', () => {
  const first = respond('Tell me about Grocery Agent', [], rng);
  const history = [
    { role: 'user', content: 'Tell me about Grocery Agent' },
    { role: 'assistant', content: first.text, topic: first.topic, project: first.project },
  ];
  const more = respond('tell me more', history, rng);
  expect(more.text).toMatch(/LangGraph, Neo4j/);
});

test('repeating a question is acknowledged instead of answered word for word', () => {
  const a = respond('Favorite project?', [], rng);
  const history = [
    { role: 'user', content: 'Favorite project?' },
    { role: 'assistant', content: a.text, topic: a.topic, project: a.project },
  ];
  const b = respond('Favorite project?', history, rng);
  expect(b.text).not.toEqual(a.text);
  expect(a.text).toMatch(/churn model.*Grocery Agent/s);
  expect(b.text).toMatch(/Still/);
});

test('admits being an AI and does not invent unknown facts', () => {
  expect(respond('Are you a real person?', [], rng).text).toMatch(/AI version of Amrit/);
  const r = respond("What's your favorite pizza topping?", [], rng);
  expect(r.topic).toBe('fallback');
  expect(r.text).toMatch(/rather not make things up|outside what I know/);
});

test('toBubbles keeps bubbles short', () => {
  const b = toBubbles('One. Two two. ' + 'Three is a much longer sentence that keeps going and going for a while. '.repeat(3));
  b.forEach((x) => expect(x.length).toBeLessThan(260));
});

test('decimals do not break sentences, and captions are said as sentences', () => {
  expect(toBubbles('Beat GPT-4o, Gemini 2.0 Flash and Claude. Reached 0.842 accuracy.').join(' ')).toMatch(/Gemini 2\.0 Flash/);
  expect(asSpoken('An AI agent that plans your day.')[0]).toMatch(/^It's an AI agent/);
  expect(asSpoken('Turns raw microscopy into decisions.')[0]).toMatch(/^It turns raw/);
  expect(asSpoken('QLoRA-fine-tuned small models for poker.')[0]).toMatch(/^Basically: QLoRA/);
});

test('the three home-page questions have their own answers', () => {
  const roles = respond('What roles are you looking for?', [], rng);
  expect(roles.topic).toBe('roles');
  expect(roles.text).toMatch(/relocat/);
  expect(roles.text).toMatch(/work authorization/);
  expect(respond('What can I try live?', [], rng).text).toMatch(/Nothing is hosted.*GitHub/s);
  expect(respond('Have you won any hackathons?', [], rng).text).toMatch(/Voxel51/);
  expect(respond('Which project are you proudest of?', [], rng).topic).toBe('projects');
  expect(respond('How did you build this twin?', [], rng).topic).toBe('twin');
  expect(respond('Where do you live?', [], rng).text).toMatch(/relocate/);
});
