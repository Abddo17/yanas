import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, MapPin, Users, TrendingUp, ExternalLink } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext.jsx';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useAnimation } from '../contexts/AnimationContext.jsx';
import { content } from '../data/content.js';
import { influencers } from '../data/influencers.js';

const Influencers = () => {
  const { language, isArabic } = useLanguage();
  const { animateOnScroll } = useAnimation();
  const t = content[language];
  const headerRef = useRef();
  const influencersRef = useRef();
  const containerRef = useRef();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredInfluencers, setFilteredInfluencers] = useState(influencers);

  // Parallax effect for header
  const { scrollY } = useScroll();
  const headerY = useTransform(scrollY, [0, 300], [0, 50]);
  const headerOpacity = useTransform(scrollY, [0, 300], [1, 0.6]);

  useEffect(() => {
    let filtered = influencers;

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(influencer =>
          isArabic ? influencer.categoryAr === selectedCategory : influencer.category === selectedCategory.toLowerCase()
      );
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(influencer =>
          (isArabic ? influencer.nameAr : influencer.name).toLowerCase().includes(searchTerm.toLowerCase()) ||
          (influencer.socials[influencer.platform]?.split('/').pop() || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
          (isArabic ? influencer.categoryAr : influencer.category).toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredInfluencers(filtered);
  }, [searchTerm, selectedCategory, isArabic]);

  useEffect(() => {
    animateOnScroll(headerRef.current, {
      from: { y: 100, opacity: 0 },
      to: { y: 0, opacity: 1, duration: 1.2, ease: 'easeOut' }
    });
    animateOnScroll(influencersRef.current, {
      from: { y: 20, opacity: 0 },
      to: { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: 'easeOut' }
    });
  }, [animateOnScroll]);

  const getPlatformColor = (platform) => {
    switch (platform) {
      case 'Instagram': return 'bg-gradient-to-br from-pink-500 to-purple-500';
      case 'TikTok': return 'bg-gradient-to-br from-black to-gray-800';
      case 'YouTube': return 'bg-gradient-to-br from-red-500 to-red-700';
      case 'Twitter': return 'bg-gradient-to-br from-blue-500 to-cyan-500';
      default: return 'bg-gradient-to-br from-gray-500 to-gray-700';
    }
  };

  return (
      <div ref={containerRef} className="min-h-screen bg-primary-50 overflow-hidden">
        {/* Header Section */}
        <motion.section
            ref={headerRef}
            style={{ y: headerY, opacity: headerOpacity }}
            className="relative  py-40 bg-gradient-to-br from-primary-600 to-emerald-600"
        >
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-geometric.png')] opacity-10"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h1
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight"
            >
              {t.influencers.title}
            </motion.h1>
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-xl md:text-2xl text-primary-100 max-w-3xl mx-auto font-light"
            >
              {t.influencers.subtitle}
            </motion.p>
          </div>
        </motion.section>

        {/* Search and Filter Section */}
        <section className="py-20 bg-primary-50 border-b border-primary-100">


          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="flex flex-col lg:flex-row gap-8 items-center justify-between"
            >


              {/* Category Filter */}
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-3">
                  <Filter size={24} className="text-primary-500" />
                  <span className="font-semibold text-primary-700 text-lg">
                  {isArabic ? 'الفئة:' : 'Category:'}
                </span>
                </div>
                <div className="flex flex-wrap gap-3">
                  {t.influencers.categories.map((category) => (
                      <motion.button
                          key={category}
                          onClick={() => setSelectedCategory(category === 'الكل' ? 'All' : category)}
                          whileHover={{ scale: 1.05, boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)' }}
                          whileTap={{ scale: 0.95 }}
                          className={`px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
                              selectedCategory === (category === 'الكل' ? 'All' : category)
                                  ? 'bg-primary-500 text-white shadow-xl'
                                  : 'bg-primary-100 text-primary-700 hover:bg-primary-200'
                          }`}
                      >

                        {category}
                      </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
          {/* Search Bar */}
          <div className="relative flex-1 max-w-md my-4  mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" size={24} />
            <input
                type="text"
                placeholder={t.influencers.search}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-14 pr-6 py-4 border-b-2 bg-primary-50  focus:outline-none focus:border-b-2 border-primary-500  transition-all duration-0 text-primary-900"
            />
          </div>
        </section>

        {/* Results Count */}
        <section className="py-6 bg-primary-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-primary-600 font-medium"
            >
              {isArabic
                  ? `عرض ${filteredInfluencers.length} من ${influencers.length} مؤثر`
                  : `Showing ${filteredInfluencers.length} of ${influencers.length} influencers`}
            </motion.p>
          </div>
        </section>

        {/* Influencers Grid */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
                ref={influencersRef}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.15
                    }
                  }
                }}
            >
              {filteredInfluencers.map((influencer) => {
                // Derive handle from socials or use fallback
                const handle = influencer.socials[influencer.platform]?.split('/').pop() || '';
                // Fallbacks for empty fields
                const displayFollowers = influencer.followers || (isArabic ? 'غير متوفر' : 'N/A');
                const displayEngagement = influencer.engagement || (isArabic ? 'غير متوفر' : 'N/A');
                const displayLocation = (isArabic ? influencer.locationAr : influencer.location) || (isArabic ? 'غير معروف' : 'Unknown');

                return (
                    <motion.div
                        key={influencer.id}
                        className="border-2 shadow-lg hover:border-primary-100"
                        variants={{
                          hidden: { y: 50, opacity: 0 },
                          visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } }
                        }}
                    >
                      <Link
                          to={`/influencer/${influencer.id}`}
                          className="group bg-white rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-3"
                      >
                        <div className="relative overflow-hidden">
                          <motion.img
                              src={influencer.image || 'https://via.placeholder.com/400x300'}
                              alt={isArabic ? influencer.nameAr : influencer.name}
                              className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                              whileHover={{ scale: 1.1 }}
                          />
                          <div className="absolute inset-0 "></div>
                          <div className="absolute bottom-6 left-6 right-6">
                            <div className="flex items-center justify-between">
                              {influencer.socials[influencer.platform] ? (

                                  <motion.a
                                      href={influencer.socials[influencer.platform.toLowerCase()]}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className={`px-4 py-2 rounded-full text-sm font-semibold text-white ${getPlatformColor(influencer.platform)}`}
                                      whileHover={{ scale: 1.1 }}
                                  >
                                    {console.log(influencer.socials[influencer.platform])}
                                    {influencer.platform}
                                    <ExternalLink size={16} className="inline ml-2" />
                                  </motion.a>
                              ) : (
                                  <motion.div
                                      className={`px-4 py-2 rounded-full text-sm font-semibold text-white ${getPlatformColor(influencer.platform)}`}
                                      whileHover={{ scale: 1.1 }}
                                  >
                                    {influencer.platform}
                                  </motion.div>
                              )}
                              <motion.div
                                  className="bg-white/20 backdrop-blur-lg px-4 py-2 rounded-full text-sm font-semibold text-white"
                                  whileHover={{ scale: 1.1 }}
                              >
                                {isArabic ? influencer.categoryAr : influencer.category}
                              </motion.div>
                            </div>
                          </div>
                        </div>

                        <div className="p-8">
                          <div className="flex items-center justify-between mb-6">
                            <div>
                              <motion.h3
                                  className="text-2xl font-bold text-black group-hover:text-primary-600 transition-colors duration-300"
                                  whileHover={{ x: 5 }}
                              >
                                {isArabic ? influencer.nameAr : influencer.name}
                              </motion.h3>
                              <p className="text-primary-500 text-sm font-medium">{handle}</p>
                            </div>
                            {displayFollowers !== (isArabic ? 'غير متوفر' : 'N/A') && (
                                <div className="text-right">
                                  <div className="text-xl font-bold text-primary-900">{displayFollowers}</div>
                                  <div className="text-sm text-primary-500">{isArabic ? 'متابع' : 'followers'}</div>
                                </div>
                            )}
                          </div>

                          <p className="text-primary-black h-20 text-lg mb-6 line-clamp-3 leading-relaxed">
                            {isArabic ? influencer.descriptionAr : influencer.description}
                          </p>

                          <div className="flex items-center justify-between text-sm">
                            {displayLocation !== (isArabic ? 'غير معروف' : 'Unknown') && (
                                <div className="flex items-center space-x-4">
                                  <div className="flex items-center text-primary-600">
                                    <MapPin size={16} className="mr-2" />
                                    <span>{displayLocation}</span>
                                  </div>
                                </div>
                            )}
                            {displayEngagement !== (isArabic ? 'غير متوفر' : 'N/A') && (
                                <div className="flex items-center space-x-4">
                                  <div className="flex items-center text-emerald-600">
                                    <TrendingUp size={16} className="mr-2" />
                                    <span>{displayEngagement}</span>
                                  </div>
                                </div>
                            )}
                          </div>

                          <motion.div
                              className="mt-6 pt-2 border-primary-100"
                              whileHover={{ x: 5 }}
                          >
                            <div className="text-center rounded-xl py-2 px-4 bg-gradient-to-r from-primary-500 to-emerald-600 text-white hover:from-primary-600 hover:to-emerald-700 transform hover:scale-105">
                          <span className="text-lg text-center text-white">
                            {isArabic ? 'عرض الملف الشخصي' : 'View Profile'}
                          </span>
                            </div>
                          </motion.div>
                        </div>
                      </Link>
                    </motion.div>
                );
              })}
            </motion.div>

            {/* No Results */}
            {filteredInfluencers.length === 0 && (
                <motion.div
                    className="text-center py-20"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                  <Users size={80} className="mx-auto text-primary-200 mb-6" />
                  <h3 className="text-2xl font-semibold text-primary-700 mb-3">
                    {isArabic ? 'لم يتم العثور على مؤثرين' : 'No influencers found'}
                  </h3>
                  <p className="text-primary-500 text-lg">
                    {isArabic
                        ? 'جرب تغيير معايير البحث أو الفلترة'
                        : 'Try adjusting your search or filter criteria'}
                  </p>
                </motion.div>
            )}
          </div>
        </section>
      </div>
  );
};

export default Influencers;