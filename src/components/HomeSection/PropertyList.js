import React, { useState, useEffect } from "react";
import { FaBookmark, FaStar, FaTimes } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Link } from "react-router-dom";

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
    <div className="w-full px-4 sm:px-6 md:px-8 lg:px-4 py-10 sm:py-8">
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
            border-radius: 16px;
            overflow: hidden;
            background: white;
            transition: box-shadow 0.3s ease, transform 0.3s ease;
          }
          .card-container:hover {
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
            transform: translateY(-6px);
          }
          .image-wrapper {
            position: relative;
            height: 260px;
          }
          @media (max-width: 640px) {
            .image-wrapper {
              height: 200px;
            }
          }
          .tag {
            position: absolute;
            top: 12px;
            left: 12px;
            padding: 4px 12px;
            border-radius: 9999px;
            font-size: 11px;
            font-weight: 600;
          }
          .btn-primary {
            background: linear-gradient(135deg, #1f2937, #4b5563);
            color: white;
            padding: 8px 16px;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 500;
            transition: all 0.3s ease;
            width: 100%;
          }
          .btn-primary:hover {
            background: linear-gradient(135deg, #374151, #6b7280);
            transform: translateY(-1px);
          }
          .btn-secondary {
            padding: 8px 24px;
            border-radius: 8px;
            background: #f3f4f6;
            transition: all 0.3s ease;
            width: 100%;
          }
          .btn-secondary:hover {
            background: #e5e7eb;
            transform: translateY(-1px);
          }
          .swiper-btn {
            background: linear-gradient(135deg, #1f2937, #4b5563);
            color: white;
            padding: 12px 24px;
            border-radius: 9999px;
            font-size: 14px;
            font-weight: 500;
            transition: all 0.3s ease;
          }
          .swiper-btn:hover {
            background: linear-gradient(135deg, #374151, #6b7280);
          }
        `}
      </style>

      {/* Title Section */}
      <div className="border-l-4 border-black pl-4 mb-8">
        <h2 className="text-lg sm:text-lg md:text-3xl lg:text-3xl font-bold">Best Homes in Your Area</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="text-gray-500 text-xs sm:text-xs md:text-xs lg:text-sm mt-1 hover:text-blue-600 transition-colors duration-300"
        >
          Change your set location {selectedLocation && <span className="font-bold">. {selectedLocation.toUpperCase()}</span>}
        </button>
      </div>

      {/* Featured Properties Carousel */}
      <Swiper
        pagination={{ dynamicBullets: true }}
        modules={[Pagination]}
        className="mb-12"
      >
        {properties
          .filter((property) => property.featured.toLowerCase() === "featured")
          .map((property, index) => (
            <SwiperSlide key={index}>
              <div className="relative h-96 rounded-lg overflow-hidden animate-fadeIn">
                <img
                  src={property.image_url}
                  alt={property.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl sm:text-xl md:text-xl lg:text-2xl font-semibold">{property.title}</h3>
                  <p className="text-xs sm:text-xs md:text-xs lg:text-sm opacity-80">{property.location}</p>
                  <button className="mt-4 text-xs sm:text-xs md:text-xs lg:text-sm swiper-btn">View Details</button>
                </div>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>

      {/* Property Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {properties.map((property, index) => (
          <div
            key={index}
            className="card-container animate-slideUp"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {/* Image Section */}
            <div className="image-wrapper">
              <img
                src={property.image_url}
                alt={property.title}
                className="w-full h-full object-cover"
              />
              <span
                className={`tag ${
                  property.featured.toLowerCase() === "featured"
                    ? "text-gray-900 bg-yellow-200"
                    : "text-blue-900 bg-blue-100"
                }`}
              >
                {property.featured.toLowerCase() === "featured" ? "Featured" : "New"}
              </span>
            </div>

            {/* Content Section */}
            <div className="content-wrapper px-5 py-5 space-y-4">
              {/* Title and Rating */}
              <div className="flex justify-between items-center">
                <h3
                  className="text-base sm:text-base md:text-base lg:text-lg font-semibold text-gray-900 line-clamp-1"
                  title={property.title}
                >
                  {property.title}
                </h3>
                <div className="flex items-center">
                  <FaStar className="text-yellow-400 mr-1" />
                  <span className="text-xs sm:text-xs md:text-xs lg:text-sm font-medium text-gray-900">{property.rating}</span>
                  <span className="text-[10px] sm:text-[10px] md:text-[10px] lg:text-xs text-gray-500 ml-1">({property.reviews})</span>
                </div>
              </div>

              {/* Location */}
              <p className="text-xs sm:text-xs md:text-xs lg:text-sm text-gray-600 mt-1">{property.location}</p>

              {/* Price and Property Details */}
              <div className="flex justify-between items-start flex-wrap gap-2">
                <div>
                  <p className="text-lg sm:text-lg md:text-xl lg:text-2xl font-bold text-gray-900">₹{property.price}</p>
                  <p className="text-[10px] sm:text-[10px] md:text-[10px] lg:text-xs text-gray-500">Price negotiable</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-[10px] sm:text-[10px] md:text-[10px] lg:text-xs flex items-center">
                      <span className="mr-1">🏠</span> {property.sqft} sqft
                    </span>
                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-[10px] sm:text-[10px] md:text-[10px] lg:text-xs flex items-center">
                      <span className="mr-1">🛏️</span> {property.beds} Beds
                    </span>
                  </div>
                  <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-[10px] sm:text-[10px] md:text-[10px] lg:text-xs flex items-center">
                    <span className="mr-1">🛁</span> {property.baths} Baths
                  </span>
                </div>
              </div>

              {/* Actions */}
              
              <div className="space-y-2">
                <button
                  className="btn-secondary flex items-center justify-center gap-2"
                  aria-label="Bookmark property"
                  title="Save to favorites"
                >
                  <FaBookmark className="text-gray-600  text-xs sm:text-xs md:text-sm lg:text-base" />
                  <span className="text-sm hidden md:inline lg:text-sm">Bookmark</span>
                </button>
                <Link to="/home1" className="block">
                  <button
                    className="btn-primary btn-primary w-full h-full text-xs sm:text-xs sm:p-2 md:text-xs lg:text-sm"
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
      <div className="bg-gray-100 py-10 sm:py-8 px-4 sm:px-6 md:px-8 rounded-lg mb-12">
        <h2 className="text-3xl sm:text-2xl md:text-2xl lg:text-3xl font-semibold text-gray-900 text-center mb-8 animate-slideUp">
          Why Choose Us?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {[
            { stat: "100+", title: "Trusted Partners", desc: "Top industry collaborators" },
            { stat: "1M+", title: "Verified Listings", desc: "Carefully vetted properties" },
            { stat: "500K+", title: "Happy Customers", desc: "Satisfied homeowners" },
            { stat: "24/7", title: "Support Team", desc: "Always available assistance" },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg border border-gray-200 text-center animate-slideUp"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <p className="text-4xl sm:text-3xl md:text-3xl lg:text-4xl font-semibold text-gray-900">{item.stat}</p>
              <h3 className="text-lg sm:text-base md:text-base lg:text-lg font-medium text-gray-900 mt-2">{item.title}</h3>
              <p className="text-sm sm:text-xs md:text-xs lg:text-sm text-gray-600 mt-1">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-10 sm:py-8 px-4 sm:px-6 md:px-8">
        <h2 className="text-3xl sm:text-2xl md:text-2xl lg:text-3xl font-semibold text-gray-900 text-center mb-8 animate-slideUp">
          Customer Testimonials
        </h2>
        <Swiper
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          pagination={{ clickable: true }}
          modules={[Pagination]}
        >
          {[
            { name: "John Doe", location: "Mumbai", text: "The easiest home-buying experience I've ever had." },
            { name: "Jane Smith", location: "Bangalore", text: "Amazing platform! Found my perfect home quickly." },
            { name: "Rahul Sharma", location: "Delhi", text: "Impressive selection and outstanding service." },
          ].map((testimonial, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white p-6 rounded-lg border border-gray-200 h-full animate-fadeIn">
                <div className="flex items-center mb-4">
                  <img
                    src="https://via.placeholder.com/40"
                    alt={testimonial.name}
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <div>
                    <h3 className="text-base sm:text-sm md:text-sm lg:text-base font-medium text-gray-900">{testimonial.name}</h3>
                    <p className="text-sm sm:text-xs md:text-xs lg:text-sm text-gray-600">{testimonial.location}</p>
                  </div>
                </div>
                <p className="text-gray-700 text-sm sm:text-xs md:text-xs lg:text-sm">{testimonial.text}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* CTA Banner */}
      <div className="bg-gradient-to-r from-gray-900 to-black py-10 sm:py-8 px-4 sm:px-6 md:px-8 rounded-lg text-center mb-12 animate-slideUp">
        <h2 className="text-3xl sm:text-2xl md:text-2xl lg:text-3xl font-semibold text-white mb-4">Ready to Find Your Perfect Home?</h2>
        <p className="text-gray-300 max-w-lg mx-auto mb-6 text-sm sm:text-xs md:text-xs lg:text-sm">
          Discover thousands of verified properties and start your journey today.
        </p>
        <button className="btn-primary px-8 py-3 text-sm sm:text-xs md:text-xs lg:text-sm">Get Started Now</button>
      </div>

      {/* Recently Viewed Section */}
      <div className="py-10 sm:py-8 px-4 sm:px-6 md:px-8">
        <h2 className="text-3xl sm:text-2xl md:text-2xl lg:text-3xl font-semibold text-gray-900 mb-8 animate-slideUp">
          Recently Viewed Properties
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
                <h3 className="text-base sm:text-sm md:text-sm lg:text-base font-medium text-gray-900">{property.title}</h3>
                <p className="text-sm sm:text-xs md:text-xs lg:text-sm text-gray-600">{property.location}</p>
                <p className="text-base sm:text-sm md:text-sm lg:text-base font-semibold text-gray-900">₹{property.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Location Change Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900/50 flex justify-center items-center z-50 animate-fadeIn">
          <div className="bg-white rounded-lg p-6 w-full max-w-md relative border border-gray-200">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 transition-colors duration-300"
            >
              <FaTimes className="text-lg sm:text-base md:text-base lg:text-lg" />
            </button>
            <h3 className="text-lg sm:text-base md:text-base lg:text-lg font-medium text-gray-900 mb-4">Change Location</h3>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-gray-300 text-sm sm:text-xs md:text-xs lg:text-sm"
            >
              <option value="">Select a location</option>
              {suggestedCities.map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
            <button
              onClick={applyLocationChange}
              className="w-full btn-primary py-3 text-sm sm:text-xs md:text-xs lg:text-sm"
            >
              Apply Change
            </button>
            <div className="mt-6">
              <h4 className="text-base sm:text-sm md:text-sm lg:text-base font-medium text-gray-900 mb-2">Suggested Cities</h4>
              <div className="grid grid-cols-2 gap-2">
                {suggestedCities.map((city) => (
                  <button
                    key={city}
                    onClick={() => handleLocationChange(city)}
                    className="p-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-300 text-sm sm:text-xs md:text-xs lg:text-sm"
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