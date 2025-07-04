import React, { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Users, TrendingUp, Eye, Tag, ExternalLink, Star, Instagram, Twitter, Youtube, Facebook } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext.jsx';
import { useAnimation } from '../contexts/AnimationContext.jsx';
import { influencers } from '../data/influencers.js';

const InfluencerProfile = () => {
  const { id } = useParams();
  const { language, isArabic } = useLanguage();
  const { animateOnScroll } = useAnimation();
  const headerRef = useRef();
  const statsRef = useRef();
  const socialsRef = useRef();
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  const influencer = influencers.find(inf => inf.id === parseInt(id));

  // Debug: Log influencer data and context values
  useEffect(() => {
    console.log('Language Context:', { language, isArabic });
    console.log('Animation Context:', { animateOnScroll });
    if (!influencer) {
      console.warn(`No influencer found for ID: ${id}`);
    } else {
      console.log('Influencer Data:', influencer);
    }
  }, [influencer, id, language, isArabic, animateOnScroll]);

  // Animation setup
  useEffect(() => {
    if (headerRef.current) {
      animateOnScroll(headerRef.current, {
        from: { opacity: 0, y: 50 },
        to: { opacity: 1, y: 0, duration: 1 },
      });
    }
    if (statsRef.current) {
      animateOnScroll(statsRef.current, {
        from: { y: 50, opacity: 0 },
        to: { y: 0, opacity: 1, duration: 1, stagger: 0.1 },
      });
    }
    if (socialsRef.current) {
      animateOnScroll(socialsRef.current, {
        from: { y: 50, opacity: 0 },
        to: { y: 0, opacity: 1, duration: 1, stagger: 0.2 },
      });
    }
  }, [animateOnScroll]);

  if (!influencer) {
    return (
        // <div className="min-h-screen pt-20 bg-gray-50">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link
              to="/influencers"
              className="inline-flex items-center text-gray-600 hover:text-blue-600 transition-colors duration-200"
          >
            <ArrowLeft className={`text-transparent bg-clip-stroke bg-gradient-to-r from-primary-600 to-emerald-600 mr-3  ${isArabic ? 'rotate-180 ml-2 mr-0' : ''}`} size={20} />
            {isArabic ? 'العودة للمؤثرين' : 'Back to Influencers'}
          </Link>
        </div>
    );
  }

  const getPlatformColor = (platform) => {
    switch (platform?.toLowerCase()) {
      case 'instagram': return 'from-pink-500 to-purple-600';
      case 'tiktok': return 'from-black to-gray-800';
      case 'youtube': return 'from-red-500 to-red-600';
      case 'twitter': return 'from-blue-400 to-blue-600';
      case 'facebook': return 'from-blue-600 to-blue-800';
      case 'snapchat': return 'from-yellow-400 to-yellow-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  // Fallback image
  const fallbackImage = 'https://via.placeholder.com/400x400?text=Influencer+Image';

  // Social media icons mapping
  const socialIcons = {
    instagram: Instagram,
    twitter: Twitter,
    youtube: Youtube,
    tiktok: Star, // Using Star as a placeholder for TikTok
    facebook: Facebook,

  };

  // Estimate reach based on followers
  const parseFollowers = (followers) => {
    if (!followers || followers === '') return 0;
    const num = parseFloat(followers.replace('M', '')) * (followers.includes('M') ? 1000000 : 1000);
    return isNaN(num) ? 0 : num;
  };

  const estimatedStats = {
    reach: influencer.followers ? `${Math.round(parseFollowers(influencer.followers) * 0.1).toLocaleString()} ${isArabic ? 'شخص' : 'people'}` : 'N/A',
    followers: influencer.followers ? `${influencer.followers} ${isArabic ? 'متابع' : 'followers'}` : 'N/A',
    engagement: influencer.engagement || 'N/A',
  };

  return (
      <div className="min-h-screen pt-20 bg-gray-50">
        {/* Back Button */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link
              to="/influencers"
              className="inline-flex items-center text-gray-600 hover:text-blue-600 transition-colors duration-200"
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
                  <div className={`px-4 py-2 rounded-full text-sm font-medium text-white bg-gradient-to-r ${getPlatformColor(Object.keys(influencer.socials)[0] || 'unknown')}`}>
                    {Object.keys(influencer.socials)[0]?.charAt(0).toUpperCase() + Object.keys(influencer.socials)[0]?.slice(1) || 'Unknown Platform'}
                  </div>
                  <div className="px-4 py-2 rounded-full text-sm font-medium bg-white/20 backdrop-blur-sm text-white">
                    {isArabic ? influencer.categoryAr || 'غير معروف' : influencer.category || 'Unknown Category'}
                  </div>
                  {influencer.featured && (
                      <div className="px-4 py-2 rounded-full text-sm font-medium bg-yellow-400 text-gray-900">
                        {isArabic ? 'مميز' : 'Featured'}
                      </div>
                  )}
                </div>

                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  {isArabic ? influencer.nameAr || 'مؤثر غير معروف' : influencer.name || 'Unknown Influencer'}
                </h1>
                <p className="text-xl text-gray-200 mb-2">
                  {influencer.socials[Object.keys(influencer.socials)[0]]?.split('/').pop() || 'N/A'}
                </p>

                <div className="flex items-center space-x-6 mb-6">
                  <div className="flex items-center text-gray-200">
                    <MapPin size={18} className="mr-2" />
                    <span>{isArabic ? influencer.locationAr || 'موقع غير معروف' : influencer.location || 'Unknown Location'}</span>
                  </div>
                  <div className="flex items-center text-gray-200">
                    <Users size={18} className="mr-2" />
                    <span>{estimatedStats.followers}</span>
                  </div>
                </div>

                <p className="text-lg text-gray-200 leading-relaxed mb-8">
                  {isArabic ? influencer.fullDescriptionAr || influencer.descriptionAr || 'لا توجد سيرة ذاتية' : influencer.fullDescription || influencer.description || 'No bio available'}
                </p>

                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-100 mb-4">
                    {isArabic ? 'الاهتمامات' : 'Interests'}
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {(isArabic ? influencer.tagsAr : influencer.tags || []).map((tag, index) => (
                        <span
                            key={index}
                            className="flex items-center px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm text-white"
                        >
                      <Tag size={14} className="mr-2" />
                          {tag || 'Unknown'}
                    </span>
                    ))}
                  </div>
                </div>


              </div>

              {/* Image Display */}
              <div className="relative">
                <div className="relative z-10">
                  {imageLoading && (
                      <div className="w-full max-w-md mx-auto h-96 bg-gray-300 animate-pulse rounded-2xl" />
                  )}
                  {imageError && (
                      <div className="w-full max-w-md mx-auto h-96 bg-gray-200 flex items-center justify-center rounded-2xl">
                        <p className="text-gray-500 text-sm">Image unavailable</p>
                      </div>
                  )}
                  <img
                      src={influencer.image || fallbackImage}
                      alt={`${isArabic ? influencer.nameAr || 'مؤثر' : influencer.name || 'Influencer'} - ${Object.keys(influencer.socials)[0]?.charAt(0).toUpperCase() + Object.keys(influencer.socials)[0]?.slice(1) || 'Social Media'} Influencer`}
                      className={`w-full max-w-md mx-auto rounded-2xl shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500 object-cover h-96 ${imageLoading || imageError ? 'hidden' : 'block'}`}
                      onLoad={() => {
                        setImageLoading(false);
                        setImageError(false);
                      }}
                      onError={(e) => {
                        console.warn(`Image failed to load: ${influencer.image || 'No image provided'}`);
                        e.target.src = fallbackImage;
                        setImageLoading(false);
                        setImageError(true);
                      }}
                  />
                  {/* Image Caption */}
                  <div className="mt-4 text-center">
                    <p className="text-sm text-gray-200 font-medium">
                      {isArabic
                          ? `${influencer.nameAr || 'مؤثر'} على ${Object.keys(influencer.socials)[0]?.charAt(0).toUpperCase() + Object.keys(influencer.socials)[0]?.slice(1) || 'وسائل التواصل الاجتماعي'}`
                          : `${influencer.name || 'Influencer'} on ${Object.keys(influencer.socials)[0]?.charAt(0).toUpperCase() + Object.keys(influencer.socials)[0]?.slice(1) || 'Social Media'}`}
                    </p>
                  </div>
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
                {isArabic ? 'نظرة على تأثير وانتشار المؤثر' : 'Overview of the influencer’s impact and reach'}
              </p>
            </div>

            <div ref={statsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center group">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Eye className="text-white" size={24} />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{estimatedStats.reach}</div>
                <div className="text-gray-600 font-medium">{isArabic ? 'الوصول المتوقع' : 'Estimated Reach'}</div>
              </div>

              <div className="text-center group">
                <div className="bg-gradient-to-r from-red-500 to-red-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Users className="text-white" size={24} />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{estimatedStats.followers}</div>
                <div className="text-gray-600 font-medium">{isArabic ? 'المتابعون' : 'Followers'}</div>
              </div>

              <div className="text-center group">
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <TrendingUp className="text-white" size={24} />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{estimatedStats.engagement}</div>
                <div className="text-gray-600 font-medium">{isArabic ? 'معدل التفاعل' : 'Engagement Rate'}</div>
              </div>
            </div>
          </div>
        </section>

        {/* Social Media Highlights Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {isArabic ? 'حضور وسائل التواصل الاجتماعي' : 'Social Media Presence'}
              </h2>
              <p className="text-gray-600">
                {isArabic ? 'تابع المؤثر عبر منصاته المختلفة' : 'Follow the influencer across their platforms'}
              </p>
            </div>

            <div ref={socialsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(influencer.socials).map(([platform, url], index) => {
                const Icon = socialIcons[platform.toLowerCase()] || ExternalLink;
                const handle = url ? url.split('/').pop() || 'N/A' : 'N/A';
                return url ? (
                    <a
                        key={index}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 bg-gradient-to-r ${getPlatformColor(platform)}`}
                    >
                      <Icon size={24} className="text-white mr-4" />
                      <div>
                        <h3 className="text-lg font-semibold text-white">
                          {platform.charAt(0).toUpperCase() + platform.slice(1)}
                        </h3>
                        <p className="text-sm text-gray-200">@{handle}</p>
                      </div>
                    </a>
                ) : null;
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        {/* <section className="py-20 bg-gradient-to-r from-primary-600 to-emerald-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            {isArabic ? 'مهتم بالتعاون؟' : 'Interested in Collaboration?'}
          </h2>
          <p className="text-xl text-gray-200 mb-8">
            {isArabic
              ? 'تواصل معنا لمناقشة فرص التعاون مع هذا المؤثر'
              : 'Get in touch to discuss colalaboration opportunities with this influencer'
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg">
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
      </section> */}
      </div>
  );
};

export default InfluencerProfile;