import { useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import {
  Phone,
  Mail,
  Linkedin,
  Github,
  Code,
  Database,
  Cloud,
  Terminal,
  Award,
  Briefcase,
  GraduationCap,
  ExternalLink,
  Download,
  Calendar,
  MapPin
} from 'lucide-react';

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
};

// Skills data from resume
const skills = {
  programming: ["C", "C++", "Java", "JavaScript", "Python"],
  frontend: ["React.js", "HTML", "CSS", "Tailwind CSS"],
  backend: ["Node.js", "Express.js"],
  databases: ["MongoDB", "MySQL"],
  api: ["REST APIs", "CRUD Operations", "JSON"],
  cloud: ["Firebase", "MongoDB Atlas", "AWS", "Docker", "Git"]
};

// Experience data
const experiences = [
  {
    title: "Intern",
    company: "EURO DREAMS EDUVERSEAS PRIVATE LIMITED",
    period: "Jan 2025 -- Feb 2025",
    description: "Collaborated with team members to deliver structured digital content aligned with business requirements. Followed defined workflows and coordination processes to meet project timelines."
  },
  {
    title: "Organizer",
    company: "National Level Hackathons (VoidHack 5.0 & 6.0)",
    period: "July 2023 -- 2024",
    description: "Coordinated with participants, mentors, and collaborators during national-level hackathons during the event."
  }
];

// Projects data
const projects = [
  {
    name: "AsyncMusic",
    tech: "React & Firebase",
    description: "Built a music streaming web application using React.js and Firebase. Implemented component-based UI, responsive design, and real-time updates. Deployed on Vercel.",
    link: "https://github.com/b-utkarsh-01/async_music"
  },
  {
    name: "Secure Authentication System",
    tech: "Next.js + Node.js",
    description: "Implemented JWT-based access and refresh token authentication with bcrypt password hashing. Developed middleware for protected API routes and role-based authorization.",
    link: "https://github.com/b-utkarsh-01/inbotiq-frontend"
  },
  {
    name: "AI PDF QnA System",
    tech: "LLaMA & RAG",
    description: "Developed a backend system to process PDFs and enable semantic search using LangChain, LlamaIndex, and FAISS.",
    link: "https://github.com/b-utkarsh-01/AI_PDF_QnA_LLaMa"
  },
  {
    name: "AI-BUDDY",
    tech: "VS Code Extension + Node.js",
    description: "Developed a custom VS Code extension integrated with an AI-powered Node.js backend.",
    link: "https://github.com/b-utkarsh-01/AI-BUDDY"
  },
  {
    name: "GitProfileDemo",
    tech: "JavaScript + REST APIs",
    description: "Built a JavaScript application to fetch and display GitHub profiles using REST APIs.",
    link: "https://github.com/b-utkarsh-01/GitProfileDemo"
  }
];

// Certifications data
const certifications = [
  {
    name: "Google Cloud Computing Foundations",
    provider: "Google",
    link: "https://drive.google.com/file/d/17fUamzo0T3v2QtsWW0IqdyJh11pRHN5c/view?usp=drive_link"
  },
  {
    name: "MERN Cohort",
    provider: "Sheryians",
    link: "https://drive.google.com/file/d/1nMNpEk8f5ZNWs0B2Rn-aFti1R9XCkK3j/view?usp=drive_link"
  },
  {
    name: "Introduction to Java",
    provider: "Coding Ninja's",
    link: "https://drive.google.com/file/d/1n52Hg6INaazOVPvU50WfVHLWhaYxRsYk/view?usp=drive_link"
  }
];

const SkillBadge = ({ skill }) => (
  <motion.span
    whileHover={{ scale: 1.05 }}
    className="px-3 py-1.5 bg-slate-800 border border-slate-600 rounded-full text-sm text-slate-200 hover:border-orange-400 hover:text-orange-300 transition-colors cursor-default"
  >
    {skill}
  </motion.span>
);

const SkillCategory = ({ icon: Icon, title, skills }) => (
  <motion.div
    variants={cardVariants}
    className="bg-slate-900/60 border border-slate-700 rounded-2xl p-5"
  >
    <div className="flex items-center gap-2 mb-4">
      <Icon className="w-5 h-5 text-orange-400" />
      <h3 className="text-lg font-semibold text-slate-200">{title}</h3>
    </div>
    <div className="flex flex-wrap gap-2">
      {skills.map((skill, index) => (
        <SkillBadge key={index} skill={skill} />
      ))}
    </div>
  </motion.div>
);

