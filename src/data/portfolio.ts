export const siteConfig = {
  name: 'Biruk Tamirat',
  preferredName: 'Biruk',
  title: 'Computer Science graduate building polished digital products that help businesses earn trust and convert visitors into action.',
  email: 'yoseftamrat923@gmail.com',
  github: 'https://github.com/Isaac-Habesha',
  linkedin: 'https://www.linkedin.com/in/biruk-tamirat-b2a0b1394/',
  calendly: 'https://calendly.com/',
  resumeHref: '/biruk-tamirat-cv.pdf',
  location: 'Addis Ababa, Ethiopia',
};

export const skills = {
  Languages: ['JavaScript', 'TypeScript', 'Python', 'SQL'],
  Frameworks: ['React', 'Next.js', 'Node.js', 'Express.js', 'Django', 'Tailwind CSS'],
  Databases: ['PostgreSQL', 'Supabase PostgreSQL'],
  'Tools & Deployment': ['Git & GitHub', 'REST APIs', 'Vercel'],
};

export const projects = [
  {
    id: 'tourism-ai',
    title: 'Tourism & Local Services Platform',
    category: 'Web',
    summary:
      'A booking and discovery experience that helps local providers present their services clearly and converts interest into direct inquiries.',
    problem: 'Local tourism providers needed a clearer digital presence that made it easier for visitors to compare options and act quickly.',
    solution:
      'Built a responsive product experience with structured service discovery, guided browsing, and a friction-light path to contact or book.',
    techStack: ['React', 'Node.js', 'Express.js', 'PostgreSQL', 'Tailwind CSS', 'AI Integration'],
    role: 'Full-stack product builder',
    impact: 'Improved trust and made the service discovery flow easier to navigate for first-time visitors.',
    liveUrl: '#contact',
    githubUrl: 'https://github.com/Isaac-Habesha',
    screenshots: [
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
    ],
  },
  {
    id: 'dental-clinic',
    title: 'Fasil Dental – Dental Clinic Management System',
    category: 'Web',
    summary:
      'A clinic operations dashboard designed to simplify appointments, patient follow-up, and everyday admin work.',
    problem: 'Manual scheduling and scattered records caused delays and extra coordination for staff and patients.',
    solution:
      'Designed a full-stack system for appointment management, patient records, and admin workflows with a polished interface.',
    techStack: ['React', 'Django', 'PostgreSQL', 'REST API'],
    role: 'Product engineer',
    impact: 'Reduced admin friction and made scheduling more reliable for both staff and patients.',
    liveUrl: '#contact',
    githubUrl: 'https://github.com/Isaac-Habesha',
    screenshots: [
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1580281657527-47f249e8f4a4?auto=format&fit=crop&w=1200&q=80',
    ],
  },
  {
    id: 'fasil-link',
    title: 'FasilLink – Sales and Rental Marketplace with AI Recommendations',
    category: 'Web',
    summary:
      'A sales and rental marketplace with AI-powered recommendations focused on smart discovery, relevance, and accessible workflow design.',
    problem: 'Fragmented local listings made it hard for buyers and renters to find relevant products and properties quickly.',
    solution:
      'Created a full-stack marketplace with structured listings, AI-driven recommendation logic, role-aware access, and a clear path from browsing to action.',
    techStack: ['React', 'Node.js', 'Express.js', 'PostgreSQL', 'AI Recommendations'],
    role: 'Full-stack developer',
    impact: 'Improved discovery relevance and made everyday sales and rental transactions smoother for users.',
    liveUrl: '#contact',
    githubUrl: 'https://github.com/Isaac-Habesha',
    screenshots: [
      'https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    ],
  },
  {
    id: 'hotel-menu',
    title: 'Hotel Menu – Digital Hotel Menu and Ordering System',
    category: 'Web',
    summary:
      'A digital hotel menu and in-room/table ordering platform that lets guests browse dishes, customize orders, and submit requests seamlessly.',
    problem: 'Printed hotel menus were costly to update and slow manual order taking led to delays and miscommunication.',
    solution:
      'Built an interactive digital menu and ordering system with real-time item availability, category filtering, Telegram Bot notifications, and streamlined order submission.',
    techStack: ['Django', 'Python', 'HTML', 'CSS', 'JavaScript', 'PostgreSQL', 'Telegram Bot API'],
    role: 'Full-stack developer',
    impact: 'Reduced order turnaround time and simplified menu updates for hospitality staff.',
    liveUrl: '#contact',
    githubUrl: 'https://github.com/Isaac-Habesha',
    screenshots: [
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
    ],
  },
  {
    id: 'student-grade-portal',
    title: 'Student Grade Portal – Student Academic Results Management System',
    category: 'Web',
    summary:
      'An academic results management portal enabling students to view grades and transcripts securely while instructors manage assessments.',
    problem: 'Manual grade distribution and paper records caused delays, errors, and limited visibility for students and faculty.',
    solution:
      'Engineered a role-based academic portal with secure grade entry, automated GPA calculations, and instant result lookup.',
    techStack: ['Django', 'Python', 'SQLite', 'HTML', 'CSS', 'JavaScript'],
    role: 'Full-stack developer',
    impact: 'Streamlined grade publishing and gave students reliable, real-time access to their academic progress.',
    liveUrl: '#contact',
    githubUrl: 'https://github.com/Isaac-Habesha',
    screenshots: [
      'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=80',
    ],
  },
  {
    id: 'online-learning-platform',
    title: 'Online Learning Platform – Learning Management System (LMS)',
    category: 'Web',
    summary:
      'A full-featured Learning Management System supporting course delivery, student enrollment, progress tracking, and interactive assessments.',
    problem: 'Learners and instructors lacked a unified platform to organize course materials, track progress, and manage quizzes.',
    solution:
      'Developed a scalable LMS with structured course modules, JWT authentication, enrollment workflows, progress dashboards, and responsive media playback.',
    techStack: ['React', 'Tailwind CSS', 'Django REST Framework', 'Python', 'Supabase PostgreSQL', 'SimpleJWT'],
    role: 'Full-stack developer',
    impact: 'Enabled structured online instruction and improved learner engagement across courses.',
    liveUrl: '#contact',
    githubUrl: 'https://github.com/Isaac-Habesha',
    screenshots: [
      'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80',
    ],
  },
  {
    id: 'restaurant-order-management',
    title: 'Restaurant Order Management System (ROMS)',
    category: 'Web',
    summary:
      'An end-to-end restaurant operations and kitchen management system coordinating table orders, kitchen queues, and order status tracking.',
    problem: 'Disconnected front-of-house and kitchen workflows caused ticket bottlenecks and order errors during peak hours.',
    solution:
      'Built a real-time order and kitchen management system with live status boards, table tracking, and streamlined staff coordination.',
    techStack: ['Django', 'Python', 'HTML', 'CSS', 'JavaScript', 'PostgreSQL'],
    role: 'Full-stack developer',
    impact: 'Improved kitchen throughput, reduced order errors, and accelerated table turnover.',
    liveUrl: '#contact',
    githubUrl: 'https://github.com/Isaac-Habesha',
    screenshots: [
      'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=80',
    ],
  },
];

export const timeline = [
  {
    year: '2024',
    title: 'Computer Science graduate',
    description: 'Built a strong foundation in software development, systems thinking, and product-focused engineering through coursework and applied projects.',
  },
  {
    year: '2024',
    title: 'Software and IT internship',
    description: 'Worked in a practical environment where I improved workflows, collaborated with teams, and turned ideas into reliable web solutions.',
  },
  {
    year: '2025',
    title: 'Selected certifications and growth areas',
    description: 'Continued strengthening my skills in modern web development, cloud-minded delivery, and user-centered product work.',
  },
];

export const testimonials = [
  {
    quote:
      'Biruk brings calm focus to technical work and makes the product feel more clear and credible at every step.',
    author: 'Selamwork A., product lead',
  },
  {
    quote:
      'He balances strong execution with thoughtful communication, which makes collaboration easy even on fast-moving projects.',
    author: 'Meseret D., engineering mentor',
  },
];

export const blogPosts = [
  {
    title: 'Designing better booking flows for local service businesses',
    blurb: 'A look at how clearer layouts and stronger calls to action can improve conversion without making the experience feel pushy.',
    href: '#',
  },
  {
    title: 'What I learned building a full-stack clinic management system',
    blurb: 'Notes on balancing user experience, workflows, and technical reliability when building products for real operational use.',
    href: '#',
  },
];
