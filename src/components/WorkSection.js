import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView, useScroll, useTransform, useMotionValue, useSpring, useAnimation } from 'framer-motion';

// Horizontally scrolling text component
const ScrollingText = ({ text, speed = 1, reverse = false }) => {
  const textRef = useRef(null);
  const { scrollYProgress } = useScroll();
  
  // Create a motion value that will change based on scroll
  const x = useTransform(
    scrollYProgress, 
    [0, 1], 
    reverse ? ['0%', '-50%'] : ['-50%', '0%']
  );

  return (
    <div className="scrolling-text-container">
      <motion.div 
        ref={textRef}
        className="scrolling-text" 
        style={{ x }}
      >
        {text}
      </motion.div>
    </div>
  );
};

const MotionProjectCard = ({ project, index }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: false, amount: 0.3 });
  const controls = useAnimation();
  
  // Set up parallax effect for project cards
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const springY = useSpring(y, { stiffness: 100, damping: 30 });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [isInView, controls]);

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8, 
        delay: index * 0.2,
        ease: [0.25, 0.1, 0.25, 1.0] 
      }
    }
  };

  const hoverVariants = {
    hover: { 
      scale: 1.02,
      y: -15, 
      boxShadow: '0 30px 60px rgba(0, 0, 0, 0.1)',
      transition: { 
        type: 'spring', 
        stiffness: 400, 
        damping: 15 
      }
    }
  };

  return (
    <motion.div 
      ref={cardRef}
      className="project-card"
      initial="hidden"
      animate={controls}
      variants={{...cardVariants, ...hoverVariants}}
      whileHover="hover"
      style={{ y: springY }}
    >
      <motion.div 
        className="project-image-placeholder"
        style={{
          background: `var(--gradient-${index % 3 + 1})`,
        }}
        whileHover={{
          scale: 1.05,
          transition: { duration: 0.3 }
        }}
      />
      <motion.h3 
        className="project-title"
        initial={{ opacity: 0, x: -20 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
        transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
      >
        {project.title}
      </motion.h3>
      <motion.div 
        className="project-details"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5, delay: index * 0.2 + 0.5 }}
      >
        <p className="project-description">{project.description}</p>
        <p className="project-tech">{project.tech}</p>
        <p className="project-date">{project.date}</p>
      </motion.div>
      
      {/* Project Links with animation */}
      <motion.div 
        className="project-popup"
        initial={{ opacity: 0, y: 50 }}
        whileHover={{ opacity: 1, y: 0 }}
        transition={{ 
          type: 'spring',
          stiffness: 500,
          damping: 30
        }}
      >
        <div className="project-popup-title">View this project</div>
        <div className="project-popup-links">
          {project.liveLink && (
            <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="project-popup-link">Live Demo</a>
          )}
          {project.caseStudy && (
            <a href={project.caseStudy} target="_blank" rel="noopener noreferrer" className="project-popup-link">Case Study</a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

const WorkSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 });
  const [activeIndex, setActiveIndex] = useState(null);
  
  // Enhanced projects list with more details and links
  const projects = [
    {
      title: "Business 360",
      description: "Created a global sales dashboard for AtliQ using Power BI. I gathered data from Excel/CSV and SQL.",
      date: "2023",
      tech: "Power BI, SQL, Excel",
      liveLink: "https://www.linkedin.com/in/prajwal-ss-reddy/",
      caseStudy: "https://github.com/prajwalsreddy"
    },
    {
      title: "Grocery Store Management System",
      description: "Grocery store management system using HTML, CSS, JavaScript, Bootstrap, Python, MySQL and FastAPI.",
      date: "2022",
      tech: "HTML, CSS, JavaScript, Python, MySQL, FastAPI",
      liveLink: "https://www.linkedin.com/in/prajwal-ss-reddy/",
      caseStudy: "https://github.com/prajwalsreddy"
    },
    {
      title: "Movie Recommendation System",
      description: "Built a content-based Movie Recommendation System using Machine Learning and Python libraries.",
      date: "2023",
      tech: "Python, Machine Learning",
      liveLink: "https://www.linkedin.com/in/prajwal-ss-reddy/",
      caseStudy: "https://github.com/prajwalsreddy"
    },
    {
      title: "NLP Text Analysis Tool",
      description: "Developed a natural language processing tool for sentiment analysis and text classification using Python and NLTK.",
      date: "2023",
      tech: "Python, NLTK, scikit-learn",
      liveLink: "https://www.linkedin.com/in/prajwal-ss-reddy/",
      caseStudy: "https://github.com/prajwalsreddy"
    },
    {
      title: "Data Visualization Dashboard",
      description: "Created an interactive dashboard for visualizing complex datasets using Python, Plotly and Dash.",
      date: "2022",
      tech: "Python, Plotly, Dash, Pandas",
      liveLink: "https://www.linkedin.com/in/prajwal-ss-reddy/",
      caseStudy: "https://github.com/prajwalsreddy"
    },
    {
      title: "E-commerce Sales Analysis",
      description: "Performed in-depth analysis of e-commerce sales data to identify trends and opportunities for growth.",
      date: "2023",
      tech: "SQL, Excel, Power BI",
      liveLink: "https://www.linkedin.com/in/prajwal-ss-reddy/",
      caseStudy: "https://github.com/prajwalsreddy"
    }
  ];

  const headingVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6, 
        ease: [0.25, 0.1, 0.25, 1.0] 
      }
    }
  };

  return (
    <section ref={sectionRef} className="work-section">
      {/* Horizontally scrolling title on scroll */}
      <ScrollingText 
        text="PORTFOLIO • PROJECTS • WORK • EXPERIENCE • PORTFOLIO • PROJECTS • WORK • EXPERIENCE •" 
        speed={0.5}
      />
      
      <motion.h2 
        className="section-title"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={headingVariants}
      >
        <span className="highlight">Recent</span> Work
      </motion.h2>
      
      <div className="projects-grid">
        {projects.map((project, index) => (
          <MotionProjectCard 
            key={index} 
            project={project} 
            index={index} 
          />
        ))}
      </div>
      
      {/* Second scrolling text with reverse direction */}
      <ScrollingText 
        text="DATA ANALYTICS • PYTHON • WEB DEVELOPMENT • MACHINE LEARNING • DATA VISUALIZATION •" 
        speed={0.8}
        reverse={true}
      />
    </section>
  );
};

export default WorkSection;
