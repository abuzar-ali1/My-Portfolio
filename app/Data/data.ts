import { CloudDrizzle, ListTodo, School, Store, Code, Palette, Cpu, Database, GitBranch, Smartphone, Globe, Zap, Clock
, BookOpen , GraduationCap , Award  , Phone, MapPin, CheckCircle,  Github, 
  Linkedin, Twitter, MessageSquare , Mail , Calendar,
  TrendingUp,
  Terminal,
  Chrome,
  Star,
  Target,
  Heart,
  Rocket} from "lucide-react";

import cert from "./../../public/Images/cert.jpeg";
import award from "./../../public/Images/award.jpeg";
import chromebook from "./../../public/Images/chromebook.jpeg"; 
import  myPic from "./../../public/Images/myPic.jpeg";

export const PROJECTS = [
  {
    id: 1,
    title: "Dummy Shop",
    description: "A modern eCommerce platform  Dummy Shop.",
    tech: ["Next.js", "JavaScript", "React",  "Tailwind" , "Redux"],
    github : "https://github.com/abuzar-ali1/dummy-shop",
    liveLink: "https://dummy-shop-eosin.vercel.app",
    image: "/Images/dummy_shop.png", 
    size: "md:col-span-2 md:row-span-2",
    icon: Store,
  },
  {
    id: 2,
    title: "Fresh Cart",
    description: "Used Open Source API for this Simple store with Add to cart and Authentication integration.",
    tech: ["Redux", "JavaScript", "React",  "Tailwind"],
    github : "https://github.com/abuzar-ali1/Eccomerce-react.js",
    liveLink: "https://eccomerce-react-js-iota.vercel.app",
    image: "/Images/fresh_cart.png",
    size: "md:col-span-1 md:row-span-1",
    icon: Store,
  },
  {
    id: 3,
    title: "Weather App",
    description: "Developed a weather app integrating a real-time weather API to display dynamic forecasts",
    tech: ["Next.js", "TypeScript", "React",  "Tailwind" , "ReactQuery"],
    github: "https://github.com/abuzar-ali1/Weather-App",
    liveLink: "https://weather-app-mauve-seven-88.vercel.app",
    image: "/Images/weather_app.png",
    size: "md:col-span-1 md:row-span-1",
    icon: CloudDrizzle,
  },  {
    id: 4,
    title: "Google Classroom Clone",
    description: "Developed a classroom management web app featuring CRUD operations for assignments with real-time state persistence via localStorage.",
    tech: ["Next.js", "React", "Redux", "JavaScript",  "MUI"],
    github: "https://github.com/abuzar-ali1/Google-Classroom" ,
    liveLink: "https://google-classroom-hazel.vercel.app",
    image: "/Images/google_class.png",
    size: "md:col-span-1 md:row-span-1",
    icon: School,
  },  {
    id: 5,
    title: "Modern Todo App",
    description: "Developed a weather app featuring add/edit/delete via modal form, search, filters (All/Active/Completed), and smooth animated list transitions",
    tech: ["Next.js", "JavaSript", "React",  "Mui" , "Framer Motion"],
    github:"https://github.com/abuzar-ali1/Modern-Todo-App",
    liveLink: "https://modern-todo-tau.vercel.app",
    image: "/Images/todo_app.png",
    size: "md:col-span-1 md:row-span-1",
    icon: ListTodo,
  },  {
    id: 6,
    title: "Organio Shop",
    description: "Built an E-commerce management website , features functions like add to cart , sign in sign up and . Implemented responsive using Bootstrap , dynamic routing for multi pages.",
    tech: ["HTML",   "CSS" ,"JavaScript", "Bootstrap"],
    github: "https://github.com/abuzar-ali1/Home-5---Organio-Website",
    liveLink: "https://capstone-3-psi.vercel.app",
    image: "/Images/organio.png",
    size: "md:col-span-1 md:row-span-1",
    icon: Store,
  },
];




export const skillCategories = [
  {
    title: "Frontend",
    icon: Code,
    skills: [
      { name: "React", level: 95, color: "from-blue-400/20 to-cyan-400/20" },
      { name: "TypeScript", level: 90, color: "from-blue-500/20 to-indigo-500/20" },
      { name: "Next.js", level: 88, color: "from-zinc-400/20 to-zinc-500/20" },
      { name: "Tailwind CSS", level: 96, color: "from-teal-400/20 to-cyan-400/20" },
    ]
  },
  {
    title: "UI/UX Design",
    icon: Palette,
    skills: [
      { name: "Figma", level: 85, color: "from-pink-500/20 to-purple-500/20" },
      { name: "Framer Motion", level: 92, color: "from-red-500/20 to-pink-500/20" },
      { name: "Responsive Design", level: 94, color: "from-green-500/20 to-emerald-500/20" },
      { name: "Design Systems", level: 82, color: "from-yellow-500/20 to-orange-500/20" },
    ]
  },
  {
    title: "Tools & Others",
    icon: GitBranch,
    skills: [
      { name: "Git/GitHub", level: 90, color: "from-zinc-400/20 to-zinc-600/20" },
      { name: "VS Code", level: 96, color: "from-blue-400/20 to-blue-600/20" },
      { name: "Performance", level: 87, color: "from-purple-500/20 to-violet-500/20" },
      { name: "Web Vitals", level: 89, color: "from-green-400/20 to-lime-400/20" },
    ]
  }
];

