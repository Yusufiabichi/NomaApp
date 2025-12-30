import { useState } from 'react';
import PilotProgramModal from '../../../components/feature/PilotProgramModal';

export default function Impact() {
  const [isPilotModalOpen, setIsPilotModalOpen] = useState(false);
  const impacts = [
    {
      icon: 'ri-shield-check-line',
      title: 'Reduced Crop Losses',
      description: 'Early detection and treatment guidance help farmers prevent disease spread and minimize harvest losses.',
      stat: 'Up to 40%',
      statLabel: 'Loss Reduction'
    },
    {
      icon: 'ri-line-chart-line',
      title: 'Increased Yields',
      description: 'Healthier crops and better disease management lead to improved productivity and higher quality harvests.',
      stat: '25-35%',
      statLabel: 'Yield Increase'
    },
    {
      icon: 'ri-money-dollar-circle-line',
      title: 'Improved Farmer Income',
      description: 'Better yields and reduced losses translate directly to increased income and financial stability for farming families.',
      stat: '30%+',
      statLabel: 'Income Growth'
    },
    {
      icon: 'ri-global-line',
      title: 'Support for Food Security',
      description: 'By helping farmers protect their crops, NomaApp contributes to food security and agricultural sustainability across Africa.',
      stat: '1M+',
      statLabel: 'Farmers Targeted'
    }
  ];

  return (
    <>
      <section id="impact" className="py-24 bg-gradient-to-b from-white to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Real Impact on African Agriculture
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              NomaApp is more than just technology, it's a tool for transforming lives, improving livelihoods, and building a more food-secure future for Africa.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {impacts.map((impact, index) => (
              <div 
                key={index}
                className="bg-green-50 rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all border border-green-100"
              >
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-green-600 rounded-xl flex items-center justify-center">
                      <i className={`${impact.icon} text-3xl text-white`}></i>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                      {impact.title}
                    </h3>
                    <p className="text-base text-gray-600 leading-relaxed mb-4">
                      {impact.description}
                    </p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-green-600">{impact.stat}</span>
                      <span className="text-sm text-gray-500">{impact.statLabel}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Trust Section */}
          <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-3xl p-12 text-center text-white">
            <div className="max-w-4xl mx-auto">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="ri-shield-star-line text-4xl text-white"></i>
              </div>
              <h3 className="text-3xl md:text-4xl font-bold mb-6">
                Built for African Farmers, By Agricultural Experts
              </h3>
              <p className="text-xl text-white/95 mb-8 leading-relaxed">
                {/* NomaApp is currently in pilot testing across Nigeria, with AI models trained specifically on local crop data and African farming conditions. We're partnering with agricultural institutions, NGOs, and farmer cooperatives to ensure our solution truly meets the needs of those who feed our continent. */}
                NomaApp is in the final stages of development, with pilot testing scheduled to begin in January across selected regions in Nigeria. Our AI models are being trained on locally sourced crop data and African farming conditions to ensure high accuracy and real-world relevance. We are actively engaging agricultural institutions, NGOs, and farmer cooperatives to validate the solution and ensure it is fully aligned with the needs of the farmers who feed our continent.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-8 mt-12">
                <div className="text-center">
                  <div className="text-4xl font-bold mb-1">100+</div>
                  <div className="text-sm text-white/80">Farmers in Pilot</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold mb-1">7</div>
                  <div className="text-sm text-white/80">Crop Types</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold mb-1">50+</div>
                  <div className="text-sm text-white/80">Diseases covered</div>
                </div>
                {/* <div className="text-center">
                  <div className="text-4xl font-bold mb-1">24/7</div>
                  <div className="text-sm text-white/80">Availability</div>
                </div> */}
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-16 text-center">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Join the NomaApp Movement
            </h3>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Be part of the agricultural revolution. Download NomaApp today and protect your harvest with the power of AI.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#hero"
                className="bg-green-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-green-700 transition-all whitespace-nowrap cursor-pointer w-full sm:w-auto text-center"
              >
                <i className="ri-download-line mr-2"></i>
                Get the App
              </a>
              <button
                onClick={() => setIsPilotModalOpen(true)}
                className="bg-white text-green-600 border-2 border-green-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-green-50 transition-all whitespace-nowrap cursor-pointer w-full sm:w-auto"
              >
                <i className="ri-mail-line mr-2"></i>
                Join Pilot Program
              </button>
            </div>
          </div>
        </div>
      </section>
      <PilotProgramModal isOpen={isPilotModalOpen} onClose={() => setIsPilotModalOpen(false)} />
    </>
  );
}