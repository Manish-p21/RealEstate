import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaFilter } from 'react-icons/fa';

// Note: Using Leaflet with OpenStreetMap for a token-less map solution
const PropertyMap = ({ properties }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    priceMin: 0,
    priceMax: Infinity,
    propertyType: 'all',
  });
  const [expandedSections, setExpandedSections] = useState({ filters: true });
  const [showOverlay, setShowOverlay] = useState(true); // State for overlay
  const leafletLoaded = useRef(false); // Track if Leaflet is loaded

  const propertyTypes = ['All', 'House', 'Apartment', 'Condo', 'Villa'];

  // Filter properties
  const filteredProperties = properties.filter((property) => {
    const matchesPrice =
      property.price >= filters.priceMin && property.price <= filters.priceMax;
    const matchesType =
      filters.propertyType === 'all' || property.type === filters.propertyType;
    return matchesPrice && matchesType;
  });

  // Calculate map bounds
  const getMapBounds = (props) => {
    if (!props.length) return null;
    const bounds = props
      .filter((p) => p.latitude && p.longitude)
      .map((p) => [p.latitude, p.longitude]);
    return bounds.length ? bounds : null;
  };

  // Load Leaflet CSS and JS
  useEffect(() => {
    if (leafletLoaded.current) return; // Skip if already loaded

    // Load Leaflet CSS
    const cssLink = document.createElement('link');
    cssLink.rel = 'stylesheet';
    cssLink.href = 'https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/leaflet.css';
    document.head.appendChild(cssLink);

    // Load Leaflet JS
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/leaflet.js';
    script.async = true;
    script.onload = () => {
      leafletLoaded.current = true;
      setLoading(false);
    };
    script.onerror = () => {
      setError('Failed to load Leaflet library');
      setLoading(false);
    };
    document.head.appendChild(script);

    // Cleanup
    return () => {
      // Optionally keep CSS and JS in DOM to avoid reloads
    };
  }, []);

  // Initialize map and markers
  useEffect(() => {
    if (!leafletLoaded.current || !window.L || !properties?.length) {
      if (!properties?.length) {
        setError('No properties to display');
        setLoading(false);
      }
      return;
    }

    try {
      // Initialize map
      map.current = window.L.map(mapContainer.current, {
        zoomControl: !showOverlay, // Disable zoom control when overlay is active
        dragging: !showOverlay, // Disable dragging when overlay is active
      }).setView([40.7128, -74.006], 12);

      // Add OpenStreetMap tiles
      window.L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(map.current);

      // Fit map to bounds
      const bounds = getMapBounds(filteredProperties);
      if (bounds) {
        map.current.fitBounds(bounds, { padding: [50, 50], maxZoom: 15 });
      }

      // Add markers
      filteredProperties.forEach((property) => {
        if (!property.latitude || !property.longitude) return;
        const popupContent = `
          <div class="popup-content">
            <h3 class="font-bold text-gray-900">${property.title}</h3>
            <p class="text-gray-600">$${property.price.toLocaleString()}</p>
            <p class="text-sm text-gray-500">${property.type}</p>
            <p class="text-sm text-gray-500">${property.address || 'No address'}</p>
          </div>
        `;
        window.L.marker([property.latitude, property.longitude])
          .addTo(map.current)
          .bindPopup(popupContent);
      });

      // Enable/disable interactions based on overlay
      if (showOverlay) {
        map.current.touchZoom.disable();
        map.current.doubleClickZoom.disable();
        map.current.scrollWheelZoom.disable();
        map.current.boxZoom.disable();
        map.current.keyboard.disable();
      } else {
        map.current.touchZoom.enable();
        map.current.doubleClickZoom.enable();
        map.current.scrollWheelZoom.enable();
        map.current.boxZoom.enable();
        map.current.keyboard.enable();
        map.current.zoomControl.addTo(map.current);
      }

      setLoading(false);
    } catch (err) {
      setError('Failed to initialize map: ' + err.message);
      setLoading(false);
    }

    // Cleanup map
    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [filteredProperties, showOverlay]);

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters({ priceMin: 0, priceMax: Infinity, propertyType: 'all' });
  };

  const handleOverlayClick = () => {
    setShowOverlay(false); // Remove overlay and enable interactions
  };

  return (
    <div className="w-full mx-auto px-6 py-12 bg-gray-50 relative z-0">
      {/* Embedded CSS */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .map-grid {
          display: grid;
          grid-template-columns: 1fr 3fr; /* Left sidebar 1fr, right map 3fr */
          gap: 24px;
        }
        .map-sidebar {
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          padding: 16px;
          position: sticky;
          top: 24px;
          max-height: calc(100vh - 48px);
          overflow-y: auto;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          z-index: 10;
        }
        .map-container {
          border: 1px solid #e5e7eb;
          border-radius: 16px;
          background: white;
          transition: box-shadow 0.3s ease, transform 0.3s ease;
          position: relative;
          overflow: hidden;
          z-index: 5;
        }
        .map-container:hover {
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
        .btn-reset {
          background: #f3f4f6;
          color: #6b7280;
          padding: 10px 20px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
          transition: all 0.3s ease;
        }
        .btn-reset:hover {
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
          -webkit-appearance: none;
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
          outline: none;
        }
        .input-range:focus {
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.3);
        }
        .error-message {
          color: #dc2626;
          font-size: 12px;
          margin-top: 4px;
        }
        .popup-content {
          padding: 8px;
          max-width: 200px;
          font-family: Arial, sans-serif;
        }
        .loading-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(255, 255, 255, 0.8);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 30;
          border-radius: 16px;
        }
        .overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.6); /* Darker background for visibility */
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 100; /* High z-index to ensure it's above map */
          border-radius: 16px;
          cursor: pointer;
        }
        .overlay-text {
          background: white;
          padding: 20px 32px;
          border-radius: 12px;
          font-size: 20px;
          font-weight: 600;
          color: #1f2937;
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.3);
          border: 2px solid #2563eb; /* Blue border for emphasis */
        }
        #map {
          width: 100%;
          height: 100%;
          position: relative;
          z-index: 1;
        }
        @media (max-width: 1024px) {
          .map-grid {
            grid-template-columns: 1fr; /* Stack vertically on mobile */
          }
          .map-sidebar {
            position: static;
            max-height: none;
            margin-bottom: 24px;
          }
        }
      `}</style>

      {/* Title Section */}
      <div style={{ borderLeft: '6px solid black', paddingLeft: '1rem', marginBottom: '2rem', position: 'relative', zIndex: 10 }}>
        <h2 className="text-2xl font-bold text-gray-900">Properties on Map</h2>
        <p className="text-sm text-gray-600 mt-1">Explore properties in your area</p>
      </div>

      {/* Grid Layout (Sidebar and Map) */}
      <div className="map-grid">
        {/* Left Sidebar (Filters Only) */}
        <motion.div
          className="map-sidebar"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Filter Section */}
          <div>
            <motion.div
              className="section-header flex items-center justify-between p-3 cursor-pointer"
              onClick={() => toggleSection('filters')}
              whileHover={{ scale: 1.01 }}
            >
              <div className="flex items-center gap-2">
                <FaFilter className="text-gray-900 text-lg" />
                <h3 className="text-lg font-semibold text-gray-900">Filter Properties</h3>
              </div>
              <span className="text-sm text-gray-600">{expandedSections.filters ? '−' : '+'}</span>
            </motion.div>
            {expandedSections.filters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="p-4 space-y-4"
              >
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Min Price
                    </label>
                    <input
                      type="range"
                      min={0}
                      max={5000000}
                      step={10000}
                      value={filters.priceMin}
                      onChange={(e) => handleFilterChange('priceMin', Number(e.target.value))}
                      className="w-full input-range"
                      aria-label="Minimum price"
                    />
                    <p className="text-sm text-gray-600 mt-1">
                      ${filters.priceMin.toLocaleString()}
                    </p>
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Max Price
                    </label>
                    <input
                      type="range"
                      min={0}
                      max={5000000}
                      step={10000}
                      value={filters.priceMax === Infinity ? 5000000 : filters.priceMax}
                      onChange={(e) => handleFilterChange('priceMax', Number(e.target.value))}
                      className="w-full input-range"
                      aria-label="Maximum price"
                    />
                    <p className="text-sm text-gray-600 mt-1">
                      ${filters.priceMax === Infinity ? 'Any' : filters.priceMax.toLocaleString()}
                    </p>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Property Type
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {propertyTypes.map((type) => (
                      <motion.button
                        key={type}
                        onClick={() => handleFilterChange('propertyType', type.toLowerCase())}
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
                </div>
                <div className="flex justify-end">
                  <motion.button
                    onClick={resetFilters}
                    className="btn-reset"
                    whileHover={{ scale: 1.05 }}
                    aria-label="Reset filters"
                  >
                    Reset Filters
                  </motion.button>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Right Map Section */}
        <motion.div
          className="map-container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {loading && (
            <div className="loading-overlay">
              <p className="text-gray-600 font-medium">Loading map...</p>
            </div>
          )}
          {error && (
            <div className="p-4 bg-red-50 text-red-600 rounded-lg mb-4">
              <p>{error}</p>
            </div>
          )}
          {showOverlay && (
            <motion.div
              className="overlay"
              onClick={handleOverlayClick}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <span className="overlay-text">Click to Interact with Map</span>
            </motion.div>
          )}

          {/* Map */}
          <div
            id="map"
            ref={mapContainer}
            className="w-full h-[50vh] min-h-[400px] max-h-[600px] rounded-lg"
            aria-label="Map of properties"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default PropertyMap;