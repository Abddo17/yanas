import React, { useEffect, useRef } from 'react';
import { Mail, Phone, Globe, Twitter, Instagram, Facebook } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../contexts/LanguageContext.jsx';
import { content } from '../data/content.js';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const { language, toggleLanguage, isArabic } = useLanguage();
  const t = content[language];
  const footerRef = useRef(null);
  const blobsRef = useRef([]); // A ref to hold our aurora blob elements

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // --- 1. The Living "Aurora" Background Animation ---
      // This timeline runs independently and loops forever, making the background shift.
      blobsRef.current.forEach(blob => {
        gsap.to(blob, {
          x: () => gsap.utils.random(-300, 300),
          y: () => gsap.utils.random(-300, 300),
          scale: () => gsap.utils.random(0.8, 1.5),
          rotation: () => gsap.utils.random(-90, 90),
          duration: () => gsap.utils.random(20, 30),
          ease: 'power1.inOut',
          repeat: -1,
          yoyo: true,
        });
      });

      // --- 2. The Main Reveal and Stagger Animation (Scroll-Triggered) ---
      const revealTl = gsap.timeline({
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top bottom+=100',
          end: 'bottom bottom',
          scrub: 1,
        },
      });

      revealTl
        .from(footerRef.current, { yPercent: -15, ease: 'none' })
        .from('.footer-content > *', { // Target direct children for staggering
          opacity: 0,
          y: 60,
          stagger: 0.15,
          ease: 'power3.out',
        }, 0); // Start at the same time as the reveal for a combined effect

      // --- 3. The "Glint" Hover Effect ---
      const shimmerLinks = gsap.utils.toArray('.shimmer-link');
      shimmerLinks.forEach(link => {
        const shimmer = link.querySelector('.shimmer-effect');
        link.addEventListener('mouseenter', () => {
          gsap.fromTo(shimmer, 
            { xPercent: -100, opacity: 0.8 }, 
            { xPercent: 100, duration: 0.8, ease: 'power2.inOut', opacity: 0 }
          );
        });
      });

    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative z-10">
      <footer
        ref={footerRef}
        className="relative bg-slate-900 text-white pt-24 pb-12 overflow-hidden"
      >
        {/* --- The Aurora Gradient Container --- */}
        <div className="absolute inset-0 z-0 opacity-40">
          <div ref={el => blobsRef.current[0] = el} className="absolute w-96 h-96 bg-cyan-600 rounded-full top-1/4 left-1/4 filter blur-3xl"></div>
          <div ref={el => blobsRef.current[1] = el} className="absolute w-80 h-80 bg-emerald-500 rounded-full bottom-1/4 right-1/4 filter blur-3xl"></div>
          <div ref={el => blobsRef.current[2] = el} className="absolute w-72 h-72 bg-primary-600 rounded-full top-10 right-10 filter blur-3xl"></div>
        </div>

        {/* --- The Actual Footer Content (on top) --- */}
        <div className="footer-content relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            
          <div className="space-y-5"> {/* Column 1 */}
            <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-emerald-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-lg">CP</span>
                </div>
                <span className="font-bold text-xl">Content Pro</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed pr-4">{t.footer.description || '...'}</p>
            <div className="flex space-x-4 pt-2">
                <a href="#" className="shimmer-link relative overflow-hidden p-1 rounded-full"><Twitter className="text-gray-400 hover:text-white transition-colors" /><span className="shimmer-effect"></span></a>
                <a href="#" className="shimmer-link relative overflow-hidden p-1 rounded-full"><Instagram className="text-gray-400 hover:text-white transition-colors" /><span className="shimmer-effect"></span></a>
                <a href="#" className="shimmer-link relative overflow-hidden p-1 rounded-full"><Facebook className="text-gray-400 hover:text-white transition-colors" /><span className="shimmer-effect"></span></a>
            </div>
          </div>
          
          <div className="space-y-4"> {/* Column 2 */}
            <h3 className="font-semibold text-lg text-white">Quick Links</h3>
            <ul className="space-y-3">
                <li><a href="/projects" className="text-gray-300 hover:text-primary-400 transition-colors">Projects</a></li>
                <li><a href="/services" className="text-gray-300 hover:text-primary-400 transition-colors">Services</a></li>
                <li><a href="/studio" className="text-gray-300 hover:text-primary-400 transition-colors">Our Studio</a></li>
            </ul>
          </div>
          
          <div className="space-y-4"> {/* Column 3 */}
            <h3 className="font-semibold text-lg text-white">{t.footer.contact}</h3>
            <div className="space-y-4">
                <a href="mailto:info@contentpro.ae" className="shimmer-link relative group flex items-center space-x-3 overflow-hidden p-1">
                    <span className="shimmer-effect"></span>
                    <Mail size={18} className="text-primary-400"/>
                    <span className="text-gray-300 group-hover:text-white transition-colors">info@contentpro.ae</span>
                </a>
                <a href="tel:+971501234567" className="shimmer-link relative group flex items-center space-x-3 overflow-hidden p-1">
                    <span className="shimmer-effect"></span>
                    <Phone size={18} className="text-primary-400"/>
                    <span className="text-gray-300 group-hover:text-white transition-colors">+971 50 123 4567</span>
                </a>
            </div>
          </div>

          <div className="space-y-4"> {/* Column 4 */}
            <h3 className="font-semibold text-lg text-white">{t.footer.language}</h3>
            <button
              onClick={toggleLanguage}
              className="shimmer-link group relative w-full flex items-center space-x-3 px-4 py-3 bg-gray-800 hover:bg-primary-600 rounded-lg transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
            >
              <span className="shimmer-effect"></span>
              <Globe size={20} className="transition-transform duration-300 group-hover:rotate-[30deg]" />
              <span className="font-medium relative z-10">{isArabic ? 'Switch to English' : 'التبديل إلى العربية'}</span>
            </button>
          </div>
        </div>

        {/* --- Footer Bottom Content --- */}
        <div className="footer-content relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-gray-800/50 mt-16 pt-8 text-center">
            <p className="text-gray-400 text-sm">© {new Date().getFullYear()} Content Pro. {t.footer.rights || 'All rights reserved.'}</p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;