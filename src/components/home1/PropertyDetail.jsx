import React, { useState } from "react";
import { FaArrowLeft, FaMapMarkerAlt, FaPhone, FaEnvelope, FaStar, FaHeart } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Autoplay } from "swiper/modules";

const PropertyDetail = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const property = {
    title: "Skyline Penthouse Retreat",
    price: "$1,250,000",
    location: "432 Park Avenue, Manhattan, NY",
    size: "2,800 sqft",
    bedrooms: 4,
    bathrooms: 3.5,
    type: "Penthouse",
    yearBuilt: 2021,
    status: "Available",
    images: [
      "/Images/2.jpg",
      "/Images/3.jpg",
      "/Images/2.jpg",
      "/Images/3.jpg",
    ],
    amenities: [
      "🏊 Infinity Pool",
      "💪 Private Gym",
      "🍸 Rooftop Lounge",
      "🔒 Concierge Security",
      "📹 4K Surveillance",
      "🌿 Sky Garden",
      "🚗 Valet Parking",
      "🏠 Home Automation",
      "🔊 Surround Sound",
      "🌅 Panoramic Views",
    ],
    description:
      "Perched atop one of Manhattan’s most iconic towers, this 4-bedroom penthouse redefines luxury living. Floor-to-ceiling windows frame jaw-dropping 360-degree views of the NYC skyline, while the open-concept design flows seamlessly into a chef’s kitchen with top-tier appliances. Unwind in the spa-inspired master suite or entertain on your private rooftop terrace. This is more than a home—it’s a lifestyle.",
    rating: 4.9,
    reviews: 87,
  };

  return (
    <div className="min-h-screen  text-gray-900 pt-0 pb-24">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between mb-12">
          <button
            className="flex items-center text-gray-600 hover:text-blue-600 transition-all duration-300 group"
            onClick={() => window.history.back()}
          >
            <FaArrowLeft className="text-xl mr-3 group-hover:-translate-x-2 transition-transform" />
            <span className="text-xl font-semibold tracking-wide">Back to Listings</span>
          </button>
          <button
            className={`p-3 rounded-full ${isFavorite ? "bg-red-500" : "bg-gray-200"} hover:bg-red-400 transition-all duration-300`}
            onClick={() => setIsFavorite(!isFavorite)}
          >
            <FaHeart className={`text-xl ${isFavorite ? "text-white" : "text-gray-600"}`} />
          </button>
        </div>

        {/* Image Carousel */}
        <Swiper
          modules={[Pagination, Navigation, Autoplay]}
          pagination={{ clickable: true }}
          navigation
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          className="rounded-3xl overflow-hidden shadow-lg mb-12"
        >
          {property.images.map((img, index) => (
            <SwiperSlide key={index}>
              <div className="relative h-[600px]">
                <img
                  src={img}
                  alt={`Penthouse View ${index + 1}`}
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 to-transparent"></div>
                <span className="absolute top-6 left-6 bg-blue-500 text-white px-4 py-2 rounded-full font-bold text-sm uppercase tracking-wider">
                  Premium Listing
                </span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Property Title & Rating */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-12">
          <div>
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight leading-tight text-gray-800">
              {property.title}
            </h1>
            <div className="flex items-center mt-4 text-gray-600">
              <FaMapMarkerAlt className="mr-2 text-xl" />
              <p className="text-lg font-medium">
                {isLoggedIn ? property.location : "Location Hidden - Login to Reveal"}
              </p>
            </div>
          </div>
          <div className="flex items-center mt-6 md:mt-0 bg-white p-4 rounded-xl shadow-sm border border-gray-200">
            <FaStar className="text-yellow-500 text-2xl mr-2" />
            <span className="text-xl font-bold text-gray-800">{property.rating}</span>
            <span className="text-gray-500 ml-2">({property.reviews} Reviews)</span>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {[
            { label: "Price", value: isLoggedIn ? property.price : "Login to View" },
            { label: "Size", value: property.size },
            { label: "Bedrooms", value: property.bedrooms },
            { label: "Bathrooms", value: property.bathrooms },
            { label: "Type", value: property.type },
            { label: "Status", value: property.status },
            { label: "Built", value: property.yearBuilt },
            { label: "Views", value: "Panoramic" },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl text-center shadow-md border border-gray-100 hover:border-blue-400 transition-all duration-300"
            >
              <p className="text-sm uppercase text-gray-500 font-semibold tracking-wider">{stat.label}</p>
              <p className="text-2xl font-bold mt-2 text-gray-800">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Description */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold mb-6 tracking-wide text-gray-800">The Experience</h2>
          <p className="text-lg text-gray-600 leading-relaxed max-w-4xl">
            {property.description}
          </p>
        </div>

        {/* Amenities */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold mb-8 tracking-wide text-gray-800">Luxury Amenities</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {property.amenities.map((amenity, index) => (
              <div
                key={index}
                className="flex items-center bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
              >
                <span className="text-2xl mr-4">{amenity.split(" ")[0]}</span>
                <span className="font-medium text-gray-700">{amenity.split(" ").slice(1).join(" ")}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Plans */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold mb-8 tracking-wide text-gray-800">Investment Options</h2>
          <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-100">
            {isLoggedIn ? (
              <div className="space-y-6 text-lg text-gray-600">
                <p>Secure your piece of Manhattan with these tailored plans:</p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <li className="bg-gray-50 p-4 rounded-lg">40% Down + 60% Financing</li>
                  <li className="bg-gray-50 p-4 rounded-lg">25% Initial + 36 Payments</li>
                  <li className="bg-gray-50 p-4 rounded-lg">Cash Purchase: 8% Discount</li>
                  <li className="bg-gray-50 p-4 rounded-lg">Custom Plans Available</li>
                </ul>
                <button className="mt-4 bg-blue-500 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-600 transition-all duration-300">
                  Contact for Details
                </button>
              </div>
            ) : (
              <p className="text-lg text-gray-600">
                Unlock exclusive payment plans by logging in.
                <button
                  className="ml-4 text-blue-500 hover:text-blue-600 underline font-semibold"
                  onClick={() => setIsLoggedIn(true)}
                >
                  Login Now
                </button>
              </p>
            )}
          </div>
        </div>

        {/* Owner Contact */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold mb-8 tracking-wide text-gray-800">Meet Your Host</h2>
          <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-100 flex flex-col md:flex-row items-center justify-between">
            {isLoggedIn ? (
              <>
                <div className="flex items-center mb-6 md:mb-0">
                  <img
                    src="/Images/1.png"
                    alt="Owner"
                    className="w-20 h-20 rounded-full mr-6 object-cover border-2 border-blue-200"
                  />
                  <div>
                    <p className="text-xl font-semibold text-gray-800">Alexandra Knight</p>
                    <p className="text-gray-600 flex items-center mt-2">
                      <FaPhone className="mr-2 text-blue-500" /> (212) 555-7890
                    </p>
                    <p className="text-gray-600 flex items-center mt-1">
                      <FaEnvelope className="mr-2 text-blue-500" /> alex@knightestates.com
                    </p>
                  </div>
                </div>
                <button className="bg-blue-500 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-600 transition-all duration-300">
                  Message Host
                </button>
              </>
            ) : (
              <p className="text-lg text-gray-600">
                Login to connect with the property owner.
                <button
                  className="ml-4 text-blue-500 hover:text-blue-600 underline font-semibold"
                  onClick={() => setIsLoggedIn(true)}
                >
                  Login Now
                </button>
              </p>
            )}
          </div>
        </div>

        {/* Contact Form */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold mb-8 tracking-wide text-gray-800">Get in Touch</h2>
          <form className="bg-white p-8 rounded-2xl shadow-md border border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 placeholder-gray-400 transition-all duration-300"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 placeholder-gray-400 transition-all duration-300"
            />
            <textarea
              placeholder="Your Message"
              className="w-full md:col-span-2 p-4 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 placeholder-gray-400 transition-all duration-300"
              rows="6"
            />
            <button
              type="submit"
              className="md:col-span-2 bg-blue-500 text-white py-4 rounded-lg font-bold text-lg hover:bg-blue-600 transition-all duration-300"
            >
              Send Inquiry
            </button>
          </form>
        </div>

        {/* Map */}
        <div>
          <h2 className="text-4xl font-bold mb-8 tracking-wide text-gray-800">Prime Location</h2>
          <div className="bg-white rounded-3xl overflow-hidden shadow-md border border-gray-100">
            {isLoggedIn ? (
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.241263 Frauen499885!2d-73.98784368459392!3d40.74944097932847!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a4051f7d!2s432%20Park%20Ave%2C%20New%20York%2C%20NY%2010022%2C%20USA!5e0!3m2!1sen!2sus!4v1635781234567!5m2!1sen!2sus"
                width="100%"
                height="500"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              />
            ) : (
              <div className="p-12 text-center bg-gray-50">
                <p className="text-2xl text-gray-600 mb-6">Unlock the Exact Location</p>
                <button
                  className="bg-blue-500 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-600 transition-all duration-300"
                  onClick={() => setIsLoggedIn(true)}
                >
                  Login / Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;