export const techStack = [
  { name: "JavaScript", icon: Code, color: "text-yellow-400" },
  { name: "TypeScript", icon: Cpu, color: "text-blue-400" },
  { name: "React", icon: Zap, color: "text-cyan-400" },
  { name: "Next.js", icon: Globe, color: "text-zinc-100" },
  { name: "Tailwind", icon: Palette, color: "text-teal-400" },
  { name: "Node.js", icon: Database, color: "text-green-400" },
  { name: "Framer Motion", icon: Smartphone, color: "text-pink-400" },
];



export const educationData = [
  {
    id: 1,
    degree: "FSc (Intermediate)",
    institution: "Government Degree College",
    period: "2022 - 2024",
    status: "Completed",
    icon: GraduationCap,
    color: "from-blue-500/10 to-cyan-500/10",
    description: "Completed intermediate studies with focus on Mathematics, Physics, and Chemistry. Developed strong analytical and problem-solving skills essential for computer science.",
    achievements: [
      "Developed foundation in logical thinking and mathematical concepts",
      "Participated in science exhibitions and technical projects",
      "Maintained consistent academic performance"
    ],
    gpa: "A Grade",
    progress: 100
  },
  {
    id: 2,
    degree: "BS Computer Science",
    institution: "Allama Iqbal Open University",
    period: "2025 - Present (2nd Semester)",
    status: "In Progress",
    icon: BookOpen,
    color: "from-purple-500/10 to-pink-500/10",
    description: "Currently pursuing Bachelor's degree in Computer Science. Gaining comprehensive knowledge in programming, algorithms, data structures, and software development methodologies.",
    currentCourses: [
      "Introduction to Programming",
      "Discrete Mathematics",
      "Computer Fundamentals",
      "English Composition",
      "Calculas"
    ],
    gpa: "In Progress",
    progress: 25,
    expected: "Expected 2028"
  }
];

export const educationStats = [
  { label: "Current GPA", value: "3.8", icon: Award, color: "text-amber-400" },
  { label: "Semesters", value: "2/8", icon: BookOpen, color: "text-blue-400" },
  { label: "Years Completed", value: "1", icon: Clock, color: "text-emerald-400" },
  { label: "Courses Taken", value: "8+", icon: CheckCircle, color: "text-purple-400" }
];



export const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "abuzarali.dev@gmail.com",
      link: "mailto:abuzarali.dev@gmail.com",
      color: "text-blue-400"
    },
    {
      icon: Phone,
      title: "Phone",
      value: "+923372595592",
      link: "tel:+923372595592",
      color: "text-green-400"
    },
    {
      icon: MapPin,
      title: "Location",
      value: "Lahore, Punjab",
      link: "#",
      color: "text-red-400"
    },
    {
      icon: Calendar,
      title: "Availability",
      value: "Open to opportunities",
      link: "#",
      color: "text-purple-400"
    }
  ];

