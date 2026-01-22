import React, { useState, useEffect } from 'react';
import { Moon, Sun, Menu, X, Github, Linkedin, Mail } from 'lucide-react';
import { cn } from './lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

const Section = ({ id, title, children, className }) => (
  <section id={id} className={cn("py-20 px-6", className)}>
    <div className="max-w-6xl mx-auto">
      {title && (
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold mb-12 text-center"
        >
          {title}
          <div className="h-1 w-20 bg-primary-500 mx-auto mt-4 rounded-full" />
        </motion.h2>
      )}
      {children}
    </div>
  </section>
);

const Navbar = ({ darkMode, setDarkMode }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Achievements', href: '#achievements' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={cn(
      "fixed top-0 w-full z-50 transition-all duration-300 px-6 py-4",
      isScrolled ? "bg-white/80 dark:bg-slate-950/80 backdrop-blur-md shadow-lg" : "bg-transparent"
    )}>
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <a href="#" className="text-2xl font-bold bg-gradient-to-r from-primary-500 to-indigo-500 bg-clip-text text-transparent">
          DC.
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium hover:text-primary-500 transition-colors"
            >
              {link.name}
            </a>
          ))}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>

        {/* Mobile Nav Toggle */}
        <div className="md:hidden flex items-center gap-4">
          <button onClick={() => setDarkMode(!darkMode)} className="p-2">
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2">
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-slate-900 border-b dark:border-slate-800 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-medium"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const [text, setText] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const roles = ["Software Engineer", "Web Developer", "Data Science Enthusiast"];
  const typingSpeed = 150;
  const deletingSpeed = 75;
  const pauseTime = 2000;

  useEffect(() => {
    const handleTyping = () => {
      const currentRole = roles[roleIndex];
      if (!isDeleting) {
        setText(currentRole.substring(0, text.length + 1));
        if (text === currentRole) {
          setTimeout(() => setIsDeleting(true), pauseTime);
        }
      } else {
        setText(currentRole.substring(0, text.length - 1));
        if (text === '') {
          setIsDeleting(false);
          setRoleIndex((roleIndex + 1) % roles.length);
        }
      }
    };

    const timer = setTimeout(handleTyping, isDeleting ? deletingSpeed : typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, roleIndex]);

  return (
    <section className="min-h-screen flex items-center justify-center pt-20 px-6 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-1/4 -left-20 w-72 h-72 bg-primary-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-pulse" delay-1000 />

      <div className="max-w-4xl w-full text-center z-10">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-primary-500 font-medium tracking-wider mb-4"
        >
          HELLO, I'M
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold mb-6"
        >
          Divyansh Chourey
        </motion.h1>
        <div className="h-12 flex items-center justify-center text-xl md:text-3xl font-medium text-slate-600 dark:text-slate-400">
          <span>{text}</span>
          <span className="w-1 h-8 bg-primary-500 ml-2 animate-pulse" />
        </div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-lg text-slate-500 dark:text-slate-500 max-w-2xl mx-auto"
        >
          "Building modern web & embedded solutions"
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 flex flex-wrap justify-center gap-6"
        >
          <a href="#projects" className="px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-full font-medium transition-all shadow-lg hover:shadow-primary-500/25">
            View Projects
          </a>
          <a href="/Divyansh-Chourey-SGSITS Indore.pdf" download="Divyansh-Chourey-SGSITS Indore.pdf" className="px-8 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
            Download Resume
          </a>
          <a href="#contact" className="px-8 py-3 text-primary-500 font-medium hover:underline">
            Contact Me
          </a>
        </motion.div>
      </div>
    </section>
  );
};

