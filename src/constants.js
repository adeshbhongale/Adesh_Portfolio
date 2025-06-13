// Skills Section Logo's
import aws from './assets/tech_logo/aws.png';
import bootstrapLogo from './assets/tech_logo/bootstrap.png';
import cLogo from './assets/tech_logo/c.png';
import cppLogo from './assets/tech_logo/cpp.png';
import cssLogo from './assets/tech_logo/css.png';
import expressjsLogo from './assets/tech_logo/express.png';
import figmaLogo from './assets/tech_logo/figma.png';
import firebaseLogo from './assets/tech_logo/firebase.png';
import gitLogo from './assets/tech_logo/git.png';
import githubLogo from './assets/tech_logo/github.png';
import htmlLogo from './assets/tech_logo/html.png';
import javaLogo from './assets/tech_logo/java.png';
import javascriptLogo from './assets/tech_logo/javascript.png';
import mcLogo from './assets/tech_logo/mc.png';
import mongodbLogo from './assets/tech_logo/mongodb.png';
import mysqlLogo from './assets/tech_logo/mysql.png';
import netlifyLogo from './assets/tech_logo/netlify.png';
import nodejsLogo from './assets/tech_logo/nodejs.png';
import postgreLogo from './assets/tech_logo/postgre.png';
import postmanLogo from './assets/tech_logo/postman.png';
import pythonLogo from './assets/tech_logo/python.png';
import reactjsLogo from './assets/tech_logo/reactjs.png';
import reduxLogo from './assets/tech_logo/redux.png';
import sassLogo from './assets/tech_logo/sass.png';
import tailwindcssLogo from './assets/tech_logo/tailwindcss.png';
import vercelLogo from './assets/tech_logo/vercel.png';
import vscodeLogo from './assets/tech_logo/vscode.png';

// Experience Section Logo's
import oasis from './assets/company_logo/oasis.png';
import ydcoders from './assets/company_logo/ydcoders.png';

// // Education Section Logo's
import clg from './assets/education_logo/clg.jpg';
import kit from './assets/education_logo/kit.png';
import schl from './assets/education_logo/schl.jpg';

// Project Section Logo's
import book from './assets/work_logo/book.png';
import bug from './assets/work_logo/bug.png';
import cover from './assets/work_logo/cover.png';
import curr from './assets/work_logo/curr.png';
import eco from './assets/work_logo/eco.png';
import highl from './assets/work_logo/highl.png';
import pro from './assets/work_logo/pro.png';
import rent from './assets/work_logo/rent.png';
import resu from './assets/work_logo/resu.png';


export const SkillsInfo = [
    {
        title: 'Frontend',
        skills: [
            { name: 'HTML', logo: htmlLogo },
            { name: 'CSS', logo: cssLogo },
            { name: 'SASS', logo: sassLogo },
            { name: 'JavaScript', logo: javascriptLogo },
            { name: 'React JS', logo: reactjsLogo },
            { name: 'Redux', logo: reduxLogo },
            { name: 'Tailwind CSS', logo: tailwindcssLogo },
            { name: 'Bootstrap', logo: bootstrapLogo },
        ],
    },
    {
        title: 'Backend',
        skills: [
            { name: 'Node JS', logo: nodejsLogo },
            { name: 'Express JS', logo: expressjsLogo },
            { name: 'MySQL', logo: mysqlLogo },
            { name: 'MongoDB', logo: mongodbLogo },
            { name: 'Firebase', logo: firebaseLogo },
            { name: 'PostgreSQL', logo: postgreLogo },
            { name: 'AWS', logo: aws },
        ],
    },
    {
        title: 'Languages',
        skills: [
            { name: 'Java', logo: javaLogo },
            { name: 'C', logo: cLogo },
            { name: 'C++', logo: cppLogo },
            { name: 'Python', logo: pythonLogo },
            { name: 'JavaScript', logo: javascriptLogo },
        ],
    },
    {
        title: 'Tools',
        skills: [
            { name: 'Git', logo: gitLogo },
            { name: 'GitHub', logo: githubLogo },
            { name: 'VS Code', logo: vscodeLogo },
            { name: 'Postman', logo: postmanLogo },
            { name: 'Compass', logo: mcLogo },
            { name: 'Vercel', logo: vercelLogo },
            { name: 'Netlify', logo: netlifyLogo },
            { name: 'Figma', logo: figmaLogo },
        ],
    },
];