export const socialLinks = [
    { icon: Github, href: "https://github.com/abuzar-ali1", label: "GitHub", color: "hover:text-zinc-100" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/abuzar-ali01/", label: "LinkedIn", color: "hover:text-blue-400" },
    { icon: Twitter, href: "https://x.com/Abu_zar_Ali", label: "Twitter", color: "hover:text-sky-400" },
    { icon: MessageSquare, href: "#", label: "WhatsApp", color: "hover:text-green-400" }
  ];


export const certifications = [
  {
    id: 1,
    title: "Front-end Web Development",
    institution: "xWave",
    period: "Jan 2024 - Jan 2025",
    duration: "12 months",
    icon: Code,
    color: "from-blue-500/10 to-cyan-500/10",
    skills: ["HTML5", "CSS3", "Bootstrap 5", "JavaScript", "React.js", "Next.js", "WordPress"],
    description: "Selected as one of the top 120 students from over 500 applicants. Successfully developed 10+ projects, refining skills in modern frontend technologies to create responsive websites and landing pages. Also completed a 3-month online WordPress development course.",
    highlights: [
      "Selected among top 120/500+ applicants",
      "Developed 10+ responsive projects",
      "Additional WordPress specialization"
    ]
  },
  {
    id: 2,
    title: "Python Development Certification",
    institution: "Sukkur IBA University",
    period: "Nov 2024 - Jan 2025",
    duration: "3 months",
    icon: Terminal,
    color: "from-amber-500/10 to-orange-500/10",
    skills: ["Python", "OOP", "Flask", "REST APIs", "Pandas", "NumPy", "pytest", "Web Scraping", "OpenCV", "Automation"],
    description: "Proficient in building scalable applications using core Python, OOP principles, and design patterns. Developed automation scripts, REST APIs (Flask), and data pipelines for efficient data processing. Expert in error handling, multithreading, and unit testing.",
    highlights: [
      "Built REST APIs with Flask framework",
      "Developed data pipelines with Pandas & NumPy",
      "Web scraping with BeautifulSoup & image processing with OpenCV",
      "Clean, maintainable code adhering to PEP8 standards"
    ]
  },
  {
    id: 3,
    title: "Data Science Certification",
    institution: "Sukkur IBA University",
    period: "Jan 2025 - March 2025",
    duration: "2 months",
    icon: Database,
    color: "from-purple-500/10 to-violet-500/10",
    skills: ["Python", "Machine Learning", "TensorFlow", "Scikit-learn", "Statistical Analysis", "Tableau", "Matplotlib", "Predictive Modeling"],
    description: "Mastered core Data Science concepts including statistical analysis, machine learning algorithms (Decision Tree, Random Forest, SVM), and data visualization. Developed expertise in predictive modeling using Scikit-learn and TensorFlow.",
    highlights: [
      "Applied ML algorithms for dataset accuracy prediction",
      "Real-world projects in clustering, regression, and time-series forecasting",
      "Hands-on experience with TensorFlow and Scikit-learn"
    ]
  },
  
  {
    id: 4,
    title: "Freelancing & Client Management",
    institution: "Digi Skill",
    period: "Nov 2024 - Jan 2025",
    duration: "3 months",
    icon: TrendingUp,
    color: "from-emerald-500/10 to-green-500/10",
    skills: ["Client Communication", "Project Management", "Freelance Strategies", "Business Development", "Client Acquisition"],
    description: "Completed a three-month Freelancing course focusing on effective client interaction, project management strategies, and business development for successful freelance career growth.",
    highlights: [
      "Enhanced client communication skills",
      "Learned effective project management strategies",
      "Developed business development techniques"
    ]
  }
];

export const stats = [
  { label: "Certifications", value: "4", icon: Award },
  { label: "Total Duration", value: "20 months", icon: Calendar },
  { label: "Technical Skills", value: "25+", icon: CheckCircle },
  { label: "Projects Built", value: "10+", icon: BookOpen }
];
  



export const achievements = [
  {
    id: 1,
    title: "Chief Minister's Excellence Award",
    subtitle: "Outstanding Performance in Python Development",
    award: "Google Chromebook 11",
    date: "January 2025",
    location: "Sukkur IBA University, Sindh",
    description: "Awarded a Google Chromebook 11 by the Chief Minister of Sindh for demonstrating exceptional performance and outstanding achievements in the Python Development course. Recognized as the top performer among all students in the program.",
    icon: Chrome,
    color: "from-blue-500/10 to-green-500/10",
    highlight: "Top Performer in Class",
    images: [
      { id: "cert", alt: "Achievement Certificate", caption: "Certificate of Excellence" , src : cert },
      { id: "chromebook", alt: "Google Chromebook 11", caption: "Awarded Chromebook", src : chromebook},
      { id: "award", alt: "Award Ceremony with CM Sindh", caption: "Award Ceremony" , src: award },
      { id: "me", alt: "Feeling so Happy", caption: "Hello Guys!" , src: myPic }

    ]
  }
];

export const otherAchievements = [
  {
    title: "Top 120 Student Selection",
    description: "Selected among top 120 students from 500+ applicants for xWave frontend development program",
    icon: Star,
    color: "text-amber-400"
  },
  {
    title: "10+ Projects Completed",
    description: "Built and deployed multiple real-world projects across various technologies",
    icon: Target,
    color: "text-emerald-400"
  },
  {
    title: "Freelance Certification",
    description: "Certified in professional freelancing and client management by Digi Skill",
    icon: Award,
    color: "text-purple-400"
  }
];



  export const AboutStats = [
    { value: "15+", label: "Projects", icon: Target, color: "bg-blue-500/10" },
    { value: "3+", label: "Years", icon: Zap, color: "bg-purple-500/10" },
    { value: "100%", label: "Satisfaction", icon: Heart, color: "bg-pink-500/10" },
    { value: "∞", label: "Passion", icon: Rocket, color: "bg-amber-500/10" },
  ];

  export const AboutSocialLinks = [
    { icon: Github, href: "https://github.com/abuzar-ali1", label: "GitHub", color: "hover:bg-zinc-800" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/abuzar-ali01/", label: "LinkedIn", color: "hover:bg-blue-500/20" },
    { icon: Twitter, href: "https://x.com/Abu_zar_Ali", label: "Twitter", color: "hover:bg-sky-500/20" },
    { icon: Mail, href: "abuzarali.dev@gmail.com", label: "Email", color: "hover:bg-red-500/20" },
  ];

  export const roles = [
    { title: "Frontend Developer", icon: Code, color: "text-blue-400" },
    { title: "UI/UX Designer", icon: Palette, color: "text-purple-400" },
    { title: "React Specialist", icon: Cpu, color: "text-cyan-400" },
    { title: "Full Stack Enthusiast", icon: Database, color: "text-emerald-400" },
  ];



export const navLinks = [
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Contact", href: "#contact" },
  { name: "Certifications", href: "#certifications" },
  { name: "Achievements", href: "#achievements" },
  { name: "Education", href: "#education" },

];