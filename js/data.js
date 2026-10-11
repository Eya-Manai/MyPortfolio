// ============================================================
//  Content data: profile, domains, journey, skills, projects, certs, chapters.
//  Plain classic script: it reads globals from the files loaded above it.
//  Load order is fixed by index.html and must not change.
// ============================================================

// ==========================================
// EYA MANAI IMMERSIVE 3D PORTFOLIO EXPERIENCE
// ==========================================

const personalData = {
  name: "Eya Manai",
  title: "Software Engineering Student & Creative Developer",
  positioning: "AI • 3D • UX/UI • VR/AR",
  tagline: "I build intelligent and immersive digital experiences where technology meets creativity.",
  location: "Ariana, Tunisia",
  institution: "ISAMM (Higher Institute of Multimedia Arts of Manouba)",
  ranking: "Top 10% of Cohort · Immersive Design & Digital Systems (DISN)",
  email: "eyamanai35@gmail.com",
  phone: "+216 50 183 695",
  cvFile: "assets/mineCV.pdf",
  links: [
    { label: "LinkedIn", href: "https://linkedin.com/in/Eya-Manai" },
    { label: "GitHub", href: "https://github.com/Eya-Manai" }
  ]
};

// Pillar marks are typographic glyphs rather than emoji — same reasoning as
// achievementsData: they inherit the display font and match the type.
const worldDomains = [
  {
    id: "ai",
    icon: "✦",
    title: "Artificial Intelligence",
    tagline: "NLP & LLM Architectures",
    desc: "From training text classification pipelines to exploring OpenAI API integrations and production LLMOps workflows, I harness AI to give digital experiences reasoning and contextual depth.",
    tags: ["OpenAI API", "LLMOps", "NLP", "Scikit-learn", "Python", "TF-IDF"]
  },
  {
    id: "3d",
    icon: "◈",
    title: "3D & Creative WebGL",
    tagline: "Procedural Shaders & Spatial Form",
    desc: "The web is an explorable landscape. Using Three.js, WebGL, custom GLSL shaders, and Blender, I sculpt interactive digital worlds that respond to touch, light, and motion.",
    tags: ["Three.js", "WebGL", "GLSL Shaders", "Blender 3D", "Lighting", "Physics"]
  },
  {
    id: "vr",
    icon: "❋",
    title: "Virtual & Augmented Reality",
    tagline: "Spatial Presence & Narrative",
    desc: "VR creates genuine empathy. In Posidonia VR, I crafted underwater biomes to immerse players into threatened Mediterranean marine reserves and inspire environmental action.",
    tags: ["Unity", "C#", "Meta Quest", "6DOF Physics", "Spatial Audio", "URP"]
  },
  {
    id: "ux",
    icon: "❖",
    title: "UX/UI & Creative Direction",
    tagline: "Human-Centered Aesthetics",
    desc: "Technology without empathy is hollow. I design interfaces in Figma that feel intuitive, elegant, and playful — ensuring complex medical or technical platforms remain welcoming.",
    tags: ["Figma", "Interaction Design", "User Journeys", "Micro-Interactions", "Typography"]
  },
  {
    id: "software",
    icon: "✧",
    title: "Software Engineering",
    tagline: "Resilient & Scalable Systems",
    desc: "Behind every seamless experience is robust software engineering. Whether building hospital-grade oncology coordination tools with React/TypeScript or mobile apps with Flutter/Firebase, I write clean code.",
    tags: ["TypeScript", "React", "Node.js", "PostgreSQL", "Docker", "Flutter", "Spring Boot"]
  }
];

