export const profile = {
  name: "Amrit Mahajan",
  title: "Data Scientist & AI Engineer",
  tagline: "Turning data and LLMs into measurable business impact — at 40M+ user scale.",
  email: "amrit.mahajan007@gmail.com",
  phone: "480-527-3622",
  location: "Tempe, AZ",
  linkedin: "https://linkedin.com/in/amrit-mahajan",
  github: "https://github.com/Lightning-Nemesis",
  chessUsername: "Lightning-Nemesis",
  resumeUrl: "/resume.pdf",
  about: [
    "I'm a Data Scientist and AI Engineer with 2+ years of industry experience deploying ML systems at scale, currently pursuing my MS in Computer Science at Arizona State University with a 4.0 GPA.",
    "I love turning messy data and modern LLMs into measurable business outcomes — retention lifts, CTR boosts, latency cuts. My recent focus is on RAG systems, LLM evaluation frameworks, and agentic workflows.",
    "Most recently I worked on Generative AI at Wells Fargo's quantitative analytics team. I'm graduating in May 2026 and exploring full-time roles in ML / AI engineering.",
  ],
};

export const heroStats = [
  { label: "MS CS @ ASU", value: "4.0 GPA" },
  { label: "Wells Fargo", value: "Gen AI Intern" },
  { label: "Bajaj Finance", value: "+3.8% retention" },
  { label: "App Reach", value: "40M+ users" },
];

export type Experience = {
  company: string;
  role: string;
  location: string;
  start: string;
  end: string;
  bullets: string[];
  tags: string[];
};

export const experiences: Experience[] = [
  {
    company: "Wells Fargo",
    role: "Quantitative Analytics Intern — Gen AI",
    location: "Charlotte, NC",
    start: "Jun 2025",
    end: "Aug 2025",
    bullets: [
      "Built a POC Generative AI question-answering system on customer data, giving bankers context-aware insights and reducing client prep time by ~30% in pilot testing.",
      "Researched and designed an LLM evaluation framework using LLM-as-a-judge (DeepEval) and DSPy, with reusable components to benchmark reliability, alignment, and safety.",
      "Tested a hybrid RAG pipeline (BM25 + FAISS) that cut retrieval latency by ~85% by replacing long-context prompting with targeted chunk retrieval and smaller models.",
    ],
    tags: ["LLMs", "RAG", "BM25", "FAISS", "DeepEval", "DSPy", "LLM-as-Judge", "Python"],
  },
  {
    company: "Bajaj Finance Limited",
    role: "Data Scientist",
    location: "Pune, India",
    start: "Jul 2022",
    end: "Jul 2024",
    bullets: [
      "Led development and deployment of a Customer Churn Prediction model on the Bajaj Finserv App (40M+ users), driving a 3.8% retention lift through targeted strategies.",
      "Built a Notification Recommendation Engine on clickstream data that boosted CTR by 25%, reducing manual campaign effort to zero across 40 business teams.",
      "Pioneered MLOps adoption by implementing MLflow on Databricks, cutting manual deployment effort by 50% and standardizing A/B experimentation across 3+ teams.",
    ],
    tags: ["Churn Modeling", "Recommender Systems", "MLflow", "Databricks", "A/B Testing", "PySpark", "Python"],
  },
  {
    company: "Bajaj Finance Limited",
    role: "Data Science Intern",
    location: "Pune, India",
    start: "Jan 2022",
    end: "Jul 2022",
    bullets: [
      "Automated forecasting pipelines with Pandas and PySpark, cutting monthly reporting time for app metrics (MAU/DAU/traffic) from 5–6 days in Excel to 1 day.",
      "Reduced forecast error (MAPE) by 20% by developing LSTM models with attention mechanisms.",
      "Analyzed notification and uninstall patterns using interpretable tree-based models, informing governance changes that reduced notification costs and churn risk.",
    ],
    tags: ["LSTM", "Attention", "Time Series", "PySpark", "Pandas", "Tree Models"],
  },
];

