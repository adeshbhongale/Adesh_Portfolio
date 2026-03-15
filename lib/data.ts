export type AboutContent = {
  headline: string;
  subheadline: string;
  description: string;
  cvUrl: string;
  image: string;
};

export type SkillCategory = {
  title: string;
  skills: { name: string; logo: string }[];
};

export type ExperienceItem = {
  id: number;
  img: string;
  role: string;
  company: string;
  date: string;
  desc: string;
  skills: string[];
};

export type EducationItem = {
  id: number;
  img: string;
  school: string;
  date: string;
  grade: string;
  desc: string;
  degree: string;
};

export type ProjectItem = {
  id: number;
  _id?: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  github: string;
  webapp: string;
  featured?: boolean;
  techStack?: string[];
  createdAt?: string;
};

export type BlogItem = {
  _id?: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  coverImage: string;
  tags: string[];
  publishedAt: string;
};

export const aboutData: AboutContent = {
  headline: "Hi, I am",
  subheadline: "Adesh Bhongale",
  description:
    "I am a Full-stack developer with a passion for building scalable web applications. Skilled in both front-end and back-end development, I specialize in the MERN stack and other modern technologies to create seamless user experiences and efficient solutions.",
  cvUrl: "https://drive.google.com/file/d/1hdTwJhu3Yl6GxPJsJ5mkSlYbMBJsKsTm/view?usp=drive_link",
  image: "/assets/Adesh.png"
};

export const skillsInfo: SkillCategory[] = [
  {
    title: "Frontend",
    skills: [
      { name: "HTML", logo: "/assets/tech_logo/html.png" },
      { name: "CSS", logo: "/assets/tech_logo/css.png" },
      { name: "SASS", logo: "/assets/tech_logo/sass.png" },
      { name: "JavaScript", logo: "/assets/tech_logo/javascript.png" },
      { name: "React JS", logo: "/assets/tech_logo/reactjs.png" },
      { name: "Redux", logo: "/assets/tech_logo/redux.png" },
      { name: "Tailwind CSS", logo: "/assets/tech_logo/tailwindcss.png" },
      { name: "Bootstrap", logo: "/assets/tech_logo/bootstrap.png" }
    ]
  },
  {
    title: "Backend",
    skills: [
      { name: "Node JS", logo: "/assets/tech_logo/nodejs.png" },
      { name: "Express JS", logo: "/assets/tech_logo/express.png" },
      { name: "MySQL", logo: "/assets/tech_logo/mysql.png" },
      { name: "MongoDB", logo: "/assets/tech_logo/mongodb.png" },
      { name: "Firebase", logo: "/assets/tech_logo/firebase.png" },
      { name: "PostgreSQL", logo: "/assets/tech_logo/postgre.png" },
      { name: "AWS", logo: "/assets/tech_logo/aws.png" }
    ]
  },
  {
    title: "Languages",
    skills: [
      { name: "Java", logo: "/assets/tech_logo/java.png" },
      { name: "C", logo: "/assets/tech_logo/c.png" },
      { name: "C++", logo: "/assets/tech_logo/cpp.png" },
      { name: "Python", logo: "/assets/tech_logo/python.png" },
      { name: "JavaScript", logo: "/assets/tech_logo/javascript.png" }
    ]
  },
  {
    title: "Tools",
    skills: [
      { name: "Git", logo: "/assets/tech_logo/git.png" },
      { name: "GitHub", logo: "/assets/tech_logo/github.png" },
      { name: "VS Code", logo: "/assets/tech_logo/vscode.png" },
      { name: "Postman", logo: "/assets/tech_logo/postman.png" },
      { name: "Compass", logo: "/assets/tech_logo/mc.png" },
      { name: "Vercel", logo: "/assets/tech_logo/vercel.png" },
      { name: "Netlify", logo: "/assets/tech_logo/netlify.png" },
      { name: "Figma", logo: "/assets/tech_logo/figma.png" }
    ]
  }
];

