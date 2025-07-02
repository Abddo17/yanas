import React, { useEffect, useRef } from "react";
import { Camera, Mic, Lightbulb, Monitor, Settings } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext.jsx";
import { useAnimation } from "../contexts/AnimationContext.jsx";
import { content } from "../data/content.js";

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

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      {/* Header */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-emerald-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div ref={headerRef}>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {t.studio.title}
            </h1>
            <p className="text-xl text-primary-100 max-w-3xl mx-auto">
              {t.studio.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Visual Impact Section (from Home) */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-emerald-700 mb-6">
            Visual Creativity That Moves Brands
          </h2>
          <p className="text-xl text-gray-700 mb-8">
            We craft campaigns and visual content that make a real impact. From concept to execution, we tell your story with cinematic flair and professional polish.
          </p>
          <a href="/projects" className="inline-flex items-center px-8 py-4 bg-emerald-600 text-white font-semibold rounded-full hover:bg-emerald-700 transition-all duration-300 transform hover:scale-105 shadow-lg text-lg">
            See Our Work
          </a>
        </div>
      </section>

      {/* Equipment Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {isArabic ? "معداتنا المتطورة" : "Our Advanced Equipment"}
            </h2>
            <p className="text-gray-600">
              {isArabic
                ? "نستخدم أحدث التقنيات والمعدات لضمان أعلى جودة"
                : "We use the latest technology and equipment to ensure the highest quality"}
            </p>
          </div>

          <div
            ref={equipmentRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {t.studio.equipment.map((category, index) => {
              const IconComponent = equipmentIcons[category.category] || Camera;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className="bg-gradient-to-r from-primary-500 to-emerald-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                    <IconComponent className="text-white" size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {category.category}
                  </h3>
                  <ul className="space-y-2">
                    {category.items.map((item, itemIndex) => (
                      <li
                        key={itemIndex}
                        className="text-gray-600 flex items-center"
                      >
                        <span className="w-2 h-2 bg-primary-500 rounded-full mr-3"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
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

      {/* Behind the Scenes Gallery */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {isArabic ? "من وراء الكواليس" : "Behind the Scenes"}
            </h2>
            <p className="text-gray-600">
              {isArabic
                ? "نظرة على عملية الإنتاج والطاقة الإبداعية في الاستوديو"
                : "A look at the production process and creative energy in the studio"}
            </p>
          </div>

          <div
            ref={galleryRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {behindScenesImages.map((image, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <img
                  src={image}
                  alt={`Behind the scenes ${index + 1}`}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-sm font-medium">
                    {isArabic ? "من وراء الكواليس" : "Behind the Scenes"}
                  </p>
                </div>
              </div>
            ))}
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

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-emerald-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            {isArabic ? "جاهز لزيارة الاستوديو؟" : "Ready to Visit Our Studio?"}
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            {isArabic
              ? "احجز جولة في الاستوديو واكتشف إمكانياتنا الإبداعية"
              : "Book a studio tour and discover our creative capabilities"}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="inline-flex items-center px-8 py-4 bg-white text-primary-600 font-semibold rounded-full hover:bg-primary-50 transition-all duration-300 transform hover:scale-105 shadow-lg">
              {isArabic ? "احجز جولة" : "Book a Tour"}
            </button>
            <button className="inline-flex items-center px-8 py-4 text-white border-2 border-white/30 rounded-full hover:bg-white/10 transition-all duration-300">
              {isArabic ? "تواصل معنا" : "Contact Us"}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Studio;
