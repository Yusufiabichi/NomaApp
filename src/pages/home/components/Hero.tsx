import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';


export default function Hero() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: 'easeOut' },
  },
};

const fadeLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: 'easeOut' },
  },
};

const fadeRight = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: 'easeOut' },
  },
};

const stagger = {
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Navigation Bar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center gap-1 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <div className={`w-10 h-10 flex items-center justify-center rounded-lg ${
                isScrolled ? 'bg-white' : 'bg-white'
              }`}>
                {/* <i className={`ri-plant-line text-2xl ${
                  isScrolled ? 'text-white' : 'text-green-600'
                }`}></i> */}

                <img 
                  src={isScrolled ? "./nomalogo_g.png" : "./nomalogo_g.png"}
                  alt="NomaApp Logo" 
                  className="h-20 w-23 object-contain"
                />
              </div>
              <span className={`text-2xl font-bold ${
                isScrolled ? 'text-gray-900' : 'text-white'
              }`}>NomaApp</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <button 
                onClick={() => scrollToSection('problem')}
                className={`text-base font-medium transition-colors cursor-pointer whitespace-nowrap ${
                  isScrolled ? 'text-gray-700 hover:text-green-600' : 'text-white hover:text-green-300'
                }`}
              >
                Problem
              </button>
              <button 
                onClick={() => scrollToSection('solution')}
                className={`text-base font-medium transition-colors cursor-pointer whitespace-nowrap ${
                  isScrolled ? 'text-gray-700 hover:text-green-600' : 'text-white hover:text-green-300'
                }`}
              >
                Solution
              </button>
              <button 
                onClick={() => scrollToSection('features')}
                className={`text-base font-medium transition-colors cursor-pointer whitespace-nowrap ${
                  isScrolled ? 'text-gray-700 hover:text-green-600' : 'text-white hover:text-green-300'
                }`}
              >
                Features
              </button>
              <button 
                onClick={() => scrollToSection('impact')}
                className={`text-base font-medium transition-colors cursor-pointer whitespace-nowrap ${
                  isScrolled ? 'text-gray-700 hover:text-green-600' : 'text-white hover:text-green-300'
                }`}
              >
                Impact
              </button>
              <button 
                onClick={() => scrollToSection('sdgs')}
                className={`text-base font-medium transition-colors cursor-pointer whitespace-nowrap ${
                  isScrolled ? 'text-gray-700 hover:text-green-600' : 'text-white hover:text-green-300'
                }`}
              >
                SDGs
              </button>
              <button className="bg-green-600 text-white px-6 py-2.5 rounded-full text-base font-semibold hover:bg-green-700 transition-all whitespace-nowrap cursor-pointer">
                <a href="https://play.google.com/store/apps/details?id=com.yusufiabichi.mobileapp" target="_blank" rel="noopener noreferrer">  
                Get the App
                </a>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden cursor-pointer"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <i className={`${isMobileMenuOpen ? 'ri-close-line' : 'ri-menu-line'} text-3xl ${
                isScrolled ? 'text-gray-900' : 'text-white'
              }`}></i>
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className={`md:hidden ${isScrolled ? 'bg-white' : 'bg-gray-900/95'} backdrop-blur-sm`}>
              <div className="px-4 pt-2 pb-6 space-y-3">
                <button 
                  onClick={() => scrollToSection('problem')}
                  className={`block w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-colors cursor-pointer ${
                    isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'
                  }`}
                >
                  Problem
                </button>
                <button 
                  onClick={() => scrollToSection('solution')}
                  className={`block w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-colors cursor-pointer ${
                    isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'
                  }`}
                >
                  Solution
                </button>
                <button 
                  onClick={() => scrollToSection('features')}
                  className={`block w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-colors cursor-pointer ${
                    isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'
                  }`}
                >
                  Features
                </button>
                <button 
                  onClick={() => scrollToSection('impact')}
                  className={`block w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-colors cursor-pointer ${
                    isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'
                  }`}
                >
                  Impact
                </button>
                <button 
                  onClick={() => scrollToSection('sdgs')}
                  className={`block w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-colors cursor-pointer ${
                    isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'
                  }`}
                >
                  SDGs
                </button>
                <button className="w-full bg-green-600 text-white px-6 py-3 rounded-full text-base font-semibold hover:bg-green-700 transition-all whitespace-nowrap cursor-pointer mt-2">
                  <a href="https://play.google.com/store/apps/details?id=com.yusufiabichi.mobileapp" target="_blank" rel="noopener noreferrer">
                    Get the App
                  </a>
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <motion.img
          src="https://readdy.ai/api/search-image?query=African%20farmer%20in%20lush%20green%20farm%20field%20holding%20smartphone%20examining%20healthy%20crops%20under%20bright%20sunlight%20with%20vibrant%20vegetation%20and%20clear%20blue%20sky%20in%20rural%20Nigeria%20agricultural%20landscape%20showing%20hope%20and%20modern%20technology%20integration&width=1920&height=1080&seq=hero-bg-001&orientation=landscape"
          alt="African farmer using smartphone in field"
          className="w-full h-full object-cover object-top"
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.5, ease: 'easeOut' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/50"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        <motion.div
          className="max-w-4xl mx-auto"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.6 }}
        >
          <motion.h1
            variants={fadeUp}
            className="text-3xl md:text-7xl font-bold text-white mb-6 leading-tight"
          >
            Detect Crop Diseases Early.<br />Protect Your Harvest.
          </motion.h1>

          <motion.p
            variants={fadeUp}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-white/95 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Use AI to scan crops, identify diseases and pests, and get instant treatment guidance, even in low-connectivity areas.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            variants={stagger}
          >
            <motion.button
              variants={fadeLeft}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-green-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-green-700 transition-all shadow-lg hover:shadow-xl whitespace-nowrap cursor-pointer w-full sm:w-auto"
            >
              <i className="ri-camera-line mr-2"></i>
              <a href="https://app.nomaapp.com.ng">
                Scan a Crop
              </a>
            </motion.button>

            <motion.button
              variants={fadeRight}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-green-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-50 transition-all shadow-lg hover:shadow-xl whitespace-nowrap cursor-pointer w-full sm:w-auto"
            >
              <i className="ri-download-line mr-2"></i>
              <a href="https://play.google.com/store/apps/details?id=com.yusufiabichi.mobileapp" target="_blank" rel="noopener noreferrer">
              Get the App
              </a>
            </motion.button>
          </motion.div>

          {/* Trust Badge */}
          <motion.div
            variants={fadeUp}
            transition={{ delay: 0.5 }}
            className="mt-16 flex items-center justify-center gap-2 text-white/90"
          >
            <i className="ri-shield-check-line text-2xl text-green-400"></i>
            <span className="text-base">Built for African farmers • Pilot testing in Nigeria</span>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="animate-bounce"
        >

          <i className="ri-arrow-down-line text-3xl text-white"></i>
        </motion.div>
      </div>
    </section>
  );
}