import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';

const Navbar = () => {
  const location = useLocation();
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('/');
  
  // Apply theme on initial load and when theme changes
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Update active tab based on current location
  useEffect(() => {
    setActiveTab(location.pathname);
  }, [location]);
  
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
          <NavLink 
            to="/" 
            label="Home" 
            isActive={activeTab === '/'} 
            theme={theme} 
          />
          <NavLink 
            to="/about" 
            label="About" 
            isActive={activeTab === '/about'} 
            theme={theme} 
          />
          <NavLink 
            to="/work" 
            label="Work" 
            isActive={activeTab === '/work'} 
            theme={theme} 
          />
          <NavLink 
            to="/contact" 
            label="Contact" 
            isActive={activeTab === '/contact'} 
            theme={theme} 
          />
        </div>
        
        <div className="buttons-container">
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
                    y: theme === 'light' ? -30 : 0,
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
                      transition={{
                        repeat: theme === 'light' ? 0 : Infinity,
                        repeatType: "reverse",
                        duration: 2,
                        delay: index * 0.1,
                      }}
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
                    y: theme === 'light' ? 0 : 30,
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
                        height: `${8 - index * 2}px`,
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
                      delay: index * 0.2,
                    }}
                    animate={{
                      opacity: theme === 'light' ? [0.1, 0.8, 0.1] : 0,
                      scale: theme === 'light' ? [0.8, 1.2, 0.8] : 0,
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
                      x: theme === 'dark' ? [0, 5, 0] : 20,
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 3 + index,
                      repeatType: "reverse",
                    }}
                  ></motion.div>
                ))}
              </motion.div>

              {/* Background color transition */}
              <motion.div
                className="toggle-background"
                animate={{
                  background: theme === 'light'
                    ? 'linear-gradient(135deg, #94c5ff 0%, #0080ff 100%)'
                    : 'linear-gradient(135deg, #1a237e 0%, #000000 100%)',
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
              <MobileNavLink 
                to="/" 
                label="Home" 
                isActive={activeTab === '/'} 
                theme={theme} 
                onClick={() => setIsMobileMenuOpen(false)} 
              />
              <MobileNavLink 
                to="/about" 
                label="About" 
                isActive={activeTab === '/about'} 
                theme={theme} 
                onClick={() => setIsMobileMenuOpen(false)} 
              />
              <MobileNavLink 
                to="/work" 
                label="Work" 
                isActive={activeTab === '/work'} 
                theme={theme} 
                onClick={() => setIsMobileMenuOpen(false)} 
              />
              <MobileNavLink 
                to="/contact" 
                label="Contact" 
                isActive={activeTab === '/contact'} 
                theme={theme} 
                onClick={() => setIsMobileMenuOpen(false)} 
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

// NavLink Component for desktop navigation with enhanced animations
const NavLink = ({ to, label, isActive, theme }) => {
  const controls = useAnimation();
  
  useEffect(() => {
    if (isActive) {
      controls.start({
        scale: [1, 1.05, 1],
        transition: { repeat: Infinity, repeatType: "reverse", duration: 2 }
      });
    } else {
      controls.stop();
      controls.set({ scale: 1 });
    }
  }, [isActive, controls]);

  // Determine colors based on theme and active state
  const getTextColor = () => {
    if (isActive) {
      return theme === 'light' ? 'var(--accent-color)' : 'var(--accent-color)';
    }
    return 'var(--text-color)';
  };

  const getHoverColor = () => theme === 'light' ? 'var(--accent-color)' : 'var(--accent-color)';
  
  const getBackgroundColor = () => {
    if (isActive) {
      return theme === 'light' ? 'rgba(0, 123, 255, 0.1)' : 'rgba(0, 247, 255, 0.1)';
    }
    return 'transparent';
  };

  const getGradient = () => {
    return theme === 'light' 
      ? 'linear-gradient(90deg, #007bff, #00f7ff)' 
      : 'linear-gradient(90deg, #00f7ff, #007bff)';
  };

  const getShadow = () => {
    return theme === 'light' 
      ? '0 0 8px rgba(0, 247, 255, 0.5)' 
      : '0 0 10px rgba(0, 247, 255, 0.7)';
  };

  return (
    <Link to={to} className={`nav-link ${isActive ? 'active' : ''}`}>
      <motion.div 
        className="nav-link-wrapper"
        initial={false}
        animate={{
          backgroundColor: getBackgroundColor(),
          color: getTextColor()
        }}
        transition={{ duration: 0.5 }}
      >
        <motion.span 
          whileHover={{ 
            scale: 1.1, 
            color: getHoverColor(),
            textShadow: getShadow()
          }}
          whileTap={{ scale: 0.9 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 15,
            duration: 0.4
          }}
          animate={controls}
          className={isActive ? 'active-text' : ''}
          style={{ color: getTextColor() }}
        >
          {label}
          {isActive && (
            <motion.div 
              className="active-indicator"
              initial={{ width: 0, opacity: 0 }}
              animate={{ 
                width: '100%', 
                opacity: 1,
                background: getGradient(),
                boxShadow: theme === 'dark' ? '0 0 8px rgba(0, 247, 255, 0.6)' : ''
              }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          )}
        </motion.span>
      </motion.div>
    </Link>
  );
};

// MobileNavLink Component for mobile navigation with enhanced animations
const MobileNavLink = ({ to, label, isActive, theme, onClick }) => {
  // Determine colors based on theme and active state
  const getTextColor = () => {
    if (isActive) {
      return theme === 'light' ? 'var(--accent-color)' : 'var(--accent-color)';
    }
    return theme === 'light' ? 'var(--text-color)' : 'white';
  };

  const getHoverColor = () => theme === 'light' ? 'var(--accent-color)' : 'var(--accent-color)';
  
  const getBackgroundColor = () => {
    if (isActive) {
      return theme === 'light' ? 'rgba(0, 123, 255, 0.1)' : 'rgba(0, 247, 255, 0.1)';
    }
    return 'transparent';
  };

  return (
    <Link to={to} className={`mobile-nav-link ${isActive ? 'active' : ''}`} onClick={onClick}>
      <motion.div
        className="mobile-nav-link-wrapper"
        initial={false}
        animate={{
          backgroundColor: getBackgroundColor(),
          color: getTextColor(),
          x: isActive ? 10 : 0
        }}
        transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 20 }}
      >
        <motion.span 
          whileHover={{ x: 5, color: getHoverColor() }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className={isActive ? 'active-text' : ''}
          style={{ color: getTextColor() }}
        >
          {label}
          {isActive && (
            <motion.span 
              className="mobile-active-indicator"
              initial={{ opacity: 0, y: 10 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                color: theme === 'dark' ? 'var(--accent-color)' : 'var(--accent-color)',
                textShadow: theme === 'dark' ? '0 0 8px rgba(0, 247, 255, 0.7)' : '0 0 5px rgba(0, 247, 255, 0.5)'
              }}
              transition={{ duration: 0.3 }}
            >
              ●
            </motion.span>
          )}
        </motion.span>
      </motion.div>
    </Link>
  );
};

export default Navbar;
