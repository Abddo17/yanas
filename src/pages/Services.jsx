import React, { useEffect, useRef } from 'react';
import { Video, Users, Lightbulb, Camera, Share2, Image, Mic, Calendar, Headphones, Sparkles, Tv, Scissors, Check } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext.jsx';
import { useAnimation } from '../contexts/AnimationContext.jsx';
import { content } from '../data/content.js';
import { motion } from "framer-motion";
import { Typewriter } from 'react-simple-typewriter';
import {Link} from "react-router-dom";

const pageVariants = {
  initial: { opacity: 0, x: 100 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -100 },
};

const pageTransition = {
  type: "spring",
  stiffness: 50,
  damping: 20,
  duration: 0.6,
};

const Services = () => {
  const { language, isArabic } = useLanguage();
  const { animateOnScroll } = useAnimation();
  const t = content[language];
  const headerRef = useRef();
  const servicesRef = useRef();

  const iconMap = {
    0: Video,
    1: Users,
    2: Lightbulb,
    3: Camera,
    4: Share2,
    5: Image,
    6: Scissors,
    7: Calendar,
    8: Headphones,
    9: Sparkles,
    10: Tv,
    11: Camera,
  };

  // Animation variants for the service cards
  const cardVariants = {
    rest: {
      rotateY: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
      },
    },
    hover: {
      rotateY: 180,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
      },
    },
  };

  // Animation variants for the back content of the card
  const backContentVariants = {
    rest: {
      opacity: 0,
      rotateY: -180, // Initially rotated to be hidden
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
      },
    },
    hover: {
      opacity: 1,
      rotateY: 0, // Rotate to visible position on hover
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
        delay: 0.3, // Delay to show after the card has flipped
      },
    },
  };

  useEffect(() => {
    animateOnScroll(headerRef.current);
    animateOnScroll(servicesRef.current, {
      from: { y: 50, opacity: 0 },
      to: { y: 0, opacity: 1, duration: 1, stagger: 0.1 },
    });
  }, [animateOnScroll]);

  return (
      <motion.div
          className="min-h-screen pt-20 relative overflow-hidden"
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={pageTransition}
      >
        {/* Gradient background like Home hero */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-900 pointer-events-none z-0"></div>
        {/* Header */}
        <section className="py-16 relative z-10">
          <motion.div
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
              initial={{ opacity: 0, y: -40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
          >
            <motion.h1
                className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-primary-500 via-emerald-400 to-emerald-600 bg-clip-text text-transparent mb-4 animate-bounce"
                initial={{ opacity: 0, y: -40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
            >
              {t.services.title}
            </motion.h1>
            <div className="text-2xl text-white font-semibold min-h-[2.5rem] mb-2">
              <Typewriter
                  words={[
                    isArabic ? 'نصنع أفكاراً لا تُنسى' : 'We Create Unforgettable Ideas',
                    isArabic ? 'نحو محتوى يحقق النجاح' : 'Content That Drives Success',
                    isArabic ? 'ابدأ رحلتك الإبداعية معنا' : 'Start Your Creative Journey With Us'
                  ]}
                  loop={true}
                  cursor
                  cursorStyle="_"
                  typeSpeed={70}
                  deleteSpeed={50}
                  delaySpeed={1500}
              />
            </div>
          </motion.div>
        </section>

        {/* Services Grid */}
        <section className="py-16 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div ref={servicesRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {t.services.items.map((service, index) => {
                const IconComponent = iconMap[index];
                return (
                    <div
                        key={index}
                        className="relative cursor-pointer group h-full [perspective:1000px]"
                    >
                      {/* Card inner wrapper that rotates */}
                      <motion.div
                          className="relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d]"
                          whileHover={{ rotateY: 180 }}
                          style={{ minHeight: '350px' }}
                      >
                        {/* Front of the card */}
                        <div className="absolute inset-0 bg-white rounded-2xl p-8 shadow-lg flex flex-col justify-between h-full [backface-visibility:hidden]">
                          <div className="mx-auto mb-6 flex items-center justify-center">
                            {/* Icon background: green gradient, like Home */}
                            <div className="flex items-center justify-center w-24 h-24">
                              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-primary-500 via-emerald-400 to-emerald-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                                <IconComponent className="text-white drop-shadow-lg transition-transform duration-300 group-hover:scale-125" size={40} />
                              </div>
                            </div>
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-primary-600 transition-colors duration-200 text-center">
                            {service.title}
                          </h3>
                          <p className="text-gray-600 leading-relaxed mb-6 text-center">
                            {service.description}
                          </p>
                          <div className="flex items-center justify-center mt-auto">
                            <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center group-hover:bg-primary-200 transition-colors duration-200 shadow">
                              <span className="text-primary-600 text-lg">→</span>
                            </div>
                          </div>
                        </div>

                        {/* Back of the card */}
                        <div className="absolute inset-0 bg-primary-600 rounded-2xl p-8 flex flex-col justify-center items-center text-white [backface-visibility:hidden] [transform:rotateY(180deg)]">
                          <h4 className="text-2xl font-bold mb-4 text-center">
                            {service.title}
                          </h4>
                          <p className="text-lg text-center leading-relaxed">
                            {service.detailedInfo || `Discover the power of ${service.title}.`}
                          </p>
                          <Link to={'/packages'}>
                          <button className="mt-8 px-6 py-2 bg-white text-primary-600 font-semibold rounded-full hover:bg-primary-100 transition-colors duration-200">
                            {isArabic ? 'ابدأ الآن' : 'Start Now'}
                          </button>
                          </Link>
                        </div>
                      </motion.div>
                    </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20 bg-transparent">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 animate-pulse">
                {isArabic ? 'كيف نعمل' : 'How We Work'}
              </h2>
              <p className="text-xl text-white/80 max-w-3xl mx-auto">
                {isArabic
                    ? 'رحلتك معنا مليئة بالإبداع، التنظيم، والنجاح.'
                    : 'Your journey with us is filled with creativity, structure, and success.'
                }
              </p>
            </div>
            <div className="relative flex flex-col items-center">
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-primary-400 to-emerald-400 z-0"></div>
              {[
                {
                  icon: <Lightbulb className="w-8 h-8 text-yellow-400" />, bg: "bg-yellow-100",
                  headline: isArabic ? "نستمع ونلهم" : "We Listen & Inspire",
                  description: isArabic ? "نبدأ بفهم رؤيتك وأهدافك." : "We start by understanding your vision and goals."
                },
                {
                  icon: <Calendar className="w-8 h-8 text-blue-400" />, bg: "bg-blue-100",
                  headline: isArabic ? "نخطط بإبداع" : "Creative Planning",
                  description: isArabic ? "نضع خطة مخصصة تضمن التميز." : "We craft a custom plan to ensure excellence."
                },
                {
                  icon: <Sparkles className="w-8 h-8 text-green-400" />, bg: "bg-green-100",
                  headline: isArabic ? "ننفذ بإتقان" : "Flawless Execution",
                  description: isArabic ? "نحول الأفكار إلى واقع ملموس." : "We turn ideas into reality with precision."
                },
                {
                  icon: <Check className="w-8 h-8 text-emerald-500" />, bg: "bg-emerald-100",
                  headline: isArabic ? "نسلم ونحتفل" : "Deliver & Celebrate",
                  description: isArabic ? "نحتفل بنجاحك معنا!" : "We celebrate your success together!"
                }
              ].map((step, idx, arr) => (
                  <motion.div
                      key={idx}
                      className="relative z-10 mb-12 flex flex-col items-center"
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.2, duration: 0.7 }}
                  >
                    <div className={`w-16 h-16 flex items-center justify-center rounded-full shadow-lg mb-4 ${step.bg}`}>
                      {step.icon}
                    </div>
                    <h3 className="text-2xl font-bold mb-2 text-white">{step.headline}</h3>
                    <p className="text-white/80 mb-2 text-center">{step.description}</p>
                    {idx < arr.length - 1 && (
                        <div className="w-1 h-12 bg-gradient-to-b from-primary-400 to-emerald-400"></div>
                    )}
                  </motion.div>
              ))}
              <div className="mt-8 text-xl italic text-white/80 text-center">
                {isArabic
                    ? 'كل خطوة تقربنا من النجاح معاً!'
                    : 'Every step brings us closer to success together!'}
              </div>
            </div>
          </div>
        </section>
      </motion.div>
  );
};

export default Services;