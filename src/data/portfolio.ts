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
  Frontend: ['React', 'Next.js', 'Tailwind CSS'],
  Backend: ['Node.js', 'Express.js', 'Django', 'REST APIs'],
  'Databases & Platforms': ['PostgreSQL', 'Supabase'],
  'Tools & Deployment': ['Git & GitHub', 'Vercel'],
};

export type ProjectItem = {
  id: string;
  title: string;
  category: string;
  summary: string;
  overview: string;
  problem: string;
  solution: string;
  features: string[];
  techStack: string[];
  role: string;
};

export const projects: ProjectItem[] = [
  {
    id: 'hotel-digital-menu',
    title: 'Hotel Digital Menu & Online Ordering System',
    category: 'Web',
    summary:
      'A digital hotel menu and online ordering platform that allows guests to explore menu items, view details, and submit orders online.',
    overview:
      'Designed and built a digital hotel menu and online ordering web application that replaces static printed menus with an interactive browsing and ordering experience for guests.',
    problem:
      'Traditional printed menus are difficult to keep updated and manual order taking introduces delays and communication errors.',
    solution:
      'Built a structured digital menu and online ordering system backed by PostgreSQL and integrated with the Telegram Bot API for order notifications.',
    features: [
      'Interactive menu browsing with category organization and item details',
      'Online order submission workflow for guests',
      'Real-time order notifications via Telegram Bot API',
      'Backend administration for menu items and order management',
    ],
    techStack: ['Django', 'Python', 'PostgreSQL', 'JavaScript', 'HTML', 'CSS', 'Telegram Bot API'],
    role: 'Full-stack developer',
  },
  {
    id: 'restaurant-order-management',
    title: 'Restaurant Order Management System',
    category: 'Web',
    summary:
      'A restaurant operations management system designed to manage customer orders, approval workflows, kitchen operations, order status updates, and administrative activities.',
    overview:
      'Developed a multi-role restaurant operations platform coordinating customer orders, approval stages, kitchen queues, status tracking, and administrative oversight.',
    problem:
      'Disconnected ordering, approval, and kitchen workflows create bottlenecks and make it hard for staff to track order progress accurately.',
    solution:
      'Implemented a modular Django and Channels-powered system with role-based apps for accounts, menu, orders, approvals, kitchen operations, payments, analytics, and audit logs.',
    features: [
      'Customer order intake and structured approval workflows',
      'Live kitchen operations board and order status updates via Django Channels',
      'Role-based access across staff, kitchen, and administrative workflows',
      'Administrative dashboards, payment tracking, analytics, and audit logging',
    ],
    techStack: ['Django', 'Python', 'PostgreSQL', 'Django Channels', 'Redis', 'Bootstrap 5', 'HTML', 'CSS', 'JavaScript'],
    role: 'Full-stack developer',
  },
  {
    id: 'hotel-booking-platform',
    title: 'Hotel Business Website & Booking Platform',
    category: 'Web',
    summary:
      'A professional hotel website that allows visitors to explore hotel information, accommodation, facilities, and services, with an integrated booking feature.',
    overview:
      'Built a modern, responsive hospitality website and booking platform enabling prospective guests to browse rooms, amenities, and services and submit booking requests directly.',
    problem:
      'Visitors needed a clear, trustworthy digital experience to explore accommodation options and initiate bookings without friction.',
    solution:
      'Created a React and Tailwind CSS frontend connected to Supabase for data management and Resend for booking communication workflows.',
    features: [
      'Responsive showcase of hotel information, rooms, facilities, and services',
      'Integrated online booking request workflow',
      'Backend data integration with Supabase',
      'Automated email handling powered by Resend',
    ],
    techStack: ['React', 'Vite', 'Tailwind CSS', 'Supabase', 'Resend', 'JavaScript'],
    role: 'Full-stack developer',
  },
  {
    id: 'student-grade-portal',
    title: 'Student Grade Portal',
    category: 'Web',
    summary:
      'An academic results management platform that allows students to access published course grades using their assigned student IDs. Authorized instructors manage and publish academic results.',
    overview:
      'Engineered a role-aware academic results portal allowing instructors to record and publish grades while giving students direct access to their published course results.',
    problem:
      'Manual grade distribution and paper-based result tracking create delays and limit timely visibility for students and instructors.',
    solution:
      'Built a Django web application with student ID-based grade lookup and dedicated instructor workflows for managing and publishing academic results.',
    features: [
      'Student grade lookup using assigned student IDs',
      'Authorized instructor access for managing and publishing course results',
      'Structured academic records stored in SQLite',
      'Clean, responsive interface built with HTML, CSS, and JavaScript',
    ],
    techStack: ['Django', 'Python', 'SQLite', 'HTML', 'CSS', 'JavaScript'],
    role: 'Full-stack developer',
  },
  {
    id: 'online-learning-platform',
    title: 'Online Learning Management Platform',
    category: 'Web',
    summary:
      'An online learning platform designed to manage courses, instructors, learners, and educational content through a dedicated web application.',
    overview:
      'Architecting a decoupled full-stack Learning Management System with a React and Tailwind CSS frontend paired with a Django REST Framework API and JWT authentication.',
    problem:
      'Instructors and learners need a unified digital environment to organize courses, manage enrollments, and deliver structured educational content.',
    solution:
      'Building a RESTful backend with Django REST Framework and SimpleJWT backed by PostgreSQL/Supabase, consumed by a responsive React client.',
    features: [
      'Course, instructor, and learner management workflows',
      'Structured educational content delivery',
      'Token-based authentication using SimpleJWT',
      'Responsive frontend built with React and Tailwind CSS',
    ],
    techStack: ['React', 'Tailwind CSS', 'Django REST Framework', 'Python', 'PostgreSQL', 'Supabase', 'SimpleJWT'],
    role: 'Full-stack developer',
  },
  {
    id: 'dental-clinic-website',
    title: 'Dental Clinic Website',
    category: 'Web',
    summary:
      'A professional dental clinic website that presents clinic information, dental services, and patient-facing functionality.',
    overview:
      'Designed a clean, patient-friendly dental clinic web platform focused on presenting clinic details, available dental treatments, and accessible patient-facing interactions.',
    problem:
      'Patients looking for dental care need clear information about available services and an approachable way to connect with the clinic online.',
    solution:
      'Structured a full-stack architecture combining a React frontend with a Django and PostgreSQL backend for clinic information and patient-facing features.',
    features: [
      'Clear presentation of clinic information and dental services',
      'Patient-facing interface designed for accessibility and ease of use',
      'Structured backend architecture with Django and PostgreSQL',
    ],
    techStack: ['React', 'Django', 'PostgreSQL'],
    role: 'Full-stack developer',
  },
];

export const timeline = [
  {
    year: '2026',
    title: 'Computer Science graduate',
    description: 'Built a strong foundation in software development, systems thinking, and product-focused engineering through coursework and applied projects.',
  },
  {
    year: '2025',
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
