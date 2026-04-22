import { 
  Github, Linkedin, Twitter, Mail, 
  ExternalLink, Code, Terminal, Database, 
  Award, BookOpen, GraduationCap, Laptop, 
  Layout, Briefcase , Sparkles
} from "lucide-react";

import cert from "./../../public/Images/cert.jpeg";
import award from "./../../public/Images/award.jpeg";
import chromebook from "./../../public/Images/chromebook.jpeg"; 
import myPic from "./../../public/Images/myPic.jpeg";

export const PROJECTS = [
  {
    id: 1,
    title: "GitInsights | GitHub Analytics",
    description: "A high-performance dashboard for visualizing repository metrics and commit history using GitHub APIs.",
    tech: ["Next.js", "TypeScript", "Tailwind", "React-Force-Graph"],
    github: "https://github.com/abuzar-ali1/Git-Insights",
    liveLink: "https://git-insights-tau.vercel.app",
    image: "/Images/git_insight.png", 
    icon: Github,
  },
  {
    id: 2,
    title: "Modern eCommerce Store",
    description: "Full-featured shopping experience with Redux state management and dynamic product routing.",
    tech: ["React", "Redux", "Tailwind", "Next.js"],
    github: "https://github.com/abuzar-ali1/dummy-shop",
    liveLink: "https://dummy-shop-eosin.vercel.app",
    image: "/Images/dummy_shop.png", 
    icon: Layout,
  },
  {
    id: 3,
    title: "Classroom Management Clone",
    description: "A CRUD-heavy application mimicking Google Classroom features with real-time persistence.",
    tech: ["Next.js", "MUI", "JavaScript", "Redux"],
    github: "https://github.com/abuzar-ali1/Google-Classroom",
    liveLink: "https://google-classroom-hazel.vercel.app",
    image: "/Images/google_class.png",
    icon: BookOpen,
  },
  {
    id: 4,
    title: "Real-Time Weather Protocol",
    description: "Dynamic weather forecasting system using React Query for efficient data fetching and caching.",
    tech: ["Next.js", "TypeScript", "ReactQuery", "Tailwind"],
    github: "https://github.com/abuzar-ali1/Weather-App",
    liveLink: "https://weather-app-mauve-seven-88.vercel.app",
    image: "/Images/weather_app.png",
    icon: Terminal,
  },
];


/* ─── 6. ROLES (For the animated typewriter/switcher) ─── */
export const roles = [
  { title: "Full Stack Engineer", icon: Code },
  { title: "React & Next.js Specialist", icon: Layout },
  { title: "Python Developer", icon: Terminal },
  { title: "UI/UX Enthusiast", icon: Sparkles },
];

export const SKILLS = [
  { name: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"] },
  { name: "Backend", items: ["Python", "Django", "REST APIs", "PostgreSQL", "Flask"] },
  { name: "Tools", items: ["Git", "GitHub", "Vercel", "VS Code", "Figma"] }
];

export const TIMELINE = [
  {
    year: "2025",
    title: "Chief Minister’s Excellence Award",
    institution: "Sukkur IBA University",
    description: "Awarded a Google Chromebook by the CM of Sindh for being the Top Performer in Python Development.",
    type: "achievement",
    icon: Award,
    images: [cert, award, chromebook, myPic]
  },
  {
    year: "2025",
    title: "BS Computer Science",
    institution: "Allama Iqbal Open University",
    description: "Currently pursuing (2nd Semester). Focus on Data Structures and Software Engineering.",
    type: "education",
    icon: GraduationCap,
    status: "In Progress (3.3 GPA)"
  },
  {
    year: "2024",
    title: "Front-end Web Specialization",
    institution: "xWave",
    description: "One-year intensive fellowship. Selected as top 120 from 500+ applicants.",
    type: "certification",
    icon: Code,
    tags: ["React", "Next.js", "WordPress"]
  },
  {
    year: "2024",
    title: "Python & Data Science Certs",
    institution: "Sukkur IBA University",
    description: "Professional training in OOP, REST APIs, and Machine Learning algorithms.",
    type: "certification",
    icon: Terminal,
    tags: ["Python", "Scikit-Learn", "Flask"]
  }
];

export const QUICK_STATS = [
  { label: "Projects Built", value: "15+" },
  { label: "Certifications", value: "4" },
  { label: "Focus", value: "Full Stack" },
];

export const CONTACT_INFO = {
  email: "abuzarali.dev@gmail.com",
  phone: "+92 337 2595592",
  location: "Lahore, Punjab",
  github: "https://github.com/abuzar-ali1",
  linkedin: "https://www.linkedin.com/in/abuzar-ali01/",
  twitter: "https://x.com/Abu_zar_Ali",
};

export const NAV_LINKS = [
  { name: "About", href: "#about" },
  { name: "Work", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Background", href: "#background" },
  { name: "Contact", href: "#contact" },
];