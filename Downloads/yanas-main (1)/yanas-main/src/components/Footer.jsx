import React from 'react';
import { Mail, Phone, Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext.jsx';
import { content } from '../data/content.js';

const Footer = () => {
  const { language, toggleLanguage, isArabic } = useLanguage();
  const t = content[language];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">CP</span>
              </div>
              <span className="font-bold text-lg">Content Pro</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              {isArabic 
                ? 'نقود صناعة المحتوى الجريء والقصص المؤثرة عبر المنطقة.'
                : 'We\'re a creative production team delivering bold visuals and powerful storytelling across the region.'
              }
            </p>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">{t.footer.contact}</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail size={18} className="text-primary-400" />
                <span className="text-gray-300">info@contentpro.ae</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={18} className="text-primary-400" />
                <span className="text-gray-300">+971 50 123 4567</span>
              </div>
            </div>
          </div>

          {/* Language Toggle */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">{t.footer.language}</h3>
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors duration-200"
            >
              <Globe size={18} />
              <span>{isArabic ? 'English' : 'عربي'}</span>
            </button>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 Content Pro. {isArabic ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;