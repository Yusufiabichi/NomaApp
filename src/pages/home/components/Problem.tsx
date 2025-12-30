import { motion } from 'framer-motion';


export default function Problem() {
  const challenges = [
    {
      icon: 'ri-time-line',
      title: 'Late Detection of Crop Diseases',
      description: 'By the time farmers notice symptoms, significant damage has already occurred, leading to reduced yields and income loss.'
    },
    {
      icon: 'ri-user-search-line',
      title: 'Lack of Access to Agronomists',
      description: 'Rural farmers struggle to find expert advice when they need it most, with limited extension services in remote areas.'
    },
    {
      icon: 'ri-line-chart-line',
      title: 'Crop Losses Reducing Income',
      description: 'Preventable diseases and pests destroy harvests, directly impacting farmer livelihoods and food security across Africa.'
    },
    {
      icon: 'ri-map-pin-line',
      title: 'Limited Extension Services',
      description: 'Agricultural extension officers cannot reach all farmers, leaving many without the support they need to protect their crops.'
    }
  ];

  const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: 'easeOut' },
  },
};

const fadeScale = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

const iconPop = {
  hidden: { scale: 0, rotate: -15 },
  visible: {
    scale: 1,
    rotate: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 20,
    },
  },
};


  return (
    <section id="problem" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.6 }}
        >
          <motion.h2
            variants={fadeUp}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
          >
            The Challenge Farmers Face
          </motion.h2>

          <motion.p
            variants={fadeUp}
            transition={{ delay: 0.15 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Millions of smallholder farmers across Africa lose significant portions of their harvest to preventable crop diseases and pests every season.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {challenges.map((challenge, index) => (
            <motion.div
              key={index}
              variants={fadeScale}
              whileHover={{ y: -6 }}
              className="bg-white rounded-2xl p-8 shadow-md hover:shadow-lg transition-all border border-gray-100"
            >
              <motion.div
                variants={iconPop}
                className="w-16 h-16 bg-red-50 rounded-xl flex items-center justify-center mb-6"
              >
                <i className={`${challenge.icon} text-3xl text-red-600`}></i>
              </motion.div>
              <motion.h3
                variants={fadeUp}
                transition={{ delay: 0.1 }}
                className="text-2xl font-bold text-gray-900 mb-4"
              >
                {challenge.title}
              </motion.h3>

              <motion.p
                variants={fadeUp}
                transition={{ delay: 0.2 }}
                className="text-base text-gray-600 leading-relaxed"
              >
                {challenge.description}
              </motion.p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}