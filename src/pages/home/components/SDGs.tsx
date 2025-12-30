import { useState } from 'react';
import PartnershipModal from '../../../components/feature/PartnershipModal';

export default function SDGs() {
  const sdgAlignments = [
    {
      number: '1',
      title: 'No Poverty',
      color: 'from-red-600 to-red-700',
      description: 'Increasing farmer income by reducing crop losses and improving yields, helping farming families escape poverty.',
      icon: 'ri-hand-heart-line'
    },
    {
      number: '2',
      title: 'Zero Hunger',
      color: 'from-yellow-500 to-yellow-600',
      description: 'Protecting crops and increasing agricultural productivity to ensure food security across African communities.',
      icon: 'ri-restaurant-line'
    },
    {
      number: '8',
      title: 'Decent Work & Economic Growth',
      color: 'from-red-700 to-red-800',
      description: 'Supporting sustainable agriculture and creating economic opportunities for smallholder farmers and agricultural workers.',
      icon: 'ri-line-chart-line'
    },
    {
      number: '9',
      title: 'Industry, Innovation & Infrastructure',
      color: 'from-orange-600 to-orange-700',
      description: 'Bringing cutting-edge AI technology to agriculture and building digital infrastructure for rural farming communities.',
      icon: 'ri-lightbulb-line'
    },
    {
      number: '12',
      title: 'Responsible Consumption & Production',
      color: 'from-yellow-600 to-yellow-700',
      description: 'Promoting sustainable farming practices and reducing agricultural waste through early disease detection.',
      icon: 'ri-recycle-line'
    },
    {
      number: '13',
      title: 'Climate Action',
      color: 'from-green-700 to-green-800',
      description: 'Helping farmers adapt to climate change impacts on crop health and building resilience in agricultural systems.',
      icon: 'ri-earth-line'
    },
    {
      number: '15',
      title: 'Life on Land',
      color: 'from-green-600 to-green-700',
      description: 'Supporting sustainable land use and protecting agricultural ecosystems through better crop management.',
      icon: 'ri-plant-line'
    },
    {
      number: '17',
      title: 'Partnerships for the Goals',
      color: 'from-blue-700 to-blue-800',
      description: 'Collaborating with NGOs, agricultural institutions, and farmer cooperatives to achieve sustainable development.',
      icon: 'ri-team-line'
    }
  ];
  const [isPartnershipModalOpen, setIsPartnershipModalOpen] = useState(false);

  return (
    <>
      <section id="sdgs" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-block bg-blue-600 text-white px-5 py-2 rounded-full text-sm font-semibold mb-6">
              Global Impact
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Aligned with UN Sustainable Development Goals
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              NomaApp directly contributes to achieving the United Nations Sustainable Development Goals, creating measurable impact across multiple dimensions of sustainable development in Africa.
            </p>
          </div>

          {/* SDG Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {sdgAlignments.map((sdg, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all border border-gray-100 overflow-hidden group"
              >
                {/* SDG Header */}
                <div className={`bg-gradient-to-r ${sdg.color} p-6 text-white`}>
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl font-bold">{sdg.number}</span>
                    </div>
                    <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <i className={`${sdg.icon} text-2xl`}></i>
                    </div>
                  </div>
                  <h3 className="text-lg font-bold leading-tight">
                    {sdg.title}
                  </h3>
                </div>

                {/* SDG Content */}
                <div className="p-6">
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {sdg.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Impact Statement */}
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl p-12 text-center text-white">
            <div className="max-w-4xl mx-auto">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="ri-global-line text-4xl text-white"></i>
              </div>
              <h3 className="text-3xl md:text-4xl font-bold mb-6">
                Technology for Sustainable Development
              </h3>
              <p className="text-xl text-white/95 mb-8 leading-relaxed">
                By leveraging artificial intelligence to solve critical agricultural challenges, NomaApp demonstrates how innovative technology can be a powerful tool for achieving the UN's 2030 Agenda for Sustainable Development. Every farmer we help, every crop we protect, and every harvest we save contributes to building a more sustainable, equitable, and food-secure future for Africa.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">8</div>
                  <div className="text-sm text-white/80">SDGs Addressed</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">17</div>
                  <div className="text-sm text-white/80">Target Indicators</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">1M+</div>
                  <div className="text-sm text-white/80">Lives Impacted</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">2030</div>
                  <div className="text-sm text-white/80">Goal Timeline</div>
                </div>
              </div>
            </div>
          </div>

          {/* Partnership CTA */}
          <div className="mt-16 text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Partner with Us for Sustainable Impact
            </h3>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Join NomaApp in advancing the SDGs. Whether you're an NGO, development organization, or impact investor, let's work together to transform African agriculture.
            </p>
            <button
              onClick={() => setIsPartnershipModalOpen(true)}
              className="inline-block bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-700 transition-all whitespace-nowrap cursor-pointer"
            >
              <i className="ri-mail-line mr-2"></i>
              Contact Us for Partnership
            </button>
          </div>
        </div>
      </section>
      <PartnershipModal isOpen={isPartnershipModalOpen} onClose={() => setIsPartnershipModalOpen(false)} />
    </>
  );
}