export type ProjectCategory = "GenAI" | "ML/DS" | "Cloud/MLOps" | "Research";

export type ProjectStat = { value: string; label: string };

export type Project = {
  title: string;
  category: ProjectCategory;
  summary: string;
  problem: string;
  approach: string;
  results: string[];
  tags: string[];
  stats?: ProjectStat[];
  award?: string;
  link?: string;
};

export const projects: Project[] = [
  {
    title: "Identifying LLM Performance Gaps Across Languages",
    category: "Research",
    summary: "Research at ASU evaluating multilingual reasoning gaps in OLMo models across 100+ languages.",
    problem:
      "LLMs perform unevenly across languages and reasoning domains, but the structural causes (token exposure, parallel data, script effects) are poorly quantified.",
    approach:
      "Evaluated OLMo models across 100+ languages and 5 reasoning domains (Math, Reasoning, NLI, Common-sense, Healthcare) using high-quality translation pipelines, then correlated cross-lingual accuracy with pre/post-training data structure.",
    results: [
      "Quantified correlation between language-token exposure, parallel data, and script effects vs. accuracy.",
      "Findings guide fairer LLM development across underrepresented languages.",
    ],
    stats: [
      { value: "100+", label: "Languages" },
      { value: "5", label: "Reasoning Domains" },
    ],
    tags: ["OLMo", "Multilingual", "Evaluation", "100+ Languages", "Translation Pipelines"],
  },
  {
    title: "Eco Guard — Sustainability Claims Verifier",
    category: "GenAI",
    summary: "LLM pipeline that extracts and verifies corporate sustainability claims.",
    problem: "Verifying corporate ESG / sustainability claims is manual, slow, and error-prone.",
    approach:
      "Engineered an LLM-driven pipeline combining web scraping, BERT transformers, semantic similarity, and NLI models to extract, classify, and verify claims end-to-end.",
    results: [
      "Reduced manual analyst effort substantially.",
      "Classifies claims into supported / contradicted / unverifiable with citations.",
    ],
    stats: [
      { value: "3", label: "Model Stages" },
      { value: "E2E", label: "Verification" },
    ],
    tags: ["BERT", "NLI", "Web Scraping", "Semantic Similarity", "LLMs", "Python"],
  },
  {
    title: "Startup Investor Matching Platform",
    category: "ML/DS",
    summary: "Personalized search + learning-to-rank engine matching startups to investors.",
    problem: "Founders waste weeks finding the right investors; generic search doesn't capture fit.",
    approach:
      "Built a Flask-based recommendation system with personalized search and LambdaMART learning-to-rank.",
    results: ["Reached NDCG@5 of 0.82 in test evaluations.", "End-to-end Flask app with API + UI."],
    stats: [
      { value: "0.82", label: "NDCG@5" },
      { value: "L2R", label: "LambdaMART" },
    ],
    tags: ["Flask", "LambdaMART", "Learning-to-Rank", "Recommender Systems", "Python"],
  },
  {
    title: "Diabetes Risk Prediction (BRFSS CDC)",
    category: "ML/DS",
    summary: "Interpretable ML on imbalanced public health data with SHAP explanations.",
    problem: "Predicting diabetes risk on imbalanced BRFSS data while keeping decisions interpretable for clinicians.",
    approach:
      "Built LightGBM and Mixture-of-Experts models with SHAP-based interpretability for high-risk cohort analysis.",
    results: ["F1-score 0.64, recall 0.87 on imbalanced data.", "Transparent insights for high-risk subgroups."],
    stats: [
      { value: "0.87", label: "Recall" },
      { value: "0.64", label: "F1-Score" },
    ],
    tags: ["LightGBM", "Mixture of Experts", "SHAP", "Imbalanced Data", "Healthcare"],
  },
  {
    title: "Fraud Detection on Meta Velox",
    category: "Cloud/MLOps",
    summary: "End-to-end fraud detection by integrating a CNN into Meta's Velox engine via custom C++ functions.",
    problem: "Real-time SQL-based fraud inference requires low-latency model execution inside the query engine.",
    approach:
      "Integrated a CNN into Meta's Velox engine with custom C++ functions, enabling SQL-native inference. Deployed on AWS EC2 with Docker; benchmarked Velox vs PyTorch CPU/GPU.",
    results: [
      "100% accuracy on ~1,000 IDNet images.",
      "~4× faster query execution vs PyTorch baseline.",
      "Fairness analysis across gender, age, ethnicity.",
    ],
    stats: [
      { value: "4×", label: "Faster Queries" },
      { value: "100%", label: "Accuracy" },
    ],
    award: "Outstanding Project Award — CSE 598 Data-Intensive Computing for ML, ASU",
    tags: ["C++", "CNN", "Velox", "AWS EC2", "Docker", "SQL", "Fairness"],
  },
  {
    title: "AWS Face Recognition Pipeline",
    category: "Cloud/MLOps",
    summary: "Multi-tier face recognition system with custom autoscaling on AWS.",
    problem: "Process 100 concurrent face-recognition requests with sub-second latency on a budget.",
    approach:
      "Built a multi-tier pipeline using EC2 autoscaling, SQS, S3, Lambda, and IoT Greengrass with custom autoscaling logic.",
    results: [
      "100% prediction accuracy across 100 concurrent requests.",
      "Sub-1 second latency.",
      "Custom autoscaling from 0 → 15 instances on demand.",
    ],
    stats: [
      { value: "<1s", label: "Latency" },
      { value: "0→15", label: "Autoscale" },
    ],
    tags: ["AWS EC2", "SQS", "S3", "Lambda", "IoT Greengrass", "Autoscaling"],
  },
  {
    title: "Tuberculosis Detection Portal",
    category: "ML/DS",
    summary: "Healthcare web portal predicting TB likelihood from symptoms.",
    problem: "Practitioners need a fast triage tool for TB risk based on symptom inputs.",
    approach: "Developed a healthcare portal where practitioners submit reports; a neural net predicts TB likelihood.",
    results: ["Enables early detection through ML-based risk assessment.", "Simple submission → prediction workflow."],
    stats: [
      { value: "NN", label: "Neural Net" },
      { value: "Web", label: "Triage Portal" },
    ],
    tags: ["Neural Network", "Healthcare", "Web Portal", "Python"],
  },
  {
    title: "ClickLess AI — Autonomous Grocery Agent",
    category: "GenAI",
    summary: "Conversational LLM agent that builds and checks out grocery carts autonomously.",
    problem: "Translating natural-language meal plans into a real grocery checkout is tedious and error-prone.",
    approach:
      "Built a conversational AI agent that converts language into checkout-ready carts using Instacart API, knowledge graphs, and LLM orchestration. Automated checkout via BrowserUse + Playwright. Integrated Open Food Facts for dietary constraints with privacy-preserving on-device inference.",
    results: [
      "End-to-end autonomous checkout flow.",
      "Supports dietary constraints (allergies, vegan, etc.).",
      "Privacy-preserving on-device inference.",
    ],
    stats: [
      { value: "E2E", label: "Auto Checkout" },
      { value: "On-Device", label: "Privacy" },
    ],
    tags: ["LLM Agents", "Knowledge Graphs", "BrowserUse", "Playwright", "Instacart API", "Open Food Facts"],
  },
  {
    title: "STaR Reasoning with LLaMA 3B (GSM8K)",
    category: "GenAI",
    summary: "Self-Taught Reasoning fine-tune of LLaMA 3B on GSM8K math problems.",
    problem: "Small LLMs struggle with multi-step math reasoning; training data with valid rationales is scarce.",
    approach:
      "Fine-tuned LLaMA 3B on a self-generated STaR reasoning dataset using iterative hint-based correction (97.9% quality).",
    results: ["Lifted GSM8K accuracy from 65.3% (zero-shot CoT) to 73.4%.", "Reusable STaR data-generation pipeline."],
    stats: [
      { value: "+8.1%", label: "GSM8K Lift" },
      { value: "97.9%", label: "Data Quality" },
    ],
    tags: ["LLaMA 3B", "Fine-tuning", "STaR", "GSM8K", "Reasoning"],
  },
  {
    title: "Spatio-Temporal Grid Intelligence System",
    category: "ML/DS",
    summary:
      "GNN + LSTM forecasting on a 132-bus IEEE distribution network with a live operator dashboard — APS AI for Energy Hackathon.",
    problem:
      "Utilities need accurate, bus-level load forecasts and stress-test tools to anticipate extreme events (heat domes, EV surges) on distribution grids without expensive retraining.",
    approach:
      "Built an end-to-end spatio-temporal pipeline: parsed OpenDSS topology for a 132-bus IEEE feeder, engineered 44 features across 5.7M rows, and trained a GNN + LSTM model. Added a physics-informed GNN + TFT variant with probabilistic quantile outputs, plus inference-only stress testing (heat dome +8°F, EV surge ×2.75) and a React decision dashboard translating model outputs into tiered operator actions.",
    results: [
      "MAE = 3kW across all 132 buses on held-out 2023 heat dome data.",
      "Stress tests flagged 130/132 buses at thermal risk with zero retraining.",
      "Live dashboard surfaces tiered operator actions across 132 feeders.",
    ],
    stats: [
      { value: "3kW", label: "MAE (132 buses)" },
      { value: "130/132", label: "At-Risk Buses" },
    ],
    tags: ["GNN", "LSTM", "PyTorch Geometric", "TFT", "OpenDSS", "React", "Physics-Informed"],
  },
  {
    title: "Income Classification & Customer Segmentation",
    category: "ML/DS",
    summary:
      "CatBoost classifier + K-Means segmentation on 200K+ U.S. Census records, with fairness audit and SHAP explainability.",
    problem:
      "Predict income on a severely imbalanced 200K+ Census dataset (94/6 split) and translate it into actionable customer segments — while ensuring fairness across sex and race subgroups.",
    approach:
      "Trained a CatBoost binary classifier with Bayesian hyperparameter tuning and threshold optimization. Built a segmentation pipeline using PCA and weighted K-Means. Conducted a Fairlearn fairness audit across sex and race subgroups and applied SHAP to validate the model's top income drivers.",
    results: [
      "PR-AUC 0.71 / ROC-AUC 0.96 on a 94/6 imbalanced split.",
      "Threshold tuned to 0.34 — minority-class recall up by 13 points.",
      "5 actionable customer segments with distinct income, employment & demographic profiles.",
      "SHAP surfaced weeks worked, capital gains, and education rank as top drivers.",
    ],
    stats: [
      { value: "0.96", label: "ROC-AUC" },
      { value: "5", label: "Segments" },
    ],
    tags: ["CatBoost", "K-Means", "PCA", "SHAP", "Fairlearn", "Bayesian Tuning", "Imbalanced Data"],
  },
];

