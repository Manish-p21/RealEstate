import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative bg-gray-100 py-20 px-4 min-h-[500px] flex items-center">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop"
          alt="Modern luxury home"
          className="w-full h-full object-cover opacity-80"
          onError={(e) => (e.target.src = "https://via.placeholder.com/1200x800?text=Fallback+Image")} // Fallback image
        />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/50 to-gray-900/80"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-6xl mx-auto text-center">
        <div className="inline-block  mb-6">
          <motion.div
            className="relative inline-block"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
          >
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight text-shadow">
              Welcome to Realvia
            </h1>
            <div className="absolute top-0 right-[510px] h-full w-2 bg-white"></div>
          </motion.div>
        </div>

        <motion.p
          className="text-base sm:text-lg text-gray-200 max-w-2xl mx-auto mb-10 text-shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeInOut" }}
        >
          Your premier destination for finding exceptional homes with trust and excellence.
        </motion.p>

        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <Link to="/PropertyPage">
            <motion.button
              className="btn-gradient px-8 py-3 rounded-full text-white font-semibold text-sm shadow-lg"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: "easeInOut" }}
              aria-label="View our properties"
            >
              View Properties
            </motion.button>
          </Link>
          <Link to="/ContactUs">
            <motion.button
              className="btn-outline px-8 py-3 rounded-full text-white font-semibold text-sm shadow-lg"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.4, ease: "easeInOut" }}
              aria-label="Get in touch"
            >
              Get in Touch
            </motion.button>
          </Link>
        </div>
      </div>

      {/* Embedded CSS */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeIn {
            animation: fadeIn 0.8s ease-in-out;
          }
          .text-shadow {
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
          }
          .text-shadow-sm {
            text-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
          }
          .btn-gradient {
            background: linear-gradient(135deg, #1f2937, #4b5563);
            transition: all 0.3s ease;
          }
          .btn-gradient:hover {
            background: linear-gradient(135deg, #374151, #6b7280);
          }
          .btn-outline {
            background: rgba(243, 244, 246, 0.2);
            border: 2px solid #ffffff;
            transition: all 0.3s ease;
          }
          .btn-outline:hover {
            background: rgba(229, 231, 235, 0.3);
            border-color: #e5e7eb;
          }
          .shadow-lg {
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
          }
        `}
      </style>
    </section>
  );
};

export default HeroSection;