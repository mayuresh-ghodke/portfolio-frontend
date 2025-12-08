// src/data/data.js

// ---------------- ABOUT INFO ----------------
export const fallbackAbout = {
  aboutId: 1,
  aboutBio:
    "Focused and reliable professional known for strong work ethics, attention to detail, and a commitment to performing every task with accuracy, integrity, and professionalism.",
  aboutInfo:
    "<p>I am a dedicated and disciplined professional who believes in delivering consistent quality, maintaining strong work ethics, and making meaningful contributions to every project I work on. I approach each responsibility with sincerity, accountability, and a deep commitment to continuous improvement. Over the years, I have gained hands-on experience working on multiple real-world projects that strengthened both my technical abilities and my problem-solving mindset.</p><p>I have worked on projects involving <strong>Java, Spring Boot, Spring Security, Hibernate, MySQL, ReactJS, PostgreSQL, and REST API development</strong>. My experience includes building secure backend systems, designing responsive user interfaces, handling database operations, integrating payment gateways, and developing full-stack applications. Some of my notable projects include creating an NGO donation platform, a legal document automation system, a sports equipment shop application, a freelancer bidding platform, and a personal portfolio website built with React and Spring Boot. These projects helped me understand application architecture, user experience, data management, and real-world deployment challenges.</p><p>I enjoy taking on challenges because they allow me to refine my abilities and learn new technologies. Whether working independently or as part of a team, I prioritize accuracy, clean code, efficient design, and meaningful results. I remain calm under pressure, analyze problems carefully, and deliver work that meets expectations with professionalism.</p>",
  aboutTitle: "Java Full Stack Developer",
  imgUrl: "about-image.jpg",
};

// ---------------- PROJECTS ----------------
export const fallbackProjects = [
  {
    projectId: 102,
    name: "SportNest",
    subtitle: "E-Commerce Application",
    startDate: "2025-01-10",
    endDate: "2025-08-08",
    images: [
      "sportnest_home.png"
     ],
    info: "<ul><li>Designed and implemented a scalable, modular architecture with role-based dashboards (Admin, Customer, Delivery) to ensure seamless multi-role access, navigation, and improved user experience. </li><li>Implemented Razorpay payment gateway interface, as well as Twilio for sms and Email API.&nbsp;</li></ul>",
    tech: [
      "Java",
      "Springboot",
      "REST API",
      "Hibernate",
      "Spring Security",
      "Thymleaf",
      "HTML",
      "CSS",
      "MySQL",
    ],
    github: "https://github.com/mayuresh-ghodke/SportNest.git",
    link: "https://ecommerceapp-customer-v1-0.onrender.com/shop/",
    hidden: false,
  },
  {
    projectId: 103,
    name: "Portfolio ",
    subtitle: "Portfolio web application",
    startDate: "2025-20-11",
    endDate: "2025-04-12",
    images: [""],
    info: "<ul><li>A responsive personal portfolio website to showcase my skills, projects, and professional experience. </li><li>Includes dynamic sections for About, Skills, Projects, and Contact, with smooth animations and interactive elements</li></ul>",
    tech: ["ReactJS", "Springboot", "PostgresSQL", "HTML", "CSS"],
    github: "https://github.com/mayuresh-ghodke/portfolio-frontend.git",
    link: "",
    hidden: false,
  },
  {
    projectId: 104,
    name: "FreelanceWave ",
    subtitle: "Freelancing platoform",
    startDate: "2023-29-04",
    endDate: "2023-17-08",
    images: [
      "",
    ],
    info: "<ul><li>Developed a freelancing platform that connects clients with freelancers for project collaboration.</li><li>Implemented secure user authentication and authorization using PHP sessions.</li><li>Built modules for posting projects, bidding, managing bids, and tracking project progress.</li></ul>",
    tech: ["PHP", "JavaScript", "MySQL", "HTML", "CSS"],
    github: "https://github.com/mayuresh-ghodke/FreelanceWave-PHP-Project.git",
    link: "https://github.com/mayuresh-ghodke/FreelanceWave-PHP-Project.git",
    hidden: false,
  },
  {
    projectId: 105,
    name: "laptopShoppy",
    subtitle: "E-commerce application",
    startDate: "2022-12-22",
    endDate: "2023-04-04",
    images: [ ""],
    info: "<ul><li>Developed a fully functional e-commerce web application for browsing, filtering, and purchasing laptops.</li> <li>Implemented user authentication using JSP, Servlet, and secure session management.</li> <li>Designed modules for product listing, product details, shopping cart, and order placement.</li></ul>",
    tech: ["JSP", "Servlet", "JavaScript", "MySQL", "HTML", "CSS", "BootStrap"],
    github: "https://github.com/mayuresh-ghodke/e-commerce-laptopshoppy.git",
    link: "https://github.com/mayuresh-ghodke/e-commerce-laptopshoppy.git",
    hidden: false,
  },
];

