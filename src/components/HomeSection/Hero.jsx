import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  const heroRef = useRef(null);
  const contentRef = useRef(null);

  // Parallax effect for background
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;

      // Background parallax (disabled on mobile for performance)
      if (innerWidth > 640) {
        const moveXBg = (clientX - innerWidth / 2) * 0.01;
        const moveYBg = (clientY - innerHeight / 2) * 0.01;
        if (heroRef.current) {
          heroRef.current.style.transform = `translate(${moveXBg}px, ${moveYBg}px)`;
        }

        // Content subtle follow effect
        const moveXContent = (clientX - innerWidth / 2) * 0.005;
        const moveYContent = (clientY - innerHeight / 2) * 0.005;
        if (contentRef.current) {
          contentRef.current.style.transform = `translate(${moveXContent}px, ${moveYContent}px)`;
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="relative w-full h-[500px] sm:h-[700px] md:h-[800px] lg:h-[850px] overflow-hidden">
      {/* Embedded CSS Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes slideUp {
            from { transform: translateY(40px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
          @keyframes subtleZoom {
            0% { transform: scale(1); }
            50% { transform: scale(1.04); }
            100% { transform: scale(1); }
          }
          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-8px); }
          }
          @keyframes pulse {
            0% { box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.4); }
            70% { box-shadow: 0 0 0 12px rgba(255, 255, 255, 0); }
            100% { box-shadow: 0 0 0 0 rgba(255, 255, 255, 0); }
          }
          .animate-fadeIn { animation: fadeIn 1.2s ease-out; }
          .animate-slideUp { animation: slideUp 1s ease-out; }
          .animate-subtleZoom { animation: subtleZoom 20s infinite ease-in-out; }
          .animate-bounce { animation: bounce 2s infinite ease-in-out; }
          .animate-pulse { animation: pulse 2s infinite; }
          .delay-200 { animation-delay: 0.2s; }
          .delay-400 { animation-delay: 0.4s; }
          .delay-500 { animation-delay: 0.5s; }
          .delay-600 { animation-delay: 0.6s; }
          .delay-800 { animation-delay: 0.8s; }
        `}
      </style>

      {/* Background Image with Subtle Zoom and Parallax */}
      <div
        ref={heroRef}
        className="absolute inset-0 w-full h-full bg-cover bg-center animate-subtleZoom transition-transform duration-100"
        style={{
          backgroundImage: "url('https://realestate-3rel.onrender.com/uploads/4.jpg')",
          backgroundBlendMode: "overlay",
          backgroundColor: "rgba(0,0,0,0.4)",
        }}
      ></div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-gray-900/20"></div>

      {/* Content Container */}
      <div className="relative z-10 flex items-center justify-center h-full px-4 sm:px-6 md:px-8 lg:px-10">
        <div ref={contentRef} className="text-center text-white max-w-full sm:max-w-3xl md:max-w-4xl lg:max-w-5xl transition-transform duration-150">
          {/* Heading with Decorative Line */}
          <div className="relative mb-4 sm:mb-8">
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold leading-tight animate-fadeIn">
              Exceptional Homes Await
            </h1>
            <div className="w-16 sm:w-24 h-0.5 bg-white/60 mx-auto mt-2 sm:mt-4 rounded-full animate-slideUp delay-200"></div>
          </div>

          {/* Subheading */}
          <p className="text-sm sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-10 md:mb-12 font-light max-w-md sm:max-w-2xl md:max-w-3xl mx-auto tracking-wide animate-fadeIn delay-400">
            Experience luxury redefined with our exclusive property collection
          </p>

          {/* Enhanced Search and CTA Container */}
          <div className="bg-white/15 backdrop-blur-xl rounded-2xl p-4 sm:p-8 max-w-full sm:max-w-3xl md:max-w-4xl mx-auto shadow-2xl animate-slideUp delay-500">
            {/* Search Bar */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 mb-4 sm:mb-8">
              <input
                type="text"
                placeholder="Enter location or property type"
                className="flex-1 bg-transparent text-white placeholder-white/60 border border-white/30 
                  rounded-lg py-2 sm:py-4 px-3 sm:px-6 focus:outline-none focus:border-white/70 focus:ring-2 
                  focus:ring-white/20 transition-all duration-300 text-sm sm:text-lg"
              />
              <button className="bg-white text-gray-900 px-4 sm:px-8 py-2 sm:py-4 rounded-full font-semibold 
                hover:bg-gray-200 transition-all duration-300 shadow-lg hover:shadow-xl animate-pulse">
                Search
              </button>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-6">
              <Link
                to="/properties"
                className="relative px-6 sm:px-10 py-2 sm:py-4 bg-transparent border-2 border-white/80 
                  text-white rounded-full font-medium overflow-hidden group"
              >
                <span className="relative z-10 group-hover:text-gray-900 transition-colors duration-700 ease-in-out">
                  Browse Listings
                </span>
                <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 
                  origin-left transition-transform duration-700 ease-in-out"></div>
              </Link>
              <Link
                to="/contact"
                className="px-6 sm:px-10 py-2 sm:py-4 bg-white text-gray-900 rounded-full font-medium 
                  hover:bg-gray-200 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
              >
                Get in Touch
              </Link>
            </div>
          </div>

          {/* Stats Section (Hidden on Mobile, Shown on Tablet and Above) */}
          <div className="hidden sm:grid sm:mt-10 md:mt-12 lg:mt-14 grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 max-w-full sm:max-w-3xl md:max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-md p-4 sm:p-5 rounded-xl shadow-md animate-slideUp delay-600">
              <p className="text-3xl sm:text-4xl font-bold text-white">750+</p>
              <p className="text-xs sm:text-sm font-light opacity-80 mt-1">Premium Properties</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-4 sm:p-5 rounded-xl shadow-md animate-slideUp delay-600">
              <p className="text-3xl sm:text-4xl font-bold text-white">100%</p>
              <p className="text-xs sm:text-sm font-light opacity-80 mt-1">Client Commitment</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-4 sm:p-5 rounded-xl shadow-md animate-slideUp delay-600">
              <p className="text-3xl sm:text-4xl font-bold text-white">40+</p>
              <p className="text-xs sm:text-sm font-light opacity-80 mt-1">Years of Trust</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-4 sm:p-5 rounded-xl shadow-md animate-slideUp delay-600">
              <p className="text-3xl sm:text-4xl font-bold text-white">24/7</p>
              <p className="text-xs sm:text-sm font-light opacity-80 mt-1">Support Available</p>
            </div>
          </div>

          {/* Quick Links */}
          
        </div>
      </div>

      {/* Enhanced Scroll Indicator */}
      <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="relative">
          <svg
            className="w-6 sm:w-10 h-6 sm:h-10 text-white/80"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
          <div className="absolute inset-0 animate-pulse opacity-40 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default Hero;