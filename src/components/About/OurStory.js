import React from "react";
import { motion } from "framer-motion";

const OurStory = () => {
  return (
    <section className="py-16 px-6 ">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4 animate-slideUp"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          Our Story
        </motion.h2>
        <motion.p
          className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-12 animate-slideUp"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        >
          Founded in 2015, Realvia set out to simplify the home-buying process with transparency and trust.
        </motion.p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <motion.div
            className="card-container animate-slideUp"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="relative h-64">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop"
                alt="Realvia office"
                className="w-full h-full object-cover rounded-t-3xl"
              />
            </div>
            <div className="p-6 space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Our Mission</h3>
              <p className="text-sm text-gray-600">
                To empower every individual to find their dream home with ease and confidence.
              </p>
            </div>
          </motion.div>
          <motion.div
            className="card-container animate-slideUp"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          >
            <div className="relative h-64">
              <img
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop"
                alt="Team collaboration"
                className="w-full h-full object-cover rounded-t-3xl"
              />
            </div>
            <div className="p-6 space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Our Vision</h3>
              <p className="text-sm text-gray-600">
                To be the most trusted real estate platform across India and beyond.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default OurStory;