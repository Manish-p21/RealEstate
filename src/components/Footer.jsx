import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube, FaEnvelope, FaPhone, FaMapMarker } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white w-full text-black py-10 border-t border-gray-300">
      <div className="max-w-8xl gap-8 w-full mx-auto px-80">
        {/* Top Section: Subscription and Services */}
        <div className="flex justify-between items-start pb-10  border-b border-gray-300">
          <div className="w-3/6 pr-20 ">
            <p className="font-semibold mb-4">Get in touch with our experts for any query.</p>
            <div className="flex border border-black rounded-lg overflow-hidden">
              <input
                type="email"
                placeholder="Enter your email address"
                className="px-4 py-2 w-full outline-none"
              />
              <button className="bg-black text-white px-6 py-2">Subscribe</button>
            </div>
          </div>
          
          <div className="w-1/6">
            <h3 className="font-bold mb-3">Our Services</h3>
            <ul className="space-y-1">
              <li>Property Listings</li>
              <li>Home Loans Assistance</li>
              <li>Legal & Documentation Support</li>
              <li>Property Valuation</li>
              <li>Rental & Leasing Services</li>
            </ul>
          </div>
          
          <div className="w-1/6">
            <h3 className="font-bold mb-3">Customer Support</h3>
            <ul className="space-y-1">
              <li>FAQs</li>
              <li>Pricing & Plans</li>
              <li>Privacy Policy</li>
              <li>Terms & Conditions</li>
            </ul>
          </div>
        </div>

        {/* Bottom Section: Navigation & Social Icons */}
        <div className="flex flex-col items-center pt-6">
          <div className="flex space-x-10 text-lg font-semibold mb-6">
            <a href="/">Home</a>
            <a href="/About">About</a>
            <a href="/PropertyPage">Properties</a>
            <a href="/ContactUs">Blog</a>
            <a href="/ContactUs">Contact</a>
          </div>
          <div className="flex space-x-6 text-xl">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-200 transition-colors duration-200">
                <FaFacebook className="text-xl" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-200 transition-colors duration-200">
                <FaTwitter className="text-xl" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-200 transition-colors duration-200">
                <FaInstagram className="text-xl" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-200 transition-colors duration-200">
                <FaLinkedin className="text-xl" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-200 transition-colors duration-200">
                <FaYoutube className="text-xl" />
              </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