const About = () => (
  <Section id="about" title="About Me">
    <div className="grid md:grid-cols-2 gap-12 items-center">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="relative group">
          <div className="absolute -inset-4 bg-gradient-to-r from-primary-500 to-indigo-500 rounded-2xl opacity-25 group-hover:opacity-40 blur transition duration-1000" />
          <div className="relative bg-white dark:bg-slate-900 p-2 rounded-2xl border border-slate-200 dark:border-slate-800">
            <div className="aspect-square rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center overflow-hidden">
              <img
                src="/profile.jpg"
                alt="Divyansh Chourey"
                className="w-full h-full object-cover rounded-xl transition-transform duration-500 group-hover:scale-110"
              />
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-6"
      >
        <h3 className="text-2xl font-bold">I'm a 3rd-year IT student at SGSITS Indore</h3>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
          As an aspiring software engineer graduating in 2027, I have a deep passion for problem-solving and developing real-world applications. My interests span across Web Development, Data Science, and Embedded Systems.
        </p>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
          Maintaining a CGPA of 7.92, I balance my academic rigor with practical project building and community involvement. I love the process of turning complex ideas into functional, user-centric solutions.
        </p>

        <div className="grid grid-cols-2 gap-4 pt-4">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
            <div className="text-primary-500 font-bold text-xl">GPA (Current)</div>
            <div className="text-lg">7.92</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
            <div className="text-primary-500 font-bold text-xl">Graduation</div>
            <div className="text-lg">2027</div>
          </div>
        </div>
      </motion.div>
    </div>
  </Section>
);

const SkillCard = ({ category, skills }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:shadow-xl transition-shadow"
  >
    <h3 className="text-xl font-bold mb-6 text-primary-500">{category}</h3>
    <div className="space-y-4">
      {skills.map((skill) => (
        <div key={skill.name}>
          <div className="flex justify-between mb-1">
            <span className="font-medium">{skill.name}</span>
            <span className="text-sm text-slate-500">{skill.level}%</span>
          </div>
          <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${skill.level}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="h-full bg-primary-500"
            />
          </div>
        </div>
      ))}
    </div>
  </motion.div>
);

const Skills = () => {
  const skillsData = [
    {
      category: "Programming",
      skills: [
        { name: "C / C++", level: 90 },
        { name: "Java", level: 85 },
        { name: "Python", level: 80 }
      ]
    },
    {
      category: "Web Development",
      skills: [
        { name: "HTML / CSS", level: 95 },
        { name: "JavaScript", level: 85 },
        { name: "React.js", level: 80 },
        { name: "REST APIs", level: 75 }
      ]
    },
    {
      category: "Tools & Others",
      skills: [
        { name: "Git / GitHub", level: 85 },
        { name: "Firebase", level: 70 },
        { name: "Linux", level: 65 },
        { name: "DSA", level: 80 }
      ]
    }
  ];

  return (
    <Section id="skills" title="Technical Skills">
      <div className="grid md:grid-cols-3 gap-8">
        {skillsData.map((cat) => (
          <SkillCard key={cat.category} {...cat} />
        ))}
      </div>
    </Section>
  );
};