export const experiencesData: ExperienceItem[] = [
  {
    id: 0,
    img: "/assets/company_logo/ydcoders.png",
    role: "MERN Stack Developer",
    company: "YDcoders IT Solution",
    date: "Jan 2025 - May 2025",
    desc: "Developed dynamic and scalable web applications using the MERN stack, handling both frontend and backend development. Collaborated with cross-functional teams to build responsive UI, implement RESTful APIs, and optimize application performance in an agile environment.",
    skills: ["HTML", "CSS", "JavaScript", "React JS", "TypeScript", "Node JS", "Tailwind CSS", "MongoDb", "Redux"]
  },
  {
    id: 1,
    img: "/assets/company_logo/oasis.png",
    role: "Web Devloper Intern",
    company: "Oasis InfoByte",
    date: "August 2023 - Octomber 2023",
    desc: "Worked as a Web Developer Intern, designing and implementing scalable UI components and responsive websites using HTML, CSS, JavaScript and Bootstrap. Collaborated with the design team to translate wireframes and prototypes from Figma into interactive, user-friendly web pages.",
    skills: ["HTML", "CSS", "Javascript", "Bootstrap", "Figma", "VS Code"]
  }
];

export const educationData: EducationItem[] = [
  {
    id: 0,
    img: "/assets/education_logo/kit.png",
    school: "KIT's Collge Of Engineering, Kolhapur",
    date: "December 2021 - July 2025",
    grade: "8.1 CGPA",
    desc: "I completed my Bachelor's degree in Computer Science and Engineering (B.Tech.) from KIT's College Of Engineering, Kolhapur. Throughout my studies, I was immersed in a variety of subjects that deepened my understanding of computing and technology. From exploring Data Structures and Algorithms to diving into Web Development and Database Management Systems, I gained practical insights into the world of software development. My time at KIT's College allowed me to work on projects that applied theoretical concepts to real-world problems.",
    degree: "Bachelor of Technology - B.Tech. (Computer Science and Engineering)"
  },
  {
    id: 1,
    img: "/assets/education_logo/clg.jpg",
    school: "Shri Balaji Junior College, Ichalkaranji",
    date: "june 2019 - March 2021",
    grade: "92.33%",
    desc: "I completed my class 12 education from Shri Balaji Junior College, Ichalkaranji, under the Maharastra State board, where I studied Physics, Chemistry, and Mathematics (PCM) with Science.",
    degree: "HSC(XII) - Science(PCM)"
  },
  {
    id: 2,
    img: "/assets/education_logo/schl.jpg",
    school: "Kabnoor Highschool kabnoor, Ichalkaranji",
    date: "june 2018 - April 2019",
    grade: "90.40%",
    desc: "I completed my class 10 education from Kabnoor Highschool Kabnoor, Ichalkaranji, under the Maharastra State board, where I studied Marathi Medium Eduaction.",
    degree: "SCC(X), Marathi Medium Education"
  }
];

