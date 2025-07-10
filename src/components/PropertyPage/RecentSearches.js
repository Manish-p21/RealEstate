import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaTrash } from 'react-icons/fa';

const RecentSearches = ({ onRunSearch }) => {
  const [searches, setSearches] = useState([
    'New York, NY',
    'Miami, FL',
    'Los Angeles, CA',
  ]);

  const handleDelete = (search) => {
    setSearches(searches.filter((s) => s !== search));
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-6 py-12 bg-gray-50">
      <style>
        {`
          .recent-container {
            border: 1px solid #e5e7eb;
            border-radius: 16px;
            background: white;
            transition: box-shadow 0.3s ease, transform 0.3s ease;
          }
          .recent-container:hover {
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
            transform: translateY(-6px);
          }
          .btn-search {
            padding: 10px 16px;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 500;
            transition: all 0.3s ease;
            background: #f3f4f6;
            color: #6b7280;
          }
          .btn-search:hover {
            background: #e5e7eb;
            color: #2563eb;
          }
          .btn-delete {
            padding: 8px;
            border-radius: 8px;
            color: #6b7280;
            transition: all 0.3s ease;
          }
          .btn-delete:hover {
            background: #e5e7eb;
            color: #dc2626;
            transform: translateY(-1px);
          }
        `}
      </style>

      <motion.div
        className="recent-container p-6 animate-slideUp"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div style={{ borderLeft: '6px solid black', paddingLeft: '1rem', marginBottom: '2rem' }}>
          <div className="flex items-center gap-2">
            <FaSearch className="text-gray-900 text-lg" />
            <h2 className="text-2xl font-bold text-gray-900">Recent Searches</h2>
          </div>
          <p className="text-sm text-gray-600 mt-1">Revisit your recent property searches</p>
        </div>

        <div className="flex flex-wrap gap-4">
          {searches.map((search, index) => (
            <motion.div
              key={index}
              className="flex items-center gap-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <motion.span
                onClick={() => onRunSearch(search)}
                className="btn-search cursor-pointer"
                whileHover={{ scale: 1.05 }}
                aria-label={`Run search for ${search}`}
              >
                {search}
              </motion.span>
              <motion.button
                onClick={() => handleDelete(search)}
                className="btn-delete"
                whileHover={{ scale: 1.05 }}
                aria-label={`Delete search ${search}`}
              >
                <FaTrash className="text-lg" />
              </motion.button>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default RecentSearches;