const ExperienceCard = ({ data, index }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ delay: index * 0.1 }}
    viewport={{ once: true }}
    className="relative pl-8 border-l-2 border-slate-700 pb-6 last:pb-0"
  >
    <div className="absolute -left-2 top-0 w-4 h-4 bg-orange-500 rounded-full border-4 border-slate-900" />
    <h3 className="text-xl font-semibold text-slate-200">{data.title}</h3>
    <p className="text-orange-400 text-sm mt-1">{data.company}</p>
    <div className="flex items-center gap-2 text-slate-400 text-sm mt-2">
      <Calendar className="w-4 h-4" />
      {data.period}
    </div>
    <p className="text-slate-300 mt-3 text-sm leading-relaxed">{data.description}</p>
  </motion.div>
);

const ProjectCard = ({ project, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    viewport={{ once: true }}
    whileHover={{ y: -5 }}
    className="bg-slate-900/60 border border-slate-700 rounded-2xl p-5 hover:border-orange-500/50 transition-colors"
  >
    <div className="flex justify-between items-start mb-3">
      <h3 className="text-lg font-semibold text-slate-200">{project.name}</h3>
      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-orange-400 hover:text-orange-300 transition-colors"
      >
        <ExternalLink className="w-5 h-5" />
      </a>
    </div>
    <p className="text-orange-300 text-sm mb-3">{project.tech}</p>
    <p className="text-slate-300 text-sm leading-relaxed">{project.description}</p>
  </motion.div>
);

const CertificationCard = ({ cert, index }) => (
  <motion.a
    href={cert.link}
    target="_blank"
    rel="noopener noreferrer"
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ delay: index * 0.1 }}
    whileHover={{ scale: 1.02 }}
    className="block bg-slate-900/60 border border-slate-700 rounded-xl p-4 hover:border-orange-500/50 transition-colors"
  >
    <div className="flex items-start gap-3">
      <Award className="w-6 h-6 text-orange-400 flex-shrink-0 mt-0.5" />
      <div>
        <h4 className="text-slate-200 font-medium">{cert.name}</h4>
        <p className="text-slate-400 text-sm">{cert.provider}</p>
      </div>
    </div>
  </motion.a>
);

// Hero Section Component
const HeroSection = () => {
  const heroRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-name", {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.2
      });
      gsap.from(".hero-contact", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.6
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="text-center py-12 px-4">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, type: "spring" }}
        className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-orange-400 to-rose-500 flex items-center justify-center"
      >
        <span className="text-4xl font-bold text-white">UP</span>
      </motion.div>

      <h1 className="hero-name text-4xl sm:text-5xl font-bold text-white mb-2">
        Utkarsh Pathak
      </h1>
      <p className="hero-name text-xl text-orange-400 mb-6">
        Backend-focused Computer Science Engineer
      </p>

      <div className="hero-contact flex flex-wrap justify-center gap-4 text-sm sm:text-base">
        <a
          href="tel:+918959348283"
          className="flex items-center gap-2 text-slate-300 hover:text-orange-400 transition-colors"
        >
          <Phone className="w-4 h-4" />
          +91-8959348283
        </a>
        <a
          href="mailto:butkarsh32@gmail.com"
          className="flex items-center gap-2 text-slate-300 hover:text-orange-400 transition-colors"
        >
          <Mail className="w-4 h-4" />
          butkarsh32@gmail.com
        </a>
      </div>

      <div className="hero-contact flex justify-center gap-4 mt-4">
        <a
          href="https://www.linkedin.com/in/utpathak/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-slate-200 rounded-lg hover:bg-slate-700 hover:text-orange-400 transition-colors"
        >
          <Linkedin className="w-4 h-4" />
          LinkedIn
        </a>
        <a
          href="https://github.com/b-utkarsh-01"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-slate-200 rounded-lg hover:bg-slate-700 hover:text-orange-400 transition-colors"
        >
          <Github className="w-4 h-4" />
          GitHub
        </a>
        <a
          href="https://leetcode.com/u/butkarsh32/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-slate-200 rounded-lg hover:bg-slate-700 hover:text-orange-400 transition-colors"
        >
          <Code className="w-4 h-4" />
          LeetCode
        </a>
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mt-6 px-6 py-3 bg-gradient-to-r from-orange-500 to-rose-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-orange-500/25 transition-all"
      >
        <Download className="w-4 h-4 inline mr-2" />
        Download Resume
      </motion.button>
    </section>
  );
};

