import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  ServiceItem,
  ProjectItem,
  JobItem,
  BlogPost,
  TeamMember,
  LeadInquiry,
  CmsSettings,
  UserAccount,
  UserProfile,
  SkillItem,
  ExperienceItem,
  EducationItem,
  TalentProjectItem,
  ReviewItem
} from '../types';
import {
  SERVICES as INITIAL_SERVICES,
  PROJECTS as INITIAL_PROJECTS,
  JOBS as INITIAL_JOBS,
  BLOG_POSTS as INITIAL_BLOG_POSTS,
  TEAM_MEMBERS as INITIAL_TEAM_MEMBERS
} from '../data/mockData';

const INITIAL_USERS: UserAccount[] = [
  {
    id: 'usr-admin-1',
    name: 'Alex Morgan',
    email: 'admin@sudora.io',
    role: 'admin',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCm1Q_E5cFFxeWj-2h8G4N3RzyHWHgOPjB-2qWRn9hMnhwPHJIF7F7T2Or_5Oq4l8ocu6N6rtO_BSbMyUQ7xUDTSs7QWlZlcfIDhgsaw8DxDisNNsrIl9DFPf8FaplhVs161-cI06d4YlvKgjToGxHfu8oLZdJXEQgFm4amb_jBC7OeuZcQs_GMhxv4cip69B-J-88bThcok5NP-mMRyCjG9Aogbg7S2TQSgSZq_opbFcQ7hfeeBYnA',
    company: 'Sudora HQ',
    title: 'Enterprise Admin',
    createdAt: '2023-01-15',
    status: 'active'
  },
  {
    id: 'usr-client-1',
    name: 'Clara Montgomery',
    email: 'clara@nexuscorp.com',
    role: 'client',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB7gCAzN5hcxCM8Z11LVVIlHlwFOC93ABFbGbKqbIYhMWhoXztn2gwZFlHJU9tYY-TL5zq7os8Cq25QCxqKt1u9SaB_XTpnSlEYl0-EUyRIpqGpwna0FaaVpOPqzkceeXaGaeC_rtri9xzjynESUW5ygpNa94D5RzHXQY1a3xQe2fwdfRXtif3_KPT78qahaSOO2Q__h0wxRkc3xDQNza1C5t_7q0WhCVPPMY5GHhP7k3dRXPv2PKff',
    company: 'NexusCorp Global',
    title: 'VP of Digital Products',
    createdAt: '2023-11-02',
    status: 'active'
  },
  {
    id: 'usr-talent-1',
    name: 'Jonathan Sterling',
    email: 'j.sterling@enterprise.io',
    role: 'freelancer',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCMkZggjyLIbf7yBK5HdbkjJknhcLMFR3SxBgCTS1Sarc3wMDPONo1O2PWuvVevkRsuH-CNVmR1o6ThH3aFiDa3jxT28IxW6c4lofJ9FgY5z5iG1HULppGW0NdSaIk8vzgp1YrzsG0-6C2FrsnuBlGYNTI7uDUGn6fsD1Zu5TAKpf-0DXj-tJDF6FtawOQ2geEeHn4VHuD6g0oXK_ccR-FSHvo8fQ0Am-vs6wmaAjz_9t1jqW-4mHki',
    company: 'Distributed Systems Lab',
    title: 'Staff Cloud Architect',
    createdAt: '2023-10-14',
    status: 'active'
  }
];

