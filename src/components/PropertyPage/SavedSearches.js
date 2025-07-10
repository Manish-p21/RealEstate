import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaTrash, FaEdit, FaSave } from 'react-icons/fa';

const SavedSearches = ({ onRunSearch }) => {
  const [savedSearches, setSavedSearches] = useState([
    { id: 1, query: 'New York, NY, 2 Beds' },
    { id: 2, query: 'Miami, FL, Pool' },
  ]);

  const handleDelete = (id) => {


    setSavedSearches(savedSearches.filter((search) => search.id !== id));
  };

  return (
    <div className="w-full  mx-auto px-6 py-12 bg-gray-50">
      <style>
        {`
          .saved-container {
            border: 1px solid #e5e7eb;
            border-radius: 16px;
            background: white;
            transition: box-shadow 0.3s ease, transform 0.3s ease;
          }
          .saved-container:hover {
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
          .btn-edit, .btn-delete {
            padding: 8px;
            border-radius: 8px;
            color: #6b7280;
            transition: all 0.3s ease;
          }
          .btn-edit:hover {
            background: #e5e7eb;
            color: #2563eb;
            transform: translateY(-1px);
          }
          .btn-delete:hover {
            background: #e5e7eb;
            color: #dc2626;
            transform: translateY(-1px);
          }
          .search-item {
            background: #f9fafb;
            border-radius: 8px;
            transition: all 0.3s ease;
          }
          .search-item:hover {
            background: #e5e7eb;
          }
        `}
      </style>

      <motion.div
        className="saved-container p-6 animate-slideUp"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div style={{ borderLeft: '6px solid black', paddingLeft: '1rem', marginBottom: '2rem' }}>
          <div className="flex items-center gap-2">
            <FaSave className="text-gray-900 text-lg" />
            <h2 className="text-2xl font-bold text-gray-900">Saved Searches</h2>
          </div>
          <p className="text-sm text-gray-600 mt-1">Access your saved property searches</p>
        </div>

        <div className="space-y-4">
          {savedSearches.map((search) => (
            <motion.div
              key={search.id}
              className="search-item flex justify-between items-center p-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.span
                onClick={() => onRunSearch(search.query)}
                className="btn-search cursor-pointer"
                whileHover={{ scale: 1.05 }}
                aria-label={`Run saved search ${search.query}`}
              >
                {search.query}
              </motion.span>
              <div className="flex gap-4">
                <motion.button
                  onClick={() => console.log('Edit search', search.id)}
                  className="btn-edit"
                  whileHover={{ scale: 1.05 }}
                  aria-label={`Edit search ${search.query}`}
                >
                  <FaEdit className="text-lg" />
                </motion.button>
                <motion.button
                  onClick={() => handleDelete(search.id)}
                  className="btn-delete"
                  whileHover={{ scale: 1.05 }}
                  aria-label={`Delete search ${search.query}`}
                >
                  <FaTrash className="text-lg" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.button
          onClick={() => console.log('Save current search')}
          className="btn-primary mt-6 flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
          aria-label="Save current search"
        >
          <FaSave />
          Save Current Search
        </motion.button>
      </motion.div>
    </div>
  );
};

export default SavedSearches;