const journeyMilestones = [
  
  {
    year: "Jun – Jul 2026",
    title: "VR Serious Game Developer",
    sub: "Association ATUTAX (Vue Verte)",
    desc: "Developed Posidonia VR: modeled realistic underwater 3D biomes, programmed 6DOF VR interaction mechanics in Unity/C#, and optimized GPU draw calls for standalone headsets."
  },
  
  {
    year: "2025 – 2026",
    title: "GDG On Campus Organizer & Global Game Jam",
    sub: "Google Developer Groups (ISAMM)",
    desc: "Led developer community workshops, organized hackathons, and competed in the 48-hour Global Game Jam, building a rapid 3D game prototype in Unity."
  },
  {
    year: "Jun – Jul 2025",
    title: "Mobile Application Developer",
    sub: "Société Khaled Romdhane",
    desc: "Engineered a playful gamified mobile educational application for primary-school pupils in Tunisia using Flutter, Dart, and Google Firebase."
  },
  {
    year: "Nov 2024",
    title: "IAMM 2024 Conference Co-Organizer",
    sub: "International Conference on AI & Multimedia (Hammamet)",
    desc: "Orchestrated event management and designed the entire visual identity and multimedia communication assets for the international conference."
  },
  {
    year: "Feb – May 2024",
    title: "Full-Stack Web Developer",
    sub: "ASQII (Chemo Tracker)",
    desc: "Built a medical web application connecting hospital oncologists and clinical pharmacists to manage chemotherapy protocols and coordinate patient schedules safely."
  },
  {
    year: "Sep 2021 – Jul 2024",
    title: "Bachelor's Degree in Computer Science",
    sub: "ISAMM (Institute of Arts & Multimedia of Manouba)",
    desc: "Three-year undergraduate degree establishing core mastery in data structures, algorithms, web development, multimedia computing, and UX design."
  },
  {
    year: "Jun 2021",
    title: "Bachelor of Science in Experimental Sciences",
    sub: "Hannibal High School Ariana",
    desc: "Scientific diploma with rigorous training in mathematics and life sciences, sparking my curiosity for algorithmic systems."
  }
];

const skillsCatalog = {
  "Software Development": [
    "Python", "JavaScript", "TypeScript", "C", "C#", "Java", "Dart", "Flutter",
    "React", "Node.js", "Express.js", "Spring Boot", "PostgreSQL", "TypeORM", "Docker", "Git", "REST APIs"
  ],
  "Artificial Intelligence": [
    "Machine Learning", "Deep Learning", "Natural Language Processing (NLP)", "OpenAI API & Prompt Engineering",
    "LLMOps Concepts", "Computer Vision", "Scikit-learn", "TF-IDF & Text Classification", "Pandas & NumPy", "Model Evaluation"
  ],
  "3D & Immersive Tech": [
    "Three.js", "WebGL", "Unity", "Blender 3D", "Virtual Reality (VR)", "Augmented Reality (AR)",
    "GLSL Shaders", "Procedural Geometry", "Universal Render Pipeline (URP)", "Spatial Audio"
  ],
  "Design & Product": [
    "Figma", "UX/UI Design", "User Research", "Wireframing & Prototyping", "Interaction Design",
    "Creative Direction", "Micro-Animations", "Draw.io"
  ]
};

