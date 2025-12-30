
import { useState } from 'react';

interface PartnershipModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PartnershipModal({ isOpen, onClose }: PartnershipModalProps) {
  const [formData, setFormData] = useState({
    organizationName: '',
    organizationType: '',
    contactPerson: '',
    email: '',
    phone: '',
    country: '',
    website: '',
    partnershipInterest: '',
    sdgAlignment: [] as string[],
    proposedContribution: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (sdg: string) => {
    setFormData(prev => ({
      ...prev,
      sdgAlignment: prev.sdgAlignment.includes(sdg)
        ? prev.sdgAlignment.filter(s => s !== sdg)
        : [...prev.sdgAlignment, sdg]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const formBody = new URLSearchParams();
      formBody.append('organizationName', formData.organizationName);
      formBody.append('organizationType', formData.organizationType);
      formBody.append('contactPerson', formData.contactPerson);
      formBody.append('email', formData.email);
      formBody.append('phone', formData.phone);
      formBody.append('country', formData.country);
      formBody.append('website', formData.website);
      formBody.append('partnershipInterest', formData.partnershipInterest);
      formBody.append('sdgAlignment', formData.sdgAlignment.join(', '));
      formBody.append('proposedContribution', formData.proposedContribution);
      formBody.append('message', formData.message);

      const response = await fetch('https://readdy.ai/api/form/d4va0uunfc78pt9tmhg0', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formBody.toString()
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          organizationName: '',
          organizationType: '',
          contactPerson: '',
          email: '',
          phone: '',
          country: '',
          website: '',
          partnershipInterest: '',
          sdgAlignment: [],
          proposedContribution: '',
          message: ''
        });
        setTimeout(() => {
          onClose();
          setSubmitStatus('idle');
        }, 2000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-3xl w-full my-8 relative animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer w-10 h-10 flex items-center justify-center"
          aria-label="Close modal"
        >
          <i className="ri-close-line text-2xl"></i>
        </button>

        <div className="p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-team-line text-3xl text-blue-600"></i>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Partnership Inquiry</h2>
            <p className="text-gray-600">Let's collaborate to transform African agriculture and advance the SDGs</p>
          </div>

          <form id="partnership-form" data-readdy-form onSubmit={handleSubmit} className="space-y-6">
            {/* Organization Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Organization Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="organizationName" className="block text-sm font-medium text-gray-700 mb-1">
                    Organization Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="organizationName"
                    name="organizationName"
                    value={formData.organizationName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    placeholder="Your organization name"
                  />
                </div>

                <div>
                  <label htmlFor="organizationType" className="block text-sm font-medium text-gray-700 mb-1">
                    Organization Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="organizationType"
                    name="organizationType"
                    value={formData.organizationType}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm cursor-pointer"
                  >
                    <option value="">Select type</option>
                    <option value="NGO">NGO / Non-Profit</option>
                    <option value="Development Organization">Development Organization</option>
                    <option value="Impact Investor">Impact Investor</option>
                    <option value="Government Agency">Government Agency</option>
                    <option value="Research Institution">Research Institution</option>
                    <option value="Corporate">Corporate / Private Sector</option>
                    <option value="Foundation">Foundation</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                    Country <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    placeholder="e.g., Nigeria"
                  />
                </div>

                <div>
                  <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">
                    Website
                  </label>
                  <input
                    type="url"
                    id="website"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    placeholder="https://example.com"
                  />
                </div>
              </div>
            </div>

            {/* Contact Person */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Contact Person</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="contactPerson" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="contactPerson"
                    name="contactPerson"
                    value={formData.contactPerson}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    placeholder="+234 XXX XXX XXXX"
                  />
                </div>
              </div>
            </div>

            {/* Partnership Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Partnership Details</h3>
              
              <div>
                <label htmlFor="partnershipInterest" className="block text-sm font-medium text-gray-700 mb-1">
                  Partnership Interest <span className="text-red-500">*</span>
                </label>
                <select
                  id="partnershipInterest"
                  name="partnershipInterest"
                  value={formData.partnershipInterest}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm cursor-pointer"
                >
                  <option value="">Select your interest</option>
                  <option value="Funding & Investment">Funding & Investment</option>
                  <option value="Technical Collaboration">Technical Collaboration</option>
                  <option value="Research Partnership">Research Partnership</option>
                  <option value="Distribution & Outreach">Distribution & Outreach</option>
                  <option value="Data Sharing">Data Sharing</option>
                  <option value="Pilot Program Support">Pilot Program Support</option>
                  <option value="Strategic Alliance">Strategic Alliance</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  SDG Alignment (Select all that apply)
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { id: 'SDG 1', label: 'No Poverty' },
                    { id: 'SDG 2', label: 'Zero Hunger' },
                    { id: 'SDG 8', label: 'Decent Work' },
                    { id: 'SDG 9', label: 'Innovation' },
                    { id: 'SDG 12', label: 'Responsible Consumption' },
                    { id: 'SDG 13', label: 'Climate Action' },
                    { id: 'SDG 15', label: 'Life on Land' },
                    { id: 'SDG 17', label: 'Partnerships' }
                  ].map(sdg => (
                    <label key={sdg.id} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.sdgAlignment.includes(sdg.id)}
                        onChange={() => handleCheckboxChange(sdg.id)}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                      />
                      <span className="text-sm text-gray-700">{sdg.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="proposedContribution" className="block text-sm font-medium text-gray-700 mb-1">
                  Proposed Contribution
                </label>
                <input
                  type="text"
                  id="proposedContribution"
                  name="proposedContribution"
                  value={formData.proposedContribution}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  placeholder="e.g., Funding, Technology, Network access"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  maxLength={500}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm resize-none"
                  placeholder="Tell us about your organization and how you'd like to partner with NomaApp..."
                ></textarea>
                <p className="text-xs text-gray-500 mt-1">{formData.message.length}/500 characters</p>
              </div>
            </div>

            {/* Submit Status */}
            {submitStatus === 'success' && (
              <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg flex items-center">
                <i className="ri-checkbox-circle-line text-xl mr-2"></i>
                <span>Thank you! We'll review your partnership inquiry and get back to you soon.</span>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg flex items-center">
                <i className="ri-error-warning-line text-xl mr-2"></i>
                <span>Something went wrong. Please try again.</span>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-full font-semibold hover:bg-gray-50 transition-all whitespace-nowrap cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition-all whitespace-nowrap cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <i className="ri-loader-4-line animate-spin mr-2"></i>
                    Submitting...
                  </>
                ) : (
                  <>
                    <i className="ri-send-plane-line mr-2"></i>
                    Submit Partnership Inquiry
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