const INITIAL_USER_PROFILE: UserProfile = {
  name: 'Alex Morgan',
  title: 'Principal Distributed Systems & Cloud Architect',
  email: 'alex.morgan@startupplat.io',
  phone: '+1 (415) 890-2341',
  location: 'San Francisco, CA (Remote available)',
  avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCm1Q_E5cFFxeWj-2h8G4N3RzyHWHgOPjB-2qWRn9hMnhwPHJIF7F7T2Or_5Oq4l8ocu6N6rtO_BSbMyUQ7xUDTSs7QWlZlcfIDhgsaw8DxDisNNsrIl9DFPf8FaplhVs161-cI06d4YlvKgjToGxHfu8oLZdJXEQgFm4amb_jBC7OeuZcQs_GMhxv4cip69B-J-88bThcok5NP-mMRyCjG9Aogbg7S2TQSgSZq_opbFcQ7hfeeBYnA',
  coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA7107jGX5Nfpw3DtPygEjLi_aHLK6W03OdmQYwiQ-Ye4iHms8QWaNLXMOCgmJEFDh6yWN7kQ6cuGlWAoIAj5uUvg8YCzxeP614sAi-GpnwGb908rvpk5J5yLZev9ABmWWGO276qwZ8NpfmI-jCDN6v3sr6KhYrbzyuQrGCD3XSEPQNb2sEfMMhQTyx5qStzZwx8QNCyC0x_U3PIA4ETYrnMGGRxTsGVmprQvW0wRwFn8eE_Zb4uYGx',
  hourlyRate: 175,
  jobSuccessScore: 100,
  completedProjects: 38,
  totalExperience: '12+ Years',
  availability: 'Available for Q3 contracts',
  specialization: 'Distributed Systems & Cloud Native Architecture',
  methodology: 'Domain-Driven Design (DDD) & Zero-Trust',
  languages: 'English (Native), German (Professional)',
  clearance: 'SOC2 Type II / GDPR Compliant',
  responseTime: '< 2 hours',
  weeklyAvailability: '40 hrs / week',
  contractType: 'W2 / C2C / Direct Enterprise',
  timezone: 'PST (UTC-8)',
  bio: 'Principal Distributed Systems and Cloud Architect with over 12 years of hands-on experience designing, building, and scaling mission-critical microservices and event-driven architectures for Fortune 500 enterprises. Recognized for deep expertise in high-throughput data processing, Kubernetes orchestration, and multi-region AWS cloud migrations. Passionate about engineering velocity, zero-trust security models, and mentoring cross-functional engineering teams.',
  skills: [
    { id: 'sk-1', name: 'AWS (Advanced)', category: 'Cloud & Infrastructure', level: 'Expert' },
    { id: 'sk-2', name: 'Kubernetes', category: 'Cloud & Infrastructure', level: 'Expert' },
    { id: 'sk-3', name: 'Docker', category: 'Cloud & Infrastructure', level: 'Expert' },
    { id: 'sk-4', name: 'Terraform', category: 'Cloud & Infrastructure', level: 'Advanced' },
    { id: 'sk-5', name: 'Google Cloud Platform', category: 'Cloud & Infrastructure', level: 'Advanced' },
    { id: 'sk-6', name: 'Go (Golang)', category: 'Languages & Runtimes', level: 'Expert' },
    { id: 'sk-7', name: 'TypeScript', category: 'Languages & Runtimes', level: 'Expert' },
    { id: 'sk-8', name: 'Python', category: 'Languages & Runtimes', level: 'Advanced' },
    { id: 'sk-9', name: 'Rust', category: 'Languages & Runtimes', level: 'Intermediate' },
    { id: 'sk-10', name: 'Kafka', category: 'Data & Messaging', level: 'Expert' },
    { id: 'sk-11', name: 'PostgreSQL', category: 'Data & Messaging', level: 'Expert' },
    { id: 'sk-12', name: 'Redis', category: 'Data & Messaging', level: 'Advanced' },
    { id: 'sk-13', name: 'React & Next.js', category: 'Frontend & Mobile', level: 'Advanced' },
    { id: 'sk-14', name: 'CI/CD & GitOps', category: 'DevOps & Security', level: 'Expert' },
  ],
  experiences: [
    {
      id: 'exp-1',
      role: 'Principal Cloud Architect',
      company: 'StellarScale Technologies',
      location: 'San Francisco, CA',
      period: '2021 - Present',
      description: 'Leading a distributed engineering organization of 35+ developers across 3 continents. Architected multi-region Kubernetes clusters handling over 4.5 billion daily requests with 99.999% uptime SLA. Reduced cloud infrastructure expenditure by 34% through automated spot instance scheduling and FinOps audits.'
    },
    {
      id: 'exp-2',
      role: 'Lead Backend Systems Engineer',
      company: 'OmniCorp Financial Systems',
      location: 'New York, NY',
      period: '2017 - 2021',
      description: 'Spearheaded migration of monolithic ledger service to event-driven Go microservices using Apache Kafka. Designed secure API gateways conforming to banking regulations and PCI-DSS Level 1 compliance standards.'
    },
    {
      id: 'exp-3',
      role: 'Senior Software Engineer',
      company: 'Apex Data Solutions',
      location: 'Seattle, WA',
      period: '2013 - 2017',
      description: 'Developed high-performance ingestion pipelines in Python and Node.js. Implemented automated CI/CD deployment pipelines using Jenkins and Docker, cutting release cycle times from 2 weeks to under 30 minutes.'
    }
  ],
  education: [
    {
      id: 'edu-1',
      degree: 'Master of Science in Computer Science',
      institution: 'Stanford University',
      period: '2009 - 2013',
      details: 'Specialized in Distributed Systems, Operating Systems Architecture, and Cryptographic Protocols. Graduated with honors (GPA: 3.92/4.0).'
    },
    {
      id: 'edu-2',
      degree: 'Bachelor of Science in Electrical Engineering',
      institution: 'University of California, Berkeley',
      period: '2005 - 2009',
      details: 'Focus on embedded systems and signal processing. Dean\'s Honor List all semesters. Capstone project featured in IEEE student journal.'
    }
  ],
  projects: [
    {
      id: 'proj-1',
      title: 'Global Multi-Cloud Mesh Orchestrator',
      description: 'Architected and delivered a zero-trust cross-cloud service mesh connecting 500+ microservices across AWS, GCP, and Azure with end-to-end mutual TLS encryption.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuASX8pDX0swP3GX8-yPmlouUYuFBqPOuhOtV4Nnw46xQ18M1W1Qno3KBID3N9AX7AlZnigtKd-VWOelhCKKCWSfyzBELNAldLE1-bpzmvL0r3mQ2jOZPib7533ANF-pxiEuD3DHyoBPFnaB1EjbcSosOCMpADXpq4nDXRkHRiG4gonTbPZPOyTNS0T4SKBo1PdhcmBpXU9t4h6LOUiQgPuzU5-w5kVtbNvkYD4bu_CN5qCrLs8CuWKf',
      technologies: ['Go', 'Istio', 'Kubernetes', 'Terraform'],
      liveUrl: 'https://github.com/stellarscale/cloud-mesh'
    },
    {
      id: 'proj-2',
      title: 'Real-Time Ledger & Settlement Engine',
      description: 'Designed a high-throughput ledger processing 100k transactions per second with sub-millisecond persistence guarantees utilizing Apache Kafka and PostgreSQL.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA7hdEWEsD8HPxK0rFRMk8qQNS2TtKZAR6ok4NIYtHf5KGEkl5doghDErCaADMTzKRF76NcnV-SyfisexisVb4M2hkQS6RIGkMM6GunekfSn2X4Ua45N7Mi5mDL-8lXSD7yslKokp7c9pzvi5UBGkptCdk6C_P4aTBxaHfwts9CfwYCWlM42PluFBQlynujlf9GXxd-u9dZuvC85pEp8zOkmzib48WHdv2h8Bubvbgxk7jirVtSLw8o',
      technologies: ['Rust', 'Kafka', 'PostgreSQL', 'Docker'],
      liveUrl: 'https://github.com/omnicorp/fast-ledger'
    }
  ],
  reviews: [
    {
      id: 'rev-1',
      author: 'Jonathan Vance',
      role: 'VP of Engineering at FinTech Global',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB_0oddsrGFWapW2pty_xC_yVyC-fLIE62m9DwLklCzwHU2BHW14lzQ1NbGlDRMoPTD3ZnhqXCREz-OG0T6rlt_V1PA4XRp-NxvxFbl3WSj_c3fiFumcLMryHl_8QQorhW27U5ELOAYRa09r8WP6NzwZEhV2Dn1KfL1AI8KA4CONYRv7QC2dXrownGM5IvteG99EyYQWaXkmqvutPrCvvTWgBLu-_9h1dRx7H3lCxjafuJLRP5V0-fM',
      rating: 5,
      comment: 'Alex is an absolute powerhouse of architectural talent. He took over our complex cloud migration project and delivered ahead of schedule with zero production downtime. Exceptional communicator and technical leader.',
      project: 'Cloud Infrastructure Overhaul',
      date: '2 months ago'
    },
    {
      id: 'rev-2',
      author: 'Sarah Jenkins',
      role: 'CTO at HealthCloud Systems',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC98VV0qE4lcYPh_9_S9OK5aeJOITMmf5iyagtFexpUBBdC_7SSAQ-o39FpB_B_NQ6I4DDdlhhrZ44jSuZb4GsA0EM2yeVmUx8KTOu5SYpGwjqcLAzkLDRxhCGwWxnIlbeBH69lCJcJIZ13mxc_2VX4TcTsK53VtmzwDrTl0796bjCqI7sH9-h6keGjneS8zuRxuszeFkzmLL1hQFzH2Nfln78tsW6zRFkIg9W0GE3X_-Ycjs66yuqe',
      rating: 5,
      comment: 'Working with Alex was a game-changer for our scale-up. His rigorous approach to code quality, security compliance, and mentorship elevated our entire engineering team. Look forward to future collaborations.',
      project: 'HIPAA Compliant Kubernetes Migration',
      date: '6 months ago'
    }
  ]
};

