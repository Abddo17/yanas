import React, { createContext, useContext } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin with GSAP
gsap.registerPlugin(ScrollTrigger);

// Create the Animation Context
const AnimationContext = createContext();

// Animation Provider Component
export const AnimationProvider = ({ children }) => {
  // Function to animate elements on scroll
  const animateOnScroll = (element, options = {}) => {
    if (!element) return;

    // Default animation options
    const defaultOptions = {
      from: { opacity: 0, y: 50 },
      to: {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
      },
      trigger: element,
      start: 'top 80%',
      end: 'bottom 20%',
      toggleActions: 'play none none none',
    };

    // Merge provided options with defaults
    const animationOptions = {
      ...defaultOptions,
      ...options,
      to: {
        ...defaultOptions.to,
        ...options.to,
      },
    };

    // Create GSAP animation with ScrollTrigger
    gsap.fromTo(
      element,
      animationOptions.from,
      {
        ...animationOptions.to,
        scrollTrigger: {
          trigger: animationOptions.trigger,
          start: animationOptions.start,
          end: animationOptions.end,
          toggleActions: animationOptions.toggleActions,
        },
      }
    );
  };

  return (
    <AnimationContext.Provider value={{ animateOnScroll }}>
      {children}
    </AnimationContext.Provider>
  );
};

// Custom hook to use Animation Context
export const useAnimation = () => {
  const context = useContext(AnimationContext);
  if (!context) {
    throw new Error('useAnimation must be used within an AnimationProvider');
  }
  return context;
};