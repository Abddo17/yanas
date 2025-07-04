import React, { useEffect, useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Play } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import clsx from 'clsx'; // For clean, conditional classnames
import { useLanguage } from '../contexts/LanguageContext.jsx';
import { content } from '../data/content.js'; // Assuming content.js is structured correctly
import logoImg from "../assets/images/withou texte2.png";
import fx60Img from "../assets/images/Image_fx (60).png";
import fx61Img from "../assets/images/fx61.jpg";
import fx62Img from "../assets/images/fx62.jpg";
import fx63Img from "../assets/images/fx63.jpg";
import { motion } from 'framer-motion';
import Lenis from "@studio-freight/lenis";
import blackmagicImg from "../assets/images/blackmagic-studio-camera-4k-pro-g2-studio-camera.jpg";

// GSAP Plugin Registration
gsap.registerPlugin(ScrollTrigger);

// --- BUG-FIXED and POLISHED Hero Section ---
const Hero3DSection = () => {
  const { language, isArabic } = useLanguage();
  const homeContent = content[language]?.home;
  const t = homeContent?.hero;

  const heroRef = useRef(null);

  useLayoutEffect(() => {
    if (!heroRef.current || !t) {
      return;
    }



    let mouseMoveHandler;
    let mouseMoveTimeout;
    const ctx = gsap.context(() => {
      const cardStackContainer = heroRef.current.querySelector('.card-stack-container');
      const cards = gsap.utils.toArray('.hero-card-3d');
      const numCards = cards.length;

      gsap.set(cardStackContainer, { autoAlpha: 1 });

      const tl = gsap.timeline();

      tl.fromTo(
          cardStackContainer,
          { autoAlpha: 0, y: 60 },
          { autoAlpha: 1, y: 0, duration: 0.8, ease: 'power2.out' } // Clean fade and slide up
      )
          // No 3D stacking or rotation
          .from('.hero-card-content > *', {
            y: 60, opacity: 0, stagger: 0.1, ease: 'power3.out'
          }, "-=0.6");

      const rotX = gsap.quickTo(cardStackContainer, 'rotationX', { duration: 0.5, ease: 'power2.out' });
      const rotY = gsap.quickTo(cardStackContainer, 'rotationY', { duration: 0.5, ease: 'power2.out' });

      // Debounced mousemove handler
      mouseMoveHandler = (e) => {
        if (mouseMoveTimeout) return;
        mouseMoveTimeout = setTimeout(() => {
          mouseMoveTimeout = null;
          const { clientX, clientY } = e;
          const x = gsap.utils.mapRange(0, window.innerWidth, -7, 7, clientX);
          const y = gsap.utils.mapRange(0, window.innerHeight, 7, -7, clientY);
          rotX(y);
          rotY(x);
        }, 16); // ~60fps
      };

      tl.eventCallback("onComplete", () => {
        window.addEventListener('mousemove', mouseMoveHandler);
      });

    }, heroRef);

    return () => {
      if (mouseMoveHandler) {
        window.removeEventListener('mousemove', mouseMoveHandler);
      }
      ctx.revert();
    };
  }, [t]);

  if (!t) {
    return null;
  }

  const cardsData = [
    {
      zIndex: 5,
      content: (
          <div className="hero-card-content space-y-8 text-center px-4 pb-20">
            {/* Use the imported image variable directly */}
            <img src={logoImg} alt="YS Logo" className="mx-auto mb-4 w-44 h-44 object-contain" />
            <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight drop-shadow-lg">{t.title}</h1>
            <p className="text-xl text-primary-100 max-w-2xl mx-auto leading-relaxed">{t.subtitle}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/projects" className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-400 to-green-600 text-white font-semibold rounded-full hover:from-green-500 hover:to-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
                {t.cta}
                <ArrowRight className={clsx("ml-2 group-hover:translate-x-1 transition-transform duration-300", isArabic && "rotate-180 mr-2 ml-0")} size={20}/>
              </Link>
              <Link to="/projects">
              <button className="group inline-flex items-center px-6 py-4 text-white border-2 border-white/30 rounded-full hover:bg-white/10 transition-all duration-300">
                <Play size={20} className="mr-2"/>
                {isArabic ? "شاهد الفيديو" : "Watch Video"}
              </button>
              </Link>
            </div>
          </div>
      )
    },
    { zIndex: 4, content: <p className="text-xl font-semibold text-primary-200 opacity-60">Influencer Marketing</p> },
    { zIndex: 3, content: <p className="text-xl font-semibold text-primary-200 opacity-50">Video Production</p> },
    { zIndex: 2, content: <p className="text-xl font-semibold text-primary-200 opacity-40">Content Strategy</p> },
    { zIndex: 1, content: null },
  ];

  return (
      <section ref={heroRef} className="hero-section relative min-h-screen flex items-center justify-center bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900 opacity-70"></div>
        <div className="hero-3d-stage w-full h-full flex items-center justify-center">
          <div className="card-stack-container" style={{ visibility: 'hidden' }}>
            <div className="hero-card-3d absolute inset-0 flex items-center justify-center">
              {cardsData[0].content}
            </div>
          </div>
        </div>
      </section>
  );
};

//  Reusable, Animated Story Section (LIGHT ONLY)
const StorySection = ({ image, title, text, cta, layout }) => {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const titleWords = el.querySelectorAll('.story-title-word-inner');
      const imgContainer = el.querySelector('.story-image-container');
      const img = el.querySelector('.story-image');
      const paragraph = el.querySelector('.story-text');
      const actionLink = el.querySelector('.story-cta');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          end: "bottom 10%",
          scrub: 1,
        }
      });

      const textFromX = layout === 'imageRight' ? -50 : 50;

      tl.from(imgContainer, { opacity: 0, duration: 1.5, ease: 'power2.out' }, 0);
      tl.from(img, { scale: 1.2, duration: 2, ease: 'power2.out' }, 0);

      tl.from(titleWords, { y: '100%', opacity: 0, stagger: 0.05, duration: 0.8, ease: 'power3.out' }, 0.4);
      tl.from(paragraph, { x: textFromX, opacity: 0, duration: 1, ease: 'power2.out' }, 0.6);
      tl.from(actionLink, { x: textFromX, opacity: 0, duration: 1, ease: 'power2.out' }, 0.7);

    }, sectionRef);


    return () => ctx.revert();
  }, [layout]);

  const TitleComponent = () => (
      <h2 className="text-4xl  md:text-5xl font-extrabold leading-tight tracking-tight flex flex-wrap gap-x-3   text-left">
          <span className=" inline-block text-gray-900">{title}</span>
      </h2>
  );

  return (
      <section ref={sectionRef} className={clsx("py-20 sm:py-28 relative overflow-hidden bg-white pb-40")}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center relative z-10">
          <div className={clsx("space-y-6 text-left", { "md:order-last": layout === 'imageLeft' })}>
            <TitleComponent />
            <p className="story-text text-lg leading-relaxed text-gray-700">{text}</p>
            {cta && (
                <Link to={cta.to} className="story-cta group inline-flex items-center text-lg font-bold text-primary-500 hover:text-primary-600 transition-colors duration-300">
                  {cta.label}
                  <ArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1" size={20} />
                </Link>
            )}
          </div>
          <div className={clsx("story-image-container", { "md:order-first": layout === 'imageLeft' })}>
            {/* Use the imported image variable directly */}
            <img
                src={image}
                alt={title}
                className="story-image w-full h-full object-cover rounded-xl shadow-2xl"
                onError={(e) => {
                  console.error('Failed to load image:', e.target.src);
                  e.target.style.display = 'none';
                }}
            />
          </div>
        </div>
      </section>
  );
};

// The Main Component that arranges the stories
const AgencyStories = () => {
  const { language } = useLanguage();
  const homeContent = content[language]?.home;

  if (!homeContent) {
    return null;
  }

  const storiesData = [
    {
      layout: 'imageRight',
      image: fx60Img,
      title: homeContent.story1.title,
      text: homeContent.story1.text,
      cta: { to: '/projects', label: homeContent.story1.cta },
    },
    {
      layout: 'imageLeft',
      image: fx61Img,
      title: homeContent.story2.title,
      text: homeContent.story2.text,
      cta: { to: '/influencers', label: homeContent.story2.cta },
    },
    {
      layout: 'imageRight',
      image: fx62Img,
      title: homeContent.story3.title,
      text: homeContent.story3.text,
      cta: { to: '/services', label: homeContent.story3.cta },
    },
    {
      layout: 'imageLeft',
      image: fx63Img,
      title: homeContent.studio.title,
      text: homeContent.studio.text,
      cta: { to: '/studio', label: homeContent.studio.cta },
    },
  ];

  return (
      <div>
        {storiesData.map((story, index) => (
            <StorySection key={index} {...story} />
        ))}
      </div>
  );
};

const pageVariants = {
  initial: { opacity: 0, x: 100, scale: 0.95, rotate: 5 },
  animate: { opacity: 1, x: 0, scale: 1, rotate: 0 },
  exit: { opacity: 0, x: -100, scale: 0.95, rotate: -5 },
};

const pageTransition = {
  type: "spring",
  stiffness: 80,
  damping: 18,
  mass: 0.5,
  duration: 0.7,
};

// FINAL HOME PAGE
const Home = () => (
    <div className="flex flex-col min-h-screen  bg-white">
      <main className="flex-1 ">
        <motion.div
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={pageTransition}
        >
          <Hero3DSection />
          <AgencyStories />
          {/* You can add more sections like CTA, etc., here */}
        </motion.div>
      </main>
    </div>
);

export default Home;