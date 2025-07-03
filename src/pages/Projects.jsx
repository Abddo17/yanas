import React, { useEffect, useRef, useState } from 'react';
import { Play, ExternalLink, Filter } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext.jsx';
import { useAnimation } from '../contexts/AnimationContext.jsx';
import { content } from '../data/content.js';
import { motion } from "framer-motion";
import Footer from '../components/Footer.jsx';

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

const Projects = () => {
  const { language, isArabic } = useLanguage();
  const { animateOnScroll } = useAnimation();
  const t = content[language];
  const headerRef = useRef();
  const projectsRef = useRef();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Beauty', 'Food', 'Fashion', 'Music', 'Lifestyle', 'Wedding'];
  const platforms = ['Instagram', 'TikTok', 'YouTube', 'Reel'];

  const projects = [
    {
      id: 1,
      title: isArabic ? 'حملة صالون الجمال X' : 'Hair Campaign for X Salon',
      category: 'Beauty',
      platform: 'Instagram',
      type: 'Reel',
      image: 'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=600',
      views: '125K',
      engagement: '8.5%',
    },
    {
      id: 2,
      title: isArabic ? 'كليب الفنان Y' : 'Music Video for Artist Y',
      category: 'Music',
      platform: 'YouTube',
      type: 'Video',
      image: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=600',
      views: '450K',
      engagement: '12.3%',
    },
    {
      id: 3,
      title: isArabic ? 'حملة مطعم Z' : 'Food Campaign for Restaurant Z',
      category: 'Food',
      platform: 'TikTok',
      type: 'Reel',
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=600',
      views: '89K',
      engagement: '15.2%',
    },
    {
      id: 4,
      title: isArabic ? 'مجموعة الموضة الصيفية' : 'Summer Fashion Collection',
      category: 'Fashion',
      platform: 'Instagram',
      type: 'Reel',
      image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=600',
      views: '203K',
      engagement: '9.8%',
    },
    {
      id: 5,
      title: isArabic ? 'تغطية حفل زفاف فاخر' : 'Luxury Wedding Coverage',
      category: 'Wedding',
      platform: 'YouTube',
      type: 'Video',
      image: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=600',
      views: '67K',
      engagement: '18.7%',
    },
    {
      id: 6,
      title: isArabic ? 'سلسلة نمط الحياة' : 'Lifestyle Series',
      category: 'Lifestyle',
      platform: 'TikTok',
      type: 'Reel',
      image: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=600',
      views: '156K',
      engagement: '11.4%',
    },
  ];

  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  useEffect(() => {
    animateOnScroll(headerRef.current);
    animateOnScroll(projectsRef.current, {
      from: { y: 50, opacity: 0 },
      to: { y: 0, opacity: 1, duration: 1, stagger: 0.1 },
    });
  }, [animateOnScroll]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <main className="flex-1">
        <motion.div
          className="pt-20"
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={pageTransition}
        >
          {/* Header */}
          <section className="py-20 bg-gradient-to-r from-primary-600 to-emerald-600">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <div ref={headerRef}>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  {t.projects.title}
                </h1>
                <p className="text-xl text-primary-100 max-w-3xl mx-auto">
                  {t.projects.subtitle}
                </p>
              </div>
            </div>
          </section>

          {/* Filter Section */}
          <section className="py-8 bg-white border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center space-x-2">
                  <Filter size={20} className="text-gray-500" />
                  <span className="font-medium text-gray-700">
                    {isArabic ? 'تصفية حسب:' : 'Filter by:'}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                        selectedCategory === category
                          ? 'bg-primary-500 text-white shadow-lg'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {isArabic && category === 'All' ? 'الكل' : category}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Projects Grid */}
          <section className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div ref={projectsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.map((project) => (
                  <div key={project.id} className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                    <div className="relative overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <button className="bg-white/20 backdrop-blur-sm rounded-full p-4 hover:bg-white/30 transition-colors duration-200">
                          <Play className="text-white" size={24} />
                        </button>
                      </div>
                      <div className="absolute top-4 left-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          project.platform === 'Instagram' ? 'bg-pink-500 text-white' :
                          project.platform === 'TikTok' ? 'bg-black text-white' :
                          project.platform === 'YouTube' ? 'bg-red-500 text-white' :
                          'bg-purple-500 text-white'
                        }`}>
                          {project.platform}
                        </span>
                      </div>
                      <div className="absolute top-4 right-4">
                        <span className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium text-gray-800">
                          {project.type}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors duration-200">
                        {project.title}
                      </h3>
                      <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                        <span className="flex items-center">
                          <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                          {project.views} {isArabic ? 'مشاهدة' : 'views'}
                        </span>
                        <span className="flex items-center">
                          <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                          {project.engagement} {isArabic ? 'تفاعل' : 'engagement'}
                        </span>
                      </div>
                      <button className="w-full flex items-center justify-center px-4 py-2 bg-gray-100 hover:bg-primary-500 hover:text-white rounded-lg transition-all duration-200 group">
                        {isArabic ? 'عرض التفاصيل' : 'View Details'}
                        <ExternalLink size={16} className="ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Load More Button */}
              <div className="text-center mt-12">
                <button className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary-500 to-emerald-600 text-white font-semibold rounded-full hover:from-primary-600 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
                  {t.projects.cta}
                  <ExternalLink className={`ml-2 ${isArabic ? 'rotate-180 mr-2 ml-0' : ''}`} size={20} />
                </button>
              </div>
            </div>
          </section>
        </motion.div>
      </main>
    </div>
  );
};

export default Projects;