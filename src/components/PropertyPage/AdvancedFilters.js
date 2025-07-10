import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaTimes, FaHome, FaBed, FaBath, FaSwimmingPool, FaMapMarkerAlt } from 'react-icons/fa';

const AdvancedFilters = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    priceMin: 0,
    priceMax: 5000000,
    bedrooms: 0,
    bathrooms: 0,
    propertyType: 'all',
    amenities: [],
    locationRadius: 10, // in kilometers
  });

  const [expandedSections, setExpandedSections] = useState({
    price: true,
    rooms: true,
    type: true,
    amenities: true,
    location: true,
  });

  const propertyTypes = ['All', 'House', 'Apartment', 'Condo', 'Villa'];
  const amenitiesList = ['Pool', 'Gym', 'Parking', 'Garden', 'Security'];
  const bedroomOptions = [0, 1, 2, 3, 4, 5];
  const bathroomOptions = [0, 1, 2, 3, 4];
  const radiusOptions = [5, 10, 20, 50, 100]; // in kilometers

  const handleFilterChange = () => {
    onFilterChange(filters);
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      priceMin: 0,
      priceMax: 5000000,
      bedrooms: 0,
      bathrooms: 0,
      propertyType: 'all',
      amenities: [],
      locationRadius: 10,
    };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-6 py-12 bg-gray-50 animate-slideUp">
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
          .filter-container {
            border: 1px solid #e5e7eb;
            border-radius: 16px;
            background: white;
            transition: box-shadow 0.3s ease, transform 0.3s ease;
          }
          .filter-container:hover {
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
            transform: translateY(-6px);
          }
          .btn-primary {
            background: linear-gradient(135deg, #1f2937, #4b5563);
            color: white;
            padding: 10px 20px;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 500;
            transition: all 0.3s ease;
          }
          .btn-primary:hover {
            background: linear-gradient(135deg, #374151, #6b7280);
            transform: translateY(-1px);
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
          .section-header {
            background: #f9fafb;
            border-radius: 12px;
            transition: background 0.3s ease;
          }
          .section-header:hover {
            background: #e5e7eb;
          }
          .input-range::-webkit-slider-thumb {
            background: linear-gradient(135deg, #1f2937, #4b5563);
            border-radius: 9999px;
            height: 18px;
            width: 18px;
            cursor: pointer;
          }
          .input-range::-moz-range-thumb {
            background: linear-gradient(135deg, #1f2937, #4b5563);
            border-radius: 9999px;
            height: 18px;
            width: 18px;
            cursor: pointer;
          }
          .input-range {
            -webkit-appearance: none;
            height: 6px;
            background: #e5e7eb;
            border-radius: 9999px;
          }
          .input-range::-webkit-slider-runnable-track {
            height: 6px;
            background: #e5e7eb;
            border-radius: 9999px;
          }
          .input-range::-moz-range-track {
            height: 6px;
            background: #e5e7eb;
            border-radius: 9999px;
          }
        `}
      </style>

      

      {/* Filter Container */}
      <motion.div
        className="filter-container p-6 animate-fadeIn"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Price Range */}
        <div className="mb-6">
          <motion.div
            className="section-header flex items-center justify-between p-3 cursor-pointer"
            onClick={() => toggleSection('price')}
            whileHover={{ scale: 1.01 }}
          >
            <div className="flex items-center gap-2">
              <FaHome className="text-gray-900 text-lg" />
              <h3 className="text-lg font-semibold text-gray-900">Price Range</h3>
            </div>
            <span className="text-sm text-gray-600">{expandedSections.price ? '−' : '+'}</span>
          </motion.div>
          {expandedSections.price && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="p-4 space-y-4"
            >
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-900 mb-2">Min Price</label>
                  <input
                    type="range"
                    min={0}
                    max={5000000}
                    step={10000}
                    value={filters.priceMin}
                    onChange={(e) => setFilters({ ...filters, priceMin: Number(e.target.value) })}
                    onMouseUp={handleFilterChange}
                    className="w-full input-range"
                    aria-label="Minimum price"
                  />
                  <p className="text-sm text-gray-600 mt-1">₹{filters.priceMin.toLocaleString()}</p>
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-900 mb-2">Max Price</label>
                  <input
                    type="range"
                    min={0}
                    max={5000000}
                    step={10000}
                    value={filters.priceMax}
                    onChange={(e) => setFilters({ ...filters, priceMax: Number(e.target.value) })}
                    onMouseUp={handleFilterChange}
                    className="w-full input-range"
                    aria-label="Maximum price"
                  />
                  <p className="text-sm text-gray-600 mt-1">₹{filters.priceMax.toLocaleString()}</p>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Bedrooms & Bathrooms */}
        <div className="mb-6">
          <motion.div
            className="section-header flex items-center justify-between p-3 cursor-pointer"
            onClick={() => toggleSection('rooms')}
            whileHover={{ scale: 1.01 }}
          >
            <div className="flex items-center gap-2">
              <FaBed className="text-gray-900 text-lg" />
              <h3 className="text-lg font-semibold text-gray-900">Rooms</h3>
            </div>
            <span className="text-sm text-gray-600">{expandedSections.rooms ? '−' : '+'}</span>
          </motion.div>
          {expandedSections.rooms && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="p-4 grid grid-cols-2 gap-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Bedrooms</label>
                <div className="flex flex-wrap gap-2">
                  {bedroomOptions.map((num) => (
                    <motion.button
                      key={num}
                      onClick={() => {
                        setFilters({ ...filters, bedrooms: num });
                        handleFilterChange();
                      }}
                      className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                        filters.bedrooms === num
                          ? 'bg-yellow-200 text-gray-900'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      aria-label={`Select ${num} bedrooms`}
                    >
                      {num === 0 ? 'Any' : `${num}+`}
                    </motion.button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Bathrooms</label>
                <div className="flex flex-wrap gap-2">
                  {bathroomOptions.map((num) => (
                    <motion.button
                      key={num}
                      onClick={() => {
                        setFilters({ ...filters, bathrooms: num });
                        handleFilterChange();
                      }}
                      className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                        filters.bathrooms === num
                          ? 'bg-yellow-200 text-gray-900'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      aria-label={`Select ${num} bathrooms`}
                    >
                      {num === 0 ? 'Any' : `${num}+`}
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Property Type */}
        <div className="mb-6">
          <motion.div
            className="section-header flex items-center justify-between p-3 cursor-pointer"
            onClick={() => toggleSection('type')}
            whileHover={{ scale: 1.01 }}
          >
            <div className="flex items-center gap-2">
              <FaHome className="text-gray-900 text-lg" />
              <h3 className="text-lg font-semibold text-gray-900">Property Type</h3>
            </div>
            <span className="text-sm text-gray-600">{expandedSections.type ? '−' : '+'}</span>
          </motion.div>
          {expandedSections.type && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="p-4"
            >
              <div className="flex flex-wrap gap-2">
                {propertyTypes.map((type) => (
                  <motion.button
                    key={type}
                    onClick={() => {
                      setFilters({ ...filters, propertyType: type.toLowerCase() });
                      handleFilterChange();
                    }}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      filters.propertyType === type.toLowerCase()
                        ? 'bg-yellow-200 text-gray-900'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    aria-label={`Select ${type} property type`}
                  >
                    {type}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* Amenities */}
        <div className="mb-6">
          <motion.div
            className="section-header flex items-center justify-between p-3 cursor-pointer"
            onClick={() => toggleSection('amenities')}
            whileHover={{ scale: 1.01 }}
          >
            <div className="flex items-center gap-2">
              <FaSwimmingPool className="text-gray-900 text-lg" />
              <h3 className="text-lg font-semibold text-gray-900">Amenities</h3>
            </div>
            <span className="text-sm text-gray-600">{expandedSections.amenities ? '−' : '+'}</span>
          </motion.div>
          {expandedSections.amenities && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="p-4"
            >
              <div className="grid grid-cols-2 gap-2">
                {amenitiesList.map((amenity) => (
                  <label key={amenity} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.amenities.includes(amenity)}
                      onChange={(e) => {
                        const newAmenities = e.target.checked
                          ? [...filters.amenities, amenity]
                          : filters.amenities.filter((a) => a !== amenity);
                        setFilters({ ...filters, amenities: newAmenities });
                        handleFilterChange();
                      }}
                      className="mr-2 rounded border-gray-300 text-gray-900 focus:ring-gray-300"
                      aria-label={`Select ${amenity}`}
                    />
                    <span className="text-sm text-gray-700">{amenity}</span>
                  </label>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* Location Radius */}
        <div className="mb-6">
          <motion.div
            className="section-header flex items-center justify-between p-3 cursor-pointer"
            onClick={() => toggleSection('location')}
            whileHover={{ scale: 1.01 }}
          >
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-gray-900 text-lg" />
              <h3 className="text-lg font-semibold text-gray-900">Location Radius</h3>
            </div>
            <span className="text-sm text-gray-600">{expandedSections.location ? '−' : '+'}</span>
          </motion.div>
          {expandedSections.location && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="p-4"
            >
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Search Radius (km)
              </label>
              <input
                type="range"
                min={5}
                max={100}
                step={5}
                value={filters.locationRadius}
                onChange={(e) => {
                  setFilters({ ...filters, locationRadius: Number(e.target.value) });
                  handleFilterChange();
                }}
                className="w-full input-range"
                aria-label="Location radius"
              />
              <p className="text-sm text-gray-600 mt-1">{filters.locationRadius} km</p>
            </motion.div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 mt-6">
          <motion.button
            onClick={handleClearFilters}
            className="btn-secondary text-black flex items-center gap-4"
            whileHover="btn-Outline"
            aria-label="Clear all filters"
          >
            <FaTimes />
            Clear Filters
          </motion.button>
          <motion.button
            onClick={handleFilterChange}
            className="btn-primary"
            whileHover={{ scale: 1.05 }}
            aria-label="Apply filters"
          >
            Apply Filters
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default AdvancedFilters;