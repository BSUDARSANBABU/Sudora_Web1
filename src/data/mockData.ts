import { ServiceItem, ProjectItem, JobItem, BlogPost, TeamMember } from '../types';

export const LOGO_URL = "https://lh3.googleusercontent.com/aida-public/AB6AXuCNSK3gKpawC38eulLpt5mXrYtW6L8FZ2noTYiE6Owz8kTtevztlSKFKi_4UkUKFBACz8tC6_wMo24BfqDsDYd34UTN7SuvlhQ1suYgHOS1CFOubuwE-1W2M10WJZkGShN3bTdsa-MFoaacH8Puu_WLMx0-9FcKEGU2r9ACQp8lbb8pDbqANdPd9f85pbCe1nlx281YoYLt5ysUQZ13bT0YY7Zl_Zu1Rk3_-PLga54cIs29fw0ioByx";

export const SERVICES: ServiceItem[] = [
  {
    id: "web-dev",
    title: "Web Development",
    icon: "code",
    description: "Robust, high-performance web applications built using modern frameworks and scalable cloud architectures.",
    tags: ["React", "Next.js", "Django", "Node.js", "PostgreSQL"]
  },
  {
    id: "mobile-dev",
    title: "Mobile App Development",
    icon: "smartphone",
    description: "Native and cross-platform mobile apps designed for seamless user experiences and exceptional performance.",
    tags: ["React Native", "Flutter", "iOS", "Android", "Swift"]
  },
  {
    id: "ui-ux",
    title: "UI/UX Design",
    icon: "palette",
    description: "Intuitive, human-centric interfaces crafted with meticulous attention to design tokens and accessibility standards.",
    tags: ["Figma", "Design Systems", "Prototyping", "User Research"]
  },
  {
    id: "python-dev",
    title: "Python Development",
    icon: "terminal",
    description: "Advanced backend logic, data engineering, and automation scripts powered by robust Python ecosystems.",
    tags: ["Python", "Django", "FastAPI", "Celery", "Pandas"]
  },
  {
    id: "react-dev",
    title: "React Development",
    icon: "layers",
    description: "Dynamic, component-driven frontend solutions utilizing modern React patterns and high-speed rendering.",
    tags: ["React 19", "TypeScript", "Tailwind CSS", "Redux", "Vite"]
  },
  {
    id: "ai-solutions",
    title: "AI & Automation",
    icon: "psychology",
    description: "Cutting-edge machine learning models and workflow automation to supercharge business productivity.",
    tags: ["LLM Integration", "PyTorch", "OpenAI", "LangChain", "Agents"]
  },
  {
    id: "cloud-devops",
    title: "Cloud Solutions",
    icon: "cloud",
    description: "Scalable cloud infrastructure, DevOps pipelines, and secure serverless deployments on AWS, GCP, and Azure.",
    tags: ["AWS", "Google Cloud", "Docker", "Kubernetes", "Terraform"]
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing",
    icon: "trending_up",
    description: "Data-driven growth strategies, SEO optimization, and conversion-focused acquisition campaigns.",
    tags: ["SEO", "Performance Marketing", "Analytics", "Growth Loops"]
  },
  {
    id: "software-dev",
    title: "Software Development",
    icon: "dns",
    description: "Robust enterprise software solutions and custom microservices architecture for mission-critical operations.",
    tags: ["Microservices", "Event-Driven", "REST APIs", "GraphQL"]
  },
  {
    id: "data-solutions",
    title: "Data Solutions",
    icon: "analytics",
    description: "Advanced analytics pipelines, data warehousing, ETL orchestration, and BI dashboards for enterprise insights.",
    tags: ["Snowflake", "dbt", "PostgreSQL", "BI Dashboards", "BigQuery"]
  }
];