const INITIAL_INQUIRIES: LeadInquiry[] = [
  {
    id: 'inq-101',
    name: 'Michael Chang',
    email: 'm.chang@fintechpulse.io',
    company: 'FinTech Pulse Inc.',
    service: 'Web Development',
    budget: '$25k - $50k',
    message: 'Looking for a dedicated React 19 / TypeScript team to migrate our legacy web application.',
    date: '2 hours ago',
    status: 'New'
  },
  {
    id: 'inq-102',
    name: 'Sarah Connor',
    email: 's.connor@cyberdefense.net',
    company: 'CyberDefense Global',
    service: 'Cybersecurity Audit',
    budget: '$50k - $100k',
    message: 'Need complete SOC2 compliance and zero-trust cloud infrastructure audit for AWS clusters.',
    date: 'Yesterday',
    status: 'In Discussion'
  },
  {
    id: 'inq-103',
    name: 'David O\'Reilly',
    email: 'david@healthai.tech',
    company: 'HealthAI Labs',
    service: 'AI & Automation',
    budget: '$30k - $60k',
    message: 'Seeking computer vision and LLM pipeline engineering for clinical data extraction.',
    date: '3 days ago',
    status: 'Proposal Sent'
  }
];

const INITIAL_OFFICE_HUBS = [
  {
    id: 'hub-sf',
    name: 'Silicon Valley Global Headquarters',
    city: 'San Francisco, CA',
    country: 'United States',
    badge: 'Flagship Tech Campus',
    image: '/src/assets/images/tech_campus_hq_1791383133762.jpg',
    address: '500 Howard Street, Suite 1200, San Francisco, CA 94105',
    specs: ['Architectural Glass Atrium', 'Core Distributed Systems Labs', '24/7 Redundant Fiber Uplink'],
    capacity: '320+ Senior Engineers'
  },
  {
    id: 'hub-studio',
    name: 'Creative Software Engineering Studio',
    city: 'New York & Remote',
    country: 'United States',
    badge: 'Agile Product Studio',
    image: '/src/assets/images/creative_dev_studio_1791383145874.jpg',
    address: '450 West 33rd St, Manhattan High Line, NY 10001',
    specs: ['Dual-Curved 4K Workstations', 'Rapid Prototyping War Rooms', 'Ergonomic Standing Pods'],
    capacity: '200+ Developers'
  },
  {
    id: 'hub-ai-lab',
    name: 'Advanced AI & Deep Tech Research Hub',
    city: 'London & Cambridge',
    country: 'United Kingdom',
    badge: 'AI Innovation Lab',
    image: '/src/assets/images/ai_research_lab_1791383156822.jpg',
    address: '14 Bonhill St, Shoreditch Tech City, London EC2A 4BX',
    specs: ['Interactive Smartboards', 'Secure GPU Compute Clusters', 'Cross-Border Architecture Deck'],
    capacity: '180+ Specialists'
  },
  {
    id: 'hub-skyline',
    name: 'Executive Skyline Technology Center',
    city: 'Singapore & Zurich',
    country: 'Global Executive',
    badge: 'Enterprise Architecture & Cloud',
    image: '/src/assets/images/executive_skyline_hub_1791383167599.jpg',
    address: '8 Marina View, Asia Square Tower 1 & Zurich Penthouse',
    specs: ['Panoramic Skyline Views', 'SOC2 / ISO 27001 Secure Vaults', 'Executive Briefing Suites'],
    capacity: '150+ Cloud Architects'
  }
];

