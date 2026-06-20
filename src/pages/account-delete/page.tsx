import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, AlertCircle, CheckCircle, Smartphone, Mail } from 'lucide-react';

export default function AccountDeleteRequest() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    reason: '',
    confirmed: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.currentTarget;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = () => {
    setFormData(prev => ({ ...prev, confirmed: !prev.confirmed }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.confirmed) {
      setErrorMessage('Please provide your email and confirm the deletion request.');
      setSubmitStatus('error');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/account/delete-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          reason: formData.reason,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitStatus('success');
        setFormData({ email: '', reason: '', confirmed: false });
      } else {
        setErrorMessage(data?.error?.message || 'Something went wrong. Please try again.');
        setSubmitStatus('error');
      }
    } catch {
      setErrorMessage('Could not reach the server. Please check your connection and try again.');
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-green-800 to-green-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 mb-6 text-white/80 hover:text-white transition-colors"
          >
            <ChevronLeft size={20} />
            Back
          </button>
          <h1 className="text-4xl md:text-5xl font-bold">Delete Your NomaApp Account</h1>
          <p className="text-green-100 mt-3 text-lg">
            We're sorry to see you go. Here's how to permanently delete your account and data.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <p className="text-gray-600 text-lg mb-12">
          You have two ways to delete your NomaApp account, depending on whether
          you still have access to the app.
        </p>

        {/* In-app self-service path */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-12 border-l-4 border-green-600">
          <div className="flex gap-4">
            <Smartphone className="text-green-600 flex-shrink-0" size={28} />
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                Option 1 — Delete instantly in the app
              </h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                If you can still log in to NomaApp, this is the fastest way to delete
                your account:
              </p>
              <ol className="space-y-2 text-gray-700 mb-2">
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">1</span>
                  <span>Open NomaApp and go to your <strong>Profile</strong> tab</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">2</span>
                  <span>Tap <strong>Account Settings</strong></span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">3</span>
                  <span>Tap <strong>Delete Account</strong> and confirm</span>
                </li>
              </ol>
              <p className="text-sm text-gray-500">
                Your account and personal data are deactivated immediately.
              </p>
            </div>
          </div>
        </div>

        {/* Success Message */}
        {submitStatus === 'success' && (
          <div className="mb-8 p-6 bg-green-50 border border-green-200 rounded-lg flex gap-4">
            <CheckCircle className="text-green-600 flex-shrink-0" size={24} />
            <div>
              <h3 className="font-semibold text-green-900 mb-2">Request submitted</h3>
              <p className="text-green-800">
                We've received your deletion request. Our team will verify and process
                it within 7 business days. You'll receive a confirmation at the email
                you provided once it's complete.
              </p>
            </div>
          </div>
        )}

        {/* Error Message */}
        {submitStatus === 'error' && (
          <div className="mb-8 p-6 bg-red-50 border border-red-200 rounded-lg flex gap-4">
            <AlertCircle className="text-red-600 flex-shrink-0" size={24} />
            <div>
              <h3 className="font-semibold text-red-900 mb-2">Error</h3>
              <p className="text-red-800">{errorMessage}</p>
            </div>
          </div>
        )}

        {/* Web form path */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="flex gap-4 mb-6">
            <Mail className="text-amber-600 flex-shrink-0" size={28} />
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Option 2 — Request deletion by email
              </h2>
              <p className="text-gray-700">
                Lost access to your account or can no longer log in? Submit a request
                below and our support team will verify your identity and delete your
                account and associated data on your behalf.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email or phone number used on NomaApp *
              </label>
              <input
                type="text"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com or 080XXXXXXXX"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
              />
            </div>

            {/* Reason Field */}
            <div>
              <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-2">
                Reason for leaving (optional)
              </label>
              <textarea
                id="reason"
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                placeholder="Help us improve NomaApp — let us know why you're deleting your account"
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition resize-none"
              />
            </div>

            {/* Confirmation Checkbox */}
            <div className="flex gap-3 p-4 bg-red-50 rounded-lg border border-red-200">
              <input
                type="checkbox"
                id="confirmed"
                checked={formData.confirmed}
                onChange={handleCheckboxChange}
                className="w-5 h-5 mt-0.5 cursor-pointer accent-red-600"
              />
              <label htmlFor="confirmed" className="text-sm text-gray-700 cursor-pointer">
                I understand this will permanently delete my NomaApp account, including
                my scan history, diagnosis records, and subscription information. This
                action cannot be undone.
              </label>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={isSubmitting || !formData.confirmed}
                className="flex-1 bg-gradient-to-br from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-all duration-200"
              >
                {isSubmitting ? 'Submitting...' : 'Submit deletion request'}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>

        {/* What gets deleted */}
        <div className="mt-12 bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">What gets deleted</h2>
          <ul className="space-y-2 text-gray-700">
            {[
              'Your profile — name, phone number, email, and account credentials',
              'Crop scan history and AI diagnosis results',
              'Expert consultation cases and messages',
              'Subscription and billing records linked to your account',
              'Push notification preferences and tokens',
            ].map((item, i) => (
              <li key={i} className="flex gap-3">
                <span className="text-green-600 font-bold">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
            <p className="text-sm text-blue-900">
              <strong>Note:</strong> Some information may be retained for a limited
              period where required by law — for example, payment records needed
              for tax or fraud-prevention purposes. This data is not used for any
              other purpose and is deleted once the legal retention period ends.
            </p>
          </div>
        </div>

        {/* Warning Box */}
        <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
          <p className="text-sm text-yellow-800">
            <strong>⚠️ This action is permanent.</strong> Once your account is
            deleted, your scan history and case records cannot be recovered.
          </p>
        </div>
      </div>
    </div>
  );
}