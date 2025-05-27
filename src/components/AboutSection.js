import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, useInView, AnimatePresence } from 'framer-motion';

const AboutSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeSkill, setActiveSkill] = useState(null);
  const [hoveredTimeline, setHoveredTimeline] = useState(null);
  const aboutRef = useRef(null);
  const controls = useAnimation();
  const isInView = useInView(aboutRef, { once: false, amount: 0.2 });

  // Handle mouse movement for glow effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = aboutRef.current?.getBoundingClientRect() || {};

      if (aboutRef.current) {
        const x = clientX - left;
        const y = clientY - top;

        if (x >= 0 && x <= width && y >= 0 && y <= height) {
          setMousePosition({ x, y });
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Animate elements when in view
  useEffect(() => {
    if (isInView) {
      controls.start('visible');
      createParticles();
    }
  }, [controls, isInView]);

  // Create background particles
  const [particles, setParticles] = useState([]);
  const [isResearchHovered, setIsResearchHovered] = useState(false);
  
  const createParticles = () => {
    const newParticles = [];
    const colors = ['#3498db', '#2ecc71', '#9b59b6', '#f1c40f'];

    for (let i = 0; i < 20; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 20 + Math.random() * 60,
        color: colors[Math.floor(Math.random() * colors.length)],
        duration: 15 + Math.random() * 30,
      });
    }

    setParticles(newParticles);
  };

  // Animated background particles component
  const BackgroundParticles = () => {
    return (
      <div className="particles-container">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="particle"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              backgroundColor: particle.color,
            }}
            animate={{
              x: [0, Math.random() * 200 - 100],
              y: [0, Math.random() * 200 - 100],
              opacity: [0.1, 0.15, 0.1],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>
    );
  };

  // Mouse-following glow effect
  const GlowEffect = () => {
    return (
      <motion.div
        className="about-glow"
        animate={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(52, 152, 219, 0.1) 0%, rgba(52, 152, 219, 0) 60%)`,
        }}
        transition={{ duration: 0.3 }}
      />
    );
  };

  // 3D tilt effect for skill cards
  const SkillCard = ({ skill, index, isActive, setActive }) => {
    return (
      <motion.div
        className={`skill-card ${isActive ? 'active' : ''}`}
        key={index}
        whileHover={{ y: -10, boxShadow: '0 15px 35px rgba(0, 123, 255, 0.2)' }}
        onClick={() => setActive(isActive ? null : index)}
        initial={{ opacity: 1, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="skill-icon">
          <div className="icon-inner">
            {/* Icon representation based on skill category */}
            {skill.category === 'Data Analytics' && '📊'}
            {skill.category === 'Web Development' && '💻'}
            {skill.category === 'Data Structures and Algorithms' && '🧩'}
          </div>
        </div>
        <motion.div
          className="skill-progress-bar"
          initial={{ width: 0 }}
          animate={{ width: isActive ? '100%' : '0%' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
        <h4>{skill.category}</h4>
        <p>{skill.items}</p>
      </motion.div>
    );
  };

  // Timeline item component
  const TimelineItem = ({ edu, index, isActive, setActive }) => {
    return (
      <motion.div
        className={`timeline-item ${isActive ? 'hovered' : ''}`}
        key={index}
        onMouseEnter={() => setActive(index)}
        onMouseLeave={() => setActive(null)}
        initial={{ opacity: 1, x: 0 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <motion.div
          className="timeline-dot"
          animate={{ scale: isActive ? 1.5 : 1 }}
        />
        <motion.div className="timeline-content">
          <h4>{edu.year}</h4>
          <h5>{edu.institution}</h5>
          <p>{edu.details}</p>
        </motion.div>
      </motion.div>
    );
  };

  // Enhanced animated image overlay effect
  const ImageOverlay = () => {
    return (
      <motion.div
        className="image-overlay"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <motion.span
          initial={{ y: 10, opacity: 0 }}
          whileHover={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          Hello there!
        </motion.span>
      </motion.div>
    );
  };
  
  // Enhanced avatar animations with orbital elements and 3D effects
  const AvatarAnimations = () => {
    return (
      <>
        {/* Pulsing border effect */}
        <motion.div className="avatar-border" />
        
        {/* Orbiting elements */}
        <motion.div className="avatar-orbit" />
        <motion.div 
          className="avatar-orbit" 
          style={{ 
            transform: 'rotate(60deg)',
            opacity: 0.7,
            animationDelay: '-5s',
            animationDuration: '20s'
          }} 
        />
        
        {/* Highlight sweep effect */}
        <motion.div 
          className="avatar-highlight"
          initial={{ opacity: 0, x: -30 }}
          animate={{ 
            opacity: [0, 0.7, 0],
            x: [30, 100, 170]
          }}
          transition={{ 
            repeat: Infinity,
            duration: 3,
            ease: "easeInOut",
            delay: 1
          }}
        />
        
        {/* Floating particles */}
        {[...Array(5)].map((_, index) => (
          <motion.div
            key={index}
            className="avatar-floating-particle"
            initial={{ opacity: 0 }}
            animate={{
              y: [0, -15, 0],
              opacity: [0, 0.7, 0],
              scale: [0.5, 1, 0.5]
            }}
            transition={{
              repeat: Infinity,
              duration: 2 + Math.random() * 3,
              delay: index * 0.5,
              ease: "easeInOut"
            }}
            style={{
              left: `${20 + index * 15}%`,
              top: `${70 + (Math.random() - 0.5) * 20}%`,
              background: index % 2 === 0 ? 'var(--primary-color)' : 'var(--accent-color)'
            }}
          />
        ))}
      </>
    );
  };

  // Research publication shine effect
  const ResearchShine = () => {
    return (
      <motion.div
        className="research-shine"
        initial={{ left: '-100%' }}
        animate={{ left: ['100%', '-100%'] }}
        transition={{ repeat: Infinity, duration: 3, repeatDelay: 2 }}
      />
    );
  };

  const skills = [
    { category: 'Data Analytics', items: 'Excel, PowerBI, MySQL' },
    { category: 'Web Development', items: 'HTML5, CSS3, JavaScript, FastAPI' },
    { category: 'Data Structures and Algorithms', items: 'Python' },
  ];

  const education = [
    { year: '2017', institution: 'Deccan Vidya Samsthe', details: 'Percentage: 86.88%' },
    { year: '2017-2019', institution: 'Sri Byraveshwara Rural and Composite PU College', details: 'Science (Percentage: 86.88%)' },
    { year: '2019-2023', institution: 'AMC Engineering College', details: 'Computer Science (CGPA: 8.02)' },
    { year: '2023-Present', institution: 'University Visvesvaraya College of Engineering', details: 'M.Tech in Web Technologies (CGPA: 9.02)' },
  ];

  return (
    <section ref={aboutRef} className="about-section" id="about">
      <BackgroundParticles />
      <GlowEffect />
      <motion.h2
        className="section-title"
        initial={{ opacity: 0, y: 20 }}
        animate={controls}
        variants={{
          visible: { opacity: 1, y: 0, transition: { delay: 0.1 } },
        }}
      >
        About <span className="highlight">Me</span>
      </motion.h2>
      <div className="about-content">
        <motion.div
          className="about-text"
          initial={{ opacity: 0, x: -50 }}
          animate={controls}
          variants={{
            visible: { opacity: 1, x: 0, transition: { delay: 0.2 } },
          }}
        >
          <motion.p
            className="about-bio"
            initial={{ opacity: 0 }}
            animate={controls}
            variants={{
              visible: { opacity: 1, transition: { delay: 0.3 } },
            }}
          >
            As a Computer Science Engineering graduate from VTU, I do have a strong grasp in coding, specifically in Python and Data Analytics. With over 2+ years of experience in python coding, I have had the opportunity of working on several projects involving Data Analytics and related topics. I am a keen learner and am always ready to adapt to new environment. I'm actively looking for opportunities in the domain of Data Analytics.
          </motion.p>
          <motion.div
            className="skills-section"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
          >
            <h3 className="section-subtitle">Skills</h3>
            <div className="skills-grid">
              {skills.map((skill, index) => (
                <SkillCard
                  key={index}
                  skill={skill}
                  index={index}
                  isActive={activeSkill === index}
                  setActive={setActiveSkill}
                />
              ))}
            </div>
          </motion.div>
          <motion.div 
            className="education-section"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
          >
            <h3 className="section-subtitle">Education</h3>
            <div className="timeline">
              {education.map((edu, index) => (
                <TimelineItem
                  key={index}
                  edu={edu}
                  index={index}
                  isActive={hoveredTimeline === index}
                  setActive={setHoveredTimeline}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
        <motion.div
          className="about-image"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={controls}
          variants={{
            visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
          }}
          whileHover={{ scale: 1.05 }}
        >
          <div className="avatar-container">
            <AvatarAnimations />
            <motion.div 
              className="avatar-frame"
              animate={{ 
                rotateY: [-3, 3, -3],
                rotateX: [2, -2, 2] 
              }}
              transition={{ 
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <motion.img 
                src="/images/profile-avatar.png" 
                alt="Prajwal S S Reddy" 
                initial={{ scale: 0.95 }}
                animate={{ 
                  scale: [0.95, 1, 0.95],
                  y: [0, -5, 0],
                  filter: [
                    'drop-shadow(0 10px 20px rgba(0, 123, 255, 0.3))',
                    'drop-shadow(0 15px 30px rgba(0, 123, 255, 0.5))',
                    'drop-shadow(0 10px 20px rgba(0, 123, 255, 0.3))'
                  ]
                }}
                transition={{ 
                  duration: 5, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                whileHover={{
                  scale: 1.05,
                  rotate: [-2, 2],
                  transition: { duration: 0.4 }
                }}
                drag
                dragConstraints={{
                  top: -10,
                  left: -10,
                  right: 10,
                  bottom: 10,
                }}
                dragElastic={0.1}
              />
            </motion.div>
            <ImageOverlay />
          </div>
        </motion.div>
        <motion.div
          className="research-publications"
          initial={{ opacity: 0, y: 30 }}
          animate={controls}
          variants={{
            visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.3 } },
          }}
          whileHover={{ boxShadow: '0 15px 40px rgba(0, 123, 255, 0.15)' }}
        >
          <ResearchShine />
          <h3>Research and Publications</h3>
          <AnimatePresence>
            {isResearchHovered && (
              <motion.div 
                className="research-shine"
                initial={{ opacity: 0, x: '-100%' }}
                animate={{ opacity: 0.3, x: '100%' }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
              />
            )}
          </AnimatePresence>
          <ul>
            {["Tequed Labs Research and Innovation Hub", "Robust and Efficient Autonomous Trash Cleaning Robot"].map((title, idx) => (
              <motion.li 
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={controls}
                variants={{
                  visible: { opacity: 1, x: 0, transition: { delay: 0.8 + idx * 0.2 } },
                }}
                whileHover={{ x: 5 }}
              >
                <strong>{title}</strong>
                <p>
                  {idx === 0
                    ? 'Artificial Intelligence and Machine Learning in Python. Worked on a project titled IPL Batting Analysis.'
                    : 'A Novel Approach with Image Recognition Techniques. Automated dustbin, Image processing, Sensor technology, Smart robotic dustbin.'}
                </p>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
