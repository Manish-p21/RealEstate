import React from "react";
import HeroSection from "./HeroSection.js";
import OurStory from "./OurStory.js";
import OurTeam from "./OurTeam.js";
import OurValues from "./OurValues.js";
import CTASection from "./CTASection.js";

const About = () => {
  return (
    <div className="w-full mt-16 pb-20 bg-gray-50">
      {/* Embedded CSS for consistency with PropertyList */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes slideUp {
            from { transform: translateY(30px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
          .animate-fadeIn { animation: fadeIn 0.6s ease-out; }
          .animate-slideUp { animation: slideUp 0.9s ease-out; }
          .card-container {
            border: 1px solid #e5e7eb;
            border-radius: 24px;
            overflow: hidden;
            background: white;
            transition: background-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease;
          }
          .card-container:hover {
            background: #f9fafb;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
            transform: translateY(-6px);
          }
          .btn-primary {
            background: linear-gradient(135deg, #1f2937, #4b5563);
            color: white;
            padding: 8px 16px;
            border-radius: 12px;
            font-size: 14px;
            font-weight: 500;
            transition: background 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
            width: 100%;
          }
          .btn-primary:hover {
            background: linear-gradient(135deg, #1f2937, #6b7280);
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          }
        `}
      </style>

      <HeroSection />
      <OurStory />
      <OurTeam />
      <OurValues />
      <CTASection />
    </div>
  );
};

export default About;