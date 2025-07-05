import React, { useEffect, useRef, useState } from 'react';
import { Play, ExternalLink, Filter, Coffee } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext.jsx';
import { useAnimation } from '../contexts/AnimationContext.jsx';
import { content } from '../data/content.js';
import huawei from '../assets/images/huawei.png'
import coffee from '../assets/images/coffee.png'
import masscara from '../assets/images/masscara.png'
import global from '../assets/images/global.png'
import islam from '../assets/images/islam.png'
import matebook from '../assets/images/matebook.png'
const Projects = () => {
  const { language, isArabic } = useLanguage();
  const { animateOnScroll } = useAnimation();
  const t = content[language];
  const headerRef = useRef();
  const filterLabelRef = useRef();
  const filterButtonsRef = useRef([]);
  const projectsRef = useRef();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['All', 'Beauty', 'Food', 'Fashion', 'Music', 'Lifestyle', 'Wedding'];
  const platforms = ['Instagram', 'TikTok', 'YouTube', 'Reel'];

  const projects = [
    {
      id: 1,
      title: isArabic ? 'حملة هواوي فري كليب ' : 'Huawei FreeClip Campaign ',
      category: 'Fashion',
      categoryAr: 'موضة',
      platform: 'Instagram',
      type: 'Reel',
      image: huawei,
      views: '450k',
      engagement: '50k',
      link: 'https://www.instagram.com/reel/DEAqgFJMNxq/?igsh=cGVmYjdqNHVoaXZz',
    },
    {
      id: 2,
      title: isArabic ? 'حملة كافيه دافيدوف ' : 'Davidoff Café Campaign ',
      category: 'Lifestyle',
      categoryAr: 'نمط الحياة',
      platform: 'Instagram',
      type: 'Reel',
      image: coffee,
      views: '100k',
      engagement: '12k',
      link: 'https://www.instagram.com/reel/DFiN0gpTmW4/',
    },
    {
      id: 3,
      title: isArabic ? 'حملة ماسكارا سكاي هاي ' : 'Sky High Mascara Campaign ',
      category: 'Beauty',
      categoryAr: 'جمال',
      platform: 'Instagram',
      type: 'Reel',
      image: masscara,
      views: '90k',
      engagement: '10k',
      link: 'https://www.instagram.com/reel/C6Rkg8uPCCt/',
    },
    {
      id: 4,
      title: isArabic ? 'بالقرية العالمية' : 'Globale Village',
      category: 'Fashion',
      categoryAr: 'موضة',
      platform: 'Instagram',
      type: 'Reel',
      image: global,
      views: '300k',
      engagement: '34k',
      link: 'https://www.instagram.com/reel/C6oWrenvP7E/?igsh=Y25lYndpNHgxdHln',
    },
    {
      id: 5,
      title: isArabic ? 'محتوى إسلام أفرو X' : 'Islamafro Content X',
      category: 'Lifestyle',
      categoryAr: 'نمط الحياة',
      platform: 'Instagram',
      type: 'Reel',
      image: islam,
      views: '200k',
      engagement: '20k',
      link: 'https://www.instagram.com/reel/DFvQ01RTz8a/',
    },
    {
      id: 6,
      title: isArabic ? 'حملة ميت بوك D16 ' : 'MateBook D16 Campaign ',
      category: 'Tech',
      categoryAr: 'تقنية',
      platform: 'Instagram',
      type: 'Reel',
      image: matebook,
      views: '125k',
      engagement: '15k',
      link: 'https://www.instagram.com/reel/C1pDxUAP9JJ/',
    },
  ];

  const filteredProjects = selectedCategory === 'all'
      ? projects
      :  projects.filter(project => isArabic ?  project.categoryAr === selectedCategory : project.category.toLowerCase() === selectedCategory);

  useEffect(() => {
    animateOnScroll(headerRef.current);
    animateOnScroll(projectsRef.current, {
      from: { y: 50, opacity: 0 },
      to: { y: 0, opacity: 1, duration: 1, stagger: 0.1 },
    });
  }, [animateOnScroll]);

  return (
      <div className="min-h-screen  pb-40  bg-white ">
        {/* Header */}
        <section className="py-40 bg-gradient-to-r from-primary-600 to-emerald-600 relative z-10 ">
          <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${isArabic ? 'text-right' : 'text-center'}`}>
            <h1 className={`text-4xl md:text-5xl font-bold text-white mb-4 ${isArabic ? 'font-arabic' : ''}`}>
              {isArabic ? 'مشاريعنا' : 'Our Projects'}
            </h1>
            <p className={`text-lg md:text-xl text-white/95 max-w-3xl mx-auto ${isArabic ? 'font-arabic' : 'font-sans'} font-[Arial, sans-serif] leading-relaxed drop-shadow-sm`}>
              {isArabic
                  ? 'استكشف مجموعتنا المتنوعة من المشاريع عبر منصات التواصل الاجتماعي، والتي تعرض الإبداع والتفاعل في مختلف المجالات.'
                  : 'Explore our diverse portfolio of projects across social media platforms, showcasing creativity and engagement across various industries.'}
            </p>
          </div>
        </section>

        {/* Filter Section */}
        <section className="py-8 bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`flex items-center justify-between flex-wrap gap-6 ${isArabic ? 'flex-row-reverse' : ''}`}>
              <div ref={filterLabelRef} className={`flex items-center ${isArabic ? 'space-x-reverse space-x-4' : 'space-x-4'}`}>
                <Filter size={28} className="text-gray-700" />
                <span className={`text-xl font-bold text-gray-900 ${isArabic ? 'font-arabic' : 'font-sans'} font-[Arial, sans-serif] tracking-tight`}>
                {isArabic ? 'تصفية حسب:' : 'Filter by:'}
              </span>
              </div>
              <div className={`flex flex-wrap gap-3 ${isArabic ? 'justify-end' : 'justify-start'}`}>
                {t.influencers.categories.map((category, index) => (
                    <button
                        key={category}
                        ref={(el) => (filterButtonsRef.current[index] = el)}
                        onClick={() => setSelectedCategory(category === 'الكل' ? 'all' : category)}
                        className={`px-6 py-3 rounded-full text-base font-semibold transition-all duration-300 ${
                            selectedCategory === (category === 'الكل' ? 'all' : category)
                                ? 'bg-primary-500 text-white shadow-lg hover:shadow-xl'
                                : 'bg-gray-100 text-gray-900 hover:bg-gray-200 hover:shadow-md border border-gray-200'
                        } focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${isArabic ? 'font-arabic' : 'font-sans'} font-[Arial, sans-serif]`}
                    >
                      {isArabic && category === 'all' ? 'الكل' : category}
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
                        <a href={project.link} target="_blank" rel="noopener noreferrer">
                          <button className="bg-white/20 backdrop-blur-sm rounded-full p-4 hover:bg-white/30 transition-colors duration-200">
                            <Play className="text-white" size={24} />
                          </button>
                        </a>
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
                      <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full flex items-center justify-center px-4 py-2 bg-gray-100 hover:bg-primary-500 hover:text-white rounded-lg transition-all duration-200 group"
                      >
                        {isArabic ? 'عرض التفاصيل' : 'View Details'}
                        <ExternalLink size={16} className="ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                      </a>
                    </div>
                  </div>
              ))}
            </div>
          </div>
        </section>
      </div>
  );
};

export default Projects;