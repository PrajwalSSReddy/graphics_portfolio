import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Apply theme on initial load and when theme changes
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);
  
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  return (
    <nav className="navbar">
      <div className="container nav-container">
        <Link to="/" className="logo">
          <motion.span 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Prajwal<span className="highlight">.</span>
          </motion.span>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="nav-links">
          <Link to="/" className="nav-link">
            <motion.span 
              whileHover={{ scale: 1.1, color: "var(--accent-color)" }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              Home
            </motion.span>
          </Link>
          <Link to="/about" className="nav-link">
            <motion.span 
              whileHover={{ scale: 1.1, color: "var(--accent-color)" }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              About
            </motion.span>
          </Link>
          <Link to="/work" className="nav-link">
            <motion.span 
              whileHover={{ scale: 1.1, color: "var(--accent-color)" }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              Work
            </motion.span>
          </Link>
          <Link to="/contact" className="nav-link">
            <motion.span 
              whileHover={{ scale: 1.1, color: "var(--accent-color)" }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              Contact
            </motion.span>
          </Link>
        </div>
        
        {/* Enhanced Theme Toggle Button with animations */}
        <motion.button 
          className="theme-toggle-container"
          onClick={toggleTheme}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          <motion.div 
            className="theme-toggle-wrapper"
            animate={{ rotate: theme === 'light' ? 0 : 180 }}
            transition={{ type: "spring", stiffness: 120, damping: 15 }}
          >
            <motion.div className="toggle-scene">
              {/* Sun Elements */}
              <motion.div 
                className="sun" 
                animate={{ 
                  scale: theme === 'light' ? 1 : 0.5,
                  opacity: theme === 'light' ? 0 : 1,
                  x: theme === 'light' ? -30 : 0,
                  y: theme === 'light' ? -30 : 0
                }}
                transition={{ duration: 0.5 }}
              >
                <div className="sun-center"></div>
                {[...Array(8)].map((_, index) => (
                  <motion.div 
                    key={index} 
                    className="sun-ray"
                    style={{ transform: `rotate(${index * 45}deg)` }}
                    animate={{ scale: theme === 'light' ? 0 : [1, 1.2, 1] }}
                    transition={{ repeat: theme === 'light' ? 0 : Infinity, repeatType: "reverse", duration: 2, delay: index * 0.1 }}
                  ></motion.div>
                ))}
              </motion.div>
              
              {/* Moon Elements */}
              <motion.div 
                className="moon" 
                animate={{ 
                  scale: theme === 'light' ? 1 : 0.5,
                  opacity: theme === 'light' ? 1 : 0,
                  x: theme === 'light' ? 0 : 30,
                  y: theme === 'light' ? 0 : 30
                }}
                transition={{ duration: 0.5 }}
              >
                <div className="moon-center"></div>
                {[...Array(3)].map((_, index) => (
                  <motion.div 
                    key={index} 
                    className="moon-crater"
                    style={{ 
                      top: `${20 + index * 15}%`, 
                      left: `${20 + index * 20}%`,
                      width: `${8 - index * 2}px`,
                      height: `${8 - index * 2}px`
                    }}
                    animate={{ opacity: theme === 'light' ? [0.5, 0.7, 0.5] : 0 }}
                    transition={{ repeat: Infinity, duration: 3, delay: index }}
                  ></motion.div>
                ))}
              </motion.div>
              
              {/* Stars */}
              {[...Array(6)].map((_, index) => (
                <motion.div 
                  key={index} 
                  className="star"
                  style={{ 
                    top: `${10 + (index % 3) * 30}%`, 
                    left: `${10 + Math.floor(index / 3) * 30}%`,
                    width: `${3 + Math.random() * 2}px`,
                    height: `${3 + Math.random() * 2}px`,
                    delay: index * 0.2
                  }}
                  animate={{ 
                    opacity: theme === 'light' ? [0.1, 0.8, 0.1] : 0,
                    scale: theme === 'light' ? [0.8, 1.2, 0.8] : 0
                  }}
                  transition={{ repeat: Infinity, duration: 2 + index }}
                ></motion.div>
              ))}
              
              {/* Clouds */}
              {[...Array(2)].map((_, index) => (
                <motion.div 
                  key={index} 
                  className="cloud"
                  style={{ 
                    top: `${50 + index * 20}%`, 
                    left: `${20 + index * 40}%`,
                    width: `${index === 0 ? 16 : 12}px`,
                    height: `${index === 0 ? 8 : 6}px`,
                  }}
                  animate={{ 
                    opacity: theme === 'dark' ? [0.6, 0.4, 0.6] : 0,
                    x: theme === 'dark' ? [0, 5, 0] : 20
                  }}
                  transition={{ repeat: Infinity, duration: 3 + index, repeatType: "reverse" }}
                ></motion.div>
              ))}
            </motion.div>
            
            {/* Background color transition */}
            <motion.div 
              className="toggle-background"
              animate={{ 
                background: theme === 'light' 
                  ? 'linear-gradient(135deg, #94c5ff 0%, #0080ff 100%)' 
                  : 'linear-gradient(135deg, #1a237e 0%, #000000 100%)'
              }}
              transition={{ duration: 0.5 }}
            ></motion.div>
            
            {/* Mode indicator text */}
            <motion.span 
              className="mode-indicator"
              animate={{ opacity: [0, 1], y: [10, 0] }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              {theme === 'light' ? 'DARK' : 'LIGHT'}
            </motion.span>
          </motion.div>
        </motion.button>
        
        {/* Mobile Menu Toggle Button */}
        <motion.button 
          className="mobile-nav-toggle"
          onClick={toggleMobileMenu}
          whileTap={{ scale: 0.9 }}
          aria-expanded={isMobileMenuOpen}
          aria-label="Toggle navigation menu"
        >
          <div className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </motion.button>
      </div>
      
      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            className="mobile-nav"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
          >
            <div className="mobile-nav-links">
              <Link to="/" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                <motion.span 
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Home
                </motion.span>
              </Link>
              <Link to="/about" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                <motion.span 
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  About
                </motion.span>
              </Link>
              <Link to="/work" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                <motion.span 
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Work
                </motion.span>
              </Link>
              <Link to="/contact" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                <motion.span 
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Contact
                </motion.span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