export const projectsData: ProjectItem[] = [
  {
    id: 0,
    title: "Eco Place Website",
    description:
      "A full-stack eco-friendly shopping and e-commerce platform. Users can discover, review, and purchase sustainable products, helping to build a community-driven marketplace for green living. Built with React.js, Node.js, MongoDB, and Express.js for a seamless and interactive experience.",
    image: "/assets/work_logo/eco.png",
    tags: ["React Js", "Node Js", "MongoDB", "Express Js", "HTML", "JavaScript", "Tailwind CSS", "Plotch AI"],
    github: "https://github.com/adeshbhongale/EcoPlace",
    webapp: "https://eco-place-cyan.vercel.app/",
    featured: true,
    techStack: ["React Js", "Node Js", "MongoDB", "Express Js"],
    createdAt: "2025-01-01T00:00:00.000Z"
  },
  {
    id: 1,
    title: "Pro Manage Website",
    description:
      "A comprehensive task management web application designed to help users efficiently manage their daily tasks and projects. It features user authentication, task creation, assignment, and progress tracking. Built with React.js, Node.js, MongoDB, and Express.js, it provides a robust platform for productivity enhancement.",
    image: "/assets/work_logo/pro.png",
    tags: ["React Js", "Node Js", "MongoDB", "Express Js", "HTML", "CSS", "JavaScript", "JWT Auth"],
    github: "https://github.com/adeshbhongale/Pro-Manage_Website_MERN-Stack",
    webapp: "https://pro-manage-tasks.vercel.app/",
    featured: true,
    techStack: ["React Js", "Node Js", "MongoDB", "Express Js"],
    createdAt: "2024-11-01T00:00:00.000Z"
  },
  {
    id: 2,
    title: "AI Cover Letter Generator",
    description:
      "A web app that generates personalized cover letters using AI. Users input their details and job requirements, and the app creates tailored cover letters to streamline the job application process. Built with React and Gemini API for fast, relevant results.",
    image: "/assets/work_logo/cover.png",
    tags: ["React Js", "Node Js", "MongoDB", "Express Js", "HTML", "JavaScript", "Tailwind CSS", "Gemini API"],
    github: "https://github.com/adeshbhongale/ai-cover-letter-generator",
    webapp: "https://ai-cover-letter-generator-blush.vercel.app/",
    techStack: ["React Js", "Gemini API"],
    createdAt: "2024-09-01T00:00:00.000Z"
  },
  {
    id: 3,
    title: "Orange Bug Tracker",
    description:
      "A bug tracking system that allows users to report, track, and manage bugs in software projects. It features user authentication, bug reporting, and a dashboard for managing reported issues. Built with the MERN stack (MongoDB, Express.js, React.js, Node.js) for a full-stack solution.",
    image: "/assets/work_logo/bug.png",
    tags: ["React JS", "Node.js", "MongoDB", "Express", "HTML", "Tailwind CSS", "JavaScript", "Redux"],
    github: "https://github.com/adeshbhongale/Orange-Bug-Tracker",
    webapp: "https://bug-tracker-orange.vercel.app/",
    techStack: ["React JS", "Node.js", "MongoDB", "Express"],
    createdAt: "2024-07-01T00:00:00.000Z"
  },
  {
    id: 4,
    title: "ResuMate Website",
    description:
      "A web application that gives feedback based on the job description and resume. It features a user-friendly interface for resume building, editing, and downloading. Built with HTML, CSS, JavaScript, and Flask for a smooth user experience and backend functionality.",
    image: "/assets/work_logo/resu.png",
    tags: ["JavaScript", "HTML", "CSS", "Machine Learning", "Flask"],
    github: "https://github.com/adeshbhongale/ResuMate_Website",
    webapp: "https://resu-mate-lovat.vercel.app/",
    techStack: ["HTML", "CSS", "JavaScript", "Flask"],
    createdAt: "2024-06-01T00:00:00.000Z"
  },
  {
    id: 5,
    title: "Resume Keyword Highlighter",
    description:
      "A web application that highlights important keywords in resumes, helping users optimize their CVs for better visibility. Built with HTML, CSS, and JavaScript, it features smooth animations and a clean, user-friendly interface.",
    image: "/assets/work_logo/highl.png",
    tags: ["HTML", "CSS", "JavaScript", "Python", "Flask"],
    github: "https://github.com/adeshbhongale/Resume_Keyword_Highlighter",
    webapp: "https://resume-keyword-highlighter-8.onrender.com/",
    techStack: ["HTML", "CSS", "JavaScript"],
    createdAt: "2024-05-01T00:00:00.000Z"
  },
  {
    id: 6,
    title: "Quick Rent Website",
    description:
      "A full-stack web application for renting products online. Users can browse available items, make bookings, and manage their rentals through an intuitive dashboard. Built with React.js, Node.js, MongoDB, and Express.js, it provides a seamless and efficient rental experience.",
    image: "/assets/work_logo/rent.png",
    tags: ["React JS", "HTML", "CSS", "JavaScript", "API"],
    github: "https://github.com/adeshbhongale/QuickRent_Assignment",
    webapp: "https://quick-rent-assignment.vercel.app/",
    techStack: ["React JS", "Node.js"],
    createdAt: "2024-03-01T00:00:00.000Z"
  },
  {
    id: 7,
    title: "Event Booking System",
    description:
      "A React.js-based application for booking and managing events. Users can browse, reserve, and organize events with a user-friendly interface and real-time updates.",
    image: "/assets/work_logo/book.png",
    tags: ["React JS", "API", "HTML", "CSS", "Javascript"],
    github: "https://github.com/adeshbhongale/Event_Booking_System",
    webapp: "https://event-booking-system-psi.vercel.app/",
    techStack: ["React JS"],
    createdAt: "2024-01-01T00:00:00.000Z"
  },
  {
    id: 8,
    title: "Currency Convertor",
    description:
      "A JavaScript application that allows users to convert currencies in real-time using API integration. It features a simple and intuitive interface for quick and accurate currency conversions.",
    image: "/assets/work_logo/curr.png",
    tags: ["HTML", "CSS", "Javascript", "API"],
    github: "https://github.com/adeshbhongale/Currency-Convertor",
    webapp: "https://currency-convertor-mu-five.vercel.app/",
    techStack: ["HTML", "CSS", "JavaScript"],
    createdAt: "2023-12-01T00:00:00.000Z"
  }
];

