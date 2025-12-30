
import { useState } from 'react';

interface PilotProgramModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PilotProgramModal({ isOpen, onClose }: PilotProgramModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    const form = e.currentTarget;
    const formData = new FormData(form);

    // Validate textarea length
    const message = formData.get('message') as string;
    if (message && message.length > 500) {
      alert('Message must be 500 characters or less');
      setIsSubmitting(false);
      return;
    }

    // Convert to URL-encoded format
    const urlEncodedData = new URLSearchParams();
    formData.forEach((value, key) => {
      urlEncodedData.append(key, value.toString());
    });

    try {
      const response = await fetch('https://readdy.ai/api/form/d4v9suh2tio6iafo0gt0', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: urlEncodedData.toString(),
      });

      if (response.ok) {
        setSubmitStatus('success');
        form.reset();
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

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Join NomaApp Pilot Program</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
            type="button"
          >
            <i className="ri-close-line text-2xl"></i>
          </button>
        </div>

        <div className="p-6">
          <p className="text-gray-600 mb-6">
            Be part of the future of African agriculture. Join our pilot program to get early access to NomaApp and help us build the best crop disease diagnosis tool for farmers.
          </p>

          <form id="pilot-program-form" data-readdy-form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                  First Name *
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                  placeholder="Enter your first name"
                />
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name *
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                  placeholder="Enter your last name"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                placeholder="your.email@example.com"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                placeholder="+234 XXX XXX XXXX"
              />
            </div>

            <div>
              <label htmlFor="userType" className="block text-sm font-medium text-gray-700 mb-1">
                I am a *
              </label>
              <select
                id="userType"
                name="userType"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm cursor-pointer"
              >
                <option value="">Select your role</option>
                <option value="Smallholder Farmer">Smallholder Farmer</option>
                <option value="Commercial Farmer">Commercial Farmer</option>
                <option value="Agronomist">Agronomist</option>
                <option value="Extension Officer">Extension Officer</option>
                <option value="NGO/Agricultural Program">NGO/Agricultural Program</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                Location (State/Region) *
              </label>
              <input
                type="text"
                id="location"
                name="location"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                placeholder="e.g., Lagos, Kano, Ogun"
              />
            </div>

            <div>
              <label htmlFor="farmSize" className="block text-sm font-medium text-gray-700 mb-1">
                Farm Size (Hectares)
              </label>
              <input
                type="text"
                id="farmSize"
                name="farmSize"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                placeholder="e.g., 2, 10, 50"
              />
            </div>

            <div>
              <label htmlFor="crops" className="block text-sm font-medium text-gray-700 mb-1">
                Primary Crops Grown
              </label>
              <input
                type="text"
                id="crops"
                name="crops"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                placeholder="e.g., Maize, Rice, Cassava, Tomato"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Why do you want to join the pilot program?
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                maxLength={500}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm resize-none"
                placeholder="Tell us about your interest in NomaApp (max 500 characters)"
              ></textarea>
              <p className="text-xs text-gray-500 mt-1">Maximum 500 characters</p>
            </div>

            {submitStatus === 'success' && (
              <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg text-sm">
                <i className="ri-check-line mr-2"></i>
                Thank you! Your application has been submitted successfully.
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg text-sm">
                <i className="ri-error-warning-line mr-2"></i>
                Something went wrong. Please try again.
              </div>
            )}

            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-green-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <i className="ri-loader-4-line mr-2 animate-spin"></i>
                    Submitting...
                  </>
                ) : (
                  <>
                    <i className="ri-send-plane-line mr-2"></i>
                    Submit Application
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-full font-semibold hover:bg-gray-50 transition-all whitespace-nowrap cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
