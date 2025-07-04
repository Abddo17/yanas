import React, { useEffect, useRef } from "react";
import { Camera, Mic, Lightbulb, Monitor, Settings } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext.jsx";
import { useAnimation } from "../contexts/AnimationContext.jsx";
import { content } from "../data/content.js";
import { motion } from "framer-motion";
import blackmagicImg from "../assets/images/blackmagic-studio-camera-4k-pro-g2-studio-camera.jpg";
import { Typewriter } from 'react-simple-typewriter';
import img61yjrcr from '../assets/images/61yjrCrDNAL._AC_SL1320_.jpg';
import imgB6a from '../assets/images/image_b6037413-ed64-4916-8e0c-e3526bef8911.jpg';
import imgShureMV from '../assets/images/Shure-MV6-Micro-USB-Broadcast-Gaming-prix-maroc-kamerty.ma-micro-gaming-kamerty-casablanca-marrakech-podcast-1.webp';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import fx22Img from '../assets/images/Image_fx (22).jpg';

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

const Studio = () => {
  const { language, isArabic } = useLanguage();
  const { animateOnScroll } = useAnimation();
  const t = content[language];
  const headerRef = useRef();
  const equipmentRef = useRef();
  const galleryRef = useRef();

  const equipmentIcons = {
    Cameras: Camera,
    Lenses: Camera,
    Stabilizers: Settings,
    Lighting: Lightbulb,
    Audio: Mic,
    Studio: Monitor,
    الكاميرات: Camera,
    العدسات: Camera,
    "مانع اهتزاز": Settings,
    الإضاءة: Lightbulb,
    الصوت: Mic,
    الاستوديو: Monitor,
  };

  const behindScenesImages = [
    "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/3184293/pexels-photo-3184293.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/3184294/pexels-photo-3184294.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/3184295/pexels-photo-3184295.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/3184296/pexels-photo-3184296.jpeg?auto=compress&cs=tinysrgb&w=600",
  ];

  useEffect(() => {
    animateOnScroll(headerRef.current);
    animateOnScroll(equipmentRef.current, {
      from: { y: 50, opacity: 0 },
      to: { y: 0, opacity: 1, duration: 1, stagger: 0.1 },
    });
    animateOnScroll(galleryRef.current, {
      from: { y: 50, opacity: 0 },
      to: { y: 0, opacity: 1, duration: 1, stagger: 0.1 },
    });
  }, [animateOnScroll]);

  const slides = [
    {
      img: blackmagicImg,
      title: 'Studio & Equipment',
      subtitle: 'Pro Studio. Pro Gear. Pro Results.',
      button: 'See Our Work',
      buttonLink: '/projects',
    },
    {
      img: img61yjrcr,
      title: 'Sony Lens',
      subtitle: 'High-performance lens for cinematic shots.',
      button: 'Book a Tour',
      buttonLink: '/contact',
    },
    {
      img: imgB6a,
      title: 'Studio Lighting',
      subtitle: 'Professional lighting for every creative need.',
      button: 'Get a Quote',
      buttonLink: '/contact',
    },
    {
      img: imgShureMV,
      title: 'Shure MV Microphone',
      subtitle: 'Broadcast-quality audio for podcasts and more.',
      button: 'Start Recording',
      buttonLink: '/contact',
    },
  ];

  return (
      <div className="flex flex-col min-h-screen bg-white">
        <main className="flex-1">
          {/* Hero Section as Swiper Slider */}
          <section className="relative w-full mt-24 h-[60vh] flex items-center justify-center overflow-hidden mb-12 bg-white">
            <Swiper
                spaceBetween={0}
                slidesPerView={1}
                loop={true}
                className="w-full h-full"
            >
              {slides.map((slide, idx) => {
                // Set all slides to dark green text
                let titleClass = "text-4xl md:text-6xl font-extrabold  drop-shadow-lg mb-4 animate-bounce text-green-700 ";
                let subtitleClass = "text-2xl font-semibold min-h-[2.5rem] mb-6 text-green-500 ";
                return (
                    <SwiperSlide key={idx}>
                      <div className="relative w-full h-[60vh] flex items-center justify-center bg-white">
                        <img
                            src={slide.img}
                            alt={slide.title}
                            className="absolute inset-0 w-full h-full object-contain max-h-[60vh] max-w-full mx-auto z-0 transition-all duration-700"
                        />
                        <div className="relative z-20 text-center w-full flex flex-col items-center justify-center h-full">
                          <h1 className={titleClass}>
                            {slide.title}
                          </h1>
                          <div className={subtitleClass}>
                            <Typewriter
                                words={[slide.subtitle]}
                                loop={false}
                                cursor
                                cursorStyle="_"
                                typeSpeed={70}
                                deleteSpeed={50}
                                delaySpeed={1500}
                            />
                          </div>
                          <a
                              href={slide.buttonLink}
                              className="inline-block px-8 py-4 bg-emerald-600 text-white font-semibold rounded-full hover:bg-emerald-700 transition-all duration-300 transform hover:scale-105 shadow-lg text-lg"
                          >
                            {slide.button}
                          </a>
                        </div>
                      </div>
                    </SwiperSlide>
                );
              })}
            </Swiper>
          </section>

          {/* Studio Features */}
          <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">
                    {isArabic
                        ? "استوديو متكامل للإبداع"
                        : "Complete Studio for Creativity"}
                  </h2>
                  <p className="text-lg text-gray-600 mb-8">
                    {isArabic
                        ? "استوديونا مجهز بالكامل لتلبية جميع احتياجات الإنتاج، من التصوير إلى المونتاج والتخطيط الإبداعي."
                        : "Our studio is fully equipped to meet all production needs, from shooting to editing and creative planning."}
                  </p>

                  <div className="space-y-6">
                    {[
                      {
                        title: isArabic
                            ? "مساحة تصوير واسعة"
                            : "Spacious Shooting Area",
                        description: isArabic
                            ? "مساحة مفتوحة ومرنة لجميع أنواع التصوير"
                            : "Open and flexible space for all types of shooting",
                      },
                      {
                        title: isArabic
                            ? "غرفة مونتاج متطورة"
                            : "Advanced Editing Suite",
                        description: isArabic
                            ? "أحدث برامج وأجهزة المونتاج والتحرير"
                            : "Latest editing software and hardware",
                      },
                      {
                        title: isArabic
                            ? "قاعة اجتماعات إبداعية"
                            : "Creative Meeting Room",
                        description: isArabic
                            ? "مساحة للتخطيط والعصف الذهني"
                            : "Space for planning and brainstorming",
                      },
                    ].map((feature, index) => (
                        <div key={index} className="flex items-start space-x-4">
                          <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                            <span className="w-3 h-3 bg-primary-500 rounded-full"></span>
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900 mb-1">
                              {feature.title}
                            </h3>
                            <p className="text-gray-600">{feature.description}</p>
                          </div>
                        </div>
                    ))}
                  </div>
                </div>

                <div className="relative">
                  <img
                      src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800"
                      alt="Studio"
                      className="w-full rounded-2xl shadow-2xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
                </div>
              </div>
            </div>
          </section>

          {/* Gallery Section for Studio Gear Highlights */}
          <section className="py-16 bg-gray-50">
            <div className="max-w-5xl mx-auto px-4">
              <h2 className="text-3xl font-bold text-primary-600 mb-10 text-center">Studio Gear Highlights</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                <div className="rounded-2xl overflow-hidden shadow-lg bg-white flex flex-col items-center">
                  <img src={blackmagicImg} alt="Blackmagic Camera" className="w-full max-w-xs max-h-60 object-contain mx-auto mt-4" />
                  <div className="p-4 text-center">
                    <h3 className="font-semibold text-lg text-gray-800 mb-2">Blackmagic Studio Camera</h3>
                    <p className="text-gray-500 text-sm">Professional 4K camera for studio production.</p>
                  </div>
                </div>
                <div className="rounded-2xl overflow-hidden shadow-lg bg-white flex flex-col items-center">
                  <img src={img61yjrcr} alt="Sony Lens" className="w-full max-w-xs max-h-60 object-contain mx-auto mt-4" />
                  <div className="p-4 text-center">
                    <h3 className="font-semibold text-lg text-gray-800 mb-2">Sony Lens</h3>
                    <p className="text-gray-500 text-sm">High-performance lens for cinematic shots.</p>
                  </div>
                </div>
                <div className="rounded-2xl overflow-hidden shadow-lg bg-white flex flex-col items-center">
                  <img src={imgB6a} alt="Studio Lighting" className="w-full max-w-xs max-h-60 object-contain mx-auto mt-4" />
                  <div className="p-4 text-center">
                    <h3 className="font-semibold text-lg text-gray-800 mb-2">Studio Lighting</h3>
                    <p className="text-gray-500 text-sm">Professional lighting for every creative need.</p>
                  </div>
                </div>
                <div className="rounded-2xl overflow-hidden shadow-lg bg-white flex flex-col items-center">
                  <img src={imgShureMV} alt="Shure MV Microphone" className="w-full max-w-xs max-h-60 object-contain mx-auto mt-4" />
                  <div className="p-4 text-center">
                    <h3 className="font-semibold text-lg text-gray-800 mb-2">Shure MV Microphone</h3>
                    <p className="text-gray-500 text-sm">Broadcast-quality audio for podcasts and more.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Technical Specifications */}
          <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  {isArabic ? "المواصفات التقنية" : "Technical Specifications"}
                </h2>
                <p className="text-gray-600">
                  {isArabic
                      ? "تفاصيل تقنية عن قدرات الاستوديو والمعدات"
                      : "Technical details about studio capabilities and equipment"}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  {
                    title: isArabic ? "دقة التصوير" : "Recording Quality",
                    value: "8K / 4K",
                    description: isArabic
                        ? "دقة عالية للفيديو"
                        : "Ultra-high video resolution",
                  },
                  {
                    title: isArabic ? "معدل الإطارات" : "Frame Rate",
                    value: "120fps",
                    description: isArabic
                        ? "حركة سلسة ومتقنة"
                        : "Smooth and precise motion",
                  },
                  {
                    title: isArabic ? "مساحة الاستوديو" : "Studio Space",
                    value: "500m²",
                    description: isArabic
                        ? "مساحة واسعة ومرنة"
                        : "Spacious and flexible area",
                  },
                  {
                    title: isArabic ? "الإضاءة" : "Lighting",
                    value: "50,000W",
                    description: isArabic
                        ? "إضاءة احترافية قوية"
                        : "Professional powerful lighting",
                  },
                ].map((spec, index) => (
                    <div key={index} className="text-center group">
                      <div className="bg-gradient-to-r from-primary-500 to-emerald-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white font-bold text-lg">
                      {spec.value}
                    </span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {spec.title}
                      </h3>
                      <p className="text-gray-600">{spec.description}</p>
                    </div>
                ))}
              </div>
            </div>
          </section>
        </main>
        {/* Footer will always be at the bottom */}
      </div>
  );
};

export default Studio;