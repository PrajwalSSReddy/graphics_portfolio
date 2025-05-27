import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, useAnimation, AnimatePresence } from 'framer-motion';

const ContactSection = () => {
  const sectionRef = useRef(null);
  const controls = useAnimation();
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [focusedField, setFocusedField] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  // Handle mouse movement for subtle interactive effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = sectionRef.current?.getBoundingClientRect() || {};
      
      if (sectionRef.current) {
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
  
  // Start animations when section comes into view
  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);
  
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [id]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Reset success message after 3 seconds
      setTimeout(() => {
        setIsSuccess(false);
        setFormState({
          name: '',
          email: '',
          message: ''
        });
      }, 3000);
    }, 1500);
  };

  const formVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8, 
        ease: [0.25, 0.1, 0.25, 1.0] 
      }
    }
  };

  const textVariants = {
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
    <section ref={sectionRef} id="contact" className="contact-section">
      {/* Animated background blobs */}
      <motion.div 
        className="contact-blob blob-1"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{
          repeat: Infinity,
          repeatType: 'reverse',
          duration: 8
        }}
      />
      <motion.div 
        className="contact-blob blob-2"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.1, 0.15, 0.1]
        }}
        transition={{
          repeat: Infinity,
          repeatType: 'reverse',
          duration: 10,
          delay: 1
        }}
      />
      <motion.div 
        className="contact-blob blob-3"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.1, 0.15, 0.1],
          x: [0, 50, 0],
          y: [0, 30, 0]
        }}
        transition={{
          repeat: Infinity,
          repeatType: 'reverse',
          duration: 12
        }}
      />
      
      <div className="contact-container">
        <motion.div 
          className="contact-text"
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, x: -50 },
            visible: { 
              opacity: 1, 
              x: 0,
              transition: { 
                duration: 0.8, 
                ease: [0.25, 0.1, 0.25, 1.0],
                when: "beforeChildren",
                staggerChildren: 0.2
              }
            }
          }}
        >
          <motion.h2 
            className="section-title"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { 
                opacity: 1, 
                y: 0,
                transition: { duration: 0.6 }
              }
            }}
          >
            <span className="highlight">Get in</span> Touch
            <motion.div 
              className="title-accent"
              initial={{ width: 0 }}
              animate={{ width: isInView ? '40%' : 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </motion.h2>
          <motion.p 
            className="contact-description"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
          >
            Have a project in mind? Let's work together to create something amazing.
            Fill out the form and I'll get back to you as soon as possible.
          </motion.p>
          <motion.div 
            className="contact-info"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 }
            }}
          >
            <motion.div 
              className="info-item"
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 }
              }}
              whileHover={{ x: 5 }}
            >
              <span className="info-label">Email</span>
              <motion.a 
                href="mailto:prajwalssreddy@gmail.com" 
                className="info-link"
                whileHover={{ color: "#00f7ff" }}
              >
                prajwalssreddy@gmail.com
              </motion.a>
            </motion.div>
            
            <motion.div 
              className="info-item"
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 }
              }}
              whileHover={{ x: 5 }}
            >
              <span className="info-label">Phone</span>
              <motion.a 
                href="tel:+919743858483" 
                className="info-link"
                whileHover={{ color: "#00f7ff" }}
              >
                +91 9743858483
              </motion.a>
            </motion.div>
            
            <motion.div 
              className="info-item"
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 }
              }}
            >
              <span className="info-label">Resume</span>
              <motion.a 
                href="/prajwal_Resume.pdf" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="download-link"
                whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(0, 123, 255, 0.4)" }}
                whileTap={{ scale: 0.95 }}
              >
                Download CV
              </motion.a>
            </motion.div>
          </motion.div>
        </motion.div>
        
        <motion.form 
          className="contact-form"
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { 
              opacity: 1, 
              y: 0,
              transition: { 
                duration: 0.8, 
                ease: [0.25, 0.1, 0.25, 1.0],
                when: "beforeChildren",
                staggerChildren: 0.1
              }
            }
          }}
          onSubmit={handleSubmit}
        >
          <motion.div 
            className="form-group"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
          >
            <motion.label 
              htmlFor="name"
              animate={focusedField === 'name' ? { color: '#00f7ff', scale: 1.05, x: 3 } : {}}
            >
              Name
            </motion.label>
            <motion.input 
              type="text" 
              id="name" 
              placeholder="Your Name" 
              value={formState.name}
              onChange={handleInputChange}
              onFocus={() => setFocusedField('name')}
              onBlur={() => setFocusedField(null)}
              whileFocus={{ boxShadow: '0 0 0 3px rgba(0, 247, 255, 0.2)' }}
            />
          </motion.div>
          
          <motion.div 
            className="form-group"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
          >
            <motion.label 
              htmlFor="email"
              animate={focusedField === 'email' ? { color: '#00f7ff', scale: 1.05, x: 3 } : {}}
            >
              Email
            </motion.label>
            <motion.input 
              type="email" 
              id="email" 
              placeholder="Your Email" 
              value={formState.email}
              onChange={handleInputChange}
              onFocus={() => setFocusedField('email')}
              onBlur={() => setFocusedField(null)}
              whileFocus={{ boxShadow: '0 0 0 3px rgba(0, 247, 255, 0.2)' }}
            />
          </motion.div>
          
          <motion.div 
            className="form-group"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
          >
            <motion.label 
              htmlFor="message"
              animate={focusedField === 'message' ? { color: '#00f7ff', scale: 1.05, x: 3 } : {}}
            >
              Message
            </motion.label>
            <motion.textarea 
              id="message" 
              rows="5" 
              placeholder="Tell me about your project"
              value={formState.message}
              onChange={handleInputChange}
              onFocus={() => setFocusedField('message')}
              onBlur={() => setFocusedField(null)}
              whileFocus={{ boxShadow: '0 0 0 3px rgba(0, 247, 255, 0.2)' }}
            />
          </motion.div>
          
          <motion.button 
            className="submit-button"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            whileHover={{ scale: 1.05, boxShadow: '0 10px 25px rgba(0, 123, 255, 0.4)' }}
            whileTap={{ scale: 0.95 }}
            disabled={isSubmitting}
            type="submit"
          >
            {isSubmitting ? (
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
                style={{ display: 'inline-block' }}
              >
                ⟳
              </motion.span>
            ) : isSuccess ? (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200 }}
              >
                ✓ Sent!
              </motion.span>
            ) : (
              'Send Message'
            )}
          </motion.button>
          
          <AnimatePresence>
            {isSuccess && (
              <motion.div
                className="success-message"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                Thank you for your message! I'll get back to you soon.
              </motion.div>
            )}
          </AnimatePresence>
        </motion.form>
      </div>
    </section>
  );
};

export default ContactSection;