const INITIAL_CMS: CmsSettings = {
  heroHeadline: 'Build Better. Hire Smarter. Grow Faster.',
  heroSubtitle: 'Empower your business with elite software engineering teams and top-tier freelance talent for scalable digital solutions.',
  heroImage: '/src/assets/images/modern_office_hero_1791382633750.jpg',
  heroBadge: 'Elite Software Engineering & Freelance Marketplace',
  successRate: '99.8%',
  engineersCount: '10k+',
  countriesCount: '45+',
  announcementText: 'Elite Software Engineering & Freelance Marketplace',
  missionTitle: 'Engineering the Next Generation of Digital Scale',
  missionDesc: 'We bridge top-tier software architects and elite verified freelance engineers directly with fast-growing enterprises, eliminating hiring friction.',
  officeHubs: INITIAL_OFFICE_HUBS
};

interface AppContextType {
  services: ServiceItem[];
  addService: (service: ServiceItem) => void;
  updateService: (id: string, service: Partial<ServiceItem>) => void;
  deleteService: (id: string) => void;

  projects: ProjectItem[];
  addProject: (project: ProjectItem) => void;
  updateProject: (id: string, project: Partial<ProjectItem>) => void;
  deleteProject: (id: string) => void;

  jobs: JobItem[];
  addJob: (job: JobItem) => void;
  updateJob: (id: string, job: Partial<JobItem>) => void;
  deleteJob: (id: string) => void;

