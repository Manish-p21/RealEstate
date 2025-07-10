import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SearchBar from './SearchBar.js';
import AdvancedFilters from './AdvancedFilters.js';
import PropertyGrid from './PropertyGrid.js';
import PropertyMap from './PropertyMap.js';
import SavedSearches from './SavedSearches.js';
import MortgageCalculator from './MortgageCalculator.js';
import PropertySort from './PropertySort.js';
import PropertyTypeSelector from './PropertyTypeSelector.js';
import NeighborhoodInsights from './NeighborhoodInsights.js';
import RecentSearches from './RecentSearches.js';
import PropertyList from './PropertyList.js';

const PropertyPage = () => {
  const [properties, setProperties] = useState([
    {
      id: 1,
      title: 'Modern Condo',
      price: 500000,
      beds: 2,
      baths: 2,
      sqft: 1200,
      image: 'https://via.placeholder.com/300',
      longitude: -74.006,
      latitude: 40.7128,
    },
    // Add more sample properties
  ]);
  const [filters, setFilters] = useState({ propertyTypes: [] });
  const [sort, setSort] = useState({ sortBy: 'relevance', order: 'desc' });

  const handleSearch = async (query) => {
    console.log('Searching for:', query);
  };

  const handleFilterChange = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const handleTypeChange = (newTypes) => {
    setFilters((prev) => ({ ...prev, propertyTypes: newTypes }));
    console.log('Selected Property Types:', newTypes);
  };

  const handleSortChange = (newSort) => {
    setSort(newSort);
  };

  const handleQuickView = (property) => {
    console.log('Quick view:', property);
  };

  return (
    <motion.div
      className="min-h-screen w-full bg-gray-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <style>
        {`
          .page-container {
            max-width: 1600px;
            margin: 0 auto;
            padding: 24px 16px;
          }
          .main-grid {
            display: grid;
            grid-template-columns: 1fr 3fr; /* Left sidebar 1fr, right content 3fr */
            gap: 24px;
            min-height: calc(100vh - 80px);
          }
          .filter-sidebar {
            background: white;
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            padding: 16px;
            position: sticky;
            top: 24px;
            max-height: calc(100vh - 48px);
            overflow-y: auto;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          }
          .filter-sidebar h2 {
            font-size: 1.25rem;
            font-weight: 600;
            margin-bottom: 16px;
            border-bottom: 1px solid #e5e7eb;
            padding-bottom: 8px;
          }
          .main-content {
            display: flex;
            flex-direction: column;
            gap: 24px;
          }
          .search-controls {
            background: white;
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            padding: 16px;
            transition: box-shadow 0.3s ease;
          }
          .search-controls:hover {
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          }
          .listings-content {
            background: #f9fafb;
            border-radius: 8px;
            padding: 16px;
          }
          .full-width-section {
            width: 100%;
            max-width: 1600px;
            margin: 0 auto;
            padding: 24px 16px;
          }
          .sidebar-content {
            display: flex;
            flex-direction: column;
            gap: 24px;
          }
          @media (max-width: 1024px) {
            .main-grid {
              grid-template-columns: 1fr; /* Stack vertically on mobile */
            }
            .filter-sidebar {
              position: static;
              max-height: none;
              margin-bottom: 24px;
            }
            .page-container {
              padding: 16px 8px;
            }
            .full-width-section {
              padding: 16px 8px;
            }
          }
        `}
      </style>

      <div className="pt-5 pr-40 pl-40">
        {/* Grid Section */}
        <motion.div
          className="main-grid "
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Left Sidebar (Filters) */}
          <motion.div
            className="w-[450px] pt-12"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2>Filters</h2>
            <AdvancedFilters onFilterChange={handleFilterChange} />
          </motion.div>

          {/* Right Main Content (Search and Listings) */}
          <motion.div
            className=""
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {/* Search Controls */}
            <div className="pt-20">
              <SearchBar onSearch={handleSearch} />
            </div>

            {/* Listings Section */}
            <div className="listings-content">
              <div className="w-[1200px] text-black">
                <PropertyList />
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Full-Width Section (Map and Sidebar Content) */}
        <div className="w-full">
          <div className="mt-6">
            <PropertyMap properties={properties} />
          </div>
          <div className="main-grid ">
            <MortgageCalculator />
            <NeighborhoodInsights />
            
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PropertyPage;