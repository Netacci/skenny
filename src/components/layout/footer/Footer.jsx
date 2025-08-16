

import { Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <>
         <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-orange-400 bg-clip-text text-transparent mb-4">
              SKENNY HEIGHTS
            </h3>
            <p className="text-gray-300 mb-6 max-w-md">
              Your trusted partner in finding the perfect home. We specialize in luxury properties 
              and provide exceptional service to help you make the right choice.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: '📘', name: 'Facebook' },
                { icon: '📸', name: 'Instagram' },
                { icon: '🐦', name: 'Twitter' },
                { icon: '💼', name: 'LinkedIn' }
              ].map((social) => (
                <button
                  key={social.name}
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gradient-to-r hover:from-blue-600 hover:to-orange-500 transition-all duration-200"
                >
                  <span className="text-lg">{social.icon}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                'Privacy Policy',
                'Terms & Conditions',
                'Careers',
                'About Us',
                'Contact Us'
              ].map((link) => (
                <li key={link}>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-3">
              {/* <div className="flex items-start space-x-3">
                <MapPin size={18} className="text-blue-400 mt-1 flex-shrink-0" />
                <span className="text-gray-300 text-sm">
                  123 UK Lane, London, UK
                </span>
              </div> */}
              <div className="flex items-center space-x-3">
                <Phone size={18} className="text-blue-400 flex-shrink-0" />
                <span className="text-gray-300 text-sm">+2348057202299</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={18} className="text-blue-400 flex-shrink-0" />
                <span className="text-gray-300 text-sm">info@skenny.org</span>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between">
            <div className="mb-4 lg:mb-0">
              <h4 className="text-xl font-semibold mb-2">Stay Updated</h4>
              <p className="text-gray-300">Get the latest property updates and market insights</p>
            </div>
            <div className="flex space-x-2 max-w-md w-full">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400"
              />
              <button className="px-6 py-3 bg-blue-600 from-blue-600 to-orange-500 text-white rounded-lg hover:shadow-lg transition-all duration-200">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-400">
            © 2024 SKENNY HEIGHTS. All rights reserved. Made with ❤️ for your dream home.
          </p>
        </div>
      </div>
    </footer>
    </>
  );
};


export default Footer;
