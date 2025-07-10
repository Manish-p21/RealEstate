import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaSort } from 'react-icons/fa';

const PropertySort = ({ onSortChange }) => {
  const [sortBy, setSortBy] = useState('relevance');
  const [order, setOrder] = useState('desc');

  const sortOptions = [
    { value: 'relevance', label: 'Relevance' },
    { value: 'price', label: 'Price' },
    { value: 'date', label: 'Date Listed' },
  ];

  const handleSort = () => {
    onSortChange({ sortBy, order });
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-6 py-12 bg-gray-50">
      <style>
        {`
          .sort-container {
            border: 1px solid #e5e7eb;
            border-radius: 16px;
            background: white;
            transition: box-shadow 0.3s ease, transform 0.3s ease;
          }
          .sort-container:hover {
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

      <motion.div
        className="sort-container p-6 animate-slideUp"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div style={{ borderLeft: '6px solid black', paddingLeft: '1rem', marginBottom: '2rem' }}>
          <div className="flex items-center gap-2">
            <FaSort className="text-gray-900 text-lg" />
            <h2 className="text-2xl font-bold text-gray-900">Sort Properties</h2>
          </div>
          <p className="text-sm text-gray-600 mt-1">Customize the order of your search results</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-900 mb-2">Sort By</label>
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
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">Order</label>
            <motion.button
              onClick={() => {
                setOrder(order === 'desc' ? 'asc' : 'desc');
                handleSort();
              }}
              className="btn-primary flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              aria-label={`Sort in ${order === 'desc' ? 'ascending' : 'descending'} order`}
            >
              {order === 'desc' ? '↓ Desc' : '↑ Asc'}
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PropertySort;