const Projects = () => {
  const projectList = [
    {
      title: "Civil Automation Business Website",
      desc: "A multi-page React + TypeScript platform with reusable components, optimized for Civil automation services.",
      tech: ["React", "TypeScript", "Tailwind", "Firebase"],
      link: "#"
    },
    {
      title: "Conway’s Game of Life",
      desc: "Interactive web simulation of the famous cellular automaton using pure HTML/CSS and JavaScript.",
      tech: ["HTML", "CSS", "JavaScript"],
      link: "#"
    },
    {
      title: "Keypad Door Lock System",
      desc: "Microcontroller-based security system with EEPROM for password storage and solenoid lock control.",
      tech: ["C", "AVR/PIC", "EEPROM", "Solenoid"],
      link: "#"
    },
    {
      title: "Self-Balancing Robot",
      desc: "Control system implementation for a 2-wheeled robot using ESP32, MPU6050, and PID control algorithms.",
      tech: ["ESP32", "C", "MPU6050", "PID"],
      link: "#"
    }
  ];

  return (
    <Section id="projects" title="Featured Projects">
      <div className="grid md:grid-cols-2 gap-8">
        {projectList.map((project, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            className="group relative overflow-hidden rounded-3xl bg-slate-900 aspect-video md:aspect-[16/10]"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent p-8 flex flex-col justify-end">
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map(t => (
                  <span key={t} className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-medium text-white/80 border border-white/10 uppercase tracking-widest">
                    {t}
                  </span>
                ))}
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
              <p className="text-slate-300 text-sm mb-6 line-clamp-2">{project.desc}</p>
              <div className="flex gap-4">
                <a href={project.link} className="flex items-center gap-2 text-primary-400 font-medium hover:text-primary-300 transition-colors">
                  View Source <Github size={16} />
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
};

const Achievements = () => {
  const data = [
    { title: "NPTEL Python for Data Science", detail: "Elite + Silver Medal", icon: "🏆" },
    { title: "5⭐ Java Programmer", detail: "HackerRank Achievement", icon: "⭐" },
    { title: "Java Certification", detail: "HackerRank Certified", icon: "📜" },
    { title: "100+ DSA Solved", detail: "Problem solving across LeetCode & CodeChef", icon: "💻" }
  ];

  return (
    <Section id="achievements" title="Achievements & Certifications">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {data.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center"
          >
            <div className="text-4xl mb-4">{item.icon}</div>
            <h4 className="font-bold mb-2">{item.title}</h4>
            <p className="text-sm text-slate-500">{item.detail}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
};

const Experience = () => (
  <Section id="experience" title="Experience & Leadership">
    <div className="space-y-8 max-w-3xl mx-auto">
      <div className="relative pl-8 border-l border-primary-500/30">
        <div className="absolute left-[-5px] top-0 w-2.5 h-2.5 rounded-full bg-primary-500 shadow-[0_0_10px_rgba(14,165,233,0.5)]" />
        <div className="mb-1 text-primary-500 font-bold">2024 (2 Months)</div>
        <h4 className="text-xl font-bold">Internship at ACAPL</h4>
        <p className="text-slate-500 italic mb-2">Anubha Chauhan & Associates</p>
        <p className="text-slate-600 dark:text-slate-400">Gained practical exposure in a professional environment, working on software solutions and team collaborations.</p>
      </div>

      <div className="relative pl-8 border-l border-primary-500/30">
        <div className="absolute left-[-5px] top-0 w-2.5 h-2.5 rounded-full bg-primary-500 shadow-[0_0_10px_rgba(14,165,233,0.5)]" />
        <div className="mb-1 text-primary-500 font-bold">Active</div>
        <h4 className="text-xl font-bold">Graphics Team Core Member</h4>
        <p className="text-slate-500 italic mb-2">IDEALab SGSITS</p>
        <p className="text-slate-600 dark:text-slate-400">Leading and contributing to visual communication and community engagement within the college innovation hub.</p>
      </div>
    </div>
  </Section>
);

const Contact = () => (
  <Section id="contact" title="Get In Touch">
    <div className="grid md:grid-cols-2 gap-12">
      <div className="space-y-8">
        <div>
          <h3 className="text-2xl font-bold mb-4">Let's talk about everything!</h3>
          <p className="text-slate-600 dark:text-slate-400">
            Don't like forms? Send me an email at <span className="text-primary-500 font-medium">divyanshchourey99@gmail.com</span>
          </p>
        </div>

        <div className="flex gap-4">
          <a href="https://www.linkedin.com/in/divyansh-chourey-a52131298" target="_blank" rel="noopener noreferrer" className="p-4 rounded-full bg-slate-100 dark:bg-slate-800 hover:text-primary-500 transition-colors">
            <Linkedin size={24} />
          </a>
          <a href="https://github.com/divyanshchourey" target="_blank" rel="noopener noreferrer" className="p-4 rounded-full bg-slate-100 dark:bg-slate-800 hover:text-primary-500 transition-colors">
            <Github size={24} />
          </a>
          <a href="mailto:divyanshchourey99@gmail.com" className="p-4 rounded-full bg-slate-100 dark:bg-slate-800 hover:text-primary-500 transition-colors">
            <Mail size={24} />
          </a>
        </div>
      </div>

      <form className="space-y-4">
        <input type="text" placeholder="Name" className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-primary-500 transition-colors" />
        <input type="email" placeholder="Email" className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-primary-500 transition-colors" />
        <textarea placeholder="Message" rows="5" className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-primary-500 transition-colors"></textarea>
        <button type="submit" className="w-full py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-2xl font-bold transition-all shadow-lg">
          Send Message
        </button>
      </form>
    </div>
  </Section>
);

const Footer = () => (
  <footer className="py-12 border-t border-slate-200 dark:border-slate-800 text-center px-6">
    <p className="text-slate-500">
      &copy; {new Date().getFullYear()} Divyansh Chourey.
    </p>
  </footer>
);

export default function App() {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen">
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Achievements />
      <Contact />
      <Footer />
    </div>
  );
}