export const skills = {
  Programming: ["Python", "SQL", "PySpark", "C++", "NumPy", "Pandas"],
  "Data Science & Analytics": [
    "A/B Testing & Experimentation",
    "Causal Inference",
    "Uplift Modeling",
    "Hypothesis Testing",
    "Cohort & Retention Analysis",
    "Funnel & Conversion Analysis",
    "Bayesian Methods",
    "Advanced SQL",
    "Stakeholder Communication",
    "Product Analytics",
    "Power BI",
    "Tableau",
    "Excel",
  ],
  "AI / ML": [
    "Statistics",
    "Predictive Modeling",
    "Time Series",
    "Deep Learning",
    "NLP",
    "LLMs",
    "MLOps",
    "Prompt Engineering",
    "Fine-tuning & Alignment",
    "RAG",
    "Agentic Workflows",
    "LLM Evaluation & Safety",
  ],
  "Frameworks & Libraries": [
    "TensorFlow",
    "PyTorch",
    "Scikit-learn",
    "Hugging Face",
    "LangChain",
    "DeepEval",
    "DSPy",
    "Flask",
    "Streamlit",
    "Spark",
  ],
  "Cloud & MLOps": ["AWS", "Databricks", "MLflow", "Docker", "Git", "Vector Databases"],
} as const;

