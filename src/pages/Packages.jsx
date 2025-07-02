import React, { useEffect, useRef, useState } from 'react';
import { Check, Star, ArrowRight, Zap, Crown, Rocket, Infinity } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext.jsx';
import { useAnimation } from '../contexts/AnimationContext.jsx';
import { content } from '../data/content.js';

const Packages = () => {
  const { language, isArabic } = useLanguage();
  const { animateOnScroll } = useAnimation();
  const t = content[language];
  const headerRef = useRef();
  const packagesRef = useRef();
  const customRef = useRef();
  const [selectedPlan, setSelectedPlan] = useState(1); // Growth package is popular

  const packageIcons = {
    0: Zap,
    1: Star,
    2: Crown,
    3: Infinity,
  };

  useEffect(() => {
    animateOnScroll(headerRef.current);
    animateOnScroll(packagesRef.current, {
      from: { y: 50, opacity: 0 },
      to: { y: 0, opacity: 1, duration: 1, stagger: 0.2 },
    });
    animateOnScroll(customRef.current);
  }, [animateOnScroll]);

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      {/* Header */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-emerald-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div ref={headerRef}>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {t.packages.title}
            </h1>
            <p className="text-xl text-primary-100 max-w-3xl mx-auto">
              {t.packages.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Packages Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={packagesRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {t.packages.plans.map((plan, index) => {
              const IconComponent = packageIcons[index];
              const isPopular = plan.popular;
              const isSelected = selectedPlan === index;
              
              return (
                <div
                  key={index}
                  className={`relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 ${
                    isPopular ? 'ring-2 ring-primary-500 scale-105' : ''
                  } ${isSelected ? 'ring-2 ring-emerald-500' : ''}`}
                  onClick={() => setSelectedPlan(index)}
                >
                  {isPopular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <div className="bg-gradient-to-r from-primary-500 to-emerald-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                        {isArabic ? 'الأكثر شعبية' : 'Most Popular'}
                      </div>
                    </div>
                  )}
                  
                  <div className="p-8">
                    <div className="text-center mb-8">
                      <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                        isPopular 
                          ? 'bg-gradient-to-r from-primary-500 to-emerald-600' 
                          : 'bg-gray-100'
                      }`}>
                        <IconComponent 
                          className={isPopular ? 'text-white' : 'text-gray-600'} 
                          size={28} 
                        />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {plan.name}
                      </h3>
                      <div className="mb-4">
                        <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
                        <span className="text-gray-600 ml-2">/ {plan.period}</span>
                      </div>
                    </div>
                    
                    <ul className="space-y-4 mb-8">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start">
                          <Check className="text-green-500 mr-3 mt-0.5 flex-shrink-0" size={18} />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <button className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
                      isPopular
                        ? 'bg-gradient-to-r from-primary-500 to-emerald-600 text-white hover:from-primary-600 hover:to-emerald-700 transform hover:scale-105'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}>
                      {isArabic ? 'اختر هذه الباقة' : 'Choose This Plan'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Custom Package Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={customRef} className="bg-gradient-to-r from-primary-50 to-emerald-50 rounded-3xl p-8 md:p-12 text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-primary-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Rocket className="text-white" size={32} />
            </div>
            
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t.packages.custom.title}
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              {t.packages.custom.description}
            </p>
            
            <button className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary-500 to-emerald-600 text-white font-semibold rounded-full hover:from-primary-600 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
              {isArabic ? 'احصل على عرض مخصص' : 'Get Custom Quote'}
              <ArrowRight className={`ml-2 ${isArabic ? 'rotate-180 mr-2 ml-0' : ''}`} size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {isArabic ? 'مقارنة الباقات' : 'Package Comparison'}
            </h2>
            <p className="text-gray-600">
              {isArabic ? 'مقارنة تفصيلية بين جميع الباقات' : 'Detailed comparison of all packages'}
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                      {isArabic ? 'الميزة' : 'Feature'}
                    </th>
                    {t.packages.plans.map((plan, index) => (
                      <th key={index} className="px-6 py-4 text-center text-sm font-medium text-gray-500 uppercase tracking-wider">
                        {plan.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {isArabic ? 'السعر الشهري' : 'Monthly Price'}
                    </td>
                    {t.packages.plans.map((plan, index) => (
                      <td key={index} className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900 font-semibold">
                        {plan.price}
                      </td>
                    ))}
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {isArabic ? 'عدد الريلز' : 'Number of Reels'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900">8</td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900">12</td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900">16</td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900">
                      <Infinity className="mx-auto text-primary-500" size={20} />
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {isArabic ? 'أيام التصوير' : 'Shooting Days'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900">4</td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900">6</td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900">8</td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900">
                      <Infinity className="mx-auto text-primary-500" size={20} />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-emerald-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            {isArabic ? 'جاهز لاختيار باقتك؟' : 'Ready to Choose Your Package?'}
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            {isArabic 
              ? 'ابدأ رحلتك معنا اليوم واحصل على محتوى استثنائي'
              : 'Start your journey with us today and get exceptional content'
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="inline-flex items-center px-8 py-4 bg-white text-primary-600 font-semibold rounded-full hover:bg-primary-50 transition-all duration-300 transform hover:scale-105 shadow-lg">
              {isArabic ? 'تواصل معنا' : 'Contact Us'}
              <ArrowRight className={`ml-2 ${isArabic ? 'rotate-180 mr-2 ml-0' : ''}`} size={20} />
            </button>
            <button className="inline-flex items-center px-8 py-4 text-white border-2 border-white/30 rounded-full hover:bg-white/10 transition-all duration-300">
              {isArabic ? 'احجز استشارة مجانية' : 'Book Free Consultation'}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Packages;