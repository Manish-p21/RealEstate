import React from 'react';
import { motion } from 'framer-motion';
import { FaHeart } from 'react-icons/fa';

const PropertyGrid = ({ properties, onQuickView }) => {
  const handleSaveProperty = (id) => {
    console.log(`Saved property ${id}`);
  };

  return (
    <div className="w-full  mx-auto px-6 py-12 bg-gray-50">
      <style>
        {`
          .card-container {
            border: 1px solid #e5e7eb;
            border-radius: 16px;
            background: white;
            transition: box-shadow 0.3s ease, transform 0.3s ease;
          }
          .card-container:hover {
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
          .btn-save {
            color: #6b7280;
            padding: 8px;
            border-radius: 8px;
            transition: all 0.3s ease;
          }
          .btn-save:hover {
            color: #2563eb;
            background: #e5e7eb;
            transform: translateY(-1px);
          }
        `}
      </style>

      <div style={{ borderLeft: '6px solid black', paddingLeft: '1rem', marginBottom: '2rem' }}>
        <h2 className="text-2xl font-bold text-gray-900">Available Properties</h2>
        <p className="text-sm text-gray-600 mt-1">Browse our curated selection of homes</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => (
          <motion.div
            key={property.id}
            className="card-container overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.05 }}
          >
            <img
              src={property.image}
              alt={property.title}
              className="w-full h-48 object-cover"
              loading="lazy"
            />
            <div className="p-4">
              <h3 className="text-xl font-bold text-gray-900">{property.title}</h3>
              <p className="text-gray-600 text-sm mt-1">
                ₹{property.price.toLocaleString()}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                {property.beds} Beds | {property.baths} Baths | {property.sqft} Sqft
              </p>
              <div className="mt-4 flex justify-between items-center">
                <motion.button
                  onClick={() => onQuickView(property)}
                  className="btn-primary"
                  whileHover={{ scale: 1.05 }}
                  aria-label={`Quick view for ${property.title}`}
                >
                  Quick View
                </motion.button>
                <motion.button
                  onClick={() => handleSaveProperty(property.id)}
                  className="btn-save"
                  whileHover={{ scale: 1.05 }}
                  aria-label={`Save ${property.title}`}
                >
                  <FaHeart className="text-lg" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PropertyGrid;