export const education = [
  {
    school: "Arizona State University",
    location: "Tempe, AZ",
    degree: "Master of Science in Computer Science",
    detail: "GPA 4.0 / 4.0",
    period: "Aug 2024 – May 2026",
    courses: [
      "Statistical Machine Learning",
      "Data Mining",
      "Natural Language Processing",
      "Artificial Intelligence",
      "Data-Intensive Systems for ML",
      "Data Visualization",
      "Cloud Computing",
      "Semantic Web Mining",
      "Data Processing at Scale",
    ],
  },
  {
    school: "Vellore Institute of Technology",
    location: "Vellore, India",
    degree: "Bachelor's in Computer Science",
    detail: "GPA 9.29 / 10 · Merit Scholarship (Top 10 rank)",
    period: "Jul 2018 – May 2022",
    courses: [
      "Data Structures & Algorithms",
      "Operating Systems",
      "Database Management Systems",
      "Computer Architecture",
      "Web Mining",
      "Social Information Networks",
      "Software Design & Development",
    ],
  },
];

export const awards = [
  { title: "Runner-up, Visual AI Hackathon by Voxel51", detail: "Built Hazard Zone Monitoring system using YOLOv8", date: "Feb 2025" },
  { title: "Outstanding Project Award", detail: "CSE 598 Data-Intensive Computing for ML, ASU", date: "2025" },
  { title: "Dale Carnegie Program on Training Excellence", detail: "Communication, storytelling & leadership", date: "Mar 2024" },
  { title: "Certified Trainer, Bajaj Finance", detail: "Delivered technical training to 60+ employees", date: "Mar 2024" },
  { title: "HEROES Award, Bajaj Finance", detail: "Exceptional performance recognition", date: "Jan 2023" },
  { title: "Finalist, Code For Good Hackathon", detail: "JP Morgan Chase & Co.", date: "Jun 2022" },
];

