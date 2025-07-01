import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Video,
  Users,
  Lightbulb,
  Play,
  Star,
  Award,
  TrendingUp,
} from "lucide-react";
import { gsap } from "gsap";
import { useLanguage } from "../contexts/LanguageContext.jsx";
import { useAnimation } from "../contexts/AnimationContext.jsx";
import { content } from "../data/content.js";

const Home = () => {
  const { language, isArabic } = useLanguage();
  const { animateOnScroll } = useAnimation();
  const t = content[language];
  const heroRef = useRef();
  const statsRef = useRef();
  const servicesRef = useRef();

  useEffect(() => {
    // Hero animation
    gsap.fromTo(
      heroRef.current.children,
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power2.out" }
    );

    // Stats animation
    animateOnScroll(statsRef.current, {
      from: { y: 50, opacity: 0 },
      to: { y: 0, opacity: 1, duration: 1, stagger: 0.1 },
    });

    // Services animation
    animateOnScroll(servicesRef.current, {
      from: { y: 50, opacity: 0 },
      to: { y: 0, opacity: 1, duration: 1, stagger: 0.2 },
    });
  }, [animateOnScroll]);

  const iconMap = {
    Video: Video,
    Users: Users,
    Lightbulb: Lightbulb,
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-700 via-primary-600 to-emerald-600 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div ref={heroRef} className="space-y-8">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
              {t.home.hero.title}
            </h1>
            <p className="text-xl md:text-2xl text-primary-100 max-w-3xl mx-auto leading-relaxed">
              {t.home.hero.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/projects"
                className="group inline-flex items-center px-8 py-4 bg-white text-primary-600 font-semibold rounded-full hover:bg-primary-50 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                {t.home.hero.cta}
                <ArrowRight
                  className={`ml-2 group-hover:translate-x-1 transition-transform duration-300 ${
                    isArabic ? "rotate-180 mr-2 ml-0" : ""
                  }`}
                  size={20}
                />
              </Link>
              <button className="group inline-flex items-center px-6 py-4 text-white border-2 border-white/30 rounded-full hover:bg-white/10 transition-all duration-300">
                <Play size={20} className="mr-2" />
                {isArabic ? "شاهد الفيديو" : "Watch Video"}
              </button>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full animate-bounce-slow"></div>
        <div
          className="absolute bottom-20 right-10 w-16 h-16 bg-white/10 rounded-full animate-bounce-slow"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-20 w-12 h-12 bg-white/10 rounded-full animate-bounce-slow"
          style={{ animationDelay: "2s" }}
        ></div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {t.home.stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="bg-gradient-to-r from-primary-500 to-emerald-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  {index === 0 && <Award className="text-white" size={24} />}
                  {index === 1 && <Star className="text-white" size={24} />}
                  {index === 2 && <Users className="text-white" size={24} />}
                  {index === 3 && (
                    <TrendingUp className="text-white" size={24} />
                  )}
                </div>
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t.home.services.title}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t.home.services.subtitle}
            </p>
          </div>

          <div
            ref={servicesRef}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {t.home.services.items.map((service, index) => {
              const IconComponent = iconMap[service.icon];
              return (
                <div
                  key={index}
                  className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className="bg-gradient-to-r from-primary-500 to-emerald-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="text-white" size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/services"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary-500 to-emerald-600 text-white font-semibold rounded-full hover:from-primary-600 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              {isArabic ? "جميع الخدمات" : "All Services"}
              <ArrowRight
                className={`ml-2 ${isArabic ? "rotate-180 mr-2 ml-0" : ""}`}
                size={20}
              />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-emerald-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            {isArabic ? "جاهز لبدء مشروعك؟" : "Ready to Start Your Project?"}
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            {isArabic
              ? "دعنا نساعدك في إنشاء محتوى يترك أثراً ويحقق أهدافك."
              : "Let us help you create content that makes an impact and achieves your goals."}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/packages"
              className="inline-flex items-center px-8 py-4 bg-white text-primary-600 font-semibold rounded-full hover:bg-primary-50 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              {isArabic ? "اختر باقتك" : "Choose Your Package"}
              <ArrowRight
                className={`ml-2 ${isArabic ? "rotate-180 mr-2 ml-0" : ""}`}
                size={20}
              />
            </Link>
            <Link
              to="/projects"
              className="inline-flex items-center px-8 py-4 text-white border-2 border-white/30 rounded-full hover:bg-white/10 transition-all duration-300"
            >
              {isArabic ? "شاهد أعمالنا" : "View Our Work"}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