// Summary Section
const SummarySection = () => (
  <motion.section
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-100px" }}
    variants={fadeInUp}
    className="rounded-3xl border border-slate-700 bg-slate-900/70 p-6 sm:p-8"
  >
    <h2 className="text-2xl font-bold text-orange-400 mb-4 flex items-center gap-2">
      <Briefcase className="w-6 h-6" />
      Summary
    </h2>
    <p className="text-slate-300 leading-relaxed">
      Backend-focused Computer Science undergraduate with hands-on experience in Node.js, Express.js, REST APIs, MongoDB, and Firebase.
      Strong foundation in C and JavaScript with experience building full-stack, AI-powered, and menu-driven applications.
    </p>
  </motion.section>
);

// Education Section
const EducationSection = () => (
  <motion.section
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-100px" }}
    variants={fadeInUp}
    className="rounded-3xl border border-slate-700 bg-slate-900/70 p-6 sm:p-8"
  >
    <h2 className="text-2xl font-bold text-orange-400 mb-6 flex items-center gap-2">
      <GraduationCap className="w-6 h-6" />
      Education
    </h2>
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
        <div>
          <h3 className="text-lg font-semibold text-slate-200">
            Shri Vaishnav Vidhyapeeth Vishawvidhyalya, Indore
          </h3>
          <p className="text-slate-400">Bachelor of Technology [ Computer Science & Engineering ]</p>
        </div>
        <div className="flex items-center gap-2 text-slate-400 text-sm">
          <Calendar className="w-4 h-4" />
          Expected Graduation: June 2026
        </div>
      </div>
    </div>
  </motion.section>
);

// Skills Section
const SkillsSection = () => (
  <motion.section
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-100px" }}
    variants={staggerContainer}
    className="space-y-6"
  >
    <motion.h2
      variants={fadeInUp}
      className="text-2xl font-bold text-orange-400 flex items-center gap-2"
    >
      <Terminal className="w-6 h-6" />
      Skills
    </motion.h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <SkillCategory icon={Code} title="Programming Languages" skills={skills.programming} />
      <SkillCategory icon={Code} title="Frontend Technologies" skills={skills.frontend} />
      <SkillCategory icon={Database} title="Backend Technologies" skills={skills.backend} />
      <SkillCategory icon={Database} title="Databases" skills={skills.databases} />
      <SkillCategory icon={Cloud} title="API Development" skills={skills.api} />
      <SkillCategory icon={Cloud} title="Cloud & Tools" skills={skills.cloud} />
    </div>
  </motion.section>
);

// Experience Section
const ExperienceSection = () => (
  <motion.section
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-100px" }}
    variants={staggerContainer}
    className="space-y-6"
  >
    <motion.h2
      variants={fadeInUp}
      className="text-2xl font-bold text-orange-400 flex items-center gap-2"
    >
      <Briefcase className="w-6 h-6" />
      Experience
    </motion.h2>
    <div className="bg-slate-900/60 border border-slate-700 rounded-2xl p-6">
      {experiences.map((exp, index) => (
        <ExperienceCard key={index} data={exp} index={index} />
      ))}
    </div>
  </motion.section>
);

// Projects Section
const ProjectsSection = () => (
  <motion.section
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-100px" }}
    variants={staggerContainer}
    className="space-y-6"
  >
    <motion.h2
      variants={fadeInUp}
      className="text-2xl font-bold text-orange-400 flex items-center gap-2"
    >
      <Code className="w-6 h-6" />
      Projects
    </motion.h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {projects.map((project, index) => (
        <ProjectCard key={index} project={project} index={index} />
      ))}
    </div>
  </motion.section>
);

// Certifications Section
const CertificationsSection = () => (
  <motion.section
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-100px" }}
    variants={staggerContainer}
    className="space-y-6"
  >
    <motion.h2
      variants={fadeInUp}
      className="text-2xl font-bold text-orange-400 flex items-center gap-2"
    >
      <Award className="w-6 h-6" />
      Certifications
    </motion.h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {certifications.map((cert, index) => (
        <CertificationCard key={index} cert={cert} index={index} />
      ))}
    </div>
  </motion.section>
);

const About = () => {
  return (
    <div className="space-y-8 pb-12">
      {/* Hero Section */}
      <HeroSection />

      {/* Summary */}
      <SummarySection />

      {/* Education */}
      <EducationSection />

      {/* Skills */}
      <SkillsSection />

      {/* Experience */}
      <ExperienceSection />

      {/* Projects */}
      <ProjectsSection />

      {/* Certifications */}
      <CertificationsSection />
    </div>
  )
}

export default About
