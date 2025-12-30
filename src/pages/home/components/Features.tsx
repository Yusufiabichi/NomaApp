import { useState } from 'react';
import PilotProgramModal from '../../../components/feature/PilotProgramModal';
import { motion } from 'framer-motion';
import {
  fadeUp,
  fadeLeft,
  fadeRight,
  staggerContainer
} from '../animations/motionVariants';

export default function Features() {
  const [isPilotModalOpen, setIsPilotModalOpen] = useState(false);

  const mainFeatures = [
    {
      icon: 'ri-brain-line',
      title: 'AI Crop Disease & Pest Diagnosis',
      description: 'Advanced machine learning trained on local African crop data for accurate disease and pest identification.'
    },
    {
      icon: 'ri-bar-chart-box-line',
      title: 'Severity Level & Confidence Score',
      description: 'Get detailed analysis showing how severe the infection is and how confident the AI is in its diagnosis.'
    },
    {
      icon: 'ri-medicine-bottle-line',
      title: 'Treatment Recommendations',
      description: 'Receive practical, actionable treatment advice and prevention strategies tailored to your specific crop issue.'
    },
    {
      icon: 'ri-plant-line',
      title: 'Multi-Crop Support',
      description: 'Works with maize, rice, cassava, tomato, and many other crops commonly grown across African farms.'
    },
    {
      icon: 'ri-wifi-off-line',
      title: 'Offline-First, Low Data Usage',
      description: 'Designed for low-bandwidth environments with offline functionality and minimal data consumption.'
    },
    {
      icon: 'ri-global-line',
      title: 'Local Language Support',
      description: 'Available in Hausa, Igbo, and Yoruba, making the platform easy to use and accessible for farmers across Nigeria.'
    }

  ];

  const targetUsers = [
    {
      icon: 'ri-user-line',
      title: 'Smallholder Farmers',
      description: 'Individual farmers managing small plots who need quick, reliable crop health guidance.'
    },
    {
      icon: 'ri-building-line',
      title: 'Commercial Farms',
      description: 'Large-scale agricultural operations seeking efficient disease monitoring and management.'
    },
    {
      icon: 'ri-microscope-line',
      title: 'Agronomists & Extension Officers',
      description: 'Agricultural experts who can use NomaApp to serve more farmers effectively.'
    },
    {
      icon: 'ri-team-line',
      title: 'NGOs & Agricultural Programs',
      description: 'Organizations working to improve food security and farmer livelihoods across Africa.'
    }
  ];

  const comingSoon = [
    { icon: 'ri-cloud-line', title: 'Weather Forecasts', description: 'Real-time weather updates and predictions' },
    { icon: 'ri-dashboard-line', title: 'Farm Management Tools', description: 'Track planting, harvesting, and expenses' },
    { icon: 'ri-money-dollar-circle-line', title: 'Market Price Updates', description: 'Current crop prices and market trends' },
    { icon: 'ri-question-answer-line', title: 'Community & Expert Q&A', description: 'Connect with farmers and agronomists' },
    { icon: 'ri-flight-takeoff-line', title: 'Drone Integration', description: 'Advanced monitoring with drone technology' },
    { icon: 'ri-shopping-cart-line', title: 'Market Place', description: 'Buy and sell agricultural inputs & products' }
  ];

  return (
    <>
      <section id="features" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Features */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Powerful Features for Every Farmer
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              NomaApp combines cutting-edge AI technology with practical farming needs to deliver a solution that truly works for African agriculture.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24"
          >
            {mainFeatures.map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeUp}
                whileHover={{ y: -6, scale: 1.02 }}
                className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all border border-gray-100"
              >
                <motion.div
                  whileHover={{ rotate: 6, scale: 1.1 }}
                  className="w-16 h-16 bg-green-50 rounded-xl flex items-center justify-center mb-6"
                >
                  <i className={`${feature.icon} text-3xl text-green-600`}></i>
                </motion.div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-base text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Who It's For */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-24"
          >
            <motion.div variants={fadeUp} className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Who NomaApp Is For
              </h3>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Designed to serve everyone in the agricultural ecosystem
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {targetUsers.map((user, index) => (
                <motion.div
                  key={index}
                  variants={fadeUp}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all border border-gray-100 text-center"
                >
                  <div className="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className={`${user.icon} text-2xl text-green-600`}></i>
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">
                    {user.title}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {user.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Coming Soon */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-gradient-to-br from-green-50 to-green-100/50 rounded-3xl p-12"
          >
            <motion.div className="text-center mb-12">
              <div className="inline-block bg-green-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
                Coming Soon
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Future Features in Development
              </h3>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                We're constantly improving NomaApp to provide even more value to farmers
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {comingSoon.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={fadeUp}
                  whileHover={{ y: -4 }}
                  className="bg-white rounded-xl p-6 shadow-sm"
                >
                  <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center mb-4">
                    <i className={`${feature.icon} text-2xl text-green-600`}></i>
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">
                    {feature.title}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>
      <PilotProgramModal isOpen={isPilotModalOpen} onClose={() => setIsPilotModalOpen(false)} />
    </>
  );
}