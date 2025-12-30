import { motion } from 'framer-motion';


export default function Solution() {
  const steps = [
    {
      number: '01',
      icon: 'ri-camera-3-line',
      title: 'Take a Photo',
      description: 'Simply capture an image of the affected crop leaf or plant using your smartphone camera.'
    },
    {
      number: '02',
      icon: 'ri-brain-line',
      title: 'AI Detects Disease',
      description: 'Our advanced AI analyzes the image and identifies the disease or pest affecting your crop within seconds.'
    },
    {
      number: '03',
      icon: 'ri-file-list-3-line',
      title: 'Get Diagnosis',
      description: 'Receive detailed information including disease name, severity level, and confidence score of the diagnosis.'
    },
    {
      number: '04',
      icon: 'ri-medicine-bottle-line',
      title: 'Treatment Guidance',
      description: 'Access instant treatment recommendations and prevention tips to protect your harvest and future crops.'
    },
    {
      number: '05',
      icon: 'ri-wifi-off-line',
      title: 'Works Offline',
      description: 'Use the app even in low-connectivity areas with offline-first functionality and periodic sync when online.'
    }
  ];

  const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.18,
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

const fadeLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.9, ease: 'easeOut' },
  },
};

const fadeRight = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.9, ease: 'easeOut' },
  },
};

const iconPop = {
  hidden: { scale: 0, rotate: -20 },
  visible: {
    scale: 1,
    rotate: 0,
    transition: {
      type: 'spring',
      stiffness: 280,
      damping: 18,
    },
  },
};


  return (
    <section id="solution" className="py-24 bg-gradient-to-b from-white to-green-50">
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
            How NomaApp Helps You
          </motion.h2>

          <motion.p
            variants={fadeUp}
            transition={{ delay: 0.15 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Our AI-powered platform makes crop disease diagnosis simple, fast, and accessible to every farmer, no matter where you are.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            className="order-2 lg:order-1"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={fadeLeft}
          >
            <motion.img 
              src="https://readdy.ai/api/search-image?query=African%20farmer%20holding%20smartphone%20scanning%20diseased%20crop%20leaf%20with%20AI%20interface%20overlay%20showing%20disease%20detection%20in%20bright%20green%20farm%20field%20with%20simple%20clean%20background%20highlighting%20mobile%20technology%20and%20agricultural%20innovation&width=800&height=900&seq=solution-img-001&orientation=portrait"
              alt="Farmer using NomaApp to scan crop"
              className="w-full h-auto rounded-2xl shadow-xl"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.4 }}
            />
          </motion.div>

          <motion.div
            className="order-1 lg:order-2 space-y-6"
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
          >

            {steps.map((step, index) => (
              <motion.div
                key={index}
                variants={fadeRight}
                whileHover={{ x: 6 }}
                className="flex gap-6 items-start"
              >
                <div className="flex-shrink-0">
                  <motion.div
                    variants={iconPop}
                    className="w-16 h-16 bg-green-50 rounded-xl flex items-center justify-center"
                  >
                    <i className={`${step.icon} text-2xl text-green-600`}></i>
                  </motion.div>
                </div>
                <div>
                  <motion.div
                    variants={fadeUp}
                    className="flex items-center gap-3 mb-2"
                  >
                    <span className="text-sm font-bold text-green-600">{step.number}</span>
                    <h3 className="text-xl font-bold text-gray-900">{step.title}</h3>
                  </motion.div>
                  <motion.p
                    variants={fadeUp}
                    transition={{ delay: 0.1 }}
                    className="text-base text-gray-600 leading-relaxed"
                  >
                    {step.description}
                  </motion.p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}