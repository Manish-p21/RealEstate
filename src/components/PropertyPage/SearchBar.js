import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaMicrophone, FaTimes, FaHome, FaBuilding, FaCity, FaHouseUser, FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';
import PropTypes from 'prop-types';

const SearchBar = ({ onSearch, onTypeChange, onSortChange = () => {} }) => {
  // SearchBar State
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState(['Mumbai', 'Delhi', 'Bangalore']);
  const [showDropdown, setShowDropdown] = useState(false);

  // PropertyTypeSelector State
  const [selectedTypes, setSelectedTypes] = useState([]);
  const propertyTypes = [
    { name: 'House', icon: <FaHome className="text-lg" /> },
    { name: 'Condo', icon: <FaBuilding className="text-lg" /> },
    { name: 'Apartment', icon: <FaCity className="text-lg" /> },
    { name: 'Townhouse', icon: <FaHouseUser className="text-lg" /> },
  ];

  // PropertySort State
  const [sortBy, setSortBy] = useState('relevance');
  const [order, setOrder] = useState('none');
  const sortOptions = [
    { value: 'relevance', label: 'Relevance' },
    { value: 'price', label: 'Price' },
    { value: 'date', label: 'Date Listed' },
  ];

  // SearchBar Handlers
  const handleSearch = async () => {
    if (!query.trim()) return;
    setIsLoading(true);
    await onSearch(query);
    setRecentSearches([query, ...recentSearches.filter((s) => s !== query).slice(0, 4)]);
    setIsLoading(false);
    setQuery('');
  };

  const handleVoiceSearch = () => {
    console.log('Voice search initiated');
    // Placeholder for Web Speech API
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  const clearSearch = () => {
    setQuery('');
    setShowDropdown(false);
  };

  // PropertyTypeSelector Handlers
  const handleTypeToggle = (type) => {
    const newTypes = selectedTypes.includes(type)
      ? selectedTypes.filter((t) => t !== type)
      : [...selectedTypes, type];
    setSelectedTypes(newTypes);
    onTypeChange(newTypes);
  };

  // PropertySort Handlers
  const handleSort = () => {
    onSortChange({ sortBy, order });
  };

  const handleOrderToggle = () => {
    const nextOrder = order === 'asc' ? 'desc' : order === 'desc' ? 'none' : 'asc';
    setOrder(nextOrder);
    handleSort();
  };

  // Determine the sort icon and aria-label based on order
  const sortIcon =
    order === 'asc' ? <FaSortUp className="text-lg" /> :
    order === 'desc' ? <FaSortDown className="text-lg" /> :
    <FaSort className="text-lg" />;

  const nextOrderLabel =
    order === 'asc' ? 'descending' :
    order === 'desc' ? 'neutral' :
    'ascending';

  return (
    <div className="w-full mx-auto px-6 py-12 bg-gray-50">
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
          .search-container, .selector-container, .sort-container {
            border: 1px solid #e5e7eb;
            border-radius: 16px;
            background: white;
            transition: box-shadow 0.3s ease, transform 0.3s ease;
            position: relative; /* Ensure stacking context for dropdown */
          }
          .search-container:hover, .selector-container:hover, .sort-container:hover {
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
            transform: translateY(-6px);
          }
          .btn-search {
            background: linear-gradient(135deg, #1f2937, #4b5563);
            color: white;
            padding: 10px;
            border-radius: 9999px;
            transition: all 0.3s ease;
          }
          .btn-search:hover {
            background: linear-gradient(135deg, #374151, #6b7280);
          }
          .btn-voice {
            color: #6b7280;
            padding: 10px;
            border-radius: 9999px;
            transition: all 0.3s ease;
          }
          .btn-voice:hover {
            color: #2563eb;
          }
          .dropdown {
            border: 1px solid #e5e7eb;
            border-radius: 12px;
            background: white;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            z-index: 100; /* Increased z-index to appear above other elements */
          }
          .btn-type {
            padding: 10px 16px;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 500;
            transition: all 0.3s ease;
          }
          .btn-type-active {
            background: linear-gradient(135deg, #1f2937, #4b5563);
            color: white;
          }
          .btn-type-inactive {
            background: #f3f4f6;
            color: #6b7280;
          }
          .btn-type-inactive:hover {
            background: #e5e7eb;
            color: #2563eb;
          }
          .btn-clear {
            background: #f3f4f6;
            color: #6b7280;
            padding: 10px 20px;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 500;
            transition: all 0.3s ease;
          }
          .btn-clear:hover {
            background: #e5e7eb;
            color: #2563eb;
            transform: translateY(-1px);
          }
          .btn-sort-icon {
            background: linear-gradient(135deg, #1f2937, #4b5563);
            color: white;
            padding: 10px;
            border-radius: 8px;
            transition: all 0.3s ease;
          }
          .btn-sort-icon:hover {
            background: linear-gradient(135deg, #374151, #6b7280);
            transform: translateY(-1px);
          }
          .select-input {
            background: #f9fafb;
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            padding: 10px;
            font-size: 14px;
            color: #1f2937;
            transition: all 0.3s ease;
          }
          .select-input:hover {
            background: #e5e7eb;
            border-color: #d1d5db;
          }
          .select-input:focus {
            outline: none;
            border-color: #2563eb;
            box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.2);
          }
        `}
      </style>

      {/* Horizontal Container for Search Bar and Sort */}
      <div className="flex flex-row items-start gap-4 w-full mb-0">
        {/* Search Bar Section */}
        <div className="flex-1 min-w-[300px] animate-slideUp">
          <div style={{ borderLeft: '6px solid black', paddingLeft: '1rem', marginBottom: '1rem' }}>
            <h2 className="text-2xl font-bold text-gray-900">Find Your Dream Home</h2>
            <p className="text-sm text-gray-600 mt-1">Search by city, address, or zip code</p>
          </div>
          <div className="search-container animate-fadeIn">
            <motion.div
              className="flex items-center w-full p-4 rounded-lg"
              whileFocus={{ scale: 1.02 }}
            >
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                onFocus={() => setShowDropdown(true)}
                onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
                placeholder="Search by city, address, or zip code..."
                className="flex-1 p-2 text-lg h-[20px] text-gray-900 bg-transparent border-none focus:outline-none"
                aria-label="Search properties"
              />
              {query && (
                <motion.button
                  onClick={clearSearch}
                  className="p-2 text-gray-600 hover:text-gray-900"
                  whileHover={{ scale: 1.1 }}
                  aria-label="Clear search"
                >
                  <FaTimes />
                </motion.button>
              )}
              <motion.button
                onClick={handleVoiceSearch}
                className="btn-voice mr-2"
                whileHover={{ scale: 1.1 }}
                aria-label="Voice search"
              >
                <FaMicrophone />
              </motion.button>
              <motion.button
                onClick={handleSearch}
                className="btn-search"
                animate={{ rotate: isLoading ? 360 : 0 }}
                transition={{ duration: 1, repeat: isLoading ? Infinity : 0 }}
                aria-label="Search"
                disabled={isLoading}
              >
                <FaSearch />
              </motion.button>
            </motion.div>
            {showDropdown && recentSearches.length > 0 && (
              <motion.div
                className="dropdown absolute w-full mt-2 animate-fadeIn"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {recentSearches.map((search, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      setQuery(search);
                      handleSearch();
                    }}
                    className="p-3 text-sm text-gray-900 hover:bg-gray-100 cursor-pointer rounded-lg"
                  >
                    {search}
                  </div>
                ))}
              </motion.div>
            )}
          </div>
        </div>

        {/* Property Sort Section */}
        <div className="min-w-[250px] py-[71px] animate-slideUp">
          <motion.div
            className="sort-container flex items-center px-4 h-[70px]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex flex-row items-center gap-2 w-full">
              <div className="flex-1">
                <select
                  value={sortBy}
                  onChange={(e) => {
                    setSortBy(e.target.value);
                    handleSort();
                  }}
                  className="select-input w-full"
                  aria-label="Select sort option"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <motion.button
                onClick={handleOrderToggle}
                className="btn-sort-icon flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                aria-label={`Sort in ${nextOrderLabel} order`}
              >
                {sortIcon}
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Property Type Selector Section */}
      <div className="mt-[-60px]">
        <motion.div
          className="animate-slideUp"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-wrap gap-4">
            {propertyTypes.map((type) => (
              <motion.button
                key={type.name}
                onClick={() => handleTypeToggle(type.name)}
                className={`btn-type flex items-center border gap-2 ${
                  selectedTypes.includes(type.name) ? 'btn-type-active' : 'btn-type-inactive'
                }`}
                whileHover={{ scale: 1.05 }}
                aria-label={`Toggle ${type.name} property type`}
              >
                {type.icon}
                <span>{type.name}</span>
              </motion.button>
            ))}
            <motion.button
              onClick={() => {
                setSelectedTypes([]);
                onTypeChange([]);
              }}
              className="btn-clear"
              whileHover={{ scale: 1.05 }}
              aria-label="Clear selected property types"
            >
              Clear Types
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
  onTypeChange: PropTypes.func.isRequired,
  onSortChange: PropTypes.func,
};

SearchBar.defaultProps = {
  onSortChange: () => {},
};

export default SearchBar;