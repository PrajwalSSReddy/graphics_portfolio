import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const Cursor = () => {
  const cursorOuterRef = useRef(null);
  const cursorInnerRef = useRef(null);
  const cursorTextRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isProjectHover, setIsProjectHover] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Smooth mouse following with lerp (linear interpolation)
  const lerpFactor = 0.15; // Adjust for smoother/faster following (0-1)
  const [lerpedPosition, setLerpedPosition] = useState({ x: 0, y: 0 });

  // Update lerped position on animation frame
  useEffect(() => {
    let animationFrameId;
    
    const animateCursor = () => {
      setLerpedPosition(prev => ({
        x: prev.x + (mousePosition.x - prev.x) * lerpFactor,
        y: prev.y + (mousePosition.y - prev.y) * lerpFactor
      }));
      
      animationFrameId = requestAnimationFrame(animateCursor);
    };
    
    animationFrameId = requestAnimationFrame(animateCursor);
    
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [mousePosition, lerpFactor]);

  // Apply lerped position to cursor elements
  useEffect(() => {
    if (cursorOuterRef.current && cursorInnerRef.current) {
      cursorOuterRef.current.style.transform = `translate(${lerpedPosition.x}px, ${lerpedPosition.y}px)`;
      cursorInnerRef.current.style.transform = `translate(${lerpedPosition.x}px, ${lerpedPosition.y}px)`;
      
      if (cursorTextRef.current) {
        cursorTextRef.current.style.transform = `translate(${lerpedPosition.x}px, ${lerpedPosition.y + 40}px)`;
      }
    }
  }, [lerpedPosition]);

  useEffect(() => {
    const mouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const mouseDown = () => {
      setIsClicking(true);
    };

    const mouseUp = () => {
      setIsClicking(false);
    };

    const mouseLeave = () => {
      if (cursorOuterRef.current && cursorInnerRef.current) {
        cursorOuterRef.current.style.opacity = '0';
        cursorInnerRef.current.style.opacity = '0';
        if (cursorTextRef.current) cursorTextRef.current.style.opacity = '0';
      }
    };

    const mouseEnter = () => {
      if (cursorOuterRef.current && cursorInnerRef.current) {
        cursorOuterRef.current.style.opacity = '1';
        cursorInnerRef.current.style.opacity = '1';
        if (cursorTextRef.current) cursorTextRef.current.style.opacity = '1';
      }
    };

    // Add hover detection for various interactive elements
    const addHoverListeners = () => {
      // Generic interactive elements
      const interactiveElements = document.querySelectorAll('a, button, .nav-link');
      interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
          setIsHovering(true);
          setIsProjectHover(false);
          setCursorText('');
        });
        el.addEventListener('mouseleave', () => {
          setIsHovering(false);
          setCursorText('');
        });
      });
      
      // Project cards with special hover
      const projectCards = document.querySelectorAll('.project-card');
      projectCards.forEach(card => {
        const projectTitle = card.querySelector('.project-title')?.textContent || 'View Project';
        
        card.addEventListener('mouseenter', () => {
          setIsHovering(true);
          setIsProjectHover(true);
          setCursorText('View');
        });
        
        card.addEventListener('mouseleave', () => {
          setIsHovering(false);
          setIsProjectHover(false);
          setCursorText('');
        });
      });
    };

    document.addEventListener('mousemove', mouseMove);
    document.addEventListener('mousedown', mouseDown);
    document.addEventListener('mouseup', mouseUp);
    document.addEventListener('mouseleave', mouseLeave);
    document.addEventListener('mouseenter', mouseEnter);

    // Wait for all elements to be rendered
    setTimeout(addHoverListeners, 1000);
    
    // Refresh hover listeners when DOM changes
    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener('mousemove', mouseMove);
      document.removeEventListener('mousedown', mouseDown);
      document.removeEventListener('mouseup', mouseUp);
      document.removeEventListener('mouseleave', mouseLeave);
      document.removeEventListener('mouseenter', mouseEnter);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <motion.div 
        ref={cursorOuterRef}
        className="cursor-outer"
        animate={{
          scale: isProjectHover ? 3 : isHovering ? 2 : isClicking ? 0.8 : 1,
          backgroundColor: isProjectHover ? 'rgba(0, 247, 255, 0.2)' : isHovering ? 'rgba(0, 123, 255, 0.15)' : 'rgba(255, 255, 255, 0.2)',
          mixBlendMode: isHovering ? 'difference' : 'normal',
          opacity: 1
        }}
        transition={{ 
          type: "spring", 
          stiffness: 150, 
          damping: 15,
          mass: 0.1
        }}
      />
      <motion.div 
        ref={cursorInnerRef}
        className="cursor-inner"
        animate={{
          scale: isClicking ? 0.5 : 1,
          backgroundColor: isProjectHover ? '#00f7ff' : isHovering ? '#ffffff' : '#007bff',
          opacity: 1
        }}
        transition={{ 
          type: "spring", 
          stiffness: 300, 
          damping: 15,
          mass: 0.1
        }}
      />
      {cursorText && (
        <motion.div
          ref={cursorTextRef}
          className="cursor-text"
          initial={{ opacity: 0, y: 10 }}
          animate={{ 
            opacity: isProjectHover ? 1 : 0,
            y: 0
          }}
          transition={{ 
            type: "spring", 
            stiffness: 200, 
            damping: 20 
          }}
        >
          {cursorText}
        </motion.div>
      )}
    </>
  );
};

export default Cursor;
