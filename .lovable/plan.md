
# Amrit Mahajan — Data Scientist & AI Engineer Portfolio

A single-page, dark "terminal-inspired" portfolio with a recruiter-friendly information density, smooth scroll navigation, and a fun Chess.com live-stats section.

## 🎨 Design Direction

- **Aesthetic**: Dark techy / terminal — deep slate/black background (`#0A0F1C`), neon accents (cyan `#22D3EE` + lime `#A3E635`), subtle grid background, glow on hover.
- **Typography**: `JetBrains Mono` for code-style accents (name, headings prefix `>`, tech tags), `Inter` for body.
- **Motion**: Typewriter effect in hero, fade-in-on-scroll for sections, hover lift on cards, animated gradient on CTA.
- **Theme toggle**: Dark default with light mode option (persisted in localStorage).
- **Responsive**: Mobile-first; sticky top nav collapses to hamburger.

## 🧭 Page Structure (single page, anchor nav)

Top nav: `Home · About · Experience · Projects · Skills · Education · Beyond Work · Contact` + Resume button + theme toggle.

### 1. Hero
- Avatar/initials monogram, animated terminal prompt:
  `> Hi, I'm Amrit Mahajan_`
- Tagline: **Data Scientist & AI Engineer** — building production ML and GenAI systems used by 40M+ users.
- Quick stats row: `MS CS @ ASU · 4.0 GPA` · `Wells Fargo Gen AI` · `Bajaj Finance (3.8% retention lift)`
- CTAs: **Download Resume** · **Get in touch** · GitHub · LinkedIn · Email · Phone

### 2. About
Short narrative (3 short paragraphs):
- Who I am: ML engineer with 2+ years at scale + research/GenAI focus at ASU.
- What I love: turning messy data and LLMs into measurable business outcomes (retention, CTR, latency).
- Currently: MS CS at ASU (graduating May 2026), recently completed Gen AI internship at Wells Fargo.

### 3. Experience (timeline, vertical on mobile, alternating on desktop)
Each card: company logo placeholder, role, location, dates, bullet achievements, **tech tags**.

- **Wells Fargo — Quantitative Analytics Intern, Gen AI** *(Charlotte, NC · Jun–Aug 2025)*
  Tags: `LLMs` `RAG` `BM25` `FAISS` `DeepEval` `DSPy` `LLM-as-Judge` `Python`
- **Bajaj Finance — Data Scientist** *(Pune · Jul 2022 – Jul 2024)*
  Tags: `Churn Modeling` `Recommender Systems` `MLflow` `Databricks` `A/B Testing` `PySpark`
- **Bajaj Finance — Data Science Intern** *(Pune · Jan – Jul 2022)*
  Tags: `LSTM` `Attention` `Time Series` `PySpark` `Pandas` `Tree Models`

### 4. Projects (filterable rich grid + modal)
Filter chips: `All · GenAI · ML · Cloud/MLOps · Research`. Each card shows title, 1-line summary, tech badges, category, and an "Open" button → modal with: problem, approach, results/metrics, stack, links (GitHub/paper if available).

Cards (with category + tags):
1. **Identifying LLM Performance Gaps Across Languages** — *Research, ASU* · `OLMo` `Multilingual` `Evaluation` `100+ languages`
2. **Eco Guard — Sustainability Claims Verifier** — *GenAI* · `BERT` `NLI` `Web Scraping` `Semantic Similarity`
3. **Startup Investor Matching Platform** — *ML* · `Flask` `LambdaMART` `Learning-to-Rank` `NDCG@5 0.82`
4. **Diabetes Risk Prediction (BRFSS)** — *ML* · `LightGBM` `Mixture of Experts` `SHAP` `F1 0.64`
5. **Fraud Detection on Meta Velox** *(🏆 Outstanding Project, ASU)* — *Cloud/MLOps* · `C++` `CNN` `Velox` `AWS EC2` `Docker` `4× speedup`
6. **AWS Face Recognition Pipeline** — *Cloud/MLOps* · `EC2` `SQS` `S3` `Lambda` `IoT Greengrass` `Autoscaling`
7. **Tuberculosis Detection Portal** — *ML* · `Neural Net` `Healthcare` `Web Portal`
8. **ClickLess AI — Autonomous Grocery Agent** — *GenAI* · `LLM Agents` `Knowledge Graphs` `BrowserUse` `Playwright` `Instacart API`
9. **STaR Reasoning with LLaMA 3B (GSM8K)** — *GenAI / Research* · `LLaMA 3B` `Fine-tuning` `Self-Taught Reasoning` `+8.1% accuracy`

