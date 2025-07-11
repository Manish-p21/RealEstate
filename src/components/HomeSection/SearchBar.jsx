import React, { useState, useEffect, useRef } from "react";

const SearchBar = () => {
  const [sticky, setSticky] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [filters, setFilters] = useState({
    location: "Location",
    property: "Property Type",
    price: "Price Range",
    rooms: "Rooms",
  });

  const searchBarRef = useRef(null);
  const [searchBarHeight, setSearchBarHeight] = useState(0);

  // Sticky behavior based on 1000px scroll threshold, disabled on mobile (sm)
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const STICKY_THRESHOLD = 940; // Stick after 940px from top
      const isMobile = window.innerWidth < 640; // Tailwind's sm breakpoint

      if (!isMobile && scrollY > STICKY_THRESHOLD) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    };

    // Set initial height
    if (searchBarRef.current) {
      setSearchBarHeight(searchBarRef.current.offsetHeight);
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Toggle dropdown with instant response
  const toggleDropdown = (key) => {
    setDropdownOpen(dropdownOpen === key ? null : key);
  };

  // Handle filter selection
  const handleSelect = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setDropdownOpen(null);
  };

  return (
    <div className="relative w-full">
      {/* Embedded CSS Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes slideUp {
            from { transform: translateY(20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
          @keyframes pulse {
            0% { box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.4); }
            70% { box-shadow: 0 0 0 10px rgba(255, 255, 255, 0); }
            100% { box-shadow: 0 0 0 0 rgba(255, 255, 255, 0); }
          }
          .animate-fadeIn { animation: fadeIn 0.3s ease-out; }
          .animate-slideUp { animation: slideUp 0.5s ease-out; }
          .animate-pulse { animation: pulse 2s infinite; }
          .delay-100 { animation-delay: 0.1s; }
          .delay-200 { animation-delay: 0.2s; }
          .delay-300 { animation-delay: 0.3s; }
        `}
      </style>

      {/* Placeholder for sticky */}
      {sticky && <div className="hidden sm:block" style={{ height: searchBarHeight }}></div>}

      {/* SearchBar */}
      <div
        ref={searchBarRef}
        className={`w-full flex justify-center transition-all duration-300 ease-in-out ${
          sticky ? "sm:fixed sm:top-[72px] sm:left-0 sm:right-0 sm:z-40 sm:bg-transparent" : "relative bg-transparent"
        }`}
      >
        <div className="flex flex-col sm:flex-row items-center max-w-4xl w-full mx-5 sm:mx-6 bg-white/15 backdrop-blur-xl rounded-2xl p-4 sm:p-4 shadow-xl animate-slideUp space-y-3 sm:space-y-0">
          {/* Location Dropdown */}
          <div className="relative w-full sm:flex-1">
            <button
              onClick={() => toggleDropdown("location")}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 text-gray-900 font-medium text-left border-b sm:border-b-0 sm:border-r border-gray-300 flex justify-between items-center text-sm sm:text-base"
            >
              {filters.location}
              <span className="ml-2 text-gray-600">↓</span>
            </button>
            {dropdownOpen === "location" && (
              <ul className="absolute left-0 right-0 mt-2 bg-white/95 backdrop-blur-md rounded-lg shadow-lg z-50 animate-fadeIn">
                {["New York", "Los Angeles", "Miami"].map((item) => (
                  <li
                    key={item}
                    onClick={() => handleSelect("location", item)}
                    className="px-3 sm:px-4 py-2 text-gray-900 hover:bg-gray-100 cursor-pointer transition-colors duration-200 text-sm sm:text-base"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Property Type Dropdown */}
          <div className="relative w-full sm:flex-1">
            <button
              onClick={() => toggleDropdown("property")}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 text-gray-900 font-medium text-left border-b sm:border-b-0 sm:border-r border-gray-300 flex justify-between items-center text-sm sm:text-base"
            >
              {filters.property}
              <span className="ml-2 text-gray-600">↓</span>
            </button>
            {dropdownOpen === "property" && (
              <ul className="absolute left-0 right-0 mt-2 bg-white/95 backdrop-blur-md rounded-lg shadow-lg z-50 animate-fadeIn">
                {["House", "Apartment", "Villa"].map((item) => (
                  <li
                    key={item}
                    onClick={() => handleSelect("property", item)}
                    className="px-3 sm:px-4 py-2 text-gray-900 hover:bg-gray-100 cursor-pointer transition-colors duration-200 text-sm sm:text-base"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Price Range Dropdown */}
          <div className="relative w-full sm:flex-1">
            <button
              onClick={() => toggleDropdown("price")}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 text-gray-900 font-medium text-left border-b sm:border-b-0 sm:border-r border-gray-300 flex justify-between items-center text-sm sm:text-base"
            >
              {filters.price}
              <span className="ml-2 text-gray-600">↓</span>
            </button>
            {dropdownOpen === "price" && (
              <ul className="absolute left-0 right-0 mt-2 bg-white/95 backdrop-blur-md rounded-lg shadow-lg z-50 animate-fadeIn">
                {["$500K - $1M", "$1M - $5M", "$5M+"].map((item) => (
                  <li
                    key={item}
                    onClick={() => handleSelect("price", item)}
                    className="px-3 sm:px-4 py-2 text-gray-900 hover:bg-gray-100 cursor-pointer transition-colors duration-200 text-sm sm:text-base"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Rooms Dropdown */}
          <div className="relative w-full sm:flex-1">
            <button
              onClick={() => toggleDropdown("rooms")}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 text-gray-900 font-medium text-left border-b sm:border-b-0 sm:border-r border-gray-300 flex justify-between items-center text-sm sm:text-base"
            >
              {filters.rooms}
              <span className="ml-2 text-gray-600">↓</span>
            </button>
            {dropdownOpen === "rooms" && (
              <ul className="absolute left-0 right-0 mt-2 bg-white/95 backdrop-blur-md rounded-lg shadow-lg z-50 animate-fadeIn">
                {["1-2 Beds", "3-4 Beds", "5+ Beds"].map((item) => (
                  <li
                    key={item}
                    onClick={() => handleSelect("rooms", item)}
                    className="px-3 sm:px-4 py-2 text-gray-900 hover:bg-gray-100 cursor-pointer transition-colors duration-200 text-sm sm:text-base"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Search Button */}
          <button className="w-full sm:w-auto px-6 py-2 sm:py-3 sm:ml-4 bg-white text-gray-900 rounded-full font-semibold hover:bg-gray-200 transition-all duration-300 shadow-lg hover:shadow-xl animate-pulse text-sm sm:text-base">
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;