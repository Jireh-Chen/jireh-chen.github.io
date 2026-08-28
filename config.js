// ─────────────────────────────────────────────────────────────────────────────
// config.js — Edit this file to personalize your academic homepage.
// No HTML/CSS knowledge required.
// ─────────────────────────────────────────────────────────────────────────────

const USER_CONFIG = {
  // ── Basic Information ───────────────────────────────
  name:       "Yile Chen (陈以勒)",
  authorName: "Yile Chen",
  initials:   "YC",

  role:       "PhD @ SCUT",

  department: "School / Department Name",
  university: "South China University of Technology",

  email:      "jireh.y.chen@gmail.com",

  bio:        "I am a PhD graduate from South China University of Technology (SCUT) and a Research Assistant at HKUST-GZ. My research spans **Automated Machine Learning (AutoML)**, **LLM Systems**, and **AI Agents**. I expect to join the National University of Singapore (NUS) as a postdoctoral researcher, where I will focus on **Agentic AI Safety**.",

  intro:      "*With humility, gentleness, patience, and love for one another.*",
  //"*With humility, gentleness, and patience, treating one another with love.*",

  publicationsPage: "publications.html",

  photo: {
      cartoon: "assets/images/profile-cartoon.jpg",
      real: "assets/images/profile.jpg"
  },

  // ── Highlights ──────────────────────────────────────
  stats: [
    { value: "10+",  label: "Publications" },
    { value: "200+", label: "Citations" },
    { value: "5+",   label: "Projects" },
  ],


  // ── Links ───────────────────────────────────────────
  links: {
    scholar: "https://scholar.google.com/citations?user=LgNrqQQAAAAJ",
    github:  "https://github.com/Jireh-Chen",
    twitter: "",          // leave empty to hide
    cv:      "",
  },


  // ── Publications ────────────────────────────────────
  publications: [
    {
      year:     2026,
      title:    "Mining Input-Inherent Context: A Parameter-Free Kernel Attention Mechanism for CNNs",
      authors:  "Yile Chen, Zeyuan Lin, Yawen Chen, Jian Chen, Zeyi Wen, Jin Huang",
      venue:    "ICDM 2026",
      selected: true,
      selectedOrder: 3,
      correspondingAuthors: ["Zeyi Wen", "Jian Chen"],
      links:    { pdf: ""},
      abstract: "Adds parameter-free kernel-based attention to CNNs, improving global representations and accuracy without architectural changes or extra inference overhead.",
    },
    {
      year:     2026,
      title:    "EaSFE: Scalable and Efficient Feature Engineering for Boosting Machine Learning Performance",
      authors:  "Jian Chen, Yile Chen, Zhenya Zheng, Zeyi Wen, Yawen Chen, Jin Huang",
      venue:    "ACM TKDD 2026",
      selected: false,
      correspondingAuthors: ["Yawen Chen"],
      equalContributors: ["Jian Chen", "Yile Chen"],
      links:    { pdf: "/assets/pdf/2026-TKDD-EaSFE.pdf", code: "https://github.com/JirehChan/2026_TKDD_EaSFE"},
    },
    {
      year:     2026,
      title:    "Towards Dynamic Interleaving Optimizers",
      authors:  "Yile Chen, Zeyi Wen, Jian Chen, Jin Huang",
      venue:    "ICLR 2026",
      selected: true,
      selectedOrder: 1,
      correspondingAuthors: ["Zeyi Wen", "Jian Chen"],
      links:    { pdf: "/assets/pdf/2026-ICLR-DyOpt.pdf",
                  poster: "/assets/pdf/2026-ICLR-DyOpt-poster.pdf",
      }, //, code: "#" },
      abstract: "Dynamically interleaves optimizers based on training state, improving convergence speed and accuracy across diverse vision and language tasks.",
    },
    {
      year:     2026,
      title:    "A Better Start: Sensitivity-Aware Warm-Up for Robust and Efficient Fine-Tuning",
      authors:  "Yile Chen, Zeyi Wen, Jian Chen, Jin Huang",
      venue:    "AAAI 2026",
      selected: true,
      selectedOrder: 2,
      correspondingAuthors: ["Zeyi Wen", "Jian Chen"],
      links:    { pdf: "/assets/pdf/2026-AAAI-WarmUp.pdf",
                  poster: "/assets/pdf/2026-AAAI-WarmUp-poster.pdf",
      },//, code: "https://github.com/JirehChan/SAWU"},
      abstract: "Uses sensitivity-aware warm-up to guide training toward stable basins, improving robustness, accuracy, and efficiency with minimal overhead.",
    },
    {
      year:     2025,
      title:    "Towards Recommendation on Good Quality Data Science Solutions",
      authors:  "Jian Chen, Yile Chen, Zeyi Wen, Yawen Chen, Jin Huang",
      venue:    "ACM TKDD 2025",
      selected: false,
      correspondingAuthors: ["Yawen Chen"],
      links:    { pdf: "/assets/pdf/2025-TKDD-SolutionRec.pdf"},
    },
    {
      year:     2024,
      title:    "Enhancing the Performance of Bandit-based Hyperparameter Optimization",
      authors:  "Yile Chen, Zeyi Wen, Jian Chen, Jin Huang",
      venue:    "ICDE 2024",
      selected: true,
      selectedOrder: 4,
      correspondingAuthors: ["Zeyi Wen", "Jian Chen"],
      links:    { pdf: "/assets/pdf/2024-ICDE-ConfEval.pdf", code: "https://github.com/JirehChan/EnhancingBHPO"},
      abstract: "Improves bandit-based HPO with representative grouping and richer evaluation, delivering higher accuracy, better stability, and lower evaluation cost.",
    },
    {
      year:     2022,
      title:    "Efficient Second-order Optimization for Neural Networks with Kernel Machines",
      authors:  "Yawen Chen, Yile Chen, Jian Chen, Zeyi Wen, Jin Huang",
      venue:    "CIKM 2022",
      selected: false,
      correspondingAuthors: ["Zeyi Wen"],
      links:    { pdf: "/assets/pdf/2022-CIKM-KernelOpt.pdf"},
    },
    
  ],


  // ── Projects ────────────────────────────────────────
  projects: [],
    //[
    //{
    // name: "Project Name",
    //  desc: "Brief description of your project and its impact.",
    //  tags: ["Python", "PyTorch"],
    //  url:  "#",
    //},
    //],


  // ── News ────────────────────────────────────────────
  news: [
    { date: "2026.08", badge: "New",       text: "Paper accepted at ICDM 2026!",
      detail: 'Our paper **"Mining Input-Inherent Context: A Parameter-Free Kernel Attention Mechanism for CNNs"** was accepted by **ICDM 2026**!'},
    { date: "2026.06", badge: "MILESTONE", text: "Awarded PhD degree!!!",
      detail: 'I received my **PhD degree** from **South China University of Technology (SCUT)**!',},
    { date: "2026.05", badge: "New",       text: "Paper accepted at TKDD!",
      detail: 'Our Paper **"EaSFE: Scalable and Efficient Feature Engineering for Boosting Machine Learning Performance"** accepted by **ACM TKDD**!',},
    { date: "2026.01", badge: "New",       text: "Paper accepted at ICLR 2026!",
      detail: 'Our Paper **"Towards Dynamic Interleaving Optimizers"** accepted by **ICLR 2026**!',},
    { date: "2025.11", badge: "New",       text: "Paper accepted at AAAI 2026!",
      detail: 'Our Paper **"A Better Start: Sensitivity-Aware Warm-Up for Robust and Efficient Fine-Tuning"** accepted by **AAAI 2026**!',},
    { date: "2025.06", badge: "New",       text: "Paper accepted at TKDD!",
      detail: 'Our Paper **"Towards Recommendation on Good Quality Data Science Solutions"** accepted by **ACM TKDD**!',},
  ],


  // ── Education ───────────────────────────────────────
  education: [
    { period: "2021.09–2026.06", degree: "Ph.D. in Software Engineering", institution: "South China University of Technology" },
    { period: "2017.09–2021.06",    degree: "B.Eng. in Software Engineering",  institution: "South China University of Technology" },
  ],

  // ── Experience ──────────────────────────────────────
  experience: [
    { period: "2023.06–Present", role: "Visiting Student & Research Assistant", institution: "Hong Kong Universifty of Science and Technology (Guangzhou)" },
  ],


  // ── Photos ──────────────────────────────────────

  photos: [
    { src: "assets/photos/260713-Jiangmen-friends.jpg",
      caption: "Hiking with friends · Xianyu Lake, Jiangmen",
      date: "2026.07" },
    { src: "assets/photos/260521-SCUT-Defense.jpg",
      caption: "Ph.D. dissertation defense · SCUT",
      date: "2026.05" },
    { src: "assets/photos/260517-Guangzhou-Escape.jpg",
      caption: "Harry Potter escape room · Guangzhou",
      date: "2026.05" },
    { src: "assets/photos/260414-Shanghai-Ruijin.jpg",
      caption: "With family · Shanghai",
      date: "2026.04" },
    { src: "assets/photos/260124-Humen Bridge-Friends.jpg",
      caption: "Sunset with friends · Humen Bridge, Dongguan",
      date: "2026.01" },
    { src: "assets/photos/260123-Singapore-AAAI.jpg",
      caption: "AAAI 2026 trip · Pokémon Center, Changi Airport",
      date: "2026.01" },
  ],
  
};
