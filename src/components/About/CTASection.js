import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section className="py-16 px-6 mx-80 rounded-lg bg-gray-900 text-white">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-4 animate-slideUp"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          Ready to Find Your Dream Home?
        </motion.h2>
        <motion.p
          className="text-lg text-gray-300 mb-8 animate-slideUp"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        >
          Start your journey with MyBrand today and explore our curated listings.
        </motion.p>
        <Link to="/properties">
          <motion.button
            className="btn-primary inline-block max-w-xs"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Get started"
          >
            Get Started
          </motion.button>
        </Link>
      </div>
    </section>
  );
};

export default CTASection;