### 5. Skills (tabbed by role focus)
Tabs: **Generalist · Gen AI · MLE**
- **Programming**: Python, SQL, PySpark, C++, NumPy, Pandas
- **AI/ML core**: Statistics, Predictive Modeling, Time Series, Deep Learning, NLP, LLMs, MLOps
- **Gen AI tab adds**: Prompt Engineering, Fine-tuning & Alignment, RAG, Agentic Workflows, LLM Evaluation & Safety; Hugging Face, LangChain, Vector DBs, DeepEval, DSPy, Streamlit
- **MLE tab adds**: Git, Docker, AWS, Flask, Streamlit, Spark, TensorFlow, PyTorch, MLflow
- **Tools**: Scikit-learn, TensorFlow, Databricks, MLflow, LangChain, Power BI, Excel
Render as grouped, color-coded chip clouds with subtle hover.

### 6. Education
- **Arizona State University** — MS Computer Science · GPA 4.0/4.0 · Aug 2024 – May 2026
  Coursework chips: SML, Data Mining, NLP, AI, Data-Intensive Systems for ML, Data Viz, Cloud, Semantic Web, Data Processing at Scale.
- **VIT Vellore** — B.Tech CS · GPA 9.29/10 · Merit Scholarship (Top 10) · 2018–2022
  Coursework chips: DSA, OS, DBMS, Computer Architecture, Web Mining, SIN, SDD.

### 7. Awards & Certifications
Two-column layout.
- **Awards**: Visual AI Hackathon Runner-up (Voxel51, Feb 2025); Outstanding Project Award (CSE 598, ASU); HEROES Award (Bajaj, Jan 2023); JPMC Code For Good Finalist (Jun 2022); Dale Carnegie Training Excellence (Mar 2024); Certified Trainer @ Bajaj (60+ trainees).
- **Certifications**: Generative AI with LLMs (DeepLearning.AI); MLOps Specialization; TensorFlow Developer Specialization; Deep Learning Specialization; AWS Cloud Practitioner. Each with issuer, date, and credential link.

### 8. Beyond Work — ♟ Chess.com Live Stats
Dedicated panel pulling live data from the public Chess.com API (`api.chess.com/pub/player/{username}/stats`). Username field configurable (will ask for your handle).
- 3 rating cards: **Rapid · Blitz · Bullet** with current rating, best rating, last-played date.
- Win / Loss / Draw donut for the most-played format.
- "View profile" link + small "Why chess?" caption tying it to problem-solving.
- Loading skeletons + graceful fallback if API is down.
- No auth required; pure client-side fetch with React Query caching (60s).

### 9. Contact
- Two-column: contact form (name, email, message — Zod validated) + direct contact list (email, phone 480-527-3622, LinkedIn, GitHub).
- Form submits via a Lovable Cloud edge function using **Resend** to `amrit.mahajan007@gmail.com`. Honeypot + rate-limit friendly.

### 10. Footer
`> built with React + Tailwind · © 2026 Amrit Mahajan` · social icons · "back to top".

## ⚙️ Functionality & Integrations

- **Resume PDF**: placed in `/public/resume.pdf` (you'll upload your latest), wired to the Hero & nav download button.
- **Chess.com**: client-side fetch, no key needed.
- **Contact form**: requires Lovable Cloud + Resend connector — I'll set both up and ask for your verified sending domain (or use the Resend test sender initially).
- **Theme toggle**: `next-themes`-style hook, persisted.
- **SEO**: title, description, OG image, JSON-LD `Person` schema with your name, role, sameAs links.
- **Analytics-ready** structure (no provider added unless you ask).

## 🛠 Tech

React + Vite + TypeScript + Tailwind + shadcn/ui + Framer Motion + lucide-react + TanStack Query + Zod + React Hook Form. Lovable Cloud edge function for the contact form.

## ❓ One thing I'll need from you after approval

- Your **Chess.com username** (to wire the live API).
- Confirm whether to use **Resend** for the contact form (I'll request the API key when we get there) — alternatively the form can open a `mailto:` link with no backend.

Ready when you are — hit **Implement plan**.
