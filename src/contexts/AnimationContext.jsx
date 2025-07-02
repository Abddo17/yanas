import React, { createContext, useContext, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';

gsap.registerPlugin(ScrollTrigger);

const AnimationContext = createContext();

export const useAnimation = () => {
  const context = useContext(AnimationContext);
  if (!context) {
    throw new Error('useAnimation must be used within an AnimationProvider');
  }
  return context;
};

export const AnimationProvider = ({ children }) => {
  const lenisRef = useRef();

  const initializeAnimations = () => {
    // Initialize Lenis for smooth scrolling
    lenisRef.current = new Lenis({
      duration: 0.3,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenisRef.current?.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Connect Lenis with GSAP ScrollTrigger
    lenisRef.current.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenisRef.current?.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);
  };

  const animateOnScroll = (element, animation = {}) => {
    const defaultAnimation = {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: 'power2.out',
    };

    gsap.fromTo(element, 
      { ...defaultAnimation, ...animation.from },
      {
        ...defaultAnimation,
        ...animation.to,
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
          ...animation.scrollTrigger,
        },
      }
    );
  };

  const staggerAnimation = (elements, animation = {}) => {
    gsap.fromTo(elements,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out',
        ...animation,
      }
    );
  };

  useEffect(() => {
    return () => {
      lenisRef.current?.destroy();
    };
  }, []);

  const value = {
    initializeAnimations,
    animateOnScroll,
    staggerAnimation,
    lenis: lenisRef.current,
  };

  return (
    <AnimationContext.Provider value={value}>
      {children}
    </AnimationContext.Provider>
  );
};