const projectsData = [
  {
    id: "posidonia-vr",
    title: "Posidonia VR (Vue Verte)",
    subtitle: "Interactive Underwater VR Serious Game",
    year: "2026",
    at: "Association ATUTAX & ISAMM",
    role: "VR & 3D Developer",
    featured: true,
    hasUnderwaterMode: true,
    image: "assets/projects/posidonia.png",
    tint: ["#ff3385", "#7928ca"],
    stack: ["Unity", "C#", "Blender", "VR / Meta Quest", "URP", "3D Design"],
    story: "An immersive underwater serious game guiding players through a scripted educational journey exploring Mediterranean Posidonia oceanica seagrass meadows and marine biodiversity preservation. Collaborating between ISAMM and the ATUTAX Association, I designed realistic underwater 3D biomes, programmed intuitive headset interaction mechanics, modeled ecological marine elements (Pinna nobilis, Sea Bream, octopuses), and rigorously profiled GPU draw calls and shaders to guarantee 90 FPS rendering on standalone VR headsets.",
    problem: "Posidonia oceanica is vital to Mediterranean marine ecosystems and carbon capture, yet suffers severe degradation from anchoring, coastal pollution, and ghost fishing nets. Traditional awareness campaigns struggle to convey underwater scale and urgency.",
    solution: "A gamified VR exploration where players virtually dive into threatened marine reserves, conduct biodiversity surveys, free entangled marine wildlife, and witness the tangible ecological benefits of conservation first-hand.",
    // Headset capture. Drop the file at this path (MP4/H.264 recommended);
    // until then the block shows a labelled placeholder instead of a dead frame.
    // No `preview: true` here on purpose: this clip is large, so the card
    // keeps its still cover and only the case study streams the video.
    video: {
      src: "assets/projects/tutoFinalAtutax.mp4",
      poster: "assets/projects/posidonia.png",
    },
    screenshots: [
      "assets/projects/posidonia.png",
      "assets/projects/under water.jpg",
      "assets/projects/beach.jpg"
    ]
  },
  {
    id: "fake-news-detector",
    title: "Fake News Detection System",
    subtitle: "NLP & Deep Learning Classification Pipeline",
    year: "2026",
    at: "ISAMM (Engineering Academic)",
    role: "NLP & Machine Learning Engineer",
    image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1200&q=85",
    tint: ["#ff5ca0", "#d81b85"],
    stack: ["Python", "Scikit-learn", "NLP", "NLTK", "TF-IDF", "Pandas", "Streamlit"],
    story: "A machine learning and natural language processing pipeline designed to combat disinformation. Built automated text preprocessing (tokenization, stop-word removal, lemmatization), TF-IDF vector feature extraction, and trained comparative classification models (Random Forest, Logistic Regression, Naive Bayes) with hyperparameter optimization to accurately differentiate reliable journalism from misleading articles.",
    problem: "The rapid proliferation of digital disinformation and clickbait threatens informed decision-making, requiring automated, scalable verification tools.",
    solution: "An end-to-end NLP classifier that extracts stylistic and semantic signals from article text, evaluating credibility confidence scores with high precision and low false positives.",
    screenshots: [
      "assets/projects/FakeNewNLP.webp",
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=85"
    ]
  },
  {
    id: "chemo-tracker",
    title: "Chemo Tracker",
    subtitle: "Clinical Oncology Protocol Management Web App",
    year: "2024",
    at: "ASQII",
    role: "Full-Stack Web Developer",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=85",
    tint: ["#c084fc", "#60a5fa"],
    stack: ["React", "TypeScript", "Node.js", "Express", "PostgreSQL", "TypeORM"],
    story: "A mission-critical medical platform engineered to coordinate chemotherapy treatment protocols between oncology medical teams and clinical hospital pharmacists. Designed intuitive clinical dashboards to schedule patient administration cycles, monitor adverse dosage tolerances, ensure protocol conformity, and prevent medication conflicts through strict role-based access control.",
    problem: "Managing complex oncology therapeutic protocols across multidisciplinary hospital teams often involves disconnected records, risking scheduling delays and dosage miscalculations.",
    solution: "A centralized, type-safe web platform providing synchronized patient timelines, protocol validation rules, dosage calculators, and instant pharmaceutical sign-offs.",
    screenshots: [
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=1200&q=85"
    ]
  },
  {
    id: "kids-learning-app",
    title: "Kids Educational Learning App",
    subtitle: "Gamified Interactive Mobile Application",
    year: "2025",
    at: "Société Khaled Romdhane",
    role: "Mobile Developer & UX/UI Designer",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=85",
    tint: ["#ff94c2", "#ffb3a7"],
    stack: ["Flutter", "Dart", "Firebase", "Cloud Firestore", "Figma"],
    story: "An interactive mobile educational application developed for primary-school pupils in Tunisia. Designed child-friendly, colorful user interfaces with tactile animations, gamified quiz mechanics, auditory encouragement feedback, and offline state caching synchronized seamlessly with Google Firebase.",
    problem: "Traditional pedagogical materials for early primary education often struggle to engage children accustomed to digital media, creating motivational barriers.",
    solution: "A cheerful, intuitive Flutter mobile environment featuring visual reward systems, progress badges, micro-animations, and multi-subject mini-games tailored to regional school curricula.",
    // Handset captures rendered in a portrait phone frame rather than the
    // landscape gallery. Replace the paths with your own device screenshots.
    phoneShots: [
      { src: "assets/projects/authentification.PNG", caption: "Authentification" },
      { src: "assets/projects/parentHomePage.PNG", caption: "Parent Home Page" },
      { src: "assets/projects/bobo.PNG", caption: "Kid's Avatar" },
      { src: "assets/projects/toti.PNG", caption: "Kid's Avatar" },
      { src: "assets/projects/dodo.PNG", caption: "Kid's Avatar" },
      { src: "assets/projects/wakwak.PNG", caption: "Kid's Avatar" },
      { src: "assets/projects/addCHILD.PNG", caption: "Add Child" },
      { src: "assets/projects/selectSubject.PNG", caption: "select Subject" },
      { src: "assets/projects/selectChapter.PNG", caption: "Select Chapter" },
      { src: "assets/projects/selectCourseMap.PNG", caption: "Course Map" },
      { src: "assets/projects/Courscontent.PNG", caption: "Cours Content" },
      { src: "assets/projects/gamesaccess.PNG", caption: "Games Access" },
      { src: "assets/projects/gameLoad1.PNG", caption: "Game Load" }

    ],
    screenshots: [
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=85"
    ]
  },
  {
    id: "interactive-3d-landing",
    title: "Interactive 3D Educational Landing",
    subtitle: "Creative Three.js & WebGL Web Experience",
    year: "2026",
    at: "ISAMM (Academic)",
    role: "Creative Technologist & Three.js Developer",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=85",
    tint: ["#e0b3ff", "#ff2d87"],
    stack: ["JavaScript", "Three.js", "WebGL", "HTML5", "CSS3", "GSAP Shaders"],
    story: "A creative digital landing page combining interactive 3D assets, procedural geometry, lighting choreographies, and reactive mouse camera interpolation. Demonstrates how immersive 3D technology can transform digital storytelling into an engaging, memorable branded experience.",
    problem: "Standard educational landing pages are often flat, predictable, and fail to evoke genuine curiosity or demonstrate modern creative tech capabilities.",
    solution: "A dynamic WebGL scene with procedural animations, glassmorphic typography, smooth camera easing, and performant asset streaming.",
    // Browser capture of the live WebGL scene. The same file doubles as the
    // muted looping preview on the project card.
    video: {
      src: "assets/projects/threejsDemo.mp4",
      preview: true,
      poster: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=85",
      label: "Live WebGL Demo",
      note: "Real-time Three.js scene — procedural geometry, shader lighting and mouse-reactive camera, captured in the browser."
    },
   
  },
  {
    id: "heart-attack-detection",
    title: "Cardiovascular Health Risk Predictor",
    subtitle: "Machine Learning Diagnostic Classification",
    year: "2025",
    at: "AI & Healthcare Analytics",
    role: "Machine Learning Developer",
    image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1200&q=85",
    tint: ["#ff4088", "#9333ea"],
    stack: ["Python", "Scikit-learn", "Pandas", "NumPy", "XGBoost", "Matplotlib"],
    story: "A healthcare machine learning model analyzing patient clinical indicators (blood pressure, serum cholesterol, resting ECG results, heart rate, chest pain type) to predict early heart disease probability with high sensitivity and clinical interpretability.",
    problem: "Cardiovascular diseases are the leading global cause of mortality; early, reliable risk detection through routine non-invasive screening metrics can save lives.",
    solution: "A high-recall machine learning pipeline implementing exploratory data analysis, outlier mitigation, and ensemble classifiers providing explainable risk probabilities.",
    screenshots: [
      "assets/projects/machineLearning.png"
    ]
  },
  {
    id: "warrior-of-wealth",
    title: "Warrior of Wealth",
    subtitle: "2D Promotional Game for a Local Shop",
    year: "2025",
    at: "Personal Project (Self-Initiated)",
    role: "2D Game Developer & Designer",
    image: "assets/projects/warriorofWealth.png",
    tint: ["#d946ef", "#8b5cf6"],
    stack: ["Unity", "C#", "2D Game Development", "Game Design", "Pixel Art"],
    story: "A small 2D game developed as a creative promotional experience for my shop. The game combines simple gameplay mechanics with the shop's visual identity, allowing players to interact with the brand through a short and entertaining gaming experience. The player takes on the role of a warrior who navigates the game environment, collects items, and overcomes simple challenges while discovering elements inspired by the shop. The project focuses on creating an engaging and accessible experience while using game design as a creative way to promote a business.",
    problem: "Small local shops rarely have the budget or reach for conventional advertising, so standing out against larger competitors while staying friendly to a walk-in audience is difficult.",
    solution: "Game design used as a promotional medium: an approachable 2D adventure where the brand's identity is woven into the world, characters and items the player interacts with.",
    // In-engine gameplay capture. Doubles as the muted looping preview on
    // the project card.
    video: {
      src: "assets/projects/gameTrial.mp4",
      preview: true,
      poster: "assets/projects/warriorofWealth.png",
      label: "Gameplay Demo",
      note: "Actual play session — movement, item collection and the shop-themed world in motion."
    },
    
  }
];