  blogPosts: BlogPost[];
  addBlogPost: (post: BlogPost) => void;
  updateBlogPost: (id: string, post: Partial<BlogPost>) => void;
  deleteBlogPost: (id: string) => void;

  teamMembers: TeamMember[];
  addTeamMember: (member: TeamMember) => void;
  updateTeamMember: (id: string, member: Partial<TeamMember>) => void;
  deleteTeamMember: (id: string) => void;

  inquiries: LeadInquiry[];
  addInquiry: (inquiry: Omit<LeadInquiry, 'id' | 'date' | 'status'>) => void;
  updateInquiryStatus: (id: string, status: LeadInquiry['status']) => void;
  deleteInquiry: (id: string) => void;

  cmsSettings: CmsSettings;
  updateCmsSettings: (settings: Partial<CmsSettings>) => void;

  // Enterprise Users Directory (CMS)
  users: UserAccount[];
  updateUserStatus: (id: string, status: UserAccount['status']) => void;
  addUser: (user: UserAccount) => void;
  deleteUser: (id: string) => void;

  // Talent / User Profile CRUD
  userProfile: UserProfile;
  updateUserProfile: (profile: Partial<UserProfile>) => void;
  resetUserProfile: () => void;
  addSkill: (skill: Omit<SkillItem, 'id'>) => void;
  updateSkill: (id: string, skill: Partial<SkillItem>) => void;
  deleteSkill: (id: string) => void;
  addExperience: (exp: Omit<ExperienceItem, 'id'>) => void;
  updateExperience: (id: string, exp: Partial<ExperienceItem>) => void;
  deleteExperience: (id: string) => void;
  addEducation: (edu: Omit<EducationItem, 'id'>) => void;
  updateEducation: (id: string, edu: Partial<EducationItem>) => void;
  deleteEducation: (id: string) => void;
  addProfileProject: (proj: Omit<TalentProjectItem, 'id'>) => void;
  updateProfileProject: (id: string, proj: Partial<TalentProjectItem>) => void;
  deleteProfileProject: (id: string) => void;
  addReview: (review: Omit<ReviewItem, 'id' | 'date'>) => void;
  updateReview: (id: string, review: Partial<ReviewItem>) => void;
  deleteReview: (id: string) => void;

  resetToDefaults: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [services, setServices] = useState<ServiceItem[]>(() => {
    try {
      const saved = localStorage.getItem('sp_admin_services');
      return saved ? JSON.parse(saved) : INITIAL_SERVICES;
    } catch {
      return INITIAL_SERVICES;
    }
  });

  const [projects, setProjects] = useState<ProjectItem[]>(() => {
    try {
      const saved = localStorage.getItem('sp_admin_projects');
      return saved ? JSON.parse(saved) : INITIAL_PROJECTS;
    } catch {
      return INITIAL_PROJECTS;
    }
  });

