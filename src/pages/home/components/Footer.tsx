import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer id="contact" className="bg-gradient-to-br from-green-800 to-green-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <img 
                src="./nomalogo_w.png" 
                alt="NomaApp Logo" 
                className="h-20 w-23 object-contain"
              />
              {/* <span className="text-2xl font-bold">NomaApp</span> */}
            </div>
            <p className="text-base text-white/90 leading-relaxed mb-6 max-w-md">
              Empowering African farmers with AI-powered crop disease diagnosis. Detect diseases early, protect your harvest, and improve your livelihood with technology built specifically for African agriculture.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors cursor-pointer">
                <i className="ri-facebook-fill text-xl"></i>
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors cursor-pointer">
                <i className="ri-twitter-x-fill text-xl"></i>
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors cursor-pointer">
                <i className="ri-instagram-fill text-xl"></i>
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors cursor-pointer">
                <i className="ri-linkedin-fill text-xl"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <a href="#features" className="text-base text-white/80 hover:text-white transition-colors cursor-pointer">
                  Features
                </a>
              </li>
              <li>
                <a href="#impact" className="text-base text-white/80 hover:text-white transition-colors cursor-pointer">
                  Impact
                </a>
              </li>
              <li>
                <a href="#" className="text-base text-white/80 hover:text-white transition-colors cursor-pointer">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-base text-white/80 hover:text-white transition-colors cursor-pointer">
                  Pilot Program
                </a>
              </li>
              <li>
                <a href="#" className="text-base text-white/80 hover:text-white transition-colors cursor-pointer">
                  Partners
                </a>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-base text-white/80 hover:text-white transition-colors cursor-pointer">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/account-delete" className="text-base text-white/80 hover:text-white transition-colors cursor-pointer">
                  Account Delete Request
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold mb-6">Get in Touch</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <i className="ri-mail-line text-xl mt-0.5 flex-shrink-0"></i>
                <a href="mailto:info@nomaapp.com" className="text-base text-white/80 hover:text-white transition-colors cursor-pointer">
                  info@nomaapp.com.ng
                </a>
              </li>
              <li className="flex items-start gap-3">
                <i className="ri-phone-line text-xl mt-0.5 flex-shrink-0"></i>
                <a href="tel:+234" className="text-base text-white/80 hover:text-white transition-colors cursor-pointer">
                  +234 7068538000
                </a>
              </li>
              <li className="flex items-start gap-3">
                <i className="ri-map-pin-line text-xl mt-0.5 flex-shrink-0"></i>
                <span className="text-base text-white/80">
                  Kano, Nigeria
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-white/70 text-center md:text-left">
              © 2025 NomaApp. All rights reserved. Protecting African harvests with AI.
            </p>
            <div className="flex items-center gap-6">
              <Link to="/privacy-policy" className="text-sm text-white/70 hover:text-white transition-colors cursor-pointer whitespace-nowrap">
                Privacy Policy
              </Link>
              <a href="#" className="text-sm text-white/70 hover:text-white transition-colors cursor-pointer whitespace-nowrap">
                Terms of Service
              </a>
            </div>
          </div>
            <div className="text-center mt-5 text-sm text-white/70 hover:text-white transition-colors cursor-pointer whitespace-nowrap">
              <p>
                Developed by <a href="https://www.yusufias-portfolio.vercel.app" target="_blank" className="underline">Yusufia Dev</a>
              </p>
            </div>
        </div>
      </div>
    </footer>
  );
}