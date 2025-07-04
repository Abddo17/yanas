import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Languages } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';
import clsx from 'clsx';
import { useLanguage } from '../contexts/LanguageContext.jsx';
import { content } from '../data/content.js';
import logoImg from '../assets/images/withou texte2.png';


gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, toggleLanguage, isArabic } = useLanguage();
  const location = useLocation();
  const t = content[language];
  const navRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis();
    const updateScrollTrigger = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(updateScrollTrigger);

    const ctx = gsap.context(() => {
      const showAnim = gsap.from(navRef.current, {
        yPercent: -150,
        paused: true,
        duration: 0.3,
        ease: 'power2.inOut',
      })

      ScrollTrigger.create({
        start: 'top top-=-100',
        end: 'max',
        onUpdate: (self) => (self.direction === -1 ? showAnim.play() : showAnim.reverse()),
      });

      const tl = gsap.timeline({ delay: 0.5 });
      tl.from(navRef.current, { y: 20, opacity: 0, duration: 0.8, ease: 'power3.out' });
    }, navRef);

    // Body scroll lock for mobile menu
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';

    return () => {
      ctx.revert();
      gsap.ticker.remove(updateScrollTrigger);
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  const navItems = [
    { name: t.nav.home, path: '/' },
    { name: t.nav.projects, path: '/projects' },
    { name: t.nav.influencers, path: '/influencers' },
    { name: t.nav.services, path: '/services' },
    { name: t.nav.packages, path: '/packages' },
    { name: t.nav.studio, path: '/studio' },
  ];

  return (
      <div ref={navRef} className="fixed top-4 left-0 right-0 z-50 flex justify-center">
        <nav className="flex items-center gap-x-2 rounded-full bg-white/60 backdrop-blur-xl shadow-lg p-2 border border-white/30 w-11/12 max-w-7xl mx-auto">
          <Link to="/" className="flex items-center space-x-2 px-3">
            <img src={logoImg} alt="YS Logo"
                 className="w-8 h-8 object-contain rounded-full drop-shadow-[0_0_12px_rgba(16,185,129,0.7)]"/>
            <span className="font-bold text-lg text-gray-900">YANAS</span>
          </Link>

          <div className="h-6 w-px bg-gray-900/10"></div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
                <Link
                    key={item.path}
                    to={item.path}
                    className={clsx(
                        'px-4 py-2 rounded-full text-sm font-medium transition-all duration-300',
                        location.pathname === item.path
                            ? 'bg-gradient-to-r from-primary-500 to-emerald-600 text-white shadow-md'
                            : 'text-gray-800 hover:text-primary-600 hover:bg-gray-400/20'
                    )}
                >
                  {item.name}
                </Link>
            ))}
          </div>

          <div className="flex items-center space-x-1">
            <button
                onClick={toggleLanguage}
                className="hidden md:flex items-center space-x-1 px-3 py-2 rounded-full text-sm font-medium text-gray-800 hover:text-primary-600 hover:bg-gray-400/20 transition-all duration-300"
                aria-label="Toggle language"
            >
              <Languages size={16} />

              <span>{isArabic ? 'EN' : 'AR'}</span>
            </button>
            <div className="md:hidden">
              <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  aria-expanded={isMenuOpen}
                  aria-label="Toggle menu"
                  className="p-2 rounded-full text-gray-800"
              >
                <AnimatePresence initial={false} mode="wait">
                  <motion.div
                      key={isMenuOpen ? 'x' : 'menu'}
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                  >
                    {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
                  </motion.div>
                </AnimatePresence>
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
              <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="md:hidden fixed top-16 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl shadow-lg border-b border-gray-200 w-11/12 max-w-7xl mx-auto rounded-b-xl"
              >
                <div className="flex flex-col p-4">
                  {navItems.map((item) => (
                      <Link
                          key={item.path}
                          to={item.path}
                          onClick={() => setIsMenuOpen(false)}
                          className={clsx(
                              'px-4 py-3 text-sm font-medium transition-all duration-300',
                              location.pathname === item.path
                                  ? 'bg-gradient-to-r from-primary-500 to-emerald-600 text-white rounded-md'
                                  : 'text-gray-800 hover:text-primary-600 hover:bg-gray-300'
                          )}
                      >
                        {item.name}
                      </Link>
                  ))}
                  <button
                      onClick={toggleLanguage}
                      className="flex items-center space-x-2 px-4 py-3 text-sm font-medium text-gray-800 hover:text-primary-600 hover:bg-gray-100 transition-all duration-300"
                      aria-label="Toggle language"
                  >
                    <Languages size={16} />

                    <span>{isArabic ? 'English' : 'العربية'}</span>
                  </button>
                </div>
              </motion.div>
          )}
        </AnimatePresence>
      </div>
  );
};

export default Navbar;