export const PROJECTS: ProjectItem[] = [
  {
    id: "nexus-analytics",
    title: "Nexus Financial Analytics Suite",
    category: "Fintech",
    categorySlug: "web",
    tags: ["React", "Django", "PostgreSQL", "Python"],
    description: "A real-time financial reporting platform processing over 1M daily transactions with custom visualization modules.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDqj730u-vpXFlDWACd9xzsV_-klR0WabPOwNJ29hT8hFEHAeMl-4D110XDYS2vHBqO7Zws3WIjRfDRn7Mq0RvyWJ-b3MeGoCX61tJYhyLpzIs0fTMPiTr5FTiB0twHAa8BdebjWCiBCMLuzyFdvth-FBZMc3-EnhnWg-wMkzafoynBC92FLAbj1HFc3c7jrVrT0m-Kd0AfNj3zyIW7nQWQbHD301xznXThY2vsUAG4FZgEfOaKT2Ni",
    duration: "5 Weeks",
    client: "Nexus Global Capital",
    metrics: [
      { label: "Daily Transactions", value: "1.2M+" },
      { label: "Latency", value: "<12ms" },
      { label: "Uptime", value: "99.99%" }
    ]
  },
  {
    id: "pulsecare-telemetry",
    title: "PulseCare Telemetry Portal",
    category: "Healthcare",
    categorySlug: "mobile",
    tags: ["React Native", "Node.js", "AWS", "Cloud & AI"],
    description: "HIPAA-compliant remote patient monitoring system integrating AI-driven anomaly detection algorithms.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBtmTrL5pxSt9GYUhjBE3VChWlVI4m5nRqY1VAxEUbqh64KHp5XYjXufGbEkkbKYMn37HodEVCzu_kNk7mOIP10UrJPQQ0Jo2g54gqxiVQB0mfBhLE4VxOzb-8xE6ciSDjc1RSJVzlHPE6DX73nKf49XEBzJVxWRR86_J8ALnv2fbdy27sixf-2gZEo3aGszbObF-GPHgfH8aSlZlJwvW0V00Ogs1Kx-rrnC1er_3uai6JSwullphvT",
    duration: "8 Weeks",
    client: "PulseCare Health Systems",
    metrics: [
      { label: "Active Patients", value: "50,000+" },
      { label: "Compliance", value: "HIPAA / SOC2" },
      { label: "Detection Accuracy", value: "99.4%" }
    ]
  },
  {
    id: "globalchain-supply",
    title: "GlobalChain Supply Dashboard",
    category: "Logistics",
    categorySlug: "business",
    tags: ["Node.js", "React", "Docker", "AWS"],
    description: "End-to-end supply chain visibility tool optimized for real-time inventory tracking and predictive route optimization.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCac8raSjIEnwf7RJnbdsNZsbOrqkt7OcCJd-zKj-cOyTDIl5F-9uB8jaqXdwzyafxmwQP65gluoZs0mmiSwx9RBbuI6GBqIrVG5IkjhkPh1eqaabkMUoj-0UczdZdoXfovl75aE5pwfXxqvs0D7-XsIra5oP8F9hC4RhWoNwOhXB3PD3NHc44wuXgr2K9uOT6EmEx68Df1-OQHU-nu6v25_2uEmZf7ulxVlFZrCQKOQOxp7xSwMbVy",
    duration: "6 Weeks",
    client: "GlobalChain Freight & Transit",
    metrics: [
      { label: "Fleet Monitored", value: "8,500 units" },
      { label: "Fuel Savings", value: "18.4%" },
      { label: "Route Efficiency", value: "+26%" }
    ]
  },
  {
    id: "vortex-merchant",
    title: "Vortex Merchant Command Center",
    category: "E-Commerce",
    categorySlug: "ecommerce",
    tags: ["Next.js", "GraphQL", "Stripe", "PostgreSQL"],
    description: "High-throughput multi-vendor marketplace platform engineered for extreme scalability and ultra-fast page loads.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDiAzqtvU3M-hdObP-RJ2y2LQ_zqgwteoAmxjZNY86hcGStdEJ09Be8bDu28FLkU2W7KGkWUznYsHt5vSW733cC5Nr9NLCi9Dhi8U67d8_IK0H79t3EkA0DG9GuEoui4z8rcpKryzm4bqDsjNpIOz_-LG7Fmh_BnaKit0TSJQo2TtQ7Xiz5M_J-GCSyKBuT7MgeCTJBDppen-Wnvpd8fsN3u57Egv2yuah8IiaV7aZpHb82UjGu6pKO",
    duration: "10 Weeks",
    client: "Vortex Retail Networks",
    metrics: [
      { label: "Monthly GMV", value: "$48M+" },
      { label: "Page Load Speed", value: "280ms" },
      { label: "Conversion Lift", value: "+32%" }
    ]
  },
  {
    id: "omnimind-ai",
    title: "OmniMind AI Assistant",
    category: "AI",
    categorySlug: "ai",
    tags: ["Python", "PyTorch", "FastAPI", "Vector DB"],
    description: "Generative AI workflow automation engine built to streamline customer support and enterprise knowledge retrieval.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAe6ljYLJBYrszdymaovJ0DGb53hzpo0gSQoH6Ooa5iaf0PTifERzw2avB4IzJS_V1yDlNEe0p4lQHatlebiUXGOudWzjOvsS5RTLngWWoS3XsCf5kLG-7DnrFlx9P75JAQLDuCMMNDCz_hnfxbYJS2asNyJJztIPHTxAVk2r-Kh67U-FWP_mBgcG-X_OBPO-wXiRrRg-WNtA6KwUwclzFzSPeXfuX3PoT8ywr81HtvI9Q4vkgeY-6x",
    duration: "7 Weeks",
    client: "OmniMind Systems Inc.",
    metrics: [
      { label: "Queries Processed", value: "4.2M/mo" },
      { label: "Resolution Rate", value: "88%" },
      { label: "Time Saved", value: "32 hrs/rep" }
    ]
  },
  {
    id: "cryptovault-auditor",
    title: "CryptoVault Security Auditor",
    category: "Fintech",
    categorySlug: "web",
    tags: ["TypeScript", "Rust", "Ethereum", "Docker"],
    description: "Smart contract auditing suite and automated vulnerability scanner ensuring bulletproof decentralized application security.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAEuoj3gLEAblxpGt-zeD1mtvRv92SVEFlf6qNcXJoyNJGTuAPrPAUbGlhvsYjmt5YQBLH2HOM8LyurgNZgaDts8iPL0UnzYKiwQHRljdviexmNn85bhnI1hJy1uoGTF5DmPjDNXNj9EdWcuydS2LJ1tb4GPzIIuPHcwohiI2AkwQVaQmmPIZpIWkp4_s9G_BnXgsFHKNehApsKF7A4YZE3_Zf8_fXLyxImJ5I06VQ-rrjJf7EPzs42",
    duration: "6 Weeks",
    client: "CryptoVault Protocol",
    metrics: [
      { label: "Contracts Audited", value: "350+" },
      { label: "TVL Secured", value: "$1.4B" },
      { label: "Exploits Prevented", value: "100%" }
    ]
  }
];

export const SMART_BUSINESS_PROJECT = {
  id: "smart-business-platform",
  title: "Smart Business Management Platform",
  categoryBadge: "Enterprise SaaS / Business Systems",
  subtitle: "A comprehensive, multi-tenant enterprise resource planning and operations management platform engineered for hyper-growth companies.",
  heroImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuA5GOgrHDu32wlo75kVTDwOyh5Ly6blYYSHafTDbQK9c7RQDBYnDcyzpYnvXlIK-VDFZvs1hYApNI8W6f07DnZ4iWM3XVEFQwyQvqmTDKsGZYJpbPSo-dn_JADL80gNSnJY8rvf5BkAsGGBxgjifNKX3JLjcF2zP8h4Og1aDxIp2HF7D2XdQ9PYEID__8U7ZPflEEaOOXto4JMsmActWKIKuWX_AIi4aaFKus9tLRJ7YB5EE1dW8lwd",
  overview: [
    "The Smart Business Management Platform was conceptualized to bridge the gap between legacy enterprise resource planning (ERP) software and modern, cloud-native user experiences. Designed specifically for medium to large enterprises scaling rapidly across global markets, the system unifies financial accounting, supply chain logistics, human resources, and customer relationship management into a single cohesive interface.",
    "By leveraging a decoupled microservices architecture and an intuitive React-based front-end, our team delivered a lightning-fast application capable of processing thousands of concurrent transactions without compromising performance or security."
  ],
  challenge: "The client was struggling with fragmented legacy tools that caused data silos across departments, leading to delayed financial reporting, inventory discrepancies, and severe operational bottlenecks during peak growth phases.",
  coreRequirements: "Build a secure, multi-tenant SaaS application with real-time data synchronization, granular role-based access control, multi-currency invoicing, and automated audit trails compliant with international financial standards.",
  architecture: "We implemented a robust event-driven architecture using Python and Django for the backend services, backed by PostgreSQL for reliable relational data storage. Containerized via Docker and orchestrated with Kubernetes, the platform guarantees high availability and seamless horizontal scaling.",
  techTags: ["React.js", "Python", "Django REST", "PostgreSQL", "Docker", "Redis", "AWS Cloud"],
  features: [
    {
      title: "Real-time Analytics",
      icon: "analytics",
      description: "Live financial dashboards, cash flow forecasts, and operational KPIs updating instantaneously via WebSockets."
    },
    {
      title: "Automated Workflows",
      icon: "bolt",
      description: "Custom rule builders that automate invoice approvals, inventory reordering, and employee onboarding tasks."
    },
    {
      title: "Role-based Access",
      icon: "shield_person",
      description: "Granular permissions architecture ensuring strict data privacy and compliance across multi-department teams."
    },
    {
      title: "Multi-currency Billing",
      icon: "payments",
      description: "Automated currency conversion and global tax calculation engine supporting over 45 international currencies."
    }
  ],
  timeline: [
    { step: 1, title: "Discovery & System Architecture", description: "Comprehensive stakeholder workshops, technical specification drafting, and database schema modeling." },
    { step: 2, title: "Core Infrastructure & Backend APIs", description: "Setting up secure multi-tenant database clusters, Django REST endpoints, and authentication microservices." },
    { step: 3, title: "Sprint Build & UI Integration", description: "Iterative frontend development using React, integrating design system tokens and high-performance charts." },
    { step: 4, title: "Rigorous QA & Security Auditing", description: "Automated end-to-end testing, penetration testing, and load testing simulating 100k concurrent users." },
    { step: 5, title: "Global Deployment & Handover", description: "Zero-downtime production deployment on AWS with comprehensive team training and documentation." }
  ],
  mockups: {
    main: "https://lh3.googleusercontent.com/aida-public/AB6AXuDvTBvSIh94k9W5BnWIovCo8Qsm70oRcJgPZSyqxcvN3M5hDbFgTsKZi0QLmTtWXiZ7_O4okae1RLesgLlZ3_BLT8VVXs5OYORco1WelXfb9z_ubtZDhvG8zz6t5cXfKjNvBCFnMBd2V8Gm4dQu6oh4INx8Xu9gyaXkJ4v8RBgfzxSZEO3048zWITCcAU8y8vjCyJvXSt3Ug_CE9T7tLqkRrfisErJCJSLavWSnhhCCI_-iig0A1f4t",
    inventory: "https://lh3.googleusercontent.com/aida-public/AB6AXuDvlr2BTEUTu8SvWdbrE0yWbBqaLJ8OX3YUCRutt8r26PhKR8jakUews2GVmWPqwiTOBHw3GBSUY6ZPVUVPN505ZPlFUzBn59GdWLnHoi8GYnDW9jFFiBOm4iPOKurJPopEFx-3o434Kk1sr00Gf9d65XnePmf5J-Z47Pd3m6M7qrsLc1rNDmgarguoXOzmBwmfB-PZayvY_1alypj2drINkfHpLC0Bzzm7I9cmhiI8i7t_TM3O8OJh",
    settings: "https://lh3.googleusercontent.com/aida-public/AB6AXuCufADqSHisFX612ojBg6uzUHJVWFl8vM2UQx5TyXi-23toCM7luWr61hTu13dukFNFiSr65mUVQFhc0N-U9KBPyFOU8P7Yj8PyvM3qyqlpKVUWknsdqxebfeJt7rthD-ZfHHNTSmYiYb7VA3DA-nHFm0ys5HjZtdk1PHjhDBkT-7xVJHn6UiSHEk5JZbw6PT3a-f-_ihMc6XTmujBiMGqjO2RdpaAzitop7gEOKLSO3D-UwndI3D4v"
  },
  quantifiableResults: [
    { value: "40%", label: "Reduction in operational overhead" },
    { value: "99.99%", label: "Platform uptime achieved" },
    { value: "3.5x", label: "Faster transaction processing" }
  ],
  sidebar: {
    industry: "Enterprise SaaS & Logistics",
    duration: "12 Weeks",
    team: "6 Engineers, 2 UI/UX Designers, 1 DevOps",
    stack: ["React", "Python", "Django", "PostgreSQL", "Docker"]
  }
};

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "alexander-vance",
    name: "Alexander Vance",
    role: "CEO & Founder",
    bio: "Former principal architect with 15+ years scaling distributed systems for global enterprises. Passionate about high-performance software architecture.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAZr09q13h5UC3vv6rI1ebZ1OlIHD29cm_HDCKV_t5F2Kgymtkno4ADmtpgO72aZIVVFTmjkQFa1QnOT8Tcmo0Ymix1vfRYWSTPeU_wt31XIn0aRE-NDKS8FhmtkkjRoe1ZE-ym4Ihhj1-UvCQ3bID_mSHeULFYShbDAmOwD-KplRIz3BGKd8zfW9_Vn6I-KIBPYfNP322iSkuE1hrIa4E7ijulRR_EEvaQq7XtamMYXkefSRH5gktT",
    socials: { linkedin: "https://linkedin.com", github: "https://github.com" },
    skills: [
      { name: "Distributed Systems", level: "Master", percentage: 98, years: "15+ Yrs" },
      { name: "Cloud Architecture", level: "Master", percentage: 96, years: "14+ Yrs" },
      { name: "Kubernetes / Go", level: "Expert", percentage: 92, years: "10+ Yrs" },
      { name: "Zero-Trust Security", level: "Expert", percentage: 94, years: "12+ Yrs" }
    ]
  },
  {
    id: "elena-rostova",
    name: "Elena Rostova",
    role: "Head of Engineering",
    bio: "Passionate about robust software architectures, high test coverage, and elite developer mentorship with deep experience in distributed systems.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB9LyKORCVVO0-q_8XPr0mVu9RhTH8E1xa-xOBp7uv39mKC1qbdNvORGKQce4TINsUcTftIrgLae8Wdy2-wBDTHRoUTxutAo3CoFmMpZ_EJTB5oSZ0aA63px8GlCF-OGbHbB7q9WostnVVO3RMHCAPFjAvPjBEOSHK7JSpcFt9GZoZKwHhkLoKReU79lm-EDTsKADuDxwuPgwL39f9uLBcDzktehK2iov6Ux5KrbCNVUqfaJmeRbX-Q",
    socials: { linkedin: "https://linkedin.com", github: "https://github.com" },
    skills: [
      { name: "System Scalability", level: "Master", percentage: 97, years: "12+ Yrs" },
      { name: "Microservices", level: "Master", percentage: 95, years: "11+ Yrs" },
      { name: "DevOps & CI/CD", level: "Expert", percentage: 93, years: "9+ Yrs" },
      { name: "TypeScript / Node", level: "Expert", percentage: 91, years: "8+ Yrs" }
    ]
  },
  {
    id: "marcus-chen",
    name: "Marcus Chen",
    role: "VP of Product",
    bio: "Bridging complex user requirements with clean, intuitive, and high-performance digital experiences across web and mobile platforms.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA_4Q8VWC2ycOfN8if8zM4OsVsTcyHGoO1NAjOrJbF7pKQw0yevIYmXn_rSOPKRkWARNAzzXk3DBYTwTmojs2QVQMz1yJePhGx1gorKp0GJMrXJdPyc7UQ75p-RpNvPixTSZhJlTqI_NiB_ts5g_boctzk3kb293JP7yeqCfYdKF3aF_QzWIqv2cOytcKfNOTmR1xQw2OvSgmCsUvkSC9Fup3LJjXJby4CnS3M_NOlsXbdtXH0569Zg",
    socials: { linkedin: "https://linkedin.com", github: "https://github.com" },
    skills: [
      { name: "Product Strategy", level: "Master", percentage: 96, years: "11+ Yrs" },
      { name: "Design Systems", level: "Master", percentage: 94, years: "10+ Yrs" },
      { name: "UI/UX Architecture", level: "Expert", percentage: 92, years: "8+ Yrs" },
      { name: "Agile Scrums", level: "Expert", percentage: 90, years: "9+ Yrs" }
    ]
  },
  {
    id: "sarah-jenkins",
    name: "Sarah Jenkins",
    role: "Lead Solutions Architect",
    bio: "Specialist in cloud-native microservices, serverless infrastructure, and bulletproof security protocols for high-concurrency enterprise workloads.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBN_yRrsynH_pAMY7iiAQxbVq-vuD_xgLFWz-dcnSOD3LY9WL7Fd_Rn4tZ5r5eQX3C6p6gC5EJqJuwR9GmygD53OgJd9F0updL247bvZNxJvk6EzGDRx9J8iaj4yf-G-7857m8L9Yus-3HAnoiu1eE9bRNeHsIvh5lALVXk-3dgHqeNFQ2v2uCZcpWw_YQBbEnF_d69wCJf04zboRTo-Mt-eq5WyZZBumjEWM7bVWlVyY6hib3FIxeF",
    socials: { linkedin: "https://linkedin.com", github: "https://github.com" },
    skills: [
      { name: "AWS & Multi-Cloud", level: "Master", percentage: 98, years: "11+ Yrs" },
      { name: "Terraform & IaC", level: "Master", percentage: 95, years: "8+ Yrs" },
      { name: "Serverless Mesh", level: "Expert", percentage: 93, years: "7+ Yrs" },
      { name: "SOC2 Compliance", level: "Expert", percentage: 94, years: "9+ Yrs" }
    ]
  },
  {
    id: "marcus-thorne",
    name: "Marcus Thorne",
    role: "Senior Python Developer",
    bio: "Architecting resilient backend systems, scalable microservices, and high-throughput data processing pipelines with uncompromising precision.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAZw0u_CBVqGLG44LP8CSeE-sW6m6jKSV6C3js4gNIkzaiX12dFyNXxhdzDExx6Cs1oh-Lsun73YDc9VK1cLT61E-JrSgF2TrnTYvp_rA9Kd_MyUyYsa89hRPGzsw9q7G5oSNyCZ_ukbpRAoIefIaKmVSILctElBoVLluFRatjXadT24YahOqzF6cLb0DIRKc8gXaCkEanv_25AkC6LF8448PID9M78USv29e2vodUH6Pk2zfhAX69K",
    socials: { linkedin: "https://linkedin.com", github: "https://github.com" },
    skills: [
      { name: "Python / FastAPI", level: "Master", percentage: 97, years: "10+ Yrs" },
      { name: "Data Pipelines", level: "Expert", percentage: 94, years: "8+ Yrs" },
      { name: "PostgreSQL & Redis", level: "Expert", percentage: 92, years: "9+ Yrs" },
      { name: "Docker & Celery", level: "Senior", percentage: 89, years: "7+ Yrs" }
    ]
  },
  {
    id: "aisha-lin",
    name: "Aisha Lin",
    role: "Full-Stack React Developer",
    bio: "Specializing in fluid user interfaces, responsive design systems, and robust state management for enterprise web applications.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB3CUuJpzASNaGyeC0bCCMODxWlXJ0vDwaUHP2dsMHa7x64NnZuFm96wFu6EPwenoLjMmLj4go5xNaf1qRRslVSG5aKuoK4rnQhSFNw5ceaCD7abMXZzwSeseTo99X5p4BB6LqdMHDqseriymWURblAt7SgQijwD5Xzi9TZKUh9kNlgD5Fo9-5gx6q7Jr7ABc3Hvy0kwXZePq2fUlK6UeHPHnf_vqicsEu_THCyZV-ErMPujfnqQroM",
    socials: { linkedin: "https://linkedin.com", github: "https://github.com" },
    skills: [
      { name: "React 19 & Next.js", level: "Master", percentage: 96, years: "8+ Yrs" },
      { name: "TypeScript Core", level: "Master", percentage: 95, years: "8+ Yrs" },
      { name: "Tailwind & Motion", level: "Expert", percentage: 93, years: "6+ Yrs" },
      { name: "GraphQL & REST", level: "Senior", percentage: 90, years: "7+ Yrs" }
    ]
  }
];

export const JOBS: JobItem[] = [
  {
    id: "job-python",
    title: "Python Developer",
    type: "Full-Time",
    location: "Remote / SF",
    experience: "3-5 Years",
    skills: ["Python", "Django", "FastAPI", "AWS"],
    department: "Engineering",
    description: "Lead the development of scalable microservices, event-driven pipelines, and relational database schemas supporting high-frequency business platforms."
  },
  {
    id: "job-react",
    title: "React Developer",
    type: "Full-Time",
    location: "Remote",
    experience: "3+ Years",
    skills: ["React", "Next.js", "TypeScript", "Tailwind"],
    department: "Engineering",
    description: "Build delightful, pixel-perfect user interfaces, integrate real-time WebSockets, and maintain enterprise design system components."
  },
  {
    id: "job-uiux",
    title: "UI/UX Designer",
    type: "Full-Time",
    location: "New York / Remote",
    experience: "4+ Years",
    skills: ["Figma", "Design Systems", "User Research"],
    department: "Design",
    description: "Architect intuitive dashboards, conduct user testing sessions, and turn complex multi-tenant workflows into clear human experiences."
  },
  {
    id: "job-bde",
    title: "Business Development Executive",
    type: "Full-Time",
    location: "San Francisco",
    experience: "2-4 Years",
    skills: ["B2B Sales", "SaaS", "CRM"],
    department: "Sales & Growth",
    description: "Partner with enterprise clients, understand technical needs, and match them with dedicated software engineering squads."
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "multi-tenant-arch",
    title: "Building Resilient Multi-Tenant Architectures with Django and React",
    category: "AI & Architecture",
    date: "October 14, 2026",
    author: "Dr. Elena Vance",
    authorRole: "Chief Systems Architect",
    authorAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDVZGfJKrmUvdrYNGT-lEWX1ze_Vii9kuyu7DmUUOZPZNgAOFH_EVWxTA25jdZIz1d8TtjD3W0Aq03nw0JYVNGZTnxJXwCfTA5YDCRQa8CC8F9zCS4UincSngMwj-xeEvKD42LxzpFAl6kOqTKSS3_E9ddQi_OQNRMclkVwwgSaSFenB096G9rb6lkhrc5MlA2TEM6BBdykLXN2hb1fUv7zUbvAYJWpIQ9lf-qvi__-2c9v8w7jrKuC",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCrCQsqC3VAtxNOXp80LRuIeGLFUBCl2sFEoKtnC2yVmFSHaNmUNUvVk6FJfZN4Sw6h0D0tr648NXEqM8GD5ikm7w3ZhBUikfBZzY9ZG2JU8w-CjhyOxfjSbxEfcI7vHfZfanFhqGzdfL7uJtJXXpk7Yl_A2pO7CRKEzohKUstb_KsRA7MdeiD0zKATohLOx11H0FGiH-Fl9KCyslEzxCZyCzJSmR-vjcTZtoys0UCUKoeErU4UZ9pq",
    excerpt: "Explore advanced strategies for designing scalable software foundations that seamlessly isolate tenant data while maintaining high throughput and exceptional user experiences."
  },
  {
    id: "edge-cloud-native",
    title: "The Shift to Edge-First Cloud Native Systems",
    category: "Technology",
    date: "Oct 10, 2026",
    author: "Marcus Thorne",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAOab7jeqxNopvfJ7acr9vaM1S4PVWgtYieteyOpVV0KuFU668YaTGiJvAKq01C8ALNLHW1eWOHmwIlDCiNUP1ZtjRolYbxON6WVUW_GYvgGM9NyD6psYHz38hW8WJSxheyLAoi1YBEx9OuWwC9S7jR3CWru-bcCu75mv63M4Xo9pCJGrpE5BInUp7DKu2unmNYtsfcxO4Vr4Tv5pO7cD0hJFjzuJSTS7I7FM41cIu00Q1qTkurbRf9",
    excerpt: "How distributed edge nodes are reducing latency by 70% for real-time enterprise SaaS workflows globally."
  },
  {
    id: "monetizing-dev-tools",
    title: "Monetizing Developer Tools in 2027",
    category: "Business",
    date: "Oct 08, 2026",
    author: "Sarah Jenkins",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAOGINmjdRbdZtTIruf4hXgRAfkBbQcYu2I5xCvIIp_OyC2a-YkzkVsGzrSU_oop3a5jA7Vl-_iu_UUHwvrIdPZ-9CdqLDsIU9dckAOMYNOCxWDcLe6c_ZSnRq-kWef9NmUyMUpaEZI2PZX5o-_9BLSPhXEVsU8mhTaFWbAOyIavGOBn0hzpFFDvSd2mlg14t9qQE8pXS69mC8yZ7DTwB48SHzsUfcEqWaIIpaOco7nTSXvucbQoDRx",
    excerpt: "A deep dive into pricing models, consumption-based billing, and land-and-expand strategies for B2B tech startups."
  },
  {
    id: "finetuning-llms",
    title: "Fine-Tuning Open Source LLMs for Production",
    category: "AI",
    date: "Oct 04, 2026",
    author: "Alex Rivers",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCwI-kfxUa2f1rTABfd7rJouaVpplVDpXWoNAYnBbUxfhe_OwD6rHMPKhBvCOsvtvydihpgx_O7LpeQITYb31DAH4L6W_mjzSFDiKTvMVGGpHf9Cua0iMCx6wReWnwqhjog4Oo1S66xfMvDPn8V5wTTe6n1lRMD9te8vWajKd5jjJHyfNAPQqdnhrE6LHpjqqjzQqjRuj7q98VD-Zn3WqfaNY2TCkvn8IEkavngR8JyR_z1wLFGn7vE",
    excerpt: "Practical guardrails, quantization techniques, and dataset curation pipelines for domain-specific language models."
  },
  {
    id: "typescript-patterns",
    title: "Advanced TypeScript Patterns for Robust APIs",
    category: "Development",
    date: "Sep 29, 2026",
    author: "David Chen",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD88jzllvkgCPy8_0AVBWNY3n2SRfTQTr-UUXZtcGRVvCXgjKA_s_qqglFpYL_mo0yajBaxTgNUqFxCOdC0Bb3bB8e9kr3JzeFV4rAo9QwFaWmlfNsf3024cCXz4l3CJkgXGpS0XzuC7LwP7qgD_sArrq1gyo6TLgpQRrIIYzgY-UzwC2A3hCv6wx44YNa_G0iW3LlyXZKMmIx-8W0D8wDXzf4Aq6401Ntps1To5Rl6C-_rWOSLhmW1",
    excerpt: "Leveraging conditional types, template literal types, and branded primitives for bulletproof compile-time safety."
  },
  {
    id: "figma-code-tokens",
    title: "Bridging Figma and Code Token Synchronisation",
    category: "Design",
    date: "Sep 24, 2026",
    author: "Clara Dupont",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAShEbi0d2cHgy6pNgBgYizyxsDbfgLMA8Zz-zAVhJ6qQUcUpPS1vU-PTEAPnaD38Is7ChsuHkLmD-CBXn4OITlrI0CGPGa82hIvGyKKloWewzJoU69jDiZNgSiDCys5YffXN6_gNlCRcVQmiNeLJAMGEvEChycg0chX4UMHTLARzZWj_F81tairCThN6ZBCFfWUvJX40_GeulBEiawXmQU5Fedx0jkZDeFE6z0qJqbFmYL2_UxQBUv",
    excerpt: "Automating design token pipelines to keep multi-brand enterprise component libraries perpetually aligned."
  },
  {
    id: "seed-to-series-a",
    title: "From Seed to Series A: Engineering Milestones",
    category: "Startup",
    date: "Sep 19, 2026",
    author: "Jonathan Hayes",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA3tscHEhptbmPW5qVjP56mPMsglU6YOhBNXst7zDWyabmiw3HtyL9bL7CYfjqqeuBbHVWG7dB2bqDiDjEe15_Yf2evZzyspbczZiTJE40r21kh2Kv5HPwMjpdwV4v1Gd-zPv1UmIk0FUNhY3rLnEH-dyRA8TAykKtTfFYCrcYg9IRgYiuE1U637WPIta3ztPon4rZ88YSmqL27Guo8jEHfGS6BUWDgnYGNGs0RKPDmc8niEnSI-cmL",
    excerpt: "What technical due diligence investors look for when evaluating high-growth software startups."
  }
];

export const TESTIMONIALS = [
  {
    initials: "JD",
    quote: "Sudora delivered our core banking API three weeks ahead of schedule. The engineering caliber is truly unmatched.",
    name: "Jonathan Davis",
    role: "CTO, FinTech Global"
  },
  {
    initials: "SM",
    quote: "Finding specialized React and Python freelancers used to take months. With Sudora, we onboarded top-tier talent in 48 hours.",
    name: "Sarah Miller",
    role: "VP of Engineering, SaaSify"
  },
  {
    initials: "AR",
    quote: "The transparency, escrow security, and quality of work make Sudora an essential partner for our digital agency.",
    name: "Alex Rivera",
    role: "Founder, Vortex Labs"
  }
];