export const certifications = [
  { title: "Generative AI with Large Language Models", issuer: "DeepLearning.AI", date: "Apr 2024", credId: "JERVRGRUZER4", url: "https://www.coursera.org/account/accomplishments/records/JERVRGRUZER4" },
  { title: "MLOps Specialization", issuer: "DeepLearning.AI", date: "Jan 2024", credId: "2JN4FTUT6QMB", url: "https://www.coursera.org/account/accomplishments/specialization/2JN4FTUT6QMB" },
  { title: "TensorFlow Developer Specialization", issuer: "DeepLearning.AI", date: "Mar 2023", credId: "WATFHCS2LETQ", url: "https://www.coursera.org/account/accomplishments/specialization/WATFHCS2LETQ" },
  { title: "Deep Learning Specialization", issuer: "DeepLearning.AI", date: "Nov 2022", credId: "YSNAWL7SBKHF", url: "https://www.credly.com/badges/20f35d14-bd01-4879-a0a4-f751a64c958a/public_url" },
  { title: "AWS Cloud Practitioner", issuer: "Amazon Web Services", date: "Aug 2021", credId: "4LB73G6LJ114Q4W5" },
];

export const navLinks = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#education", label: "Education" },
  { href: "#beyond", label: "Beyond Work" },
  { href: "#contact", label: "Contact" },
];
