import React, { useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Users, TrendingUp, Eye, Heart, MessageCircle, ExternalLink, Star, Award } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext.jsx';
import { useAnimation } from '../contexts/AnimationContext.jsx';
import { influencers } from '../data/influencers.js';

const InfluencerProfile = () => {
  const { id } = useParams();
  const { language, isArabic } = useLanguage();
  const { animateOnScroll } = useAnimation();
  const headerRef = useRef();
  const statsRef = useRef();
  const workRef = useRef();
  
  const influencer = influencers.find(inf => inf.id === parseInt(id));

  useEffect(() => {
    if (headerRef.current) {
      animateOnScroll(headerRef.current);
    }
    if (statsRef.current) {
      animateOnScroll(statsRef.current, {
        from: { y: 50, opacity: 0 },
        to: { y: 0, opacity: 1, duration: 1, stagger: 0.1 },
      });
    }
    if (workRef.current) {
      animateOnScroll(workRef.current, {
        from: { y: 50, opacity: 0 },
        to: { y: 0, opacity: 1, duration: 1, stagger: 0.2 },
      });
    }
  }, [animateOnScroll]);

  if (!influencer) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {isArabic ? 'المؤثر غير موجود' : 'Influencer not found'}
          </h2>
          <Link
            to="/influencers"
            className="inline-flex items-center px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors duration-200"
          >
            <ArrowLeft className={`mr-2 ${isArabic ? 'rotate-180 ml-2 mr-0' : ''}`} size={20} />
            {isArabic ? 'العودة للمؤثرين' : 'Back to Influencers'}
          </Link>
        </div>
      </div>
    );
  }

  const getPlatformColor = (platform) => {
    switch (platform) {
      case 'Instagram': return 'from-pink-500 to-purple-600';
      case 'TikTok': return 'from-black to-gray-800';
      case 'YouTube': return 'from-red-500 to-red-600';
      case 'Twitter': return 'from-blue-400 to-blue-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Link
          to="/influencers"
          className="inline-flex items-center text-gray-600 hover:text-primary-600 transition-colors duration-200"
        >
          <ArrowLeft className={`mr-2 ${isArabic ? 'rotate-180 ml-2 mr-0' : ''}`} size={20} />
          {isArabic ? 'العودة للمؤثرين' : 'Back to Influencers'}
        </Link>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-emerald-600"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div ref={headerRef} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <div className="flex items-center space-x-4 mb-6">
                <div className={`px-4 py-2 rounded-full text-sm font-medium text-white bg-gradient-to-r ${getPlatformColor(influencer.platform)}`}>
                  {influencer.platform}
                </div>
                <div className="px-4 py-2 rounded-full text-sm font-medium bg-white/20 backdrop-blur-sm text-white">
                  {influencer.category}
                </div>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {influencer.name}
              </h1>
              <p className="text-xl text-primary-100 mb-2">{influencer.handle}</p>
              
              <div className="flex items-center space-x-6 mb-6">
                <div className="flex items-center text-primary-100">
                  <MapPin size={18} className="mr-2" />
                  <span>{influencer.location}</span>
                </div>
                <div className="flex items-center text-primary-100">
                  <Users size={18} className="mr-2" />
                  <span>{influencer.followers} {isArabic ? 'متابع' : 'followers'}</span>
                </div>
              </div>
              
              <p className="text-lg text-primary-100 leading-relaxed mb-8">
                {influencer.bio}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-8">
                {influencer.languages.map((lang, index) => (
                  <span key={index} className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm text-white">
                    {lang}
                  </span>
                ))}
              </div>
              
              <button className="inline-flex items-center px-8 py-4 bg-white text-primary-600 font-semibold rounded-full hover:bg-primary-50 transition-all duration-300 transform hover:scale-105 shadow-lg">
                {isArabic ? 'تواصل للتعاون' : 'Contact for Collaboration'}
                <ExternalLink className="ml-2" size={20} />
              </button>
            </div>
            
            <div className="relative">
              <div className="relative z-10">
                <img
                  src={influencer.image}
                  alt={influencer.name}
                  className="w-full max-w-md mx-auto rounded-2xl shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500"
                />
              </div>
              <div className="absolute inset-0 bg-white/10 rounded-2xl transform -rotate-3 scale-105"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {isArabic ? 'إحصائيات الأداء' : 'Performance Stats'}
            </h2>
            <p className="text-gray-600">
              {isArabic ? 'نظرة على أداء المحتوى والتفاعل' : 'Overview of content performance and engagement'}
            </p>
          </div>
          
          <div ref={statsRef} className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Eye className="text-white" size={24} />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{influencer.stats.avgViews}</div>
              <div className="text-gray-600 font-medium">{isArabic ? 'متوسط المشاهدات' : 'Avg Views'}</div>
            </div>
            
            <div className="text-center group">
              <div className="bg-gradient-to-r from-red-500 to-red-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Heart className="text-white" size={24} />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{influencer.stats.avgLikes}</div>
              <div className="text-gray-600 font-medium">{isArabic ? 'متوسط الإعجابات' : 'Avg Likes'}</div>
            </div>
            
            <div className="text-center group">
              <div className="bg-gradient-to-r from-green-500 to-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <MessageCircle className="text-white" size={24} />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{influencer.stats.avgComments}</div>
              <div className="text-gray-600 font-medium">{isArabic ? 'متوسط التعليقات' : 'Avg Comments'}</div>
            </div>
            
            <div className="text-center group">
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="text-white" size={24} />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{influencer.engagement}</div>
              <div className="text-gray-600 font-medium">{isArabic ? 'معدل التفاعل' : 'Engagement Rate'}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Work */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {isArabic ? 'الأعمال الحديثة' : 'Recent Work'}
            </h2>
            <p className="text-gray-600">
              {isArabic ? 'آخر الحملات والمشاريع المنجزة' : 'Latest campaigns and completed projects'}
            </p>
          </div>
          
          <div ref={workRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {influencer.recentWork.map((work, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{work.title}</h3>
                    <p className="text-primary-600 font-medium mb-1">{work.brand}</p>
                    <p className="text-gray-600 text-sm">{work.type}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Star className="text-yellow-400" size={20} />
                    <Award className="text-primary-500" size={20} />
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 text-sm">{isArabic ? 'الوصول' : 'Reach'}</span>
                    <span className="font-bold text-gray-900">{work.reach}</span>
                  </div>
                </div>
                
                <button className="w-full mt-6 flex items-center justify-center px-4 py-3 bg-gradient-to-r from-primary-500 to-emerald-600 text-white font-semibold rounded-lg hover:from-primary-600 hover:to-emerald-700 transition-all duration-300">
                  {isArabic ? 'عرض التفاصيل' : 'View Details'}
                  <ExternalLink className="ml-2" size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-emerald-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            {isArabic ? 'مهتم بالتعاون؟' : 'Interested in Collaboration?'}
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            {isArabic 
              ? 'تواصل معنا لمناقشة فرص التعاون مع هذا المؤثر'
              : 'Get in touch to discuss collaboration opportunities with this influencer'
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="inline-flex items-center px-8 py-4 bg-white text-primary-600 font-semibold rounded-full hover:bg-primary-50 transition-all duration-300 transform hover:scale-105 shadow-lg">
              {isArabic ? 'ابدأ التعاون' : 'Start Collaboration'}
              <ExternalLink className="ml-2" size={20} />
            </button>
            <Link
              to="/influencers"
              className="inline-flex items-center px-8 py-4 text-white border-2 border-white/30 rounded-full hover:bg-white/10 transition-all duration-300"
            >
              {isArabic ? 'تصفح المزيد' : 'Browse More'}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default InfluencerProfile;