// ---------------- PROFILE ----------------
export const fallbackProfile = {
  firstName: "Mayuresh",
  lastName: "Ghodke",
  dob: "30/10/2001",
  city: "Pune",
  address: "",
  mobile: "7559201990",
  email: "ghodkemayuresh86@gmail.com",
  linkedInUrl:
    "https://www.linkedin.com/in/mayuresh-ghodke-72704027b",
  githubUrl: "https://github.com/mayuresh-ghodke",
  instaUrl: null,
  fbUrl: null,
};

// ---------------- EXPERIENCE ----------------
export const fallbackExperience = [
  {
    expId: 1,
    companyName: "A2Z Infotech",
    roleName: "Web Developer Intern",
    location: "Ahilyanagar",
    startedIn: "2024-01-10",
    endedOn: "2024-07-12",
    workMode: "Remote",
    description:
      "<ul><li>Developed responsive web pages using HTML, CSS, JavaScript, and React.</li><li>Worked on API integration and improved UI/UX for better user engagement.</li><li>Collaborated with the team using Git &amp; GitHub for version control.</li><li>Fixed bugs, optimized performance, and improved website loading speed.</li></ul>",
    jobType: "Internship",
    hidden: false,
  },
];

// ---------------- EDUCATION ----------------
export const fallbackEducation = [
  {
    eduId: 3,
    degreeName: "Masters in Computer Application",
    schoolName: "Sinhgad Institute of Management, Vadgaon Bk",
    place: "Pune",
    universityName: "Savitribai Phule Pune University",
    passingYear: "2024",
  },
  {
    eduId: 4,
    degreeName: "B.Sc. Computer Science",
    schoolName: "B.P.H.E. Society's Ahmednagar College",
    place: "Ahilyanagar",
    universityName: "Savitribai Phule Pune University",
    passingYear: "2022",
  },
];

// ---------------- SKILLS ----------------
export const fallbackSkills = [
  {
    id: 1,
    skillName: "Java",
    iconName: "Java",
    category: { id: 2, categoryName: "Backend" },
  },
  {
    id: 2,
    skillName: "Springboot",
    iconName: "springboot",
    category: { id: 2, categoryName: "Backend" },
  },
  {
    id: 3,
    skillName: "Spring Security",
    iconName: "spring security",
    category: { id: 2, categoryName: "Backend" },
  },
  {
    id: 4,
    skillName: "JWT",
    iconName: "jwt",
    category: { id: 2, categoryName: "Backend" },
  },
  {
    id: 5,
    skillName: "Hibernate",
    iconName: "hibernate",
    category: { id: 2, categoryName: "Backend" },
  },
  {
    id: 6,
    skillName: "REST API",
    iconName: "rest api",
    category: { id: 2, categoryName: "Backend" },
  },
  {
    id: 7,
    skillName: "HTML5",
    iconName: "html5",
    category: { id: 1, categoryName: "Frontend" },
  },
  {
    id: 8,
    skillName: "CSS3",
    iconName: "css3",
    category: { id: 1, categoryName: "Frontend" },
  },
  {
    id: 9,
    skillName: "ReactJS",
    iconName: "reactjs",
    category: { id: 1, categoryName: "Frontend" },
  },
  {
    id: 10,
    skillName: "JavaScript",
    iconName: "javascript",
    category: { id: 1, categoryName: "Frontend" },
  },
  {
    id: 11,
    skillName: "Bootstrap",
    iconName: "bootstrap",
    category: { id: 1, categoryName: "Frontend" },
  },
  {
    id: 12,
    skillName: "Git",
    iconName: "git",
    category: { id: 5, categoryName: "Tools" },
  },
  {
    id: 13,
    skillName: "GitHub",
    iconName: "github",
    category: { id: 5, categoryName: "Tools" },
  },
  {
    id: 14,
    skillName: "Docker",
    iconName: "docker",
    category: { id: 5, categoryName: "Tools" },
  },
  {
    id: 15,
    skillName: "MySQL",
    iconName: "mysql",
    category: { id: 5, categoryName: "Tools" },
  },
  {
    id: 16,
    skillName: "Postman",
    iconName: "postman",
    category: { id: 5, categoryName: "Tools" },
  },
];
