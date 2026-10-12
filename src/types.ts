export type PageView = 
  | 'home'
  | 'services'
  | 'service-detail'
  | 'projects'
  | 'project-detail'
  | 'careers'
  | 'post-job'
  | 'my-projects'
  | 'messages'
  | 'payments'
  | 'profile'
  | 'settings'
  | 'notifications'
  | 'about'
  | 'contact'
  | 'blog'
  | 'team'
  | 'portal-hub'
  | 'admin-dashboard'
  | 'admin-users'
  | 'admin-team'
  | 'admin-services'
  | 'admin-projects'
  | 'admin-jobs'
  | 'admin-blog'
  | 'admin-support'
  | 'admin-cms'
  | 'admin-payments'
  | 'admin-reports'
  | 'admin-settings';

export type UserRole = 'client' | 'freelancer' | 'admin';

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  company?: string;
  title?: string;
  createdAt: string;
  status: 'active' | 'pending' | 'suspended';
}

export interface LeadInquiry {
  id: string;
  name: string;
  email: string;
  company?: string;
  service: string;
  budget?: string;
  message: string;
  date: string;
  status: 'New' | 'In Discussion' | 'Proposal Sent' | 'Converted' | 'Closed';
}

export interface OfficeHub {
  id: string;
  name: string;
  city: string;
  country: string;
  badge: string;
  image: string;
  address: string;
  specs: string[];
  capacity: string;
}

export interface CmsSettings {
  heroHeadline: string;
  heroSubtitle: string;
  heroImage?: string;
  heroBadge?: string;
  successRate: string;
  engineersCount: string;
  countriesCount: string;
  announcementText: string;
  missionTitle: string;
  missionDesc: string;
  officeHubs?: OfficeHub[];
}

export interface ServiceItem {
  id: string;
  title: string;
  icon: string;
  description: string;
  category?: string;
  tags?: string[];
  features?: string[];
  startingPrice?: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  categorySlug?: string;
  tags: string[];
  description: string;
  image: string;
  duration?: string;
  client?: string;
  metric?: string;
  metrics?: { label: string; value: string }[];
}

export interface JobItem {
  id: string;
  title: string;
  type: string;
  location: string;
  experience: string;
  skills: string[];
  department: string;
  description?: string;
  salary?: string;
  postedDate?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  category: string;
  date: string;
  author: string;
  authorRole?: string;
  authorAvatar?: string;
  image: string;
  excerpt: string;
  readTime?: string;
}

export interface MemberSkill {
  name: string;
  level: 'Master' | 'Expert' | 'Senior' | 'Advanced';
  percentage: number;
  years?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  socials: {
    linkedin?: string;
    github?: string;
    twitter?: string;
  };
  skills?: MemberSkill[];
}

export interface PortalProject {
  id: string;
  title: string;
  status: 'In Progress' | 'Review' | 'Completed' | 'Cancelled';
  description: string;
  clientName: string;
  leadName: string;
  clientAvatar: string;
  progress: number;
  budget: string;
  deadline: string;
  deadlineText: string;
}

export interface MessageItem {
  id: string;
  sender: string;
  avatar: string;
  time: string;
  content: string;
  type?: 'text' | 'file' | 'milestone';
  fileName?: string;
  fileSize?: string;
  milestoneTitle?: string;
  milestoneValue?: string;
  isSender?: boolean;
}

export interface Conversation {
  id: string;
  name: string;
  company: string;
  avatar: string;
  online: boolean;
  time: string;
  lastMessage: string;
  unreadCount?: number;
}

export interface Transaction {
  id: string;
  description: string;
  date: string;
  amount: string;
  isPositive: boolean;
  status: 'Completed' | 'Pending' | 'Refunded' | 'Failed';
}

export interface SkillItem {
  id: string;
  name: string;
  category: 'Cloud & Infrastructure' | 'Languages & Runtimes' | 'Data & Messaging' | 'Frontend & Mobile' | 'DevOps & Security';
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  description: string;
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  period: string;
  details: string;
}

export interface TalentProjectItem {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl?: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  role: string;
  avatar: string;
  rating: number;
  comment: string;
  project: string;
  date: string;
}

export interface UserProfile {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  avatar: string;
  coverImage: string;
  hourlyRate: number;
  jobSuccessScore: number;
  completedProjects: number;
  totalExperience: string;
  availability: string;
  specialization: string;
  methodology: string;
  languages: string;
  clearance: string;
  responseTime: string;
  weeklyAvailability: string;
  contractType: string;
  timezone: string;
  bio: string;
  skills: SkillItem[];
  experiences: ExperienceItem[];
  education: EducationItem[];
  projects: TalentProjectItem[];
  reviews: ReviewItem[];
}
