// Single source of truth for the site AND the digital twin's knowledge.
// Work and education come from public/resume.pdf.
// Edit here and every page updates.

export const person = {
  name: 'Amrit Mahajan',
  intro: "I'm Amrit, a data scientist building ML and generative AI systems.",
  location: 'Tempe, AZ',
  email: 'amrit.mahajan007@gmail.com',
  linkedin: 'https://www.linkedin.com/in/amrit-mahajan',
  github: 'https://github.com/Lightning-Nemesis',
};

export const currently = [
  "Researching legal AI at ASU's CIPS-AI lab (volunteer, since May 2026)",
  'M.S. CS @ Arizona State University, graduated May 2026 (GPA 4.0)',
  '2.5+ years of ML and GenAI for a fintech app with 40M+ users',
  'Looking for full-time data science, ML and GenAI roles',
];

export const education = [
  {
    school: 'Arizona State University',
    degree: 'M.S. Computer Science',
    detail: 'GPA 4.0 / 4.0',
    place: 'Tempe, AZ',
    period: 'Aug 2024 – May 2026',
  },
  {
    school: 'Vellore Institute of Technology',
    degree: 'B.Tech. Computer Science and Engineering',
    detail: 'GPA 9.29 / 10 · Merit Scholarship (top 10 rank)',
    place: 'India',
    period: 'Jul 2018 – May 2022',
  },
];

// `bullets` are the resume's wording (Resume page and the twin). `highlights` are the short, result-first
// lines on the About page, where the numbers are set in the accent colour.
export const experience = [
  {
    company: 'Arizona State University',
    role: 'Generative AI Research Volunteer, CIPS-AI Lab (Legal AI)',
    period: 'May 2026 – Present',
    years: '2026–present',
    bullets: [
      'Researching how LLMs can turn the reasoning in court judgments into structured, verifiable representations, starting with a pipeline for Supreme Court of India land-dispute cases.',
      'Prototyping and evaluating approaches that combine LLMs with symbolic reasoning, including experimental multi-stage workflows with human review.',
      'Benchmarking open-weight models to find failure points and inform more scalable designs.',
    ],
    highlights: [
      'Researching how LLMs can turn the reasoning in court judgments into structured, verifiable representations',
      'Prototyping an LLM + symbolic reasoning pipeline on Supreme Court of India land-dispute cases',
      'Benchmarking open-weight models to find failure points and inform more scalable designs',
    ],
    tags: ['Python', 'LLM APIs', 'JSON Schema', 'Logic programming'],
  },
  {
    company: 'Wells Fargo',
    role: 'Gen AI Intern, Quantitative Analytics Program',
    period: 'Jun 2025 – Aug 2025',
    years: '2025',
    bullets: [
      'Built a GenAI question-answering system with a Streamlit interface that lets bankers query customer data in natural language instead of looking it up by hand across internal systems; piloted across 6 locations, it cut average lookup time by 40%.',
      'Designed a hybrid RAG pipeline (BM25 + FAISS) to replace long-context prompting, cutting retrieval latency by 85% through targeted chunk retrieval and smaller-model inference.',
      'Developed an LLM evaluation framework (DeepEval, DSPy) to benchmark and optimize prompting strategies, with human-in-the-loop evaluation, LLM-as-a-judge and adversarial testing for safety and reliability.',
    ],
    highlights: [
      '40% faster customer lookups with a GenAI Q&A tool piloted at 6 locations',
      '85% lower retrieval latency by replacing long prompts with a hybrid RAG pipeline',
      'Built an evaluation framework with LLM-as-a-judge scoring and adversarial testing',
    ],
    tags: ['RAG', 'FAISS', 'Streamlit', 'DeepEval', 'LLM-as-a-judge'],
  },
  {
    company: 'Bajaj Finance Limited',
    role: 'Data Scientist',
    period: 'Jul 2022 – Jul 2024',
    years: '2022–2024',
    bullets: [
      'Led development and deployment of a churn prediction model on the Bajaj Finserv app (40M+ users), using SHAP-based explainability to drive retention strategies that increased customer retention by 3.8%.',
      'Built a notification recommendation engine combining time-series clickstream data with a business rules engine, increasing CTR by 25% and eliminating manual campaign execution across 40 business teams.',
      'Scaled experimentation from 20 to 120+ A/B tests per quarter with a self-serve testing framework in Python, cutting analyst review time by 65% and onboarding 25+ stakeholders.',
      'Pioneered MLOps adoption by implementing MLflow on Databricks for experiment tracking, deployment and monitoring, halving model deployment effort and driving adoption across 3 teams.',
      'Reduced forecast error (MAPE) by 20% with LSTM models using attention mechanisms for long-range forecasting.',
    ],
    highlights: [
      '3.8% higher customer retention from a churn prediction model on a 40M+ user app',
      '25% higher click-through from a notification recommendation engine used by 40 business teams',
      '20 → 120+ A/B tests per quarter with a self-serve framework that cut review time 65%',
      '50% less model deployment effort by bringing MLflow on Databricks to 3 teams',
      '20% lower forecast error with LSTM models for long-range forecasting',
    ],
    tags: ['Python', 'PySpark', 'SQL', 'Databricks', 'MLflow'],
  },
  {
    company: 'Bajaj Finance Limited',
    role: 'Data Science Intern',
    period: 'Jan 2022 – Jul 2022',
    years: '2022',
    bullets: [
      'Built automated forecasting pipelines in Pandas and PySpark for app metrics (MAU, DAU, traffic and net users), cutting monthly reporting from 5–6 days in Excel to 1 day.',
      'Segmented 2M fresh monthly downloads into 16 behavioral cohorts with a decision tree on notification engagement, then worked with the product team to turn the findings into governance rules across notification types and business teams.',
    ],
    highlights: [
      'Monthly reporting cut from 5–6 days to 1 by automating forecasting pipelines',
      '16 user cohorts from 2M monthly downloads to target notifications and cut churn',
    ],
    tags: ['Pandas', 'PySpark', 'Forecasting'],
  },
];

