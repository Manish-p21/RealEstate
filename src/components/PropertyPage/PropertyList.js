import React, { useState, useEffect } from "react";
import { FaBookmark, FaStar, FaTimes, FaHandshake, FaCheckCircle, FaUsers, FaHeadset } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("");

  useEffect(() => {
    fetch("https://realestate-3rel.onrender.com/properties")
      .then((response) => response.json())
      .then((data) => setProperties(data))
      .catch((error) => console.error("Error fetching properties:", error));
  }, []);

  const suggestedCities = ["Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", "Pune", "Kolkata"];

  const handleLocationChange = (location) => {
    setSelectedLocation(location);
  };

  const applyLocationChange = () => {
    console.log("Selected Location:", selectedLocation);
    setIsModalOpen(false);
  };

  return (
    <div className="w-full px-2 py-0 bg-gray-50">
      {/* Embedded CSS */}
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
          .image-wrapper {
            position: relative;
            height: 260px;
            background: linear-gradient(135deg, #111827, #374151);
            border-radius: 24px 24px 0 0;
          }
          .tag {
            position: absolute;
            top: 12px;
            left: 12px;
            padding: 4px 12px;
            border-radius: 9999px;
            font-size: 11px;
            font-weight: 600;
            transition: background-color 0.3s ease;
          }
          .tag.featured:hover {
            background: #fef08a;
          }
          .tag.new:hover {
            background: #bfdbfe;
          }
          .content-wrapper {
            padding: 16px;
            background: transparent;
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
          .btn-secondary {
            padding: 8px 24px;
            border-radius: 12px;
            background: #f3f4f6;
            transition: background-color 0.3s ease, transform 0.3s ease;
            width: 100%;
          }
          .btn-secondary:hover {
            background: #e0e7ff;
            transform: translateY(-1px);
          }
          .swiper-btn {
            background: linear-gradient(135deg, #1f2937, #4b5563);
            color: white;
            padding: 12px 24px;
            border-radius: 12px;
            font-size: 14px;
            font-weight: 500;
            transition: background 0.3s ease, transform 0.3s ease;
          }
          .swiper-btn:hover {
            background: linear-gradient(135deg, #4b5563, #9ca3af);
            transform: translateY(-1px);
          }
          .why-choose-us-card {
            border: 1px solid #e5e7eb;
            border-radius: 24px;
            background: white;
            transition: background-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease;
          }
          .why-choose-us-card:hover {
            background: #f9fafb;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
            transform: translateY(-6px);
          }
          .why-choose-us-image {
            position: relative;
            height: 200px;
            background: linear-gradient(135deg, #111827, #374151);
            border-radius: 24px 24px 0 0;
          }
          .trust-badge {
            display: inline-block;
            padding: 4px 12px;
            border-radius: 9999px;
            font-size: 11px;
            font-weight: 600;
            background: #fef9c3;
            color: #713f12;
            position: relative;
            transition: background-color 0.3s ease;
          }
          .trust-badge:hover {
            background: #fef08a;
          }
          .trust-badge:hover .tooltip {
            opacity: 1;
          }
          .tooltip {
            position: absolute;
            top: -30px;
            left: 50%;
            transform: translateX(-50%);
            background: #1f2937;
            color: white;
            padding: 4px 8px;
            border-radius: 8px;
            font-size: 10px;
            opacity: 0;
            transition: opacity 0.3s ease;
            pointer-events: none;
            white-space: nowrap;
          }
          .learn-more-btn {
            background: linear-gradient(135deg, #1f2937, #4b5563);
            color: white;
            padding: 8px 16px;
            border-radius: 12px;
            font-size: 14px;
            font-weight: 500;
            transition: background 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
            width: 100%;
          }
          .learn-more-btn:hover {
            background: linear-gradient(135deg, #1f2937, #6b7280);
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          }
          .testimonial-card {
            background: white;
            border: 1px solid #e5e7eb;
            border-radius: 20px;
            transition: background-color 0.3s ease, box-shadow 0.3s ease;
          }
          .testimonial-card:hover {
            background: #f9fafb;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          }
          .modal-container {
            border-radius: 20px;
            border: 1px solid #e5e7eb;
          }
          .modal-button {
            background: #f3f4f6;
            padding: 8px 16px;
            border-radius: 12px;
            transition: background-color 0.3s ease, transform 0.3s ease;
          }
          .modal-button:hover {
            background: #e0e7ff;
            transform: translateY(-1px);
          }
        `}
      </style>

      {/* Property Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-12">
        {properties.map((property, index) => (
          <div
            key={index}
            className="card-container animate-slideUp"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="image-wrapper">
              <img
                src={property.image_url}
                alt={property.title}
                className="w-full h-full object-cover"
              />
              <span
                className={`tag ${
                  property.featured.toLowerCase() === "featured"
                    ? "text-gray-900 bg-yellow-200 featured"
                    : "text-blue-900 bg-blue-100 new"
                }`}
              >
                {property.featured.toLowerCase() === "featured" ? "Featured" : "New"}
              </span>
            </div>
            <div className="content-wrapper space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 line-clamp-1" title={property.title}>
                  {property.title}
                </h3>
                <p className="text-sm text-gray-600 mt-1">{property.location}</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">₹{property.price}</p>
                <p className="text-xs text-gray-500">Price negotiable</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-xs flex items-center">
                  <span className="mr-1">🏠</span> {property.sqft} sqft
                </span>
                <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-xs flex items-center">
                  <span className="mr-1">🛏️</span> {property.beds} Beds
                </span>
                <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-xs flex items-center">
                  <span className="mr-1">🛁</span> {property.baths} Baths
                </span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                <div className="flex items-center">
                  <FaStar className="text-yellow-400 mr-1" />
                  <span className="text-sm font-medium text-gray-900">{property.rating}</span>
                  <span className="text-xs text-gray-500 ml-1">({property.reviews})</span>
                </div>
              </div>
              <div className="space-y-2">
                <button
                  className="btn-secondary flex items-center justify-center gap-2"
                  aria-label="Bookmark property"
                  title="Save to favorites"
                >
                  <FaBookmark className="text-gray-600 text-base" />
                  <span>Bookmark</span>
                </button>
                <Link to="/home1" className="block">
                  <button
                    className="btn-primary"
                    aria-label="View property details"
                  >
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Why Choose Us Section */}
      <div className="bg-gray-50 py-16 px-6 mb-12">
        <motion.h2
          className="text-4xl font-bold text-gray-900 text-center mb-4 animate-slideUp"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          Why Choose MyBrand?
        </motion.h2>
        <motion.p
          className="text-lg text-gray-600 text-center max-w-2xl mx-auto mb-12 animate-slideUp"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        >
          Find your dream home with our trusted expertise and seamless service.
        </motion.p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 max-w-6xl mx-auto">
          {[
            {
              icon: <FaHandshake className="text-3xl text-gray-900" />,
              title: "Trusted Partners",
              desc: "We work with top real estate firms for exceptional deals.",
              image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop",
              stat: "100+ Partners",
              trust: "Certified by NREA",
              alt: "Handshake representing trusted partnerships",
            },
            {
              icon: <FaCheckCircle className="text-3xl text-gray-900" />,
              title: "Verified Listings",
              desc: "Every property is vetted for quality and authenticity.",
              image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070&auto=format&fit=crop",
              stat: "1M+ Listings",
              trust: "99.9% Verified",
              alt: "Modern property showcasing verified listings",
            },
            {
              icon: <FaUsers className="text-3xl text-gray-900" />,
              title: "Happy Customers",
              desc: "Thousands trust us to find their perfect home.",
              image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop",
              stat: "500K+ Clients",
              trust: "4.8/5 Rating",
              alt: "Group of happy customers",
            },
            {
              icon: <FaHeadset className="text-3xl text-gray-900" />,
              title: "24/7 Support",
              desc: "Our team is available anytime to assist you.",
              image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
              stat: "24/7 Access",
              trust: "Award-Winning Team",
              alt: "Professional support team assisting clients",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              className="why-choose-us-card animate-slideUp"
              style={{ animationDelay: `${index * 0.1}s` }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
              whileHover={{ scale: 1.02 }}
              aria-label={`Why choose us: ${item.title}`}
            >
              <div className="why-choose-us-image">
                <img
                  src={item.image}
                  alt={item.alt}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                  {item.icon}
                </div>
              </div>
              <div className="content-wrapper space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{item.desc}</p>
                </div>
                <div>
                  <p className="text-lg font-semibold text-gray-900">{item.stat}</p>
                  <div className="relative inline-block mt-2">
                    <span className="trust-badge">{item.trust}</span>
                    <span className="tooltip">{item.trust} Details</span>
                  </div>
                </div>
                <Link to="/about" className="block">
                  <motion.button
                    className="learn-more-btn"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={`Learn more about ${item.title}`}
                  >
                    Learn More
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
        <motion.div
          className="max-w-4xl mx-auto mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="text-2xl font-semibold text-gray-900 text-center mb-8">What Our Clients Say</h3>
          <Swiper
            modules={[Pagination]}
            pagination={{ clickable: true }}
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="pb-12"
          >
            {[
              {
                quote: "MyBrand made our home search effortless and enjoyable!",
                author: "Priya Sharma, Mumbai",
                rating: 5,
              },
              {
                quote: "Exceptional support, always there when we needed them.",
                author: "Rahul Verma, Delhi",
                rating: 4.8,
              },
              {
                quote: "Trusted listings gave us confidence in our choice.",
                author: "Anita Rao, Bangalore",
                rating: 4.9,
              },
            ].map((testimonial, index) => (
              <SwiperSlide key={index}>
                <motion.div
                  className="testimonial-card p-6 text-center"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="flex justify-center mb-3">
                    {[...Array(Math.floor(testimonial.rating))].map((_, i) => (
                      <FaStar key={i} className="text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 italic mb-4">"{testimonial.quote}"</p>
                  <p className="text-xs font-medium text-gray-900">{testimonial.author}</p>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
        <motion.div
          className="text-center mt-12 animate-slideUp"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <p className="text-sm text-gray-600 italic">
            "Trusted by homeowners for quality and reliability."
          </p>
          <p className="text-xs text-gray-500 mt-2">
            – Certified Real Estate Excellence 2024
          </p>
        </motion.div>
      </div>

      {/* Recently Viewed Section */}
      <div className="py-12 px-6">
        <h2 className="text-3xl font-semibold text-gray-900 mb-8 animate-slideUp">
          Recently Viewed Properties
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {properties.slice(0, 4).map((property, index) => (
            <div
              key={index}
              className="card-container animate-slideUp"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="image-wrapper">
                <img
                  src={property.image_url}
                  alt={property.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="content-wrapper space-y-2">
                <h3 className="text-base font-medium text-gray-900">{property.title}</h3>
                <p className="text-sm text-gray-600">{property.location}</p>
                <p className="text-base font-semibold text-gray-900">₹{property.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Location Change Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900/50 flex justify-center items-center z-50 animate-fadeIn">
          <div className="bg-white modal-container p-6 w-full max-w-md relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 transition-colors duration-300"
            >
              <FaTimes className="text-lg" />
            </button>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Change Location</h3>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              <option value="">Select a location</option>
              {suggestedCities.map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
            <button
              onClick={applyLocationChange}
              className="w-full btn-primary py-3"
            >
              Apply Change
            </button>
            <div className="mt-6">
              <h4 className="text-base font-medium text-gray-900 mb-2">Suggested Cities</h4>
              <div className="grid grid-cols-2 gap-2">
                {suggestedCities.map((city) => (
                  <button
                    key={city}
                    onClick={() => handleLocationChange(city)}
                    className="modal-button text-gray-700 rounded-lg text-sm"
                  >
                    {city}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyList;