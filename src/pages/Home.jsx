import React, { useEffect, useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Play } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import clsx from 'clsx'; // For clean, conditional classnames

// Dummy context and content for standalone functionality
const useLanguage = () => ({ language: 'en', isArabic: false });
const content = {
  en: {
    home: {
      hero: {
        title: "Creative Agency & Production House",
        subtitle: "We partner with brands and influencers to create content that captivates and converts. Your story, amplified.",
        cta: "View Our Work"
      },
      story1: {
        title: "Visual Creativity That Moves Brands",
        text: "We craft campaigns and visual content that make a real impact. From concept to execution, we tell your story with cinematic flair and professional polish.",
        cta: "See Our Work"
      },
      story2: {
        title: "Exclusive Influencer Network",
        text: "We partner with top creators and influencers to build authentic collaborations that amplify your brand.",
        cta: "Meet Influencers"
      },
      story3: { // This is the "Full-Suite Production Services" section
        title: "Full-Suite Production Services",
        text: "From video production to creative strategy, we deliver end-to-end solutions that drive your brand forward.",
        cta: "Explore Services"
      },
      studio: { // NEW: Content for the studio section
        title: "Our State-of-the-Art Studio",
        text: "Our dedicated studio space is equipped with cutting-edge technology and designed to bring your creative visions to life. From live shoots to post-production, we provide a seamless and inspiring environment.",
        cta: "Discover the Studio"
      }
    }
  }
};

// GSAP Plugin Registration
gsap.registerPlugin(ScrollTrigger);

// --- BUG-FIXED and POLISHED Hero Section ---
const Hero3DSection = () => {
  const { language, isArabic } = useLanguage();
  const t = content[language];
  const heroRef = useRef(null);

  useLayoutEffect(() => {
    let mouseMoveHandler;
    const ctx = gsap.context(() => {
      const cardStackContainer = heroRef.current.querySelector('.card-stack-container');
      const cards = gsap.utils.toArray('.hero-card-3d');
      const numCards = cards.length;

      gsap.set(cardStackContainer, { autoAlpha: 1 });

      const tl = gsap.timeline();

      tl.fromTo(
        cardStackContainer,
        { rotationY: 80, z: -1200 },
        { rotationY: -5, z: 0, duration: 3, ease: 'expo.out' }
      ).to(cards, {
        z: (i) => (numCards - 1 - i) * 35,
        rotationY: 0,
        duration: 2,
        ease: 'expo.out',
        stagger: { amount: 0.6, from: 'end' },
      }, "-=2.5")
      .from('.hero-card-content > *', {
        y: 60, opacity: 0, stagger: 0.1, ease: 'power3.out'
      }, "-=1.5");

      const rotX = gsap.quickTo(cardStackContainer, 'rotationX', { duration: 0.7, ease: 'power2.out' });
      const rotY = gsap.quickTo(cardStackContainer, 'rotationY', { duration: 0.7, ease: 'power2.out' });

      mouseMoveHandler = (e) => {
        const { clientX, clientY } = e;
        const x = gsap.utils.mapRange(0, window.innerWidth, -7, 7, clientX);
        const y = gsap.utils.mapRange(0, window.innerHeight, 7, -7, clientY);
        rotX(y);
        rotY(x);
      };

      // Only add mousemove listener if the timeline has finished
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
  }, [language]); // Re-run if language changes

  const cardsData = [
    {
      zIndex: 5,
      content: (
        <div className="hero-card-content space-y-8 text-center px-4">
          <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight drop-shadow-lg">{t.home.hero.title}</h1>
          <p className="text-xl text-primary-100 max-w-2xl mx-auto leading-relaxed">{t.home.hero.subtitle}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/projects" className="group inline-flex items-center px-8 py-4 bg-white text-slate-800 font-semibold rounded-full hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 shadow-lg">
              {t.home.hero.cta}
              <ArrowRight className={clsx("ml-2 group-hover:translate-x-1 transition-transform duration-300", isArabic && "rotate-180 mr-2 ml-0")} size={20}/>
            </Link>
            <button className="group inline-flex items-center px-6 py-4 text-white border-2 border-white/30 rounded-full hover:bg-white/10 transition-all duration-300">
              <Play size={20} className="mr-2"/>
              {isArabic ? "شاهد الفيديو" : "Watch Video"}
            </button>
          </div>
        </div>
      )
    },
    { zIndex: 4, content: <p className="text-xl font-semibold text-primary-200 opacity-60">Influencer Marketing</p> },
    { zIndex: 3, content: <p className="text-xl font-semibold text-primary-200 opacity-50">Video Production</p> },
    { zIndex: 2, content: <p className="text-xl font-semibold text-primary-200 opacity-40">Content Strategy</p> },
    { zIndex: 1, content: null }, // Placeholder for the back card
  ];

  return (
    <section ref={heroRef} className="hero-section relative min-h-screen flex items-center justify-center bg-slate-900 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900 opacity-70"></div>
      <div className="hero-3d-stage w-full h-full flex items-center justify-center">
        {/* Container for the 3D cards */}
        <div className="card-stack-container" style={{ visibility: 'hidden', perspective: '1000px' }}>
          {cardsData.map((card, i) => (
            <div
              key={i}
              className="hero-card-3d absolute inset-0 flex items-center justify-center"
              style={{ zIndex: card.zIndex, transformStyle: 'preserve-3d' }} // Added transformStyle
            >
              {card.content}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Reusable, Intelligent, Animated Story Section (LIGHT ONLY) ---
const StorySection = ({ image, title, text, cta, layout }) => {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const el = sectionRef.current;
    if (!el) return; // Exit if ref is not yet assigned

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
          end: "bottom 10%", // Define an end point for the trigger
          scrub: 1, // Smoothly ties the animation to scroll
          // toggleActions: "play none none none", // Removed as scrub handles it
        }
      });

      // Adjusting x-animation based on layout for direction
      const textFromX = layout === 'imageRight' ? -50 : 50;
      const imgFromX = layout === 'imageRight' ? 50 : -50; // Image slides in from opposite direction

      // Image fade-in and scale-up
      tl.from(imgContainer, { opacity: 0, duration: 1.5, ease: 'power2.out' }, 0);
      tl.from(img, { scale: 1.2, duration: 2, ease: 'power2.out' }, 0);

      // Text elements fade-in and slide-in
      tl.from(titleWords, { y: '100%', opacity: 0, stagger: 0.05, duration: 0.8, ease: 'power3.out' }, 0.4);
      tl.from(paragraph, { x: textFromX, opacity: 0, duration: 1, ease: 'power2.out' }, 0.6);
      tl.from(actionLink, { x: textFromX, opacity: 0, duration: 1, ease: 'power2.out' }, 0.7);

    }, sectionRef); // Pass sectionRef to context

    return () => ctx.revert(); // Cleanup function
  }, [layout]); // Re-run effect if layout changes

  const TitleComponent = () => (
    <h2 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight flex flex-wrap gap-x-3 text-left">
      {title.split(" ").map((word, i) => (
        <span key={i} className="story-title-word overflow-hidden"> {/* Added overflow-hidden */}
          <span className="story-title-word-inner inline-block text-gray-900">{word}</span>
        </span>
      ))}
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
          <img src={image} alt={title} className="story-image w-full h-full object-cover rounded-2xl shadow-2xl" />
        </div>
      </div>
    </section>
  );
};

// The Main Component that arranges the stories
const AgencyStories = () => {
  const t = content.en.home;
  const storiesData = [
    {
      layout: 'imageRight',
      // CORRECTED IMAGE PATH: Assuming fx60.jpg is in your public/fonts/photos folder
      image: '/fonts/photos/fx60.jpg',
      title: t.story1.title,
      text: t.story1.text,
      cta: { to: '/projects', label: t.story1.cta },
    },
    {
      layout: 'imageLeft',
      // Ensure fx61.jpg is in your public/images folder
      image: '/images/fx61.jpg',
      title: t.story2.title,
      text: t.story2.text,
      cta: { to: '/influencers', label: t.story2.cta },
    },
    {
      layout: 'imageRight',
      image: '/images/fx62.jpg',
      title: t.story3.title,
      text: t.story3.text,
      cta: { to: '/services', label: t.story3.cta },
    },
    {
      layout: 'imageLeft',
      image: '/images/fx63.jpg',
      title: t.studio.title,
      text: t.studio.text,
      cta: { to: '/studio', label: t.studio.cta },
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

// FINAL HOME PAGE
const Home = () => {
  return (
    <div className="bg-white">
      <Hero3DSection />
      <AgencyStories />
      {/* You can add more sections like CTA, Footer, etc., here */}
    </div>
  );
};

export default Home;