export const experiences = [
    {
        id: 0,
        img: ydcoders,
        role: "MERN Stack Developer",
        company: "YDcoders IT Solution",
        date: "Jan 2025 - May 2025",
        desc: "Developed dynamic and scalable web applications using the MERN stack, handling both frontend and backend development. Collaborated with cross-functional teams to build responsive UI, implement RESTful APIs, and optimize application performance in an agile environment.",
        skills: [
            "HTML",
            "CSS",
            "JavaScript",
            "React JS",
            "TypeScript",
            "Node JS",
            "Tailwind CSS",
            "MongoDb",
            "Redux",
        ],
    },
    {
        id: 1,
        img: oasis,
        role: "Web Devloper Intern",
        company: "Oasis InfoByte",
        date: "August 2023 - Octomber 2023",
        desc: "Worked as a Web Developer Intern, designing and implementing scalable UI components and responsive websites using HTML, CSS, JavaScript and Bootstrap. Collaborated with the design team to translate wireframes and prototypes from Figma into interactive, user-friendly web pages.",
        skills: [
            "HTML",
            "CSS",
            "Javascript",
            "Bootstrap",
            "Figma",
            "VS Code",
        ],
    },
];

export const education = [
    {
        id: 0,
        img: kit,
        school: "KIT's Collge Of Engineering, Kolhapur",
        date: "December 2021 - July 2025",
        grade: "8.1 CGPA",
        desc: "I completed my Bachelor's degree in Computer Science and Engineering (B.Tech.) from KIT's College Of Engineering, Kolhapur. Throughout my studies, I was immersed in a variety of subjects that deepened my understanding of computing and technology. From exploring Data Structures and Algorithms to diving into Web Development and Database Management Systems, I gained practical insights into the world of software development. My time at KIT's College allowed me to work on projects that applied theoretical concepts to real-world problems.",
        degree: "Bachelor of Technology - B.Tech. (Computer Science and Engineering)",
    },
    {
        id: 1,
        img: clg,
        school: "Shri Balaji Junior College, Ichalkaranji",
        date: "june 2019 - March 2021",
        grade: "92.33%",
        desc: "I completed my class 12 education from Shri Balaji Junior College, Ichalkaranji, under the Maharastra State board, where I studied Physics, Chemistry, and Mathematics (PCM) with Science.",
        degree: "HSC(XII) - Science(PCM)",
    },
    {
        id: 2,
        img: schl,
        school: "Kabnoor Highschool kabnoor, Ichalkaranji",
        date: "june 2018 - April 2019",
        grade: "90.40%",
        desc: "I completed my class 10 education from Kabnoor Highschool Kabnoor, Ichalkaranji, under the Maharastra State board, where I studied Marathi Medium Eduaction.",
        degree: "SCC(X), Marathi Medium Education",
    },
];