// `category` drives the filter chips on the projects page.
// `thumb`: an image file name in public/projects/ (16:10 works best). `links`: the first one is the main link.
// `featured` projects are the three on the resume: they show on the About and Resume pages.
export const projects = [
  {
    id: 'grocery-agent',
    title: 'Grocery Agent',
    subtitle: 'Autonomous shopping agent',
    blurb:
      'A LangGraph agent that searches products, checks them against your diet and swaps in substitutes to build a checkout-ready cart. Diet rules run on a Neo4j knowledge graph of 1.16M+ nodes and 12.5M+ relationships, and Playwright handles checkout, covered by 37 passing tests.',
    category: 'genai',
    tags: ['LangGraph', 'Neo4j', 'Playwright', 'Tool calling'],
    featured: true,
    thumb: 'grocery-agent.png',
    links: [{ label: 'GitHub', url: 'https://github.com/Lightning-Nemesis/Grocery-Agent' }],
  },
  {
    id: 'multilingual-llm',
    title: 'Identifying LLM Performance Gaps Across Languages',
    subtitle: 'Research project at ASU',
    blurb:
      'A study of how OLMo models reason across 100+ languages and 5 domains: math, reasoning, NLI, common sense and healthcare. Language-token exposure had a 0.8 rank correlation with cross-lingual accuracy, the strongest driver ahead of parallel data and script effects.',
    category: 'genai',
    tags: ['OLMo', 'vLLM', 'LLM evaluation', 'Translation pipelines'],
    featured: true,
    thumb: 'multilingual-llm.png',
    links: [{ label: 'GitHub', url: 'https://github.com/Lightning-Nemesis/multilingual-llm-benchmark' }],
  },
  {
    id: 'fraud-detection',
    title: 'Fraud Detection System',
    subtitle: 'Outstanding Project Award · CSE 598, ASU',
    blurb:
      "An end-to-end fraud detection pipeline that runs a CNN inside Meta's Velox query engine through custom C++ functions, so inference happens in SQL. Deployed on AWS EC2 with Docker, it ran queries 4× faster than PyTorch on CPU and GPU, with a fairness analysis across gender, age and ethnicity.",
    category: 'systems',
    tags: ['C++', 'Velox', 'CNN', 'AWS EC2'],
    featured: true,
    thumb: 'fraud-detection.png',
    links: [],
  },
  {
    id: 'grid-forecasting',
    title: 'Spatio-Temporal Grid Forecasting',
    subtitle: 'APS AI for Energy Hackathon',
    blurb:
      'A GNN + LSTM pipeline that forecasts hourly load on a 132-bus IEEE distribution network, with 44 engineered features across 5.7M rows and an MAE of 3 kW on held-out heat-dome data. Stress tests for heat domes and EV surges flagged 130 of 132 buses at thermal risk without retraining.',
    category: 'ml',
    tags: ['GNN', 'LSTM', 'PyTorch Geometric', 'React'],
    thumb: 'grid-forecasting.jpg',
    links: [{ label: 'GitHub', url: 'https://github.com/Lightning-Nemesis/APS-AI-for-Energy' }],
  },
  {
    id: 'star',
    title: 'Self-Taught Reasoning (STaR) on GSM8K',
    subtitle: 'Fine-tuning LLaMA 3B',
    blurb:
      'A fine-tune of LLaMA 3B in PyTorch on a self-generated STaR reasoning dataset, built with iterative hint-based correction to 97.9% quality. GSM8K accuracy rose from 65.3% with zero-shot chain-of-thought to 73.4%.',
    category: 'genai',
    tags: ['PyTorch', 'Hugging Face', 'LLaMA', 'Fine-tuning'],
    thumb: 'star.png',
    links: [{ label: 'GitHub', url: 'https://github.com/Lightning-Nemesis/star-gsm8k-reasoner' }],
  },
  {
    id: 'income-classification',
    title: 'Income Classification & Customer Segmentation',
    subtitle: '200K+ U.S. Census records',
    blurb:
      'A CatBoost classifier with Bayesian tuning that reached ROC-AUC 0.96 and PR-AUC 0.71 on a 94/6 imbalanced split, with threshold tuning that raised minority-class recall by 13 points. PCA and weighted K-Means gave 5 customer segments, backed by a Fairlearn fairness audit and SHAP.',
    category: 'ml',
    tags: ['CatBoost', 'K-Means', 'SHAP', 'Fairlearn'],
    thumb: 'income-classification.png',
    links: [{ label: 'GitHub', url: 'https://github.com/Lightning-Nemesis/income-data-classification-segmentation' }],
  },
  {
    id: 'diabetes',
    title: 'Diabetes Risk Prediction',
    subtitle: 'CDC BRFSS survey data',
    blurb:
      'LightGBM and Mixture-of-Experts models on imbalanced public health data, reaching recall 0.87 and F1 0.64. SHAP explanations show what drives risk in the high-risk groups.',
    category: 'ml',
    tags: ['LightGBM', 'Mixture of Experts', 'SHAP'],
    thumb: 'diabetes.png',
    links: [{ label: 'GitHub', url: 'https://github.com/Lightning-Nemesis/Diabetes-Prediction-system' }],
  },
  {
    id: 'investor-matching',
    title: 'Startup Investor Matching',
    subtitle: 'Search and ranking engine',
    blurb:
      'A Flask recommendation system that matches startups to investors with personalized search and LambdaMART learning-to-rank, reaching NDCG@5 of 0.82 in test evaluations.',
    category: 'ml',
    tags: ['Flask', 'LambdaMART', 'Learning-to-rank'],
    thumb: 'investor-matching.png',
    links: [],
  },
  {
    id: 'face-recognition',
    title: 'AWS Face Recognition Pipeline',
    subtitle: 'Multi-tier cloud system',
    blurb:
      'A multi-tier face recognition service on EC2, SQS, S3, Lambda and IoT Greengrass, with custom autoscaling from 0 to 15 instances. It answered all 100 concurrent requests correctly with sub-second latency.',
    category: 'systems',
    tags: ['AWS EC2', 'SQS', 'Lambda', 'Autoscaling'],
    thumb: 'face-recognition.png',
    links: [],
  },
];