const certificationsData = [

  {
    id: "ccnp-1",
    title: "CCNA: Switching, Routing, and Wireless Essentials",
    organization: "Cisco Networking Academy",
    date: "2025",
    credentialId: "CCNA: Switching, Routing, and Wireless Essentials 2025",
    duration: "Advanced Routing & Switching",
    category: "Networking & Infrastructure",
    skills: ["OSPF & BGP Routing", "VLAN Troubleshooting", "WAN Architecture", "Network Automation"],
    pdfFile: "assets/certs/ccna2.pdf",
    highlight: true
  },
  {
    id: "openai-api",
    title: "Working with the OpenAI API",
    organization: "DataCamp",
    date: "Aug 08, 2026",
    credentialId: "#49,179,138",
    duration: "3 Hours",
    category: "Artificial Intelligence",
    skills: ["Prompt Engineering", "GPT-4 / GPT-3.5 API", "Few-Shot Prompting", "Embeddings & Completions"],
    pdfFile: "assets/certs/workingWithOpenAPI.pdf",
    highlight: true
  },
  {
    id: "llmops",
    title: "LLMOps Concepts",
    organization: "DataCamp",
    date: "Aug 11, 2026",
    credentialId: "#49,208,917",
    duration: "1 Hour",
    category: "Artificial Intelligence",
    skills: ["LLM Lifecycle Management", "Model Monitoring & Drift", "Fine-Tuning Strategies", "Production Deployment"],
    pdfFile: "assets/certs/LLMOPS.pdf",
    highlight: true
  },
  {
    id: "git",
    title: "Introduction to Git",
    organization: "DataCamp",
    date: "Dec 08, 2025",
    credentialId: "#44,961,339",
    duration: "2 Hours",
    category: "DevOps & Software",
    skills: ["Version Control", "Git CLI", "Branching & Merging", "Collaborative Workflows"],
    pdfFile: "assets/certs/certificate.pdf",
    highlight: false
  },
  {
    id: "gdg-recognition",
    title: "Certificate of Recognition — GDG On Campus",
    organization: "Google Developer Groups (ISAMM)",
    date: "2025 – 2026",
    credentialId: "GDG-ISAMM-2025-26",
    duration: "Academic Year",
    category: "Community & Leadership",
    skills: ["Hackathon Organization", "Technical Workshops", "Developer Community Building", "Global Game Jam"],
    pdfFile: "assets/certs/Certificate of Recognition - Eya Manai.pdf",
    highlight: true
  },
  {
    id: "iamm-2024",
    title: "IAMM'2024 International Conference Organization",
    organization: "Conference on Artificial Intelligence & Multimedia",
    date: "Nov 01 – 03, 2024",
    credentialId: "IAMM-2024-ORG",
    duration: "Hammamet, Tunisia",
    category: "AI & Multimedia",
    skills: ["Event Organization & Management", "Visual Identity Design", "Multimedia Communication", "Research Collaboration"],
    pdfFile: "assets/certs/iamm 2024_.pdf",
    highlight: true
  },
  {
    id: "digital-garage",
    title: "Fundamentals of Digital Marketing",
    organization: "Google Digital Garage",
    date: "Jan 17, 2023",
    credentialId: "1qsdpcedm9s / YNJ UYA QBS",
    duration: "Full Certification",
    category: "Product & Strategy",
    skills: ["Digital Strategy", "User Acquisition", "Web Analytics", "Product Marketing"],
    pdfFile: "assets/certs/digitalgarage_certificate.pdf",
    highlight: false
  },
  {
    id: "aureka-ai",
    title: "Potentialities of AI for Audio(visual) Heritage",
    organization: "Aureka & Association of Digital Cooperation",
    date: "Sep 2022",
    credentialId: "AUREKA-AI-2022",
    duration: "Workshop Series",
    category: "Artificial Intelligence",
    skills: ["AI in Cultural Heritage", "Audiovisual Archiving", "Heritage Preservation"],
    pdfFile: "assets/certs/aureka certification.pdf",
    highlight: false
  },
  {
    id: "game-jam",
    title: "Global Game Jam Participation & Creation",
    organization: "Global Game Jam",
    date: "2026",
    credentialId: "GGJ-2026",
    duration: "48-Hour Jam",
    category: "3D & Game Development",
    skills: ["Rapid Game Prototyping", "Unity 3D", "C# Gameplay", "Game Design"],
    pdfFile: "assets/certs/globalGame Jam.pdf",
    highlight: false
  },
  {
    id: "launch-impact",
    title: "Launch the Impact Innovation Certificate",
    organization: "Launch the Impact",
    date: "Innovation Program",
    credentialId: "LTI-CERT",
    duration: "Pitch & Demo",
    category: "Innovation & Competitions",
    skills: ["Tech Innovation", "Project Pitching", "Product Prototyping"],
    pdfFile: "assets/certs/launch the impact.PDF",
    highlight: false
  }
];