export const projects = [
    {
        id: 0,
        title: "Eco Place Website",
        description:
            "A full-stack eco-friendly shopping and e-commerce platform. Users can discover, review, and purchase sustainable products, helping to build a community-driven marketplace for green living. Built with React.js, Node.js, MongoDB, and Express.js for a seamless and interactive experience.",
        image: eco,
        tags: ["React Js", "Node Js", "MongoDB", "Express Js", "HTML", "JavaScript", "Tailwind CSS", "Plotch AI"],
        github: "https://github.com/adeshbhongale/EcoPlace",
        webapp: "https://eco-place-cyan.vercel.app/",
    },
    {
        id: 1,
        title: "Pro Manage Website",
        description:
            "A comprehensive task management web application designed to help users efficiently manage their daily tasks and projects. It features user authentication, task creation, assignment, and progress tracking. Built with React.js, Node.js, MongoDB, and Express.js, it provides a robust platform for productivity enhancement.",
        image: pro,
        tags: ["React Js", "Node Js", "MongoDB", "Express Js", "HTML", "CSS", "JavaScript", "JWT Auth"],
        github: "https://github.com/adeshbhongale/Pro_Manage_Website",
        webapp: "https://pro-manage-tasks.vercel.app/",
    },
    {
        id: 2,
        title: "AI Cover Letter Generator",
        description:
            "A web app that generates personalized cover letters using AI. Users input their details and job requirements, and the app creates tailored cover letters to streamline the job application process. Built with React and Gemini API for fast, relevant results.",
        image: cover,
        tags: ["React Js", "Node Js", "MongoDB", "Express Js", "HTML", "JavaScript", "Tailwind CSS", "Gemini API"],
        github: "https://github.com/adeshbhongale/ai-cover-letter-generator",
        webapp: "https://ai-cover-letter-generator-blush.vercel.app/",
    },
    {
        id: 3,
        title: "Orange Bug Tracker",
        description:
            "A bug tracking system that allows users to report, track, and manage bugs in software projects. It features user authentication, bug reporting, and a dashboard for managing reported issues. Built with the MERN stack (MongoDB, Express.js, React.js, Node.js) for a full-stack solution.",
        image: bug,
        tags: ["React JS", "Node.js", "MongoDB", "Express", "HTML", "Tailwind CSS", "JavaScript", "Redux"],
        github: "https://github.com/adeshbhongale/Orange-Bug-Tracker",
        webapp: "https://bug-tracker-orange.vercel.app/",
    },
    {
        id: 4,
        title: "ResuMate Website",
        description:
            "A web application that gives feedback based on the job description and resume. It features a user-friendly interface for resume building, editing, and downloading. Built with HTML, CSS, JavaScript, and Flask for a smooth user experience and backend functionality.",
        image: resu,
        tags: ["JavaScript", "HTML", "CSS", "Machine Learning", "Flask"],
        github: "https://github.com/adeshbhongale/ResuMate_Website",
        webapp: "https://resu-mate-lovat.vercel.app/",
    },
    {
        id: 5,
        title: "Resume Keyword Highlighter",
        description:
            "A web application that highlights important keywords in resumes, helping users optimize their CVs for better visibility. Built with HTML, CSS, and JavaScript, it features smooth animations and a clean, user-friendly interface.",
        image: highl,
        tags: ["HTML", "CSS", "JavaScript", "Python", "Flask"],
        github: "https://github.com/adeshbhongale/Resume_Keyword_Highlighter",
        webapp: "https://resume-keyword-highlighter-8.onrender.com/",
    },
    {
        id: 6,
        title: "Quick Rent Website",
        description:
            "A full-stack web application for renting products online. Users can browse available items, make bookings, and manage their rentals through an intuitive dashboard. Built with React.js, Node.js, MongoDB, and Express.js, it provides a seamless and efficient rental experience.",
        image: rent,
        tags: ["React JS", "HTML", "CSS", "JavaScript", "API"],
        github: "https://github.com/adeshbhongale/QuickRent_Assignment",
        webapp: "https://quick-rent-assignment.vercel.app/",
    },
    {
        id: 7,
        title: "Event Booking System",
        description:
            "A React.js-based application for booking and managing events. Users can browse, reserve, and organize events with a user-friendly interface and real-time updates.",
        image: book,
        tags: ["React JS", "API", "HTML", "CSS", "Javascript"],
        github: "https://github.com/adeshbhongale/Event_Booking_System",
        webapp: "https://event-booking-system-psi.vercel.app/",
    },
    {
        id: 8,
        title: "Currency Convertor",
        description:
            "A JavaScript application that allows users to convert currencies in real-time using API integration. It features a simple and intuitive interface for quick and accurate currency conversions.",
        image: curr,
        tags: ["HTML", "CSS", "Javascript", "API"],
        github: "https://github.com/adeshbhongale/Currency-Convertor",
        webapp: "https://currency-convertor-mu-five.vercel.app/",
    },
];