export const blogData: BlogItem[] = [
  {
    title: "How I Build Full-Stack Projects with MERN",
    slug: "how-i-build-full-stack-projects-with-mern",
    excerpt: "A practical workflow for building scalable MERN projects from planning to deployment.",
    content:
      "I start with clear feature boundaries, then define API contracts, set up reusable UI components, and optimize deployment for performance. A good structure early saves hours later.",
    coverImage: "/assets/blog/blog-mern.jpg",
    tags: ["MERN", "Full Stack", "Architecture"],
    publishedAt: "2025-02-10T00:00:00.000Z"
  },
  {
    title: "React Performance Tips I Actually Use",
    slug: "react-performance-tips-i-actually-use",
    excerpt: "Simple techniques that improve real-world React apps without over-engineering.",
    content:
      "I focus on component boundaries, lazy loading heavy sections, and avoiding unnecessary re-renders. Profiling first, optimization second.",
    coverImage: "/assets/blog/blog-react.jpg",
    tags: ["React", "Performance"],
    publishedAt: "2025-03-15T00:00:00.000Z"
  },
  {
    title: "Node.js API Security Patterns for Production Apps",
    slug: "nodejs-api-security-patterns-for-production-apps",
    excerpt: "Battle-tested API hardening techniques inspired by OWASP and real-world backend incidents.",
    content:
      "Production APIs should combine schema validation, rate limiting, secure headers, and strict auth checks for write operations. This layered strategy reduces attack surface and makes services resilient under malicious traffic and accidental misuse.",
    coverImage: "/assets/blog/blog-security.jpg",
    tags: ["Node.js", "Security", "API"],
    publishedAt: "2025-04-12T00:00:00.000Z"
  },
  {
    title: "Core Web Vitals Playbook for Next.js Websites",
    slug: "core-web-vitals-playbook-for-nextjs-websites",
    excerpt: "Practical optimization tactics gathered from Lighthouse guidance and Vercel performance docs.",
    content:
      "Start by optimizing image delivery, reducing render-blocking scripts, and splitting large client bundles. In Next.js, combine static rendering with smart caching to keep LCP and INP healthy while maintaining a fast editing workflow in your admin system.",
    coverImage: "/assets/blog/blog-nextjs.jpg",
    tags: ["Next.js", "Performance", "SEO"],
    publishedAt: "2025-05-20T00:00:00.000Z"
  }
];
