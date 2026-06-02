export const projects = [
  {
    id: 1,
    title: "Layanan Fasilitas Penkom - BKN",
    image: "/projects/penkom.png", // Add project cover image URL here (e.g., "/projects/penkom.png")
    description:
      "A real-time network monitoring system that tracks device status, bandwidth usage, and alerts for network anomalies. Built with a modern web stack and integrates with SNMP protocols.",
    shortDescription:
      "Real-time network monitoring with device tracking and anomaly alerts.",
    techStack: ["React", "Node.js", "Socket.IO", "Chart.js", "MySQL"],
    featured: true,
    timeline: "Nov 2025 – Mei 2026",
    responsibilities: [
      "Designed and implemented the real-time dashboard UI using React and Chart.js",
      "Built the backend API with Node.js and Socket.IO for live data streaming",
      "Integrated SNMP protocol for automated device discovery and status polling",
      "Developed alert system with configurable thresholds and notification channels",
    ],
    github: null,
    demo: null,
  },
  {
    id: 2,
    title: "UI/UX Design Layanan Akreditasi Lembaga - BKN",
    image: "/projects/akreditasi.png", // Add project cover image URL here
    description:
      "A comprehensive accreditation service platform for Badan Kepegawaian Negara (BKN), focusing on creating an intuitive and user-centered experience for accreditation applicants. The design covers key workflows including user authentication, account registration, accreditation submission, self-assessment questionnaires (SAQ), document management, payment processes, certification issuance, and application status tracking. The project emphasizes usability, accessibility, and efficient navigation to streamline the accreditation process for users and administrators.",
    shortDescription:
      "IT support ticket management with SLA tracking and analytics.",
    techStack: ["Figma", "Miro", "FigJam"],
    featured: true,
    timeline: "Mar 2024 – Jun 2024",
    responsibilities: [
      "Created wireframes and high-fidelity prototypes for the accreditation service platform using Figma",
      "Developed user flows, journey maps, and interaction designs for key workflows",
      "Conducted usability testing and incorporated feedback to improve user experience",
      "Collaborated with developers to ensure design specifications were implemented accurately",
    ],
    github: null,
    demo: null,
  },
  {
    id: 3,
    title: "Ekowisata Kabupaten Toba",
    image: "/projects/ekowisata.jpg", // Add project cover image URL here
    description:
      "A tourism information website developed to promote tourist destinations in Toba Regency. The platform provides comprehensive information about natural attractions, man-made attractions, religious tourism, educational tourism, local culture, galleries, and contact information, helping visitors explore and plan their trips more efficiently. This project aims to support digital tourism promotion and increase public access to tourism-related information in the Toba region.",
    shortDescription:
      "A tourism information website showcasing destinations, culture, galleries, and travel information across Toba Regency.",
    techStack: ["HTML", "CSS", "JavaScript", "PHP", "MySQL", "Bootstrap", "Figma", "Balsamiq"],
    featured: true,
    timeline: "Jan 2023 – Jun 2024",
    responsibilities: [
      "Served as Project Manager, coordinating project planning, task allocation, and team collaboration throughout the development lifecycle.",
      "Defined project requirements, scope, objectives, and development milestones with team members.",
      "Designed wireframes and user interface prototypes using Balsamiq and Figma.",
      "Developed the website using HTML, CSS, JavaScript, PHP, and Bootstrap.",
      "Implemented tourism information pages categorized into natural attractions, man-made attractions, religious tourism, educational tourism, and cultural tourism.",
      "Designed and managed a MySQL database for storing tourism destinations, categories, ",
      "Built a responsive user interface to ensure accessibility across desktop and mobile devices.",
      "Conducted testing and interface improvements to enhance usability and user experience.",
      "Collaborated with team members throughout the requirements analysis, system design, development, and documentation phases of the project."
    ],
    github: null,
    demo: "https://ekowisatatoba.great-site.net/",
  },
  {
    id: 4,
    title: "Inventory Management System",
    image: "", // Add project cover image URL here
    description:
      "A comprehensive system for tracking IT assets including computers, peripherals, and networking equipment. Features barcode scanning, depreciation tracking, and automated reporting.",
    shortDescription:
      "IT asset tracking with barcode scanning and automated reports.",
    techStack: ["Laravel", "Vue.js", "MySQL", "Bootstrap"],
    featured: false,
    timeline: "Jun 2023 – Sep 2023",
    responsibilities: [
      "Developed the asset management backend using Laravel MVC architecture",
      "Built responsive frontend interfaces with Vue.js components",
      "Implemented barcode scanning integration for quick asset registration",
      "Designed automated depreciation calculation and reporting system",
    ],
    github: null,
    demo: null,
  },
  {
    id: 5,
    title: "Student Portal Redesign",
    image: "", // Add project cover image URL here
    description:
      "Complete UI/UX redesign of the university student portal. Improved navigation, added dark mode, and implemented responsive design for better mobile experience.",
    shortDescription:
      "University portal redesign with improved UX and dark mode.",
    techStack: ["Figma", "HTML", "CSS", "JavaScript"],
    featured: false,
    timeline: "Feb 2024 – Apr 2024",
    responsibilities: [
      "Conducted user research and usability analysis of the existing portal",
      "Created wireframes and high-fidelity prototypes in Figma",
      "Implemented the new responsive frontend with semantic HTML and modern CSS",
      "Added dark mode support and accessibility improvements",
    ],
    github: null,
    demo: null,
  },
  {
    id: 6,
    title: "Automated Backup System",
    image: "", // Add project cover image URL here
    description:
      "Automated server backup solution with scheduled tasks, incremental backups, and cloud storage integration. Includes email notifications and restore verification.",
    shortDescription:
      "Server backup automation with scheduling and cloud integration.",
    techStack: ["Python", "Bash", "AWS S3", "Cron"],
    featured: false,
    timeline: "Nov 2023 – Jan 2024",
    responsibilities: [
      "Designed the backup strategy with full and incremental backup scheduling",
      "Developed Python scripts for automated backup execution and verification",
      "Integrated AWS S3 for secure cloud storage with lifecycle policies",
      "Implemented email notification system for backup status reporting",
    ],
    github: null,
    demo: null,
  },
];
