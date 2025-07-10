import React, { useState, useEffect } from "react";
import { FaEdit, FaSave, FaTimes, FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaBookmark, FaStar, FaHistory, FaSignOutAlt, FaCog, FaLock, FaBell, FaTrash } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Link } from "react-router-dom";

const Profile = () => {
  // State for user data
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+91 9876543210",
    location: "Mumbai",
    bio: "Passionate about finding the perfect home. Experienced in real estate investments and property management.",
    profilePicture: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    joinedDate: "January 2023",
  });

  // State for form data when editing
  const [formData, setFormData] = useState(user);
  const [isEditing, setIsEditing] = useState(false);

  // State for properties
  const [savedProperties, setSavedProperties] = useState([]);
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  // State for modals
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("profile");

  // State for notifications
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
  });

  // Simulated fetch for user data and properties
  useEffect(() => {
    // Fetch user profile
    const fetchUserProfile = async () => {
      try {
        const response = await fetch("https://realestate-3rel.onrender.com/user/profile");
        if (!response.ok) throw new Error("Failed to fetch user profile");
        const data = await response.json();
        setUser(data);
        setFormData(data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    // Fetch saved properties
    const fetchSavedProperties = async () => {
      try {
        const response = await fetch("https://realestate-3rel.onrender.com/user/saved-properties");
        if (!response.ok) throw new Error("Failed to fetch saved properties");
        const data = await response.json();
        setSavedProperties(data);
      } catch (error) {
        console.error("Error fetching saved properties:", error);
      }
    };

    // Fetch recently viewed properties
    const fetchRecentlyViewed = async () => {
      try {
        const response = await fetch("https://realestate-3rel.onrender.com/user/recently-viewed");
        if (!response.ok) throw new Error("Failed to fetch recently viewed properties");
        const data = await response.json();
        setRecentlyViewed(data);
      } catch (error) {
        console.error("Error fetching recently viewed properties:", error);
      }
    };

    fetchUserProfile();
    fetchSavedProperties();
    fetchRecentlyViewed();
  }, []);

  // Handle input changes for form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle notification settings change
  const handleNotificationChange = (e) => {
    const { name, checked } = e.target;
    setNotifications({ ...notifications, [name]: checked });
  };

  // Save profile changes
  const handleSaveProfile = async () => {
    try {
      const response = await fetch("https://realestate-3rel.onrender.com/user/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error("Failed to save profile");
      setUser(formData);
      setIsEditing(false);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  };

  // Open modal with specific content
  const handleModalOpen = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  // Close modal
  const handleModalClose = () => {
    setIsModalOpen(false);
    setFormData(user); // Reset form data
  };

  // Handle logout
  const handleLogout = () => {
    // Implement logout logic (e.g., clear tokens, redirect)
    console.log("User logged out");
  };

  // Handle account deletion
  const handleDeleteAccount = async () => {
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      try {
        const response = await fetch("https://realestate-3rel.onrender.com/user/profile", {
          method: "DELETE",
        });
        if (!response.ok) throw new Error("Failed to delete account");
        handleLogout();
      } catch (error) {
        console.error("Error deleting account:", error);
      }
    }
  };

  // Simulated saved properties data
  const sampleSavedProperties = [
    {
      id: 1,
      title: "Luxury Villa in Bandra",
      location: "Mumbai",
      price: "5.5Cr",
      image_url: "https://images.unsplash.com/photo-1577495508326-19a1b3cf65b7?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      rating: 4.8,
      reviews: 120,
      sqft: 2500,
      beds: 4,
      baths: 3,
    },
    {
      id: 2,
      title: "Modern Apartment in Powai",
      location: "Mumbai",
      price: "2.3Cr",
      image_url: "https://images.unsplash.com/photo-1505843513577-22bb7d21e455?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      rating: 4.5,
      reviews: 85,
      sqft: 1800,
      beds: 3,
      baths: 2,
    },
  ];

  // Simulated recently viewed properties data
  const sampleRecentlyViewed = [
    {
      id: 3,
      title: "Cozy Flat in Andheri",
      location: "Mumbai",
      price: "1.8Cr",
      image_url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      rating: 4.2,
      reviews: 60,
      sqft: 1500,
      beds: 2,
      baths: 2,
    },
    {
      id: 4,
      title: "Spacious Bungalow in Juhu",
      location: "Mumbai",
      price: "7.2Cr",
      image_url: "https://plus.unsplash.com/premium_photo-1661954372617-15780178eb2e?q=80&w=2060&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      rating: 4.9,
      reviews: 150,
      sqft: 3500,
      beds: 5,
      baths: 4,
    },
  ];

  return (
    <div className="w-full px-6 py-12 bg-gray-50 min-h-screen">
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
            background: linear-gradient(135deg, #111827, #374151);
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
          .content-wrapper {
            padding: 16px;
            background: white;
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
          .profile-picture {
            border: 4px solid white;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s ease;
          }
          .profile-picture:hover {
            transform: scale(1.05);
          }
          .sidebar {
            border-right: 1px solid #e5e7eb;
            background: white;
            border-radius: 12px;
            overflow: hidden;
          }
          .sidebar-item {
            padding: 12px 16px;
            transition: background 0.3s ease, color 0.3s ease;
            display: flex;
            align-items: center;
            gap: 8px;
          }
          .sidebar-item:hover {
            background: #f3f4f6;
            color: #2563eb;
          }
          .modal-overlay {
            background: rgba(0, 0, 0, 0.5);
            backdrop-filter: blur(4px);
          }
          .input-field {
            transition: border-color 0.3s ease, box-shadow 0.3s ease;
          }
          .input-field:focus {
            border-color: #2563eb;
            box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
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

      {/* Main Layout */}
      <div className="w-full px-40 my-20 text-black mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1 sidebar animate-slideUp">
          <div className="p-6 border-b border-gray-200 text-center">
          <img
              src={user.profilePicture}
              alt={user.name}
              className="w-32 rounded-full mx-auto profile-picture aspect-square object-cover"
            />
            <h3 className="text-xl font-semibold text-gray-900 mt-4">{user.name}</h3>
            <p className="text-sm text-gray-600">{user.location}</p>
            <p className="text-xs text-gray-500 mt-1">Joined {user.joinedDate}</p>
          </div>
          <div className="py-4">
            <button
              onClick={() => handleModalOpen("profile")}
              className="sidebar-item w-full text-left"
            >
              <FaUser className="text-gray-600" />
              <span>Profile Details</span>
            </button>
            <button
              onClick={() => handleModalOpen("saved")}
              className="sidebar-item w-full text-left"
            >
              <FaBookmark className="text-gray-600" />
              <span>Saved Properties</span>
            </button>
            <button
              onClick={() => handleModalOpen("history")}
              className="sidebar-item w-full text-left"
            >
              <FaHistory className="text-gray-600" />
              <span>Viewing History</span>
            </button>
            <button
              onClick={() => handleModalOpen("settings")}
              className="sidebar-item w-full text-left"
            >
              <FaCog className="text-gray-600" />
              <span>Account Settings</span>
            </button>
            <button
              onClick={handleLogout}
              className="sidebar-item w-full text-left text-red-600"
            >
              <FaSignOutAlt />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-12">
          {/* Profile Overview */}
          <div className="card-container animate-slideUp">
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-semibold text-gray-900">Profile Overview</h2>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="btn-secondary flex items-center gap-2"
                  aria-label={isEditing ? "Cancel editing" : "Edit profile"}
                >
                  {isEditing ? <FaTimes /> : <FaEdit />}
                  <span>{isEditing ? "Cancel" : "Edit"}</span>
                </button>
              </div>
              {isEditing ? (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-200 rounded-lg input-field"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-200 rounded-lg input-field"
                      placeholder="Enter your email"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-200 rounded-lg input-field"
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Location</label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-200 rounded-lg input-field"
                      placeholder="Enter your location"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Bio</label>
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-200 rounded-lg input-field"
                      rows="5"
                      placeholder="Tell us about yourself"
                    ></textarea>
                  </div>
                  <button
                    onClick={handleSaveProfile}
                    className="btn-primary flex items-center gap-2 justify-center"
                    aria-label="Save profile changes"
                  >
                    <FaSave />
                    <span>Save Changes</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <FaUser className="text-gray-600 text-xl" />
                    <div>
                      <p className="text-sm text-gray-600">Full Name</p>
                      <p className="text-lg font-medium text-gray-900">{user.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <FaEnvelope className="text-gray-600 text-xl" />
                    <div>
                      <p className="text-sm text-gray-600">Email Address</p>
                      <p className="text-lg font-medium text-gray-900">{user.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <FaPhone className="text-gray-600 text-xl" />
                    <div>
                      <p className="text-sm text-gray-600">Phone Number</p>
                      <p className="text-lg font-medium text-gray-900">{user.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <FaMapMarkerAlt className="text-gray-600 text-xl" />
                    <div>
                      <p className="text-sm text-gray-600">Location</p>
                      <p className="text-lg font-medium text-gray-900">{user.location}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Bio</p>
                    <p className="text-lg font-medium text-gray-900">{user.bio}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Joined</p>
                    <p className="text-lg font-medium text-gray-900">{user.joinedDate}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Saved Properties Carousel */}
          <div className="card-container animate-slideUp">
            <div className="p-8">
              <h2 className="text-3xl font-semibold text-gray-900 mb-6">Saved Properties</h2>
              <Swiper
                spaceBetween={20}
                slidesPerView={1}
                breakpoints={{
                  640: { slidesPerView: 2 },
                  1024: { slidesPerView: 3 },
                }}
                pagination={{ clickable: true }}
                modules={[Pagination]}
                className="mb-6"
              >
                {(savedProperties.length > 0 ? savedProperties : sampleSavedProperties).map((property, index) => (
                  <SwiperSlide key={index}>
                    <div className="card-container">
                      <div className="image-wrapper">
                        <img
                          src={property.image_url}
                          alt={property.title}
                          className="w-full h-full object-cover"
                        />
                        <span className="tag text-gray-900 bg-yellow-200">Saved</span>
                      </div>
                      <div className="content-wrapper space-y-4">
                        <h3 className="text-lg font-semibold text-gray-900 line-clamp-1" title={property.title}>
                          {property.title}
                        </h3>
                        <p className="text-sm text-gray-600">{property.location}</p>
                        <p className="text-2xl font-bold text-gray-900">₹{property.price}</p>
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
                        <Link to={`/property/${property.id}`} className="block">
                          <button className="btn-primary" aria-label={`View details for ${property.title}`}>
                            View Details
                          </button>
                        </Link>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
              <button
                onClick={() => handleModalOpen("saved")}
                className="swiper-btn mx-auto block"
              >
                View All Saved Properties
              </button>
            </div>
          </div>

          {/* Recently Viewed Properties */}
          <div className="card-container animate-slideUp">
            <div className="p-8">
              <h2 className="text-3xl font-semibold text-gray-900 mb-6">Recently Viewed Properties</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {(recentlyViewed.length > 0 ? recentlyViewed : sampleRecentlyViewed).map((property, index) => (
                  <div key={index} className="card-container animate-slideUp" style={{ animationDelay: `${index * 0.1}s` }}>
                    <div className="image-wrapper">
                      <img
                        src={property.image_url}
                        alt={property.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="content-wrapper space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900 line-clamp-1" title={property.title}>
                        {property.title}
                      </h3>
                      <p className="text-sm text-gray-600">{property.location}</p>
                      <p className="text-2xl font-bold text-gray-900">₹{property.price}</p>
                      <Link to={`/property/${property.id}`} className="block">
                        <button className="btn-primary" aria-label={`View details for ${property.title}`}>
                          View Details
                        </button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Account Activity */}
          <div className="card-container animate-slideUp">
            <div className="p-8">
              <h2 className="text-3xl font-semibold text-gray-900 mb-6">Recent Activity</h2>
              <div className="space-y-4">
                {[
                  { date: "2025-04-15", action: "Saved Luxury Villa in Bandra" },
                  { date: "2025-04-14", action: "Viewed Modern Apartment in Powai" },
                  { date: "2025-04-13", action: "Updated profile information" },
                ].map((activity, index) => (
                  <div key={index} className="flex items-center gap-4 border-b border-gray-200 pb-4">
                    <FaHistory className="text-gray-600" />
                    <div>
                      <p className="text-sm text-gray-600">{activity.date}</p>
                      <p className="text-base font-medium text-gray-900">{activity.action}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="card-container animate-slideUp">
            <div className="p-8">
              <h2 className="text-3xl font-semibold text-gray-900 mb-6">Your Stats</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { stat: savedProperties.length || 2, title: "Saved Properties", desc: "Homes you love" },
                  { stat: recentlyViewed.length || 4, title: "Properties Viewed", desc: "Recently explored" },
                  { stat: "15", title: "Searches", desc: "Property searches made" },
                  { stat: "3", title: "Bookmarks", desc: "Properties bookmarked" },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="bg-gray-100 p-6 rounded-lg text-center animate-slideUp"
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    <p className="text-4xl font-semibold text-gray-900">{item.stat}</p>
                    <h3 className="text-lg font-medium text-gray-900 mt-2">{item.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 modal-overlay flex justify-center items-center z-50 animate-fadeIn">
          <div className="bg-white rounded-lg p-8 w-full max-w-lg relative border border-gray-200">
            <button
              onClick={handleModalClose}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 transition-colors duration-300"
              aria-label="Close modal"
            >
              <FaTimes className="text-lg" />
            </button>
            {modalContent === "profile" && (
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Edit Profile</h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Profile Picture</label>
                    <input
                      type="file"
                      accept="image/*"
                      className="w-full p-3 border border-gray-200 rounded-lg input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-200 rounded-lg input-field"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-200 rounded-lg input-field"
                      placeholder="Enter your email"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-200 rounded-lg input-field"
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Location</label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-200 rounded-lg input-field"
                      placeholder="Enter your location"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Bio</label>
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-200 rounded-lg input-field"
                      rows="5"
                      placeholder="Tell us about yourself"
                    ></textarea>
                  </div>
                  <button
                    onClick={handleSaveProfile}
                    className="w-full btn-primary py-3"
                    aria-label="Save profile changes"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            )}
            {modalContent === "saved" && (
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Saved Properties</h3>
                <div className="space-y-6 max-h-96 overflow-y-auto">
                  {(savedProperties.length > 0 ? savedProperties : sampleSavedProperties).map((property, index) => (
                    <div key={index} className="flex items-center gap-4 border-b border-gray-200 pb-4">
                      <img
                        src={property.image_url}
                        alt={property.title}
                        className="w-20 h-20 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="text-base font-semibold text-gray-900">{property.title}</h4>
                        <p className="text-sm text-gray-600">{property.location}</p>
                        <p className="text-sm font-medium text-gray-900">₹{property.price}</p>
                      </div>
                      <Link to={`/property/${property.id}`}>
                        <button className="btn-primary px-4 py-2 text-sm">View</button>
                      </Link>
        </div>
      ))}
    </div>
  </div>
)}
{modalContent === "history" && (
  <div>
    <h3 className="text-xl font-semibold text-gray-900 mb-6">Viewing History</h3>
    <div className="space-y-6 max-h-96 overflow-y-auto">
      {(recentlyViewed.length > 0 ? recentlyViewed : sampleRecentlyViewed).map((property, index) => (
        <div key={index} className="flex items-center gap-4 border-b border-gray-200 pb-4">
          <img
            src={property.image_url}
            alt={property.title}
            className="w-20 h-20 rounded-lg object-cover"
          />
          <div className="flex-1">
            <h4 className="text-base font-semibold text-gray-900">{property.title}</h4>
            <p className="text-sm text-gray-600">{property.location}</p>
            <p className="text-sm font-medium text-gray-900">₹{property.price}</p>
          </div>
          <Link to={`/property/${property.id}`}>
            <button className="btn-primary px-4 py-2 text-sm">View</button>
          </Link>
        </div>
      ))}
    </div>
  </div>
)}
{modalContent === "settings" && (
  <div>
    <h3 className="text-xl font-semibold text-gray-900 mb-6">Account Settings</h3>
    <div className="space-y-6">
      <div>
        <h4 className="text-base font-semibold text-gray-900 mb-4">Notification Preferences</h4>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="emailNotifications"
            checked={notifications.emailNotifications}
            onChange={handleNotificationChange}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded"
          />
          <span className="text-sm text-gray-700">Email Notifications</span>
        </label>
        <label className="flex items-center gap-2 mt-2">
          <input
            type="checkbox"
            name="smsNotifications"
            checked={notifications.smsNotifications}
            onChange={handleNotificationChange}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded"
          />
          <span className="text-sm text-gray-700">SMS Notifications</span>
        </label>
        <label className="flex items-center gap-2 mt-2">
          <input
            type="checkbox"
            name="pushNotifications"
            checked={notifications.pushNotifications}
            onChange={handleNotificationChange}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded"
          />
          <span className="text-sm text-gray-700">Push Notifications</span>
        </label>
      </div>
      <div>
        <h4 className="text-base font-semibold text-gray-900 mb-4">Account Actions</h4>
        <button
          onClick={() => handleModalOpen("change-password")}
          className="btn-secondary flex items-center gap-2 mb-4"
        >
          <FaLock />
          <span>Change Password</span>
        </button>
        <button
          onClick={handleDeleteAccount}
          className="btn-secondary flex items-center gap-2 text-red-600"
        >
          <FaTrash />
          <span>Delete Account</span>
        </button>
      </div>
    </div>
  </div>
)}
{modalContent === "change-password" && (
  <div>
    <h3 className="text-xl font-semibold text-gray-900 mb-6">Change Password</h3>
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Current Password</label>
        <input
          type="password"
          className="w-full p-3 border border-gray-200 rounded-lg input-field"
          placeholder="Enter current password"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">New Password</label>
        <input
          type="password"
          className="w-full p-3 border border-gray-200 rounded-lg input-field"
          placeholder="Enter new password"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Confirm New Password</label>
        <input
          type="password"
          className="w-full p-3 border border-gray-200 rounded-lg input-field"
          placeholder="Confirm new password"
        />
      </div>
      <button className="w-full btn-primary py-3">Update Password</button>
    </div>
  </div>
)}
</div>
</div>
)}

      {/* CTA Banner */}
      <div className="bg-gradient-to-r from-gray-900 to-black py-12 px-[550px] mx-40 rounded-lg text-center mt-12 animate-slideUp">
        <h2 className="text-3xl font-semibold text-white mb-4">Explore More Properties</h2>
        <p className="text-gray-300 max-w-lg mx-auto mb-6 text-sm">
          Discover thousands of verified properties and find your dream home today.
        </p>
        <Link to="/PropertyPage">
          <button className="btn-primary">Browse Now</button>
        </Link>
      </div>
    </div>
  );
};

export default Profile;