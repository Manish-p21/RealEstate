import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaHome, FaBuilding, FaCity, FaHouseUser } from 'react-icons/fa';
import PropTypes from 'prop-types';

const PropertyTypeSelector = ({ onTypeChange = () => {} }) => {
  const [selectedTypes, setSelectedTypes] = useState([]);

  const propertyTypes = [
    { name: 'House', icon: <FaHome className="text-lg" /> },
    { name: 'Condo', icon: <FaBuilding className="text-lg" /> },
    { name: 'Apartment', icon: <FaCity className="text-lg" /> },
    { name: 'Townhouse', icon: <FaHouseUser className="text-lg" /> },
  ];

  const handleTypeToggle = (type) => {
    const newTypes = selectedTypes.includes(type)
      ? selectedTypes.filter((t) => t !== type)
      : [...selectedTypes, type];
    setSelectedTypes(newTypes);
    onTypeChange(newTypes);
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-6 py-12 bg-gray-50">
      <style>
        {`
          .selector-container {
            border: 1px solid #e5e7eb;
            border-radius: 16px;
            background: white;
            transition: box-shadow 0.3s ease, transform 0.3s ease;
          }
          .selector-container:hover {
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
            transform: translateY(-6px);
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
        `}
      </style>

      <motion.div
        className="selector-container p-6 animate-slideUp"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div style={{ borderLeft: '6px solid black', paddingLeft: '1rem', marginBottom: '2rem' }}>
          <div className="flex items-center gap-2">
            <FaHome className="text-gray-900 text-lg" />
            <h2 className="text-2xl font-bold text-gray-900">Property Types</h2>
          </div>
          <p className="text-sm text-gray-600 mt-1">Select the types of properties to include</p>
        </div>

        <div className="flex flex-wrap gap-4">
          {propertyTypes.map((type) => (
            <motion.button
              key={type.name}
              onClick={() => handleTypeToggle(type.name)}
              className={`btn-type flex items-center gap-2 ${
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
  );
};

PropertyTypeSelector.propTypes = {
  onTypeChange: PropTypes.func,
};

export default PropertyTypeSelector;