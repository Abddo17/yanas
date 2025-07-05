import React, { useEffect, useRef } from 'react';
import { Mail, Phone, Instagram, Languages } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../contexts/LanguageContext.jsx';
import { content } from '../data/content.js';
import { Link } from 'react-router-dom';
import logoImg from '../assets/images/withou texte2.png';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
    const { language, toggleLanguage, isArabic } = useLanguage();
    const t = content[language] || content['en']; // Fallback to English
    const footerRef = useRef(null);
    const blobsRef = useRef([]);

    useEffect(() => {
        if (!footerRef.current) return;

        const ctx = gsap.context(() => {
            // Aurora Background Animation (independent of scroll)
            blobsRef.current.forEach((blob, index) => {
                if (blob) {
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
                }
            });

            // Check if page is scrollable enough for ScrollTrigger
           /* const isScrollable = document.documentElement.scrollHeight > window.innerHeight;

            if (isScrollable) {
                // Scroll-Triggered Animation for content reveal
                const revealTl = gsap.timeline({
                    scrollTrigger: {
                        trigger: footerRef.current,
                        start: 'top bottom', // Trigger when footer top hits viewport bottom
                        end: 'bottom bottom',
                        scrub: 1,
                    },
                });

                revealTl
                    .from(footerRef.current, { yPercent: -5, ease: 'none' })
                    .from(
                        '.footer-content > *',
                        {
                            opacity: 0,
                            y: 60,
                            stagger: 0.15,
                            ease: 'power3.out',
                        },
                        0
                    );
            } else {*/
                // Ensure content is visible on non-scrollable pages
                gsap.set('.footer-content > *', { opacity: 1, y: 0 });
           /* }*/

            // Shimmer Hover Effect
            const shimmerLinks = gsap.utils.toArray('.shimmer-link');
            shimmerLinks.forEach((link) => {
                const shimmer = link.querySelector('.shimmer-effect');
                if (shimmer) {
                    const handleMouseEnter = () => {
                        gsap.fromTo(
                            shimmer,
                            { xPercent: -100, opacity: 0.8 },
                            { xPercent: 100, duration: 0.8, ease: 'power2.inOut', opacity: 0 }
                        );
                    };
                    link.addEventListener('mouseenter', handleMouseEnter);
                    link._mouseEnterHandler = handleMouseEnter;
                }
            });
        }, footerRef);

        return () => {
            // Clean up event listeners
            const shimmerLinks = gsap.utils.toArray('.shimmer-link');
            shimmerLinks.forEach((link) => {
                if (link._mouseEnterHandler) {
                    link.removeEventListener('mouseenter', link._mouseEnterHandler);
                    delete link._mouseEnterHandler;
                }
            });
            ctx.revert();
        };
    }, []);

    return (
        <div className="relative z-50">
            <footer
                ref={footerRef}
                className="relative bg-slate-900 text-white pt-24 pb-12 overflow-hidden"
            >
                {/* Aurora Gradient Container */}
                <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
                    <div
                        ref={(el) => (blobsRef.current[0] = el)}
                        className="absolute w-96 h-96 bg-cyan-600 rounded-full top-1/4 left-1/4 filter blur-3xl"
                    ></div>
                    <div
                        ref={(el) => (blobsRef.current[1] = el)}
                        className="absolute w-80 h-80 bg-emerald-500 rounded-full bottom-1/4 right-1/4 filter blur-3xl"
                    ></div>
                    <div
                        ref={(el) => (blobsRef.current[2] = el)}
                        className="absolute w-72 h-72 bg-primary-600 rounded-full top-10 right-10 filter blur-3xl"
                    ></div>
                </div>

                {/* Footer Content */}
                <div className="footer-content relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    <div className="space-y-5">
                        <Link to="/" className="flex items-center space-x-2 px-3">
                            <img
                                src={logoImg}
                                alt="YS Logo"
                                className="w-10 h-10 object-contain rounded-full drop-shadow-[0_0_12px_rgba(16,185,129,0.7)]"
                            />
                            <span className="font-bold text-lg text-gray-50">YANAS</span>
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed pr-4">
                            {t.footer?.description || 'We Create High-Impact Content That Converts.'}
                        </p>
                        <div className="flex flex-col space-y-2 pt-2">
                            <a
                                href="https://instagram.com/naddaf_vfx"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="shimmer-link relative group flex items-center space-x-2 overflow-hidden p-2 rounded-lg hover:bg-gray-800 transition-all duration-300"
                            >
                                <span className="shimmer-effect absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0"></span>
                                <Instagram className="text-gray-400 group-hover:text-white transition-colors" size={18} />
                                <span className="text-gray-400 group-hover:text-white transition-colors text-sm">
                  @naddaf_vfx
                </span>
                            </a>
                            <a
                                href="https://instagram.com/yaraa.ayoubb"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="shimmer-link relative group flex items-center space-x-2 overflow-hidden p-2 rounded-lg hover:bg-gray-800 transition-all duration-300"
                            >
                                <span className="shimmer-effect absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0"></span>
                                <Instagram className="text-gray-400 group-hover:text-white transition-colors" size={18} />
                                <span className="text-gray-400 group-hover:text-white transition-colors text-sm">
                  @yaraa.ayoubb
                </span>
                            </a>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="font-semibold text-lg text-white">{t.footer?.quickLinks || 'Quick Links'}</h3>
                        <ul className="space-y-3">
                            <li>
                                <a href="/projects" className="text-gray-300 hover:text-primary-400 transition-colors">
                                    {t.footer?.links?.projects || 'Projects'}
                                </a>
                            </li>
                            <li>
                                <a href="/services" className="text-gray-300 hover:text-primary-400 transition-colors">
                                    {t.footer?.links?.services || 'Services'}
                                </a>
                            </li>
                            <li>
                                <a href="/studio" className="text-gray-300 hover:text-primary-400 transition-colors">
                                    {t.footer?.links?.studio || 'Our Studio'}
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h3 className="font-semibold text-lg text-white">{t.footer?.contact || 'Contact'}</h3>
                        <div className="space-y-4">
                            <a
                                href="mailto:Yara.ayoubb23@gmail.com"
                                className="shimmer-link relative group flex items-center space-x-3 overflow-hidden p-1"
                            >
                                <span className="shimmer-effect absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0"></span>
                                <Mail size={18} className="text-primary-400" />
                                <span className="text-gray-300 group-hover:text-white transition-colors">
                  Yara.ayoubb23@gmail.com
                </span>
                            </a>
                            <a
                                href="tel:+971507726305"
                                className="shimmer-link relative group flex items-center space-x-3 overflow-hidden p-1"
                            >
                                <span className="shimmer-effect absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0"></span>
                                <Phone size={18} className="text-primary-400" />
                                <span className="text-gray-300 group-hover:text-white transition-colors">+971507726305</span>
                            </a>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="font-semibold text-lg text-white">{t.footer?.language || 'Language'}</h3>
                        <button
                            onClick={toggleLanguage}
                            className="shimmer-link group relative w-full flex items-center space-x-3 px-4 py-3 bg-gray-800 hover:bg-primary-600 rounded-lg transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
                        >
                            <span className="shimmer-effect absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0"></span>
                            <Languages
                                size={16}
                                className="transition-transform duration-300 group-hover:rotate-[30deg]"
                            />
                            <span className="font-medium relative z-10">
                {isArabic ? 'Switch to English' : 'التبديل إلى العربية'}
              </span>
                        </button>
                    </div>
                </div>

                {/* Footer Bottom Content */}
                <div className="footer-content relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-gray-800/50 mt-16 pt-8 text-center">
                    <p className="text-gray-400 text-sm">
                        © {new Date().getFullYear()} Content Pro. {t.footer?.rights || 'All rights reserved.'}
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default Footer;