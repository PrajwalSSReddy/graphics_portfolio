import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const navigate = useNavigate();
  const [textIndex, setTextIndex] = useState(0);
  const texts = ['Data Analyst', 'Python Developer', 'Web Developer'];

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="header">
      <div className="moving-bg"></div>
      <div className="header-content">
        <div className="header-text-container">
          <motion.h1 
            className="name-title"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              type: "spring", 
              stiffness: 100, 
              damping: 15,
              delay: 0.2 
            }}
          >
            Prajwal S S Reddy
          </motion.h1>
          
          <div className="profession-container">
            <motion.span 
              className="prefix"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              I am a
            </motion.span>
            <AnimatePresence mode="wait">
              <motion.span
                key={textIndex}
                className="profession"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
              >
                {texts[textIndex]}
              </motion.span>
            </AnimatePresence>
          </div>
          
          <motion.p 
            className="subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            Computer Science Engineering graduate specializing in Python and Data Analytics with 2+ years of experience. Passionate about creating data-driven solutions.
          </motion.p>
          
          <motion.div
            className="btn-container"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <motion.button 
              className="cta-button primary" 
              onClick={() => navigate('/contact')}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 8px 20px rgba(0, 123, 255, 0.3)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              Get in Touch
            </motion.button>
            
            <motion.button 
              className="cta-button secondary" 
              onClick={() => navigate('/work')}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              View My Work
            </motion.button>
          </motion.div>
        </div>
        
        <motion.div 
          className="header-decoration"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ 
            duration: 1.2, 
            delay: 0.5,
            type: "spring",
            stiffness: 100
          }}
        >
          <div className="floating-circles">
            <div className="circle circle-1"></div>
            <div className="circle circle-2"></div>
            <div className="circle circle-3"></div>
          </div>
        </motion.div>
      </div>
      
      <motion.div 
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <p>Scroll to explore</p>
        <div className="scroll-arrow"></div>
      </motion.div>
    </header>
  );
};

export default Header;