// Achievement marks are typographic glyphs, not emoji: emoji render in the
// colour emoji font (large, flat, and visually detached from the serif UI),
// whereas these inherit the display font and sit on the text baseline.
const achievementsData = [
  { icon: "✦", title: "Top 10% Cohort Ranking", desc: "Ranked in the top decile of students in the Computer Science & Immersive Systems engineering cycle at ISAMM." },
  { icon: "◈", title: "Posidonia VR Lead Developer", desc: "Designed the 3D underwater simulation and interactions for the ATUTAX environmental conservation initiative." },
  { icon: "❋", title: "GDG On Campus Organizer", desc: "Organized technical workshops, hackathons, and community tech events as an active leader in GDG On Campus ISAMM." },
  { icon: "✧", title: "Global Game Jam Creator", desc: "Engineered and shipped a playable 3D game in 48 intense hackathon hours around the international GGJ theme." },
  { icon: "❖", title: "IAMM 2024 Conference Lead", desc: "Managed communication and created all visual identity materials for the International Conference on AI & Multimedia." },
  { icon: "✺", title: "Multilingual Fluency", desc: "Fluent in Arabic (native), French (advanced), English (advanced), Korean (advanced), with foundations in Spanish, German, and Chinese." }
];

const languagesData = [
  "Arabic · Native",
  "French · Advanced",
  "English · Advanced",
  "Korean · Advanced",
  "Spanish · Beginner",
  "German · Beginner",
  "Chinese · Beginner"
];