  const [jobs, setJobs] = useState<JobItem[]>(() => {
    try {
      const saved = localStorage.getItem('sp_admin_jobs');
      return saved ? JSON.parse(saved) : INITIAL_JOBS;
    } catch {
      return INITIAL_JOBS;
    }
  });

  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(() => {
    try {
      const saved = localStorage.getItem('sp_admin_blog');
      return saved ? JSON.parse(saved) : INITIAL_BLOG_POSTS;
    } catch {
      return INITIAL_BLOG_POSTS;
    }
  });

  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(() => {
    try {
      const saved = localStorage.getItem('sp_admin_team');
      if (saved) {
        const parsed: TeamMember[] = JSON.parse(saved);
        return parsed.map((m) => {
          const initial = INITIAL_TEAM_MEMBERS.find((it) => it.id === m.id);
          return {
            ...m,
            skills: m.skills && m.skills.length > 0 ? m.skills : initial?.skills
          };
        });
      }
      return INITIAL_TEAM_MEMBERS;
    } catch {
      return INITIAL_TEAM_MEMBERS;
    }
  });

  const [inquiries, setInquiries] = useState<LeadInquiry[]>(() => {
    try {
      const saved = localStorage.getItem('sp_admin_inquiries');
      return saved ? JSON.parse(saved) : INITIAL_INQUIRIES;
    } catch {
      return INITIAL_INQUIRIES;
    }
  });

  const [cmsSettings, setCmsSettings] = useState<CmsSettings>(() => {
    try {
      const saved = localStorage.getItem('sp_admin_cms');
      if (saved) {
        const parsed = JSON.parse(saved);
        // If saved settings had the previous unwanted text, fallback to restored INITIAL_CMS
        if (parsed.heroHeadline === 'Architecting High-Throughput Systems for High-Growth Enterprises') {
          return INITIAL_CMS;
        }
        return {
          ...INITIAL_CMS,
          ...parsed
        };
      }
      return INITIAL_CMS;
    } catch {
      return INITIAL_CMS;
    }
  });

