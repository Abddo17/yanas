import React, { useEffect, useRef } from 'react';
import { Video, Users, Lightbulb, Camera, Share2, Image, Mic, Calendar, Headphones, Sparkles, Tv, Scissors } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext.jsx';
import { useAnimation } from '../contexts/AnimationContext.jsx';
import { content } from '../data/content.js';

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

  useEffect(() => {
    animateOnScroll(headerRef.current);
    animateOnScroll(servicesRef.current, {
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
              {t.services.title}
            </h1>
            <p className="text-xl text-primary-100 max-w-3xl mx-auto">
              {t.services.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={servicesRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {t.services.items.map((service, index) => {
              const IconComponent = iconMap[index];
              return (
                <div key={index} className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="bg-gradient-to-r from-primary-500 to-emerald-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="text-white" size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-primary-600 transition-colors duration-200">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {service.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <button className="text-primary-600 font-medium hover:text-primary-700 transition-colors duration-200">
                      {isArabic ? 'اعرف المزيد' : 'Learn More'}
                    </button>
                    <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center group-hover:bg-primary-200 transition-colors duration-200">
                      <span className="text-primary-600 text-sm">→</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {isArabic ? 'كيف نعمل' : 'How We Work'}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {isArabic 
                ? 'عملية مدروسة ومنظمة لضمان تحقيق أفضل النتائج'
                : 'A structured and organized process to ensure the best results'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: '01',
                title: isArabic ? 'الاستشارة' : 'Consultation',
                description: isArabic ? 'نفهم احتياجاتك وأهدافك' : 'We understand your needs and goals',
              },
              {
                step: '02',
                title: isArabic ? 'التخطيط' : 'Planning',
                description: isArabic ? 'نضع استراتيجية مخصصة' : 'We create a customized strategy',
              },
              {
                step: '03',
                title: isArabic ? 'التنفيذ' : 'Execution',
                description: isArabic ? 'ننفذ المشروع بأعلى جودة' : 'We execute with highest quality',
              },
              {
                step: '04',
                title: isArabic ? 'التسليم' : 'Delivery',
                description: isArabic ? 'نسلم النتائج في الوقت المحدد' : 'We deliver results on time',
              },
            ].map((item, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-primary-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white font-bold text-lg">{item.step}</span>
                  </div>
                  {index < 3 && (
                    <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-primary-200 to-emerald-200 transform -translate-x-10"></div>
                  )}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-emerald-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            {isArabic ? 'جاهز لبدء مشروعك؟' : 'Ready to Start Your Project?'}
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            {isArabic 
              ? 'تواصل معنا اليوم ودعنا نساعدك في تحقيق أهدافك'
              : 'Contact us today and let us help you achieve your goals'
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="inline-flex items-center px-8 py-4 bg-white text-primary-600 font-semibold rounded-full hover:bg-primary-50 transition-all duration-300 transform hover:scale-105 shadow-lg">
              {isArabic ? 'احصل على استشارة مجانية' : 'Get Free Consultation'}
            </button>
            <button className="inline-flex items-center px-8 py-4 text-white border-2 border-white/30 rounded-full hover:bg-white/10 transition-all duration-300">
              {isArabic ? 'شاهد أعمالنا' : 'View Our Work'}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;