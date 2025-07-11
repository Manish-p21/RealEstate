import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white w-full text-black py-8 sm:py-6 border-t border-gray-300">
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 md:px-8 lg:px-16">
        {/* Top Section: Subscription and Services */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start pb-8 sm:pb-6 border-b border-gray-300 gap-8">
          {/* Subscription Section */}
          <div className="w-full lg:w-1/2">
            <p className="font-semibold mb-4 text-lg sm:text-base">Get in touch with our experts for any query.</p>
            <div className="flex border border-black rounded-lg overflow-hidden max-w-md sm:max-w-full">
              <input
                type="email"
                placeholder="Enter your email address"
                className="px-4 py-2 w-full outline-none text-sm sm:text-base"
              />
              <button className="bg-black text-white px-6 py-2 sm:px-4 sm:text-sm hover:bg-gray-800 transition-colors duration-200">
                Subscribe
              </button>
            </div>
          </div>

          {/* Services and Support */}
          <div className="flex flex-col sm:flex-row sm:justify-between gap-8 w-full lg:w-1/2">
            <div className="w-full sm:w-1/2">
              <h3 className="font-bold mb-3 text-lg sm:text-base">Our Services</h3>
              <ul className="space-y-2 text-sm sm:text-base">
                <li className="hover:text-gray-600 transition-colors duration-200">Property Listings</li>
                <li className="hover:text-gray-600 transition-colors duration-200">Home Loans Assistance</li>
                <li className="hover:text-gray-600 transition-colors duration-200">Legal & Documentation Support</li>
                <li className="hover:text-gray-600 transition-colors duration-200">Property Valuation</li>
                <li className="hover:text-gray-600 transition-colors duration-200">Rental & Leasing Services</li>
              </ul>
            </div>

            <div className="w-full sm:w-1/2">
              <h3 className="font-bold mb-3 text-lg sm:text-base">Customer Support</h3>
              <ul className="space-y-2 text-sm sm:text-base">
                <li className="hover:text-gray-600 transition-colors duration-200">FAQs</li>
                <li className="hover:text-gray-600 transition-colors duration-200">Pricing & Plans</li>
                <li className="hover:text-gray-600 transition-colors duration-200">Privacy Policy</li>
                <li className="hover:text-gray-600 transition-colors duration-200">Terms & Conditions</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section: Navigation & Social Icons */}
        <div className="flex flex-col items-center pt-6 sm:pt-4">
          <div className="flex flex-wrap justify-center space-x-6 sm:space-x-4 text-base sm:text-sm font-semibold mb-6 sm:mb-4">
            <a href="/" className="hover:text-gray-600 transition-colors duration-200">Home</a>
            <a href="/About" className="hover:text-gray-600 transition-colors duration-200">About</a>
            <a href="/PropertyPage" className="hover:text-gray-600 transition-colors duration-200">Properties</a>
            <a href="/ContactUs" className="hover:text-gray-600 transition-colors duration-200">Blog</a>
            <a href="/ContactUs" className="hover:text-gray-600 transition-colors duration-200">Contact</a>
          </div>
          <div className="flex space-x-6 sm:space-x-4 text-xl sm:text-lg">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-600 transition-colors duration-200">
              <FaFacebook />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-600 transition-colors duration-200">
              <FaTwitter />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-600 transition-colors duration-200">
              <FaInstagram />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-600 transition-colors duration-200">
              <FaLinkedin />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-600 transition-colors duration-200">
              <FaYoutube />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;