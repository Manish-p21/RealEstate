import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaLinkedin, FaTwitter } from "react-icons/fa";

const teamData = [
  {
    name: "Jane Doe",
    role: "Founder & CEO",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2070&auto=format&fit=crop",
    alt: "Jane Doe, Founder & CEO of Realvia",
    bio: "Jane leads Realvia with a vision to revolutionize real estate.",
    details:
      "With over 15 years in real estate, Jane founded Realvia to make home-buying transparent and accessible. Her leadership drives our mission to empower clients.",
    social: {
      linkedin: "https://linkedin.com/in/janedoe",
      twitter: "https://twitter.com/janedoe",
    },
  },
  {
    name: "John Smith",
    role: "Chief Technology Officer",
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=2070&auto=format&fit=crop",
    alt: "John Smith, CTO of Realvia",
    bio: "John oversees technology innovation at Realvia.",
    details:
      "John brings 10 years of tech expertise to Realvia, developing cutting-edge tools to simplify the home-buying process. He's passionate about user-centric design.",
    social: {
      linkedin: "https://linkedin.com/in/johnsmith",
      twitter: "https://twitter.com/johnsmith",
    },
  },
  {
    name: "Emily Chen",
    role: "Head of Operations",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d877c828f7?q=80&w=2070&auto=format&fit=crop",
    alt: "Emily Chen, Head of Operations at Realvia",
    bio: "Emily ensures seamless operations across all platforms.",
    details:
      "Emily manages Realvia's operations with precision, ensuring every client interaction is smooth and efficient. Her focus is on operational excellence.",
    social: {
      linkedin: "https://linkedin.com/in/emilychen",
      twitter: "https://twitter.com/emilychen",
    },
  },
];

const Modal = ({ isOpen, onClose, member }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <motion.div
        className="bg-white p-6 rounded-lg max-w-md mx-4"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h3>
        <p className="text-sm text-gray-500 mb-2">{member.role}</p>
        <p className="text-gray-600 mb-4">{member.details}</p>
        <div className="flex space-x-4">
          <a
            href={member.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visit ${member.name}'s LinkedIn profile`}
            className="text-blue-600 hover:text-blue-800 transition"
          >
            <FaLinkedin className="text-2xl" />
          </a>
          <a
            href={member.social.twitter}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visit ${member.name}'s Twitter profile`}
            className="text-blue-600 hover:text-blue-800 transition"
          >
            <FaTwitter className="text-2xl" />
          </a>
        </div>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Close
        </button>
      </motion.div>
    </div>
  );
};

const OurTeam = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  const openModal = (member) => {
    setSelectedMember(member);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedMember(null);
  };

  return (
    <section
      className="py-16 px-6 "
      role="region"
      aria-labelledby="our-team-title"
    >
      <div className="max-w-6xl mx-auto">
        <motion.h2
          id="our-team-title"
          className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          Our Team
        </motion.h2>
        <motion.p
          className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        >
          Meet the dedicated professionals driving Realvia’s mission to transform real estate.
        </motion.p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {teamData.map((member, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm text-center cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
              whileHover={{ scale: 1.02, boxShadow: "0 5px 15px rgba(0,0,0,0.1)" }}
              onClick={() => openModal(member)}
              role="button"
              aria-label={`Learn more about ${member.name}, ${member.role}`}
            >
              <div className="relative w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden">
                <img
                  src={member.image}
                  alt={member.alt}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
              <p className="text-sm text-gray-500 mb-2">{member.role}</p>
              <p className="text-sm text-gray-600 mb-4">{member.bio}</p>
              <div className="flex justify-center space-x-4">
                <a
                  href={member.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit ${member.name}'s LinkedIn profile`}
                  className="text-blue-600 hover:text-blue-800 transition"
                >
                  <FaLinkedin className="text-xl" />
                </a>
                <a
                  href={member.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit ${member.name}'s Twitter profile`}
                  className="text-blue-600 hover:text-blue-800 transition"
                >
                  <FaTwitter className="text-xl" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <Modal isOpen={modalOpen} onClose={closeModal} member={selectedMember} />
    </section>
  );
};

export default OurTeam;