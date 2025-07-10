import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaHandshake, FaCheckCircle, FaUsers } from "react-icons/fa";

const valuesData = [
  {
    icon: <FaHandshake className="text-2xl sm:text-3xl text-gray-900" />,
    title: "Trust",
    desc: "We build relationships based on transparency and reliability.",
    details:
      "Our commitment to trust ensures every transaction is clear, honest, and aligned with our clients' needs.",
  },
  {
    icon: <FaCheckCircle className="text-2xl sm:text-3xl text-gray-900" />,
    title: "Quality",
    desc: "Every listing is vetted to meet the highest standards.",
    details:
      "We rigorously evaluate properties to ensure they meet our quality benchmarks, giving you peace of mind.",
  },
  {
    icon: <FaUsers className="text-2xl sm:text-3xl text-gray-900" />,
    title: "Community",
    desc: "We connect people to homes that suit their lifestyle.",
    details:
      "Our platform fosters communities by matching individuals with homes that reflect their values and aspirations.",
  },
];

const Modal = ({ isOpen, onClose, value }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <motion.div
        className="bg-white p-6 rounded-lg max-w-md mx-4"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{value.title}</h3>
        <p className="text-gray-600 mb-4">{value.details}</p>
        <button
          onClick={onClose}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Close
        </button>
      </motion.div>
    </div>
  );
};

const OurValues = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);

  const openModal = (value) => {
    setSelectedValue(value);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedValue(null);
  };

  return (
    <section
      className="py-16 px-6 "
      role="region"
      aria-labelledby="our-values-title"
    >
      <div className="max-w-6xl mx-auto">
        <motion.h2
          id="our-values-title"
          className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          Our Values
        </motion.h2>
        <motion.p
          className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        >
          The principles that drive us to deliver exceptional service.
        </motion.p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {valuesData.map((value, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm text-center cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
              whileHover={{ scale: 1.02, boxShadow: "0 5px 15px rgba(0,0,0,0.1)" }}
              onClick={() => openModal(value)}
              role="button"
              aria-label={`Learn more about ${value.title}`}
            >
              <div className="flex justify-center mb-4" aria-hidden="true">
                {value.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900">{value.title}</h3>
              <p className="text-sm text-gray-600">{value.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
      <Modal isOpen={modalOpen} onClose={closeModal} value={selectedValue} />
    </section>
  );
};

export default OurValues;