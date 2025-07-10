import React, { useState } from "react";
import { FaCaretDown, FaBell, FaChartLine } from "react-icons/fa";
import { motion } from "framer-motion";

const Sidebar = () => {
  // State for dropdowns
  const [isInsightsDropdownOpen, setIsInsightsDropdownOpen] = useState(false);
  const [isNotificationsDropdownOpen, setIsNotificationsDropdownOpen] = useState(false);
  
  // State for selected options
  const [selectedInsight, setSelectedInsight] = useState("Market Trends");
  const [selectedNotification, setSelectedNotification] = useState("New Property Alert");

  // Dropdown content data
  const insightsOptions = {
    "Market Trends": "Stay updated with the latest real estate trends and market analysis.",
    "Investment Tips": "Discover smart investment strategies and opportunities.",
    "Legal Advice": "Get expert guidance on property laws and legal matters."
  };

  const notificationOptions = {
    "New Property Alert": "Check out the latest properties matching your preferences.",
    "Price Drop Notification": "Properties you've viewed have price reductions!",
    "Expert Recommendations": "Personalized property suggestions from our experts."
  };

  // Dropdown handlers
  const toggleInsightsDropdown = () => {
    setIsInsightsDropdownOpen(!isInsightsDropdownOpen);
    setIsNotificationsDropdownOpen(false); // Close other dropdown
  };

  const toggleNotificationsDropdown = () => {
    setIsNotificationsDropdownOpen(!isNotificationsDropdownOpen);
    setIsInsightsDropdownOpen(false); // Close other dropdown
  };

  // Handle option selection
  const handleInsightSelect = (insight) => {
    setSelectedInsight(insight);
    setIsInsightsDropdownOpen(false);
  };

  const handleNotificationSelect = (notification) => {
    setSelectedNotification(notification);
    setIsNotificationsDropdownOpen(false);
  };

  return (
    <div className="p-0 mt-32 space-y-8">
      {/* Background Image Section */}
      <div className="h-96 rounded-xl shadow-md flex flex-col justify-center items-start text-white px-6 relative bg-cover bg-center" style={{ backgroundImage: "url('/Images/2.jpg')" }}>
        <div className="absolute inset-0 bg-black opacity-40 rounded-xl"></div>
        <div className="relative z-10">
          <h3 className="text-2xl font-bold">Find Your Perfect Home with Expert Guidance!</h3>
          <p className="text-sm mt-2">Get in touch with our real estate experts to find the best properties.</p>
          <button className="mt-4 bg-white text-black py-2 px-4 rounded-lg font-medium hover:bg-gray-100 transition-colors">
            Talk to an Expert
          </button>
        </div>
      </div>

      {/* Real Estate Insights Section */}
      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-300">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-1 h-6 bg-black mr-3"></div>
            <h3 className="font-semibold text-lg">Real Estate Insights</h3>
          </div>
          <div className="relative">
            <div className="flex items-center cursor-pointer" onClick={toggleInsightsDropdown}>
              <FaChartLine className="text-2xl text-gray-700" />
              <FaCaretDown className={`text-gray-700 ml-1 transition-transform ${isInsightsDropdownOpen ? 'rotate-180' : ''}`} />
            </div>
            {isInsightsDropdownOpen && (
              <motion.div
                className="absolute top-10 right-0 bg-white shadow-lg rounded-lg p-2 w-48 z-10"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {Object.entries(insightsOptions).map(([key]) => (
                  <div
                    key={key}
                    className="px-4 py-2 hover:bg-gray-100 rounded-lg cursor-pointer"
                    onClick={() => handleInsightSelect(key)}
                  >
                    {key}
                  </div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
        <div className="mt-4 space-y-4">
          <div className="flex items-center">
            <FaChartLine className="text-2xl text-gray-700" />
            <div className="ml-4">
              <h4 className="font-medium">{selectedInsight}</h4>
              <p className="text-sm text-gray-500">{insightsOptions[selectedInsight]}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Notifications Section */}
      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-300">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-1 h-6 bg-black mr-3"></div>
            <h3 className="font-semibold text-lg">Notifications</h3>
          </div>
          <div className="relative">
            <div className="flex items-center cursor-pointer" onClick={toggleNotificationsDropdown}>
              <FaBell className="text-2xl text-gray-700" />
              <FaCaretDown className={`text-gray-700 ml-1 transition-transform ${isNotificationsDropdownOpen ? 'rotate-180' : ''}`} />
            </div>
            {isNotificationsDropdownOpen && (
              <motion.div
                className="absolute top-10 right-0 bg-white shadow-lg rounded-lg p-2 w-48 z-10"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {Object.entries(notificationOptions).map(([key]) => (
                  <div
                    key={key}
                    className="px-4 py-2 hover:bg-gray-100 rounded-lg cursor-pointer"
                    onClick={() => handleNotificationSelect(key)}
                  >
                    {key}
                  </div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
        <div className="mt-4 space-y-4">
          <div className="flex items-center">
            <FaBell className="text-2xl text-gray-700" />
            <div className="ml-4">
              <h4 className="font-medium">{selectedNotification}</h4>
              <p className="text-sm text-gray-500">{notificationOptions[selectedNotification]}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Projects Section */}
      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-300">
        <div className="flex items-center">
          <div className="w-1 h-6 bg-black mr-3"></div>
          <h3 className="font-semibold text-lg">Upcoming Projects</h3>
        </div>
        <div className="mt-4 space-y-4">
          {['4.jpg', '2.jpg'].map((img, index) => (
            <div key={index} className="group relative cursor-pointer">
              <img
                src={`/Images/${img}`}
                alt={`Project ${index + 1}`}
                className="w-full h-48 object-cover rounded-lg transition-opacity group-hover:opacity-90"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all rounded-lg flex items-center justify-center">
                <button className="opacity-0 group-hover:opacity-100 text-white bg-blue-600 px-4 py-2 rounded-lg transition-opacity">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Advertisement Section */}
      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-300">
        <div className="flex items-center">
          <div className="w-1 h-6 bg-black mr-3"></div>
          <h3 className="font-semibold text-lg">Featured Development</h3>
        </div>
        <div className="mt-4 relative group">
          <img
            src="/Images/2.jpg"
            alt="Premium Development"
            className="w-full h-48 object-cover rounded-lg"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent rounded-lg flex items-end p-4">
            <div className="text-white">
              <h4 className="font-bold text-lg">Luxury Towers</h4>
              <p className="text-sm">Starting from ₹2.5Cr</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;