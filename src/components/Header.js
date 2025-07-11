import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaUserCircle, FaCaretDown, FaBell, FaSearch, FaBars } from "react-icons/fa";
import { MdMarkEmailRead, MdMarkEmailUnread } from "react-icons/md";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "property_alert",
      message: "New property listed in your saved search area!",
      isRead: false,
      timestamp: "2 hours ago",
      link: "/properties/123",
    },
    {
      id: 2,
      type: "new_user",
      message: "Welcome to Realvia! Complete your profile to get started.",
      isRead: true,
      timestamp: "1 day ago",
      link: "/profile",
    },
    {
      id: 3,
      type: "property_update",
      message: "Price reduced on your watched property!",
      isRead: false,
      timestamp: "4 hours ago",
      link: "/properties/456",
    },
    {
      id: 4,
      type: "property_update",
      message: "Price reduced on your watched property!",
      isRead: true,
      timestamp: "4 hours ago",
      link: "/properties/456",
    },
  ]);

  const navigate = useNavigate();
  const location = useLocation();
  const headerRef = useRef(null);

  // Simulate login state
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setIsLoggedIn(true);
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
        setIsNotificationOpen(false);
        setIsMobileMenuOpen(false);
        setIsSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle login
  const handleLogin = () => {
    localStorage.setItem("token", "dummy-token");
    setIsLoggedIn(true);
    navigate("/login");
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setIsDropdownOpen(false);
    navigate("/");
  };

  // Toggle user dropdown
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
    setIsNotificationOpen(false);
  };

  // Toggle notifications dropdown
  const toggleNotifications = () => {
    setIsNotificationOpen(!isNotificationOpen);
    setIsDropdownOpen(false);
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setIsSearchOpen(false);
  };

  // Toggle search bar on mobile
  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    setIsMobileMenuOpen(false);
  };

  // Handle search
  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?query=${searchQuery}`);
      setSearchQuery("");
      setIsSearchOpen(false);
    }
  };

  // Handle notification click
  const handleNotificationClick = (notification) => {
    setNotifications(
      notifications.map((n) =>
        n.id === notification.id ? { ...n, isRead: true } : n
      )
    );
    navigate(notification.link);
    setIsNotificationOpen(false);
  };

  // Count unread notifications
  const unreadCount = notifications.filter((n) => !n.isRead).length;
  const unreadNotifications = notifications.filter((n) => !n.isRead);
  const readNotifications = notifications.filter((n) => n.isRead);

  return (
    <header
      id="header"
      ref={headerRef}
      className="fixed top-0 left-0 w-full h-[80px] bg-white shadow-sm z-50"
    >
      <div className="flex justify-between items-center px-4 py-2 max-w-7xl mx-auto h-full">
        {/* Left Side: Logo */}
        <div
          className="flex items-center gap-2 text-lg md:text-xl font-bold text-gray-800 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img src="https://realestate-3rel.onrender.com/uploads/12121.png" alt="Realvia Logo" className="w-10 h-10" />
          Realvia
        </div>


        {/* Hamburger Icon for Mobile */}
        <div className="md:hidden">
          <FaBars
            className="text-2xl text-gray-700 cursor-pointer"
            onClick={toggleMobileMenu}
          />
        </div>

        {/* Center: Navigation Links (Hidden on Mobile) */}
        <div className="hidden md:flex gap-6 lg:gap-8">
          <NavLink text="Home" path="/" currentPath={location.pathname} onClick={() => navigate("/")} />
          <NavLink text="Properties" path="/PropertyPage" currentPath={location.pathname} onClick={() => navigate("/PropertyPage")} />
          <NavLink text="About Us" path="/about" currentPath={location.pathname} onClick={() => navigate("/about")} />
          <NavLink text="Contact Us" path="/ContactUs" currentPath={location.pathname} onClick={() => navigate("/ContactUs")} />
        </div>

        {/* Right Side: Search, Notifications, User */}
        <div className="hidden md:flex items-center gap-4 lg:gap-6">
          {/* Search Bar (Hidden on Mobile) */}
          <div className="flex items-center text-black bg-gray-100 rounded-lg px-4 py-2 w-64 lg:w-96">
            <input
              type="text"
              placeholder="Search properties..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent outline-none w-full text-sm"
            />
            <FaSearch
              className="text-gray-500 cursor-pointer"
              onClick={handleSearch}
            />
          </div>

          {/* Notifications */}
          <div className="relative">
            <div
              className="cursor-pointer relative"
              onClick={toggleNotifications}
            >
              <FaBell className="text-xl lg:text-2xl text-gray-700" />
              {unreadCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white border-2 border-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </div>
            {isNotificationOpen && (
              <motion.div
                className="absolute top-12 right-0 bg-white shadow-lg rounded-lg w-80 lg:w-96 max-h-96 overflow-y-auto"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {notifications.length === 0 ? (
                  <div className="px-4 py-3 text-gray-700 text-sm">
                    No new notifications
                  </div>
                ) : (
                  <div className="py-3">
                    {/* Unread Notifications */}
                    {unreadNotifications.length > 0 && (
                      <div className="mb-3">
                        <h3 className="px-4 py-2 text-xs font-semibold text-gray-800 uppercase">
                          Unread
                        </h3>
                        {unreadNotifications.map((notification) => (
                          <div
                            key={notification.id}
                            className="flex items-start gap-2 px-3 py-2 my-1 mx-2 rounded-lg cursor-pointer hover:bg-gray-50 bg-blue-50"
                            onClick={() => handleNotificationClick(notification)}
                          >
                            <div className="text-lg">
                              <MdMarkEmailUnread className="text-blue-600" />
                            </div>
                            <div className="flex-1">
                              <p className="text-sm text-gray-800 font-semibold">
                                {notification.message}
                              </p>
                              <p className="text-xs text-gray-500 mt-1">
                                {notification.timestamp}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Read Notifications */}
                    {readNotifications.length > 0 && (
                      <div>
                        <h3 className="px-4 py-2 text-xs font-semibold text-gray-800 uppercase">
                          Read
                        </h3>
                        {readNotifications.map((notification) => (
                          <div
                            key={notification.id}
                            className="flex items-start gap-2 px-3 py-2 my-1 mx-2 rounded-lg cursor-pointer hover:bg-gray-50 bg-gray-50"
                            onClick={() => handleNotificationClick(notification)}
                          >
                            <div className="text-lg">
                              <MdMarkEmailRead className="text-gray-500" />
                            </div>
                            <div className="flex-1">
                              <p className="text-sm text-gray-600">
                                {notification.message}
                              </p>
                              <p className="text-xs text-gray-500 mt-1">
                                {notification.timestamp}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            )}
          </div>

          {/* User Dropdown */}
          {isLoggedIn ? (
            <div className="relative">
              <div
                className="flex items-center cursor-pointer"
                onClick={toggleDropdown}
              >
                <FaUserCircle className="text-xl lg:text-2xl text-gray-700" />
                <FaCaretDown className="text-gray-700 ml-1" />
              </div>
              {isDropdownOpen && (
                <motion.div
                  className="absolute top-10 right-0 bg-white shadow-lg rounded-lg p-2 w-40"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <div
                    className="px-3 py-2 mb-2 text-black bg-gray-50 hover:bg-gray-100 rounded-lg cursor-pointer text-sm"
                    onClick={() => navigate("/profile")}
                  >
                    Profile
                  </div>
                  <div
                    className="px-3 py-2 mb-2 text-black bg-gray-50 hover:bg-gray-100 rounded-lg cursor-pointer text-sm"
                    onClick={handleLogout}
                  >
                    Logout
                  </div>
                </motion.div>
              )}
            </div>
          ) : (
            <button
              className="bg-blue-50 text-blue-600 font-semibold px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors duration-200 text-sm"
              onClick={handleLogin}
            >
              Login / Signup
            </button>
          )}
        </div>
      </div>

      {/* Mobile Search Bar */}
      {isSearchOpen && (
        <div className="md:hidden flex text-black items-center bg-gray-100 rounded-lg px-4 py-2 mx-4 mb-2">
          <input
            type="text"
            placeholder="Search properties..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent outline-none w-full text-sm"
          />
          <FaSearch
            className="text-gray-500 cursor-pointer"
            onClick={handleSearch}
          />
        </div>
      )}

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          className="md:hidden bg-white shadow-lg px-4 py-4"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex flex-col gap-3">
            <NavLink
              text="Home"
              path="/"
              currentPath={location.pathname}
              onClick={() => {
                navigate("/");
                setIsMobileMenuOpen(false);
              }}
            />
            <NavLink
              text="Properties"
              path="/PropertyPage"
              currentPath={location.pathname}
              onClick={() => {
                navigate("/PropertyPage");
                setIsMobileMenuOpen(false);
              }}
            />
            <NavLink
              text="About Us"
              path="/about"
              currentPath={location.pathname}
              onClick={() => {
                navigate("/about");
                setIsMobileMenuOpen(false);
              }}
            />
            <NavLink
              text="Contact Us"
              path="/ContactUs"
              currentPath={location.pathname}
              onClick={() => {
                navigate("/ContactUs");
                setIsMobileMenuOpen(false);
              }}
            />
          </div>

          <div
            className="flex items-center gap-2 py-2 cursor-pointer"
            onClick={toggleSearch}
          >
            <FaSearch className="text-lg text-gray-700" />
            <span className="text-sm text-gray-700">Search</span>
          </div>

          <div className="relative">
            <div
              className="flex items-center gap-2 py-2 cursor-pointer"
              onClick={toggleNotifications}
            >
              <FaBell className="text-lg text-gray-700" />
              <span className="text-sm text-gray-700">
                Notifications ({unreadCount})
              </span>
            </div>
            {isNotificationOpen && (
              <motion.div
                className="bg-white shadow-lg rounded-lg w-full max-h-80 overflow-y-auto mt-2"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {notifications.length === 0 ? (
                  <div className="px-4 py-3 text-gray-700 text-sm">
                    No new notifications
                  </div>
                ) : (
                  <div className="py-3">
                    {unreadNotifications.length > 0 && (
                      <div className="mb-3">
                        <h3 className="px-4 py-2 text-xs font-semibold text-gray-800 uppercase">
                          Unread
                        </h3>
                        {unreadNotifications.map((notification) => (
                          <div
                            key={notification.id}
                            className="flex items-start gap-2 px-3 py-2 my-1 mx-2 rounded-lg cursor-pointer hover:bg-gray-50 bg-blue-50"
                            onClick={() => handleNotificationClick(notification)}
                          >
                            <div className="text-lg">
                              <MdMarkEmailUnread className="text-blue-600" />
                            </div>
                            <div className="flex-1">
                              <p className="text-sm text-gray-800 font-semibold">
                                {notification.message}
                              </p>
                              <p className="text-xs text-gray-500 mt-1">
                                {notification.timestamp}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    {readNotifications.length > 0 && (
                      <div>
                        <h3 className="px-4 py-2 text-xs font-semibold text-gray-800 uppercase">
                          Read
                        </h3>
                        {readNotifications.map((notification) => (
                          <div
                            key={notification.id}
                            className="flex items-start gap-2 px-3 py-2 my-1 mx-2 rounded-lg cursor-pointer hover:bg-gray-50 bg-gray-50"
                            onClick={() => handleNotificationClick(notification)}
                          >
                            <div className="text-lg">
                              <MdMarkEmailRead className="text-gray-500" />
                            </div>
                            <div className="flex-1">
                              <p className="text-sm text-gray-600">
                                {notification.message}
                              </p>
                              <p className="text-xs text-gray-500 mt-1">
                                {notification.timestamp}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            )}
          </div>

          {isLoggedIn ? (
            <div className="relative">
              <div
                className="flex items-center gap-2 py-2 cursor-pointer"
                onClick={toggleDropdown}
              >
                <FaUserCircle className="text-lg text-gray-700" />
                <span className="text-sm text-gray-700">Account</span>
              </div>
              {isDropdownOpen && (
                <motion.div
                  className="bg-white shadow-lg rounded-lg p-2 w-full mt-2"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <div
                    className="px-3 py-2 hover:bg-gray-100 rounded-lg cursor-pointer text-sm"
                    onClick={() => {
                      navigate("/profile");
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    Profile
                  </div>
                  <div
                    className="px-3 py-2 hover:bg-gray-100 rounded-lg cursor-pointer text-sm"
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    Logout
                  </div>
                </motion.div>
              )}
            </div>
          ) : (
            <button
              className="w-full bg-blue-50 text-blue-600 font-semibold px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors duration-200 text-sm mt-2"
              onClick={() => {
                handleLogin();
                setIsMobileMenuOpen(false);
              }}
            >
              Login / Signup
            </button>
          )}
        </motion.div>
      )}
    </header>
  );
};

// NavLink Component
const NavLink = ({ text, path, currentPath, onClick }) => {
  const isActive = currentPath === path;

  return (
    <motion.div
      className={`relative text-gray-700 cursor-pointer hover:text-black transition-colors duration-200 text-lg  md:text-base ${
        isActive ? "text-black font-bold" : ""
      }`}
      whileHover={{ scale: 1.05 }}
      onClick={onClick}
    >
      {text}
      {isActive && (
        <div
          className="absolute left-0 top-8 right-0 bottom-[-20px] h-[4px] bg-black rounded-full md:bottom-[-2px]"
        />
      )}
    </motion.div>
  );
};

export default Navbar;