export const projectCategories = [
  { id: 'all', label: 'All' },
  { id: 'genai', label: 'GenAI & LLMs' },
  { id: 'ml', label: 'ML & Data Science' },
  { id: 'systems', label: 'ML Systems & Cloud' },
];

export const skills = {
  'Programming & Data': 'Python, SQL, PySpark, NumPy, Pandas, C++, Excel, Power BI',
  'Modeling & ML': 'Statistics, Predictive Modeling, Forecasting, Time Series, Deep Learning, NLP, scikit-learn, TensorFlow, PyTorch',
  'Generative AI': 'LLMs, Prompt Engineering, RAG, FAISS, LangChain, LangGraph, Hugging Face, Agentic Workflows, Claude Code',
  'MLOps & Cloud': 'Databricks, MLflow, Docker, AWS, Git',
  Certifications:
    'Generative AI with LLMs, ML Engineering for Production (MLOps) Specialization, TensorFlow Developer Professional Certificate, Deep Learning Specialization (DeepLearning.AI), AWS Certified Cloud Practitioner',
};

// The Skills page (#/skills): the stack as tags, then awards and certifications.
export const skillGroups = {
  Programming: ['Python', 'SQL', 'PySpark', 'C++', 'NumPy', 'Pandas'],
  'Data Science & Analytics': [
    'A/B Testing & Experimentation',
    'Hypothesis Testing',
    'Cohort & Retention Analysis',
    'Funnel & Conversion Analysis',
    'Advanced SQL',
    'Stakeholder Communication',
    'Product Analytics',
    'Power BI',
    'Excel',
  ],
  'AI / ML': [
    'Statistics',
    'Predictive Modeling',
    'Time Series',
    'Deep Learning',
    'NLP',
    'LLMs',
    'MLOps',
    'Prompt Engineering',
    'Fine-tuning & Alignment',
    'RAG',
    'Agentic Workflows',
    'LLM Evaluation & Safety',
  ],
  'Frameworks & Libraries': [
    'TensorFlow',
    'PyTorch',
    'Scikit-learn',
    'Hugging Face',
    'LangChain',
    'DeepEval',
    'DSPy',
    'Flask',
    'Streamlit',
    'Spark',
  ],
  'Cloud & MLOps': ['AWS', 'Databricks', 'MLflow', 'Docker', 'Git', 'Vector Databases'],
};

export const awards = [
  {
    title: 'Runner-up, Visual AI Hackathon by Voxel51',
    detail: 'Built Hazard Zone Monitoring system using YOLOv8',
    date: 'Feb 2025',
  },
  { title: 'Outstanding Project Award', detail: 'CSE 598 Data-Intensive Computing for ML, ASU', date: '2025' },
  {
    title: 'Dale Carnegie Program on Training Excellence',
    detail: 'Communication, storytelling & leadership',
    date: 'Mar 2024',
  },
  { title: 'Certified Trainer, Bajaj Finance', detail: 'Delivered technical training to 60+ employees', date: 'Mar 2024' },
  { title: 'HEROES Award, Bajaj Finance', detail: 'Exceptional performance recognition', date: 'Jan 2023' },
  { title: 'Finalist, Code For Good Hackathon', detail: 'JP Morgan Chase & Co.', date: 'Jun 2022' },
];

export const certifications = [
  { title: 'Generative AI with Large Language Models', issuer: 'DeepLearning.AI', date: 'Apr 2024', id: 'JERVRGRUZER4' },
  { title: 'MLOps Specialization', issuer: 'DeepLearning.AI', date: 'Jan 2024', id: '2JN4FTUT6QMB' },
  { title: 'TensorFlow Developer Specialization', issuer: 'DeepLearning.AI', date: 'Mar 2023', id: 'WATFHCS2LETQ' },
  { title: 'Deep Learning Specialization', issuer: 'DeepLearning.AI', date: 'Nov 2022', id: 'YSNAWL7SBKHF' },
  { title: 'AWS Cloud Practitioner', issuer: 'Amazon Web Services', date: 'Aug 2021', id: '4LB73G6LJ114Q4W5' },
];

// The twin's answer to "What drives you?", one chat bubble per entry.
export const passions = [
  'Mostly automating the tedious stuff. I like turning repetitive, error-prone work into systems that just run on their own.',
  "I also care more about things people actually use than about perfect architecture. And honestly, I get a kick out of going from zero to one in territory I don't know yet, since that's where I learn the most.",
];