// 7 Chapters Configuration
const chapters = [
  {
    label: "01 ME",
    title: "Hello",
    html: `
    <div class="hero hero-min">
      <p class="kicker">PORTFOLIO · ${personalData.location}</p>
      <h1>${personalData.name}</h1>
      <p class="tagline">I blend software, 3D and UX/UI to build innovative, user-centred VR/AR experiences.</p>
      <div class="hero-cta-group">
        <button class="btn" id="cta-explore">Explore My World ✦</button>
        <a class="btn btn-secondary" href="${personalData.cvFile}" target="_blank" rel="noopener">Download CV ↓</a>
      </div>
      <span class="hint">Scroll or drag to wander ✦</span>
    </div>`
  },
  {
    label: "02 WORLD",
    title: "About",
    html: `
    <div class="card wide card-about">
      <header class="card-head">
        <p class="kicker">01 · A LITTLE ABOUT ME</p>
        <h2>Where Code Meets Creativity</h2>
      </header>

      <!-- Two columns on wide screens: the intro copy reads as a proper
           article instead of one very long line across the card. -->
      <div class="about-intro">
        <p>I am a computer science engineering student at <b>${personalData.institution}</b> in the <b>Department of Immersive Design &amp; Digital Systems (DISN)</b>, ranked among the <b>top 10% of my cohort</b>.</p>
        <p>I operate at the crossroads of rigorous software engineering and expressive creative technology. I don't just build conventional applications — I craft living interactive systems, cognitive AI pipelines, and spatial 3D environments that connect emotionally with users.</p>
      </div>

      <section class="about-section">
        <h3>Explore My 5 Creative Pillars</h3>
        <p class="mut">Click or hover any pillar to inspect my approach and illuminate its 3D landmark:</p>
        <div class="domain-grid">
          ${worldDomains.map(d => `
            <div class="domain-pill" data-domain="${d.id}" role="button" tabindex="0"
              aria-label="${d.title} — ${d.tagline}">
              <div class="domain-pill-header">
                <span>${d.icon}</span>
                <span>${d.title}</span>
              </div>
              <div class="domain-pill-desc">${d.tagline}</div>
            </div>`).join("")}
        </div>
        <div id="domain-detail" class="domain-detail">
          <b>✦ Multidisciplinary Perspective:</b>
          <p>Select any pillar above to read more about how I merge software engineering rigor with spatial interaction and AI.</p>
        </div>
      </section>

      <!-- Footer splits in two so the languages list and the leadership
           note sit side by side rather than stacking in a tall column. -->
      <div class="about-foot">
        <section>
          <h3>Languages &amp; Global Fluency</h3>
          <ul class="chips">${languagesData.map(l => `<li>${l}</li>`).join("")}</ul>
        </section>
        <section>
          <h3>Community Leadership &amp; Fieldwork</h3>
          <p class="mut">Active organizer at <b>Google Developer Group (GDG On Campus ISAMM)</b> · Marine conservation fieldwork with <b>Association ATUTAX</b> · Project coordination at <b>Orenda Junior Entreprise</b> · Visual communication lead for <b>IAMM 2024 International Conference</b>.</p>
        </section>
      </div>
    </div>`
  },
  {
    label: "03 JOURNEY",
    title: "Journey",
    html: `
    <div class="card wide card-journey">
      <header class="card-head">
        <p class="kicker">02 · ACADEMIC &amp; TECHNICAL PATH</p>
        <h2>My Journey Through Technology</h2>
        <p class="mut">A continuous progression from scientific inquiry to software engineering, clinical web applications, artificial intelligence, and spatial computing.</p>
      </header>

      <!-- Flows down-then-across on wide screens (CSS multi-column), so
           the timeline still reads top-to-bottom per column. -->
      <div class="timeline-list">
        ${journeyMilestones.map(m => `
          <div class="timeline-item">
            <div class="timeline-date">${m.year}</div>
            <div class="timeline-title">${m.title}</div>
            <div class="timeline-sub">${m.sub}</div>
            <p class="timeline-desc">${m.desc}</p>
          </div>`).join("")}
      </div>
    </div>`
  },
  {
    label: "04 SKILLS",
    title: "Skills",
    html: `
    <div class="card wide card-skills">
      <header class="card-head">
        <p class="kicker">03 · TECHNICAL ECOSYSTEM</p>
        <h2>Interactive Skill Constellation</h2>
        <p class="mut">My technical stack operates as an interconnected ecosystem orbiting software architecture, cognitive AI, spatial computing, and human-centered design.</p>
      </header>

      <div class="skill-tabs" role="group" aria-label="Filter skills by discipline">
        <button class="skill-tab-btn active" data-cat="all" aria-pressed="true">All Disciplines</button>
        ${Object.keys(skillsCatalog).map(cat => `<button class="skill-tab-btn" data-cat="${cat}" aria-pressed="false">${cat}</button>`).join("")}
      </div>

      <!-- 1. The skill catalogue. Filtered in place by the tabs above. -->
      <div id="skills-display" class="skills-display">
        ${Object.entries(skillsCatalog).map(([category, skills]) => `
          <section class="skill-category-block" data-cat="${category}">
            <header class="skill-cat-head">
              <h3>${category}</h3>
              <span class="skill-count">${skills.length}</span>
            </header>
            <ul class="chips">${skills.map(s => `<li>${s}</li>`).join("")}</ul>
          </section>`).join("")}
      </div>

      <!-- 2. Recognition sits below the catalogue, so the visitor scrolls
           down to reach it rather than splitting their attention. -->
      <section class="skills-recognition">
        <header class="recognition-head">
          <p class="kicker">RECOGNITION</p>
          <h3>Notable Achievements</h3>
        </header>
        <div class="achievements-grid">
          ${achievementsData.map(a => `
            <div class="achievement-card">
              <div class="achievement-icon" aria-hidden="true">${a.icon}</div>
              <div class="achievement-text">
                <b>${a.title}</b>
                <span>${a.desc}</span>
              </div>
            </div>`).join("")}
        </div>
      </section>
    </div>`
  },
  {
    label: "05 WORK",
    title: "Projects",
    html: `
    <div class="projects-container">
      <div class="projects-header">
        <div>
          <p class="kicker" style="margin-bottom: 0.2rem;">04 · SELECTED WORK</p>
          <h2>Featured Creations</h2>
        </div>
        <p class="gallery-intro">Tap a project for the full case study ✦</p>
      </div>
      <div id="gallery-root"></div>
    </div>`
  },
  {
    label: "06 CERTS",
    title: "Certifications",
    html: `
    <div class="certs-container">
      <div class="certs-header">
        <div>
          <p class="kicker" style="margin-bottom: 0.1rem;">05 · CREDENTIALS &amp; MASTERY</p>
          <h2>Certifications</h2>
        </div>
        <p class="mut">Verified credentials across Networking, AI, LLMOps, Version Control &amp; Leadership.</p>
      </div>

      <div class="learning-path">
        <div class="path-node"><div class="year">2022 – 23</div><div class="label">Product &amp; AI</div></div>
        <div class="path-arrow">→</div>
        <div class="path-node"><div class="year">2024</div><div class="label">Healthcare &amp; Conf.</div></div>
        <div class="path-arrow">→</div>
        <div class="path-node"><div class="year">2025</div><div class="label">Git &amp; Mobile</div></div>
        <div class="path-arrow">→</div>
        <div class="path-node"><div class="year">2026</div><div class="label">OpenAI &amp; LLMOps</div></div>
        <div class="path-arrow">→</div>
        <div class="path-node"><div class="year">2026</div><div class="label">VR &amp; Spatial</div></div>
        <div class="path-arrow">→</div>
        <div class="path-node"><div class="year">2026</div><div class="label">CCNA &amp; CCNP</div></div>
      </div>

      <div id="certs-root"></div>
    </div>`
  },
  {
    label: "07 CONTACT",
    title: "Contact",
    html: `
    <div class="card">
      <p class="kicker">06 · DREAMLAND &amp; FINALE</p>
      <h2>Let's Build Something Meaningful.</h2>
      <p>Whether you're looking to develop an immersive VR experience, an AI pipeline, an interactive 3D web platform, or discuss engineering opportunities — I'd love to connect.</p>
      
      <div class="hero-cta-group" style="margin: 1.2rem 0;">
        <a class="btn" href="mailto:${personalData.email}">Email Me Directly →</a>
        <a class="btn btn-secondary" href="${personalData.links[0].href}" target="_blank" rel="noopener">LinkedIn Profile ↗</a>
        <a class="btn btn-secondary" href="${personalData.links[1].href}" target="_blank" rel="noopener">GitHub Repositories ↗</a>
        <a class="btn btn-secondary" href="${personalData.cvFile}" target="_blank" rel="noopener">Download CV (PDF) ↓</a>
      </div>

      <form class="contact-form" id="contact-form" novalidate>
        <h3 style="font-size: 1rem; margin-top: 0.5rem; color: var(--pink-soft);">Send a Quick Note:</h3>
        <input class="form-input" id="c-name" type="text" placeholder="Your name or company" autocomplete="name" required>
        <input class="form-input" id="c-email" type="email" placeholder="Your email address" autocomplete="email" required>
        <textarea class="form-input" id="c-msg" placeholder="Tell me about your idea or project..." required></textarea>
        <button class="btn" type="submit" id="c-btn">Send Message ✦</button>
        <div class="form-feedback" id="c-feedback"></div>
      </form>

      <p style="text-align: center; margin-top: 2rem; font-family: var(--kicker-font); font-weight: 800; font-size: 0.8rem; letter-spacing: 0.18em; color: var(--pink-glow);">
        ✿ CRAFTED WITH CODE, CURIOSITY &amp; PINK DREAMS · EYA MANAI © 2026 ✿
      </p>
    </div>`
  }
];

