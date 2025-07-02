import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, MapPin, Users, TrendingUp, ExternalLink } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext.jsx';
import { useAnimation } from '../contexts/AnimationContext.jsx';
import { content } from '../data/content.js';
import { influencers } from '../data/influencers.js';

const Influencers = () => {
  const { language, isArabic } = useLanguage();
  const { animateOnScroll } = useAnimation();
  const t = content[language];
  const headerRef = useRef();
  const influencersRef = useRef();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredInfluencers, setFilteredInfluencers] = useState(influencers);

  useEffect(() => {
    let filtered = influencers;

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(influencer => influencer.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(influencer =>
        influencer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        influencer.handle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        influencer.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredInfluencers(filtered);
  }, [searchTerm, selectedCategory]);

  useEffect(() => {
    animateOnScroll(headerRef.current);
    animateOnScroll(influencersRef.current, {
      from: { y: 50, opacity: 0 },
      to: { y: 0, opacity: 1, duration: 1, stagger: 0.1 },
    });
  }, [animateOnScroll]);

  const getPlatformColor = (platform) => {
    switch (platform) {
      case 'Instagram': return 'bg-pink-500';
      case 'TikTok': return 'bg-black';
      case 'YouTube': return 'bg-red-500';
      case 'Twitter': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      {/* Header */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-emerald-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div ref={headerRef}>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {t.influencers.title}
            </h1>
            <p className="text-xl text-primary-100 max-w-3xl mx-auto">
              {t.influencers.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder={t.influencers.search}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter size={20} className="text-gray-500" />
                <span className="font-medium text-gray-700">
                  {isArabic ? 'الفئة:' : 'Category:'}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {t.influencers.categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category === 'الكل' ? 'All' : category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      selectedCategory === (category === 'الكل' ? 'All' : category)
                        ? 'bg-primary-500 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results Count */}
      <section className="py-4 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gray-600">
            {isArabic 
              ? `عرض ${filteredInfluencers.length} من ${influencers.length} مؤثر`
              : `Showing ${filteredInfluencers.length} of ${influencers.length} influencers`
            }
          </p>
        </div>
      </section>

      {/* Influencers Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={influencersRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredInfluencers.map((influencer) => (
              <Link
                key={influencer.id}
                to={`/influencer/${influencer.id}`}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="relative">
                  <img
                    src={influencer.image}
                    alt={influencer.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center justify-between">
                      <div className={`px-3 py-1 rounded-full text-xs font-medium text-white ${getPlatformColor(influencer.platform)}`}>
                        {influencer.platform}
                      </div>
                      <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-white">
                        {influencer.category}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors duration-200">
                        {influencer.name}
                      </h3>
                      <p className="text-gray-600 text-sm">{influencer.handle}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-gray-900">{influencer.followers}</div>
                      <div className="text-xs text-gray-500">{isArabic ? 'متابع' : 'followers'}</div>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {influencer.bio}
                  </p>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center text-gray-600">
                        <MapPin size={14} className="mr-1" />
                        <span>{influencer.location}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center text-green-600">
                        <TrendingUp size={14} className="mr-1" />
                        <span>{influencer.engagement}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">
                        {isArabic ? 'عرض الملف الشخصي' : 'View Profile'}
                      </span>
                      <ExternalLink size={16} className="text-primary-500 group-hover:translate-x-1 transition-transform duration-200" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* No Results */}
          {filteredInfluencers.length === 0 && (
            <div className="text-center py-16">
              <Users size={64} className="mx-auto text-gray-300 mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                {isArabic ? 'لم يتم العثور على مؤثرين' : 'No influencers found'}
              </h3>
              <p className="text-gray-500">
                {isArabic 
                  ? 'جرب تغيير معايير البحث أو الفلترة'
                  : 'Try adjusting your search or filter criteria'
                }
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Influencers;