  const [users, setUsers] = useState<UserAccount[]>(() => {
    try {
      const saved = localStorage.getItem('sp_admin_users');
      return saved ? JSON.parse(saved) : INITIAL_USERS;
    } catch {
      return INITIAL_USERS;
    }
  });

  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem('sp_talent_profile_data');
      return saved ? JSON.parse(saved) : INITIAL_USER_PROFILE;
    } catch {
      return INITIAL_USER_PROFILE;
    }
  });

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('sp_talent_profile_data', JSON.stringify(userProfile));
    } catch {}
  }, [userProfile]);
  useEffect(() => {
    try {
      localStorage.setItem('sp_admin_services', JSON.stringify(services));
    } catch {}
  }, [services]);

  useEffect(() => {
    try {
      localStorage.setItem('sp_admin_projects', JSON.stringify(projects));
    } catch {}
  }, [projects]);

  useEffect(() => {
    try {
      localStorage.setItem('sp_admin_jobs', JSON.stringify(jobs));
    } catch {}
  }, [jobs]);

  useEffect(() => {
    try {
      localStorage.setItem('sp_admin_blog', JSON.stringify(blogPosts));
    } catch {}
  }, [blogPosts]);

  useEffect(() => {
    try {
      localStorage.setItem('sp_admin_team', JSON.stringify(teamMembers));
    } catch {}
  }, [teamMembers]);

  useEffect(() => {
    try {
      localStorage.setItem('sp_admin_inquiries', JSON.stringify(inquiries));
    } catch {}
  }, [inquiries]);

  useEffect(() => {
    try {
      localStorage.setItem('sp_admin_cms', JSON.stringify(cmsSettings));
    } catch {}
  }, [cmsSettings]);

  useEffect(() => {
    try {
      localStorage.setItem('sp_admin_users', JSON.stringify(users));
    } catch {}
  }, [users]);

  // Mutations
  const addService = (service: ServiceItem) => setServices((prev) => [service, ...prev]);
  const updateService = (id: string, updated: Partial<ServiceItem>) =>
    setServices((prev) => prev.map((s) => (s.id === id ? { ...s, ...updated } : s)));
  const deleteService = (id: string) => setServices((prev) => prev.filter((s) => s.id !== id));

  const addProject = (project: ProjectItem) => setProjects((prev) => [project, ...prev]);
  const updateProject = (id: string, updated: Partial<ProjectItem>) =>
    setProjects((prev) => prev.map((p) => (p.id === id ? { ...p, ...updated } : p)));
  const deleteProject = (id: string) => setProjects((prev) => prev.filter((p) => p.id !== id));

  const addJob = (job: JobItem) => setJobs((prev) => [job, ...prev]);
  const updateJob = (id: string, updated: Partial<JobItem>) =>
    setJobs((prev) => prev.map((j) => (j.id === id ? { ...j, ...updated } : j)));
  const deleteJob = (id: string) => setJobs((prev) => prev.filter((j) => j.id !== id));

  const addBlogPost = (post: BlogPost) => setBlogPosts((prev) => [post, ...prev]);
  const updateBlogPost = (id: string, updated: Partial<BlogPost>) =>
    setBlogPosts((prev) => prev.map((b) => (b.id === id ? { ...b, ...updated } : b)));
  const deleteBlogPost = (id: string) => setBlogPosts((prev) => prev.filter((b) => b.id !== id));

  const addTeamMember = (member: TeamMember) => setTeamMembers((prev) => [...prev, member]);
  const updateTeamMember = (id: string, updated: Partial<TeamMember>) =>
    setTeamMembers((prev) => prev.map((m) => (m.id === id ? { ...m, ...updated } : m)));
  const deleteTeamMember = (id: string) => setTeamMembers((prev) => prev.filter((m) => m.id !== id));

  const addInquiry = (inquiry: Omit<LeadInquiry, 'id' | 'date' | 'status'>) => {
    const newInquiry: LeadInquiry = {
      ...inquiry,
      id: `inq-${Date.now()}`,
      date: 'Just now',
      status: 'New'
    };
    setInquiries((prev) => [newInquiry, ...prev]);
  };
  const updateInquiryStatus = (id: string, status: LeadInquiry['status']) =>
    setInquiries((prev) => prev.map((inq) => (inq.id === id ? { ...inq, status } : inq)));
  const deleteInquiry = (id: string) => setInquiries((prev) => prev.filter((inq) => inq.id !== id));

  const updateCmsSettings = (updated: Partial<CmsSettings>) =>
    setCmsSettings((prev) => ({ ...prev, ...updated }));

  // Enterprise Users Management (CMS)
  const updateUserStatus = (id: string, status: UserAccount['status']) => {
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, status } : u)));
  };

  const addUser = (user: UserAccount) => {
    setUsers((prev) => [user, ...prev]);
  };

  const deleteUser = (id: string) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  // User Profile CRUD
  const updateUserProfile = (updated: Partial<UserProfile>) => {
    setUserProfile((prev) => ({ ...prev, ...updated }));
    if (updated.name || updated.avatar || updated.title || updated.email) {
      setUsers((prev) =>
        prev.map((u) =>
          u.id === 'usr-admin-1'
            ? {
                ...u,
                name: updated.name ?? u.name,
                avatar: updated.avatar ?? u.avatar,
                title: updated.title ?? u.title,
                email: updated.email ?? u.email
              }
            : u
        )
      );
    }
  };

  const resetUserProfile = () => {
    setUserProfile(INITIAL_USER_PROFILE);
    localStorage.removeItem('sp_talent_profile_data');
  };

  const addSkill = (skill: Omit<SkillItem, 'id'>) => {
    const newSkill: SkillItem = {
      ...skill,
      id: `sk-${Date.now()}`
    };
    setUserProfile((prev) => ({
      ...prev,
      skills: [newSkill, ...prev.skills]
    }));
  };

  const updateSkill = (id: string, updated: Partial<SkillItem>) => {
    setUserProfile((prev) => ({
      ...prev,
      skills: prev.skills.map((s) => (s.id === id ? { ...s, ...updated } : s))
    }));
  };

  const deleteSkill = (id: string) => {
    setUserProfile((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s.id !== id)
    }));
  };

  const addExperience = (exp: Omit<ExperienceItem, 'id'>) => {
    const newExp: ExperienceItem = {
      ...exp,
      id: `exp-${Date.now()}`
    };
    setUserProfile((prev) => ({
      ...prev,
      experiences: [newExp, ...prev.experiences]
    }));
  };

  const updateExperience = (id: string, updated: Partial<ExperienceItem>) => {
    setUserProfile((prev) => ({
      ...prev,
      experiences: prev.experiences.map((e) => (e.id === id ? { ...e, ...updated } : e))
    }));
  };

  const deleteExperience = (id: string) => {
    setUserProfile((prev) => ({
      ...prev,
      experiences: prev.experiences.filter((e) => e.id !== id)
    }));
  };

  const addEducation = (edu: Omit<EducationItem, 'id'>) => {
    const newEdu: EducationItem = {
      ...edu,
      id: `edu-${Date.now()}`
    };
    setUserProfile((prev) => ({
      ...prev,
      education: [newEdu, ...prev.education]
    }));
  };

  const updateEducation = (id: string, updated: Partial<EducationItem>) => {
    setUserProfile((prev) => ({
      ...prev,
      education: prev.education.map((e) => (e.id === id ? { ...e, ...updated } : e))
    }));
  };

  const deleteEducation = (id: string) => {
    setUserProfile((prev) => ({
      ...prev,
      education: prev.education.filter((e) => e.id !== id)
    }));
  };

  const addProfileProject = (proj: Omit<TalentProjectItem, 'id'>) => {
    const newProj: TalentProjectItem = {
      ...proj,
      id: `proj-${Date.now()}`
    };
    setUserProfile((prev) => ({
      ...prev,
      projects: [newProj, ...prev.projects]
    }));
  };

  const updateProfileProject = (id: string, updated: Partial<TalentProjectItem>) => {
    setUserProfile((prev) => ({
      ...prev,
      projects: prev.projects.map((p) => (p.id === id ? { ...p, ...updated } : p))
    }));
  };

  const deleteProfileProject = (id: string) => {
    setUserProfile((prev) => ({
      ...prev,
      projects: prev.projects.filter((p) => p.id !== id)
    }));
  };

  const addReview = (review: Omit<ReviewItem, 'id' | 'date'>) => {
    const newRev: ReviewItem = {
      ...review,
      id: `rev-${Date.now()}`,
      date: 'Just now'
    };
    setUserProfile((prev) => ({
      ...prev,
      reviews: [newRev, ...prev.reviews]
    }));
  };

  const updateReview = (id: string, updated: Partial<ReviewItem>) => {
    setUserProfile((prev) => ({
      ...prev,
      reviews: prev.reviews.map((r) => (r.id === id ? { ...r, ...updated } : r))
    }));
  };

  const deleteReview = (id: string) => {
    setUserProfile((prev) => ({
      ...prev,
      reviews: prev.reviews.filter((r) => r.id !== id)
    }));
  };

  const resetToDefaults = () => {
    setServices(INITIAL_SERVICES);
    setProjects(INITIAL_PROJECTS);
    setJobs(INITIAL_JOBS);
    setBlogPosts(INITIAL_BLOG_POSTS);
    setTeamMembers(INITIAL_TEAM_MEMBERS);
    setInquiries(INITIAL_INQUIRIES);
    setCmsSettings(INITIAL_CMS);
    setUsers(INITIAL_USERS);
    setUserProfile(INITIAL_USER_PROFILE);
    localStorage.clear();
  };

  return (
    <AppContext.Provider
      value={{
        services,
        addService,
        updateService,
        deleteService,

        projects,
        addProject,
        updateProject,
        deleteProject,

        jobs,
        addJob,
        updateJob,
        deleteJob,

        blogPosts,
        addBlogPost,
        updateBlogPost,
        deleteBlogPost,

        teamMembers,
        addTeamMember,
        updateTeamMember,
        deleteTeamMember,

        inquiries,
        addInquiry,
        updateInquiryStatus,
        deleteInquiry,

        cmsSettings,
        updateCmsSettings,

        users,
        updateUserStatus,
        addUser,
        deleteUser,

        userProfile,
        updateUserProfile,
        resetUserProfile,
        addSkill,
        updateSkill,
        deleteSkill,
        addExperience,
        updateExperience,
        deleteExperience,
        addEducation,
        updateEducation,
        deleteEducation,
        addProfileProject,
        updateProfileProject,
        deleteProfileProject,
        addReview,
        updateReview,
        deleteReview,

        resetToDefaults
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
