import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

export default function PrivacyPolicy() {
  const navigate = useNavigate();

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
          <h1 className="text-4xl md:text-5xl font-bold">Privacy Policy</h1>
          <p className="text-green-100 mt-3 text-lg">Last updated: June 20, 2026</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Introduction */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Introduction</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            NomaApp ("we," "our," or "us") provides AI-powered crop disease diagnosis
            for farmers across Nigeria and Sub-Saharan Africa. This Privacy Policy
            explains what information we collect when you use the NomaApp mobile
            application, how we use it, and the choices you have. By using NomaApp,
            you agree to the collection and use of information as described here.
          </p>
        </section>

        {/* Data Collection */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Information We Collect</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            We collect only the information needed to diagnose crop issues, connect
            you with agricultural experts, and operate your account.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mb-3">Personal Data</h3>
          <ul className="space-y-2 mb-6 text-gray-700">
            {[
              'Full name and phone number, used to create and secure your account',
              'Email address, where provided, for account recovery and notifications',
              'Crop scan photos you upload, used solely to generate a diagnosis',
              'Approximate location, used to provide localized weather forecasts and disease outbreak alerts',
              'Payment information for subscription plans, processed securely by our payment partner Paystack — NomaApp does not store your card details',
              'Government ID and professional credential documents, collected only from users applying to become a verified agricultural expert on the platform',
              'Push notification tokens, used to deliver scan results and case updates',
            ].map((item, i) => (
              <li key={i} className="flex gap-3">
                <span className="text-green-600 font-bold">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <h3 className="text-xl font-semibold text-gray-800 mb-3">How We Use This Data</h3>
          <ul className="space-y-2 mb-6 text-gray-700">
            {[
              'To diagnose crop diseases using our AI model and connect you with verified experts',
              'To provide weather forecasts and disease outbreak alerts relevant to your location',
              'To process subscription payments and manage your plan',
              'To verify the identity and qualifications of agricultural experts on the platform',
              'To send service notifications, such as diagnosis results or expert responses',
              'To improve the accuracy of our AI diagnosis models over time',
            ].map((item, i) => (
              <li key={i} className="flex gap-3">
                <span className="text-green-600 font-bold">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Data Sharing */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">How We Share Your Data</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            We do not sell your personal data. We share limited information only as
            necessary to operate the service:
          </p>
          <ul className="space-y-2 text-gray-700">
            {[
              'With agricultural experts you choose to consult, limited to your diagnosis and any notes you provide for that case',
              'With Paystack, our payment processor, to complete subscription transactions',
              'With Cloudinary, our media storage provider, to host scan images and verification documents securely',
              'When required by law, regulation, or a valid legal process',
            ].map((item, i) => (
              <li key={i} className="flex gap-3">
                <span className="text-green-600 font-bold">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Data Security */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Security</h2>
          <p className="text-gray-700 leading-relaxed">
            We use industry-standard measures to protect your data, including
            encrypted connections (HTTPS), hashed passwords, and access-controlled
            storage for sensitive documents such as expert verification IDs. While
            no system is completely immune to risk, we work continuously to keep
            your information secure.
          </p>
        </section>

        {/* Data Retention */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Retention</h2>
          <p className="text-gray-700 leading-relaxed">
            We retain your account data for as long as your account is active.
            Crop scan history and diagnosis records are kept to provide you with
            ongoing access to your farm's history and to improve our AI models.
            If you request account deletion, we will deactivate your account and
            remove personally identifiable data within 30 days, except where we
            are required to retain certain records for legal, tax, or regulatory
            purposes.
          </p>
        </section>

        {/* User Rights */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Rights</h2>
          <ul className="space-y-2 text-gray-700">
            {[
              'Access the personal data we hold about you',
              'Correct inaccurate or incomplete information in your profile',
              'Request deletion of your account and associated data',
              'Withdraw consent for location-based features at any time, via your device settings',
              'Opt out of non-essential push notifications in the app settings',
            ].map((item, i) => (
              <li key={i} className="flex gap-3">
                <span className="text-green-600 font-bold">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Account Deletion CTA */}
        <section className="mb-12 bg-amber-50 border border-amber-200 p-8 rounded-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Deleting your account</h2>
          <p className="text-gray-700 mb-4">
            You can delete your NomaApp account at any time directly from the app:
            go to <strong>Profile → Settings → Delete Account</strong>. This
            permanently removes your account and personal data from our active
            systems.
          </p>
          <p className="text-gray-700 mb-4">
            If you no longer have access to the app or your account, you can submit
            a deletion request through our web form instead.
          </p>
          <button
            onClick={() => navigate('/account-delete')}
            className="bg-gradient-to-br from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200"
          >
            Go to account deletion request
          </button>
        </section>

        {/* Contact */}
        <section className="mb-12 bg-green-50 p-8 rounded-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
          <p className="text-gray-700 mb-4">
            If you have questions about this Privacy Policy or how your data is
            handled, reach out to us:
          </p>
          <div className="space-y-2 text-gray-700">
            <p>Email: support@nomaapp.com.ng</p>
            <p>NomaApp, Nigeria</p>
          </div>
        </section>
      </div>
    </div>
  );
}