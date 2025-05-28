import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView, useScroll, useTransform, useMotionValue, useSpring, useAnimation, AnimatePresence } from 'framer-motion';
// Import the custom CSS files
import '../assets/styles/business360Popup.css';
import '../assets/styles/projectCard.css';
// Reference the project images from public folder
const business360Image = '/business360.jpg';
const grocerySystemImage = '/grocerySystem.jpg';
const movieRecommenderImage = '/movieRecommender.jpg';
const nlpAnalysisImage = '/nlpAnalysis.jpg';
const excelAnalyticsImage = '/excelAnalytics.jpg';
const cricketAnalysisImage = '/cricketAnalysis.jpg';

// Horizontally scrolling text component
const ScrollingText = ({ text, speed = 1, reverse = false }) => {
  const textRef = useRef(null);
  const { scrollYProgress } = useScroll({
    // Optimize scroll detection with offset
    offset: ["start end", "end start"]
  });
  
  // Create a more responsive motion value with spring physics
  const baseX = useTransform(
    scrollYProgress, 
    [0, 1], 
    reverse ? ['0%', '-50%'] : ['-50%', '0%']
  );
  
  // Apply spring physics for smoother but faster response
  const x = useSpring(baseX, { 
    stiffness: 100 * speed, // Higher stiffness = faster response
    damping: 20, // Lower damping = more responsive
    restDelta: 0.001 // Smaller value for more precise stopping
  });

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
  const popupRef = useRef(null);
  // Increase the amount to detect elements earlier and reduce 'once' for faster UI loading
  const isInView = useInView(cardRef, { once: false, amount: 0.1, rootMargin: "100px" });
  const controls = useAnimation();
  const [isHovered, setIsHovered] = useState(false);
  const [business360Position, setBusiness360Position] = useState({ x: 0, y: 0 });
  const [grocerySystemPosition, setGrocerySystemPosition] = useState({ x: 0, y: 0 });
  const [movieRecommenderPosition, setMovieRecommenderPosition] = useState({ x: 0, y: 0 });
  const [nlpAnalysisPosition, setNlpAnalysisPosition] = useState({ x: 0, y: 0 });
  const [excelAnalyticsPosition, setExcelAnalyticsPosition] = useState({ x: 0, y: 0 });
  const [cricketAnalysisPosition, setCricketAnalysisPosition] = useState({ x: 0, y: 0 });
  
  // Check if this is a project with a popup
  const isBusinessProject = project.title === "Business 360";
  const isGrocerySystemProject = project.title === "Grocery Store Management System";
  const isMovieRecommenderProject = project.title === "Movie Recommendation System";
  const isNlpAnalysisProject = project.title === "NLP Text Analysis Tool";
  const isExcelAnalyticsProject = project.title === "Excel Sales Analytics";
  const isCricketAnalysisProject = project.title === "Cricket Analysis Dashboard";
  
  // Function to handle mouse movement for the popup
  const handleMouseMove = (e, type) => {
    if (type === 'business360') {
      setBusiness360Position({ x: e.clientX, y: e.clientY });
    } else if (type === 'grocery') {
      setGrocerySystemPosition({ x: e.clientX, y: e.clientY });
    } else if (type === 'movie') {
      setMovieRecommenderPosition({ x: e.clientX, y: e.clientY });
    } else if (type === 'nlp') {
      setNlpAnalysisPosition({ x: e.clientX, y: e.clientY });
    } else if (type === 'excel') {
      setExcelAnalyticsPosition({ x: e.clientX, y: e.clientY });
    } else if (type === 'cricket') {
      setCricketAnalysisPosition({ x: e.clientX, y: e.clientY });
    }
  };
  
  // Set up more responsive parallax effect for project cards
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
    // Use this to make scroll detection more sensitive
    layoutEffect: false
  });
  
  // Create more dynamic transforms for book stacking effect
  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const rotateY = useTransform(scrollYProgress, [0, 0.5, 1], [5, 0, -5]);
  const rotateZ = useTransform(scrollYProgress, [0, 0.5, 1], [2, 0, -2]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);
  const x = useTransform(scrollYProgress, [0, 0.5, 1], [-15, 0, 15]);
  
  // Make the spring animations more responsive with higher stiffness
  const springY = useSpring(y, { stiffness: 300, damping: 25, restDelta: 0.001 });
  const springRotateY = useSpring(rotateY, { stiffness: 300, damping: 35, restDelta: 0.001 });
  const springRotateZ = useSpring(rotateZ, { stiffness: 250, damping: 30, restDelta: 0.001 });
  const springScale = useSpring(scale, { stiffness: 280, damping: 30, restDelta: 0.001 });
  const springX = useSpring(x, { stiffness: 250, damping: 35, restDelta: 0.001 });

  // Immediately animate cards into view when they enter viewport
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [isInView, controls]);

  const cardVariants = {
    hidden: { opacity: 0, y: 30 }, // Reduced y offset for faster animation
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5, // Reduced from 0.8 for faster animation
        delay: index * 0.1, // Reduced delay between cards
        ease: "easeOut" // Simpler easing function for better performance
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

  // Handle mouse enter/leave for the popup (for legacy animations)
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  
  // Handle mouse movement for the Business 360 popup
  useEffect(() => {
    const card = cardRef.current;
    if (isBusinessProject && card) {
      card.addEventListener('mousemove', (e) => handleMouseMove(e, 'business360'));
      return () => {
        card.removeEventListener('mousemove', (e) => handleMouseMove(e, 'business360'));
      };
    }
    if (isGrocerySystemProject && card) {
      card.addEventListener('mousemove', (e) => handleMouseMove(e, 'grocery'));
      return () => {
        card.removeEventListener('mousemove', (e) => handleMouseMove(e, 'grocery'));
      };
    }
    if (isMovieRecommenderProject && card) {
      card.addEventListener('mousemove', (e) => handleMouseMove(e, 'movie'));
      return () => {
        card.removeEventListener('mousemove', (e) => handleMouseMove(e, 'movie'));
      };
    }
    if (isNlpAnalysisProject && card) {
      card.addEventListener('mousemove', (e) => handleMouseMove(e, 'nlp'));
      return () => {
        card.removeEventListener('mousemove', (e) => handleMouseMove(e, 'nlp'));
      };
    }
    if (isExcelAnalyticsProject && card) {
      card.addEventListener('mousemove', (e) => handleMouseMove(e, 'excel'));
      return () => {
        card.removeEventListener('mousemove', (e) => handleMouseMove(e, 'excel'));
      };
    }
    if (isCricketAnalysisProject && card) {
      card.addEventListener('mousemove', (e) => handleMouseMove(e, 'cricket'));
      return () => {
        card.removeEventListener('mousemove', (e) => handleMouseMove(e, 'cricket'));
      };
    }
  }, [isBusinessProject, isGrocerySystemProject, isMovieRecommenderProject, isNlpAnalysisProject, isExcelAnalyticsProject, isCricketAnalysisProject, handleMouseMove]);

  return (
    <motion.div 
      ref={cardRef}
      className={`project-card ${isBusinessProject ? 'business360-container' : ''} ${isGrocerySystemProject ? 'grocery-system-container' : ''} ${isMovieRecommenderProject ? 'movie-recommender-container' : ''} ${isNlpAnalysisProject ? 'nlp-analysis-container' : ''} ${isExcelAnalyticsProject ? 'excel-analytics-container' : ''} ${isCricketAnalysisProject ? 'cricket-analysis-container' : ''}`}
      initial="hidden"
      animate={controls}
      variants={{...cardVariants, ...hoverVariants}}
      whileHover="hover"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ 
        y: springY,
        x: springX,
        rotateY: springRotateY,
        rotateZ: springRotateZ,
        scale: springScale,
        cursor: 'pointer'
      }}
      onClick={() => {
        // Handle link with fallback if available
        const handleProjectClick = () => {
          if (project.fallbackLink) {
            // For links with fallback, create a fetch attempt first
            fetch(project.projectLink, { mode: 'no-cors' })
              .then(() => {
                window.open(project.projectLink, '_blank', 'noopener,noreferrer');
              })
              .catch(() => {
                // If fetch fails, use fallback
                window.open(project.fallbackLink, '_blank', 'noopener,noreferrer');
              });
          } else {
            // For links without fallback, open directly
            window.open(project.projectLink, '_blank', 'noopener,noreferrer');
          }
        };
        handleProjectClick();
      }}
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
        transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }} // Faster animation with reduced delay
      >
        {project.title}
      </motion.h3>
      <motion.div 
        className="project-details"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.3, delay: index * 0.1 + 0.3 }} // Faster animation with reduced delay
      >
        <p className="project-description">{project.description}</p>
        <p className="project-tech">{project.tech}</p>
        <div className="view-project">
          <span className="view-project-text">View Project</span>
        </div>
      </motion.div>
      
      {/* Business 360 Image Popup that follows cursor */}
      {isBusinessProject && (
        <div 
          className="business360-popup"
          style={{
            left: `${business360Position.x}px`,
            top: `${business360Position.y}px`,
          }}
        >
          <img 
            className="popup-image"
            src={business360Image} 
            alt="Business 360 Dashboard" 
          />
          <div className="popup-caption">
            Business 360 Dashboard
          </div>
        </div>
      )}
      
      {/* Grocery Store Management System popup */}
      {isGrocerySystemProject && (
        <div 
          className="grocery-popup"
          style={{
            left: `${grocerySystemPosition.x}px`,
            top: `${grocerySystemPosition.y}px`,
          }}
        >
          <img 
            className="grocery-image"
            src={grocerySystemImage} 
            alt="Grocery Store Management System" 
          />
          <div className="grocery-caption">Grocery Management System</div>
        </div>
      )}
      
      {/* Movie Recommender System popup */}
      {isMovieRecommenderProject && (
        <div 
          className="movie-popup"
          style={{
            left: `${movieRecommenderPosition.x}px`,
            top: `${movieRecommenderPosition.y}px`,
          }}
        >
          <img 
            className="movie-image"
            src={movieRecommenderImage} 
            alt="Movie Recommendation System" 
          />
          <div className="movie-caption">Movie Recommendation System</div>
        </div>
      )}
      
      {/* NLP Text Analysis popup */}
      {isNlpAnalysisProject && (
        <div 
          className="nlp-popup"
          style={{
            left: `${nlpAnalysisPosition.x}px`,
            top: `${nlpAnalysisPosition.y}px`,
          }}
        >
          <img 
            className="nlp-image"
            src={nlpAnalysisImage} 
            alt="NLP Text Analysis Tool" 
          />
          <div className="nlp-caption">Sentiment Analysis</div>
        </div>
      )}
      
      {/* Excel Sales Analytics popup */}
      {isExcelAnalyticsProject && (
        <div 
          className="excel-popup"
          style={{
            left: `${excelAnalyticsPosition.x}px`,
            top: `${excelAnalyticsPosition.y}px`,
          }}
        >
          <img 
            className="excel-image"
            src={excelAnalyticsImage} 
            alt="Excel Sales Analytics" 
          />
          <div className="excel-caption">Excel Sales Analytics</div>
        </div>
      )}
      
      {/* Cricket Analysis Dashboard popup */}
      {isCricketAnalysisProject && (
        <div 
          className="cricket-popup"
          style={{
            left: `${cricketAnalysisPosition.x}px`,
            top: `${cricketAnalysisPosition.y}px`,
          }}
        >
          <img 
            className="cricket-image"
            src={cricketAnalysisImage} 
            alt="Cricket Analysis Dashboard" 
          />
          <div className="cricket-caption">Cricket Analysis Dashboard</div>
        </div>
      )}
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
      projectLink: "https://app.powerbi.com/links/bKm6_9zzPY?ctid=89bf0b5b-6665-4eb0-a6fc-fc2e8734863e&pbi_source=linkShare&bookmarkGuid=ef8286e4-1ffd-47e4-b18b-224fe4dc5f82",
      hasImagePopup: true // Flag to indicate this project has an image popup
    },
    {
      title: "Grocery Store Management System",
      description: "Grocery store management system using HTML, CSS, JavaScript, Bootstrap, Python, MySQL and FastAPI.",
      date: "2022",
      tech: "HTML, CSS, JavaScript, Python, MySQL, FastAPI",
      projectLink: "https://github.com/PrajwalSSReddy/Grocery_store_management_system_using_Fastapi",
      hasImagePopup: true // Flag to indicate this project has an image popup
    },
    {
      title: "Movie Recommendation System",
      description: "Built a content-based Movie Recommendation System using Machine Learning and Python libraries.",
      date: "2023",
      tech: "Python, Machine Learning",
      projectLink: "https://movie1recommended1system.streamlit.app",
      fallbackLink: "https://github.com/PrajwalSSReddy/Movie_Recommended_System",
      hasImagePopup: true // Flag to indicate this project has an image popup
    },
    {
      title: "NLP Text Analysis Tool",
      description: "Developed a natural language processing tool for sentiment analysis and text classification using Python and NLTK.",
      date: "2023",
      tech: "Python, NLTK, scikit-learn",
      projectLink: "https://github.com/PrajwalSSReddy",
      hasImagePopup: true // Flag to indicate this project has an image popup
    },
    {
      title: "Excel Sales Analytics",
      description: "Created comprehensive sales analytics dashboards and reports using advanced Excel techniques and formulas.",
      date: "2023",
      tech: "Excel, Data Analytics, VBA, Pivot Tables",
      projectLink: "https://github.com/PrajwalSSReddy/Excel_Sales_Analytics",
      hasImagePopup: true // Flag to indicate this project has an image popup
    },
    {
      title: "Cricket Analysis Dashboard",
      description: "Developed a cricket analytics dashboard to visualize player statistics, team performance, and match predictions.",
      date: "2022",
      tech: "Power BI, Excel, Python, Data Modeling",
      projectLink: "https://app.powerbi.com/links/T1-xQGfpDX?ctid=89bf0b5b-6665-4eb0-a6fc-fc2e8734863e&pbi_source=linkShare",
      hasImagePopup: true // Flag to indicate this project has an image popup
    }
  ];

  const headingVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.4, // Reduced from 0.6 for faster animation
        ease: "easeOut" // Simpler easing function for better performance
      }
    }
  };
  
  // Use animation controls for the section itself to improve responsiveness
  const sectionControls = useAnimation();
  
  // Preload animations when section comes close to viewport
  useEffect(() => {
    if (isInView) {
      // Start animations immediately when in view
      sectionControls.start("visible");
    } else {
      sectionControls.start("hidden");
    }
  }, [isInView, sectionControls]);

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
        animate={sectionControls}
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
