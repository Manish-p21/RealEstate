import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { FaSchool, FaExclamationTriangle, FaTree } from 'react-icons/fa';

const NeighborhoodInsights = () => {
  const [activeTab, setActiveTab] = useState('schools');
  const [isLoading, setIsLoading] = useState(false);

  // Tab configuration
  const tabs = [
    { name: 'Schools', key: 'schools', icon: <FaSchool className="text-lg" /> },
    { name: 'Crime', key: 'crime', icon: <FaExclamationTriangle className="text-lg" /> },
    { name: 'Amenities', key: 'amenities', icon: <FaTree className="text-lg" /> },
  ];

  // Demo data for each tab
  const tabData = {
    schools: [
      { name: 'Lincoln Elementary', rating: 8.2 },
      { name: 'Washington Middle', rating: 7.5 },
      { name: 'Jefferson High', rating: 9.0 },
    ],
    crime: [
      { name: 'Theft', incidents: 15 },
      { name: 'Vandalism', incidents: 7 },
      { name: 'Assault', incidents: 4 },
    ],
    amenities: [
      { name: 'Parks', count: 5 },
      { name: 'Gyms', count: 3 },
      { name: 'Libraries', count: 2 },
    ],
  };

  // Handle download report (placeholder)
  const handleDownload = () => {
    console.log(`Downloading report for ${activeTab}`);
    // Future: Implement actual report download logic
  };

  // Reset active tab
  const handleReset = () => {
    setActiveTab('schools');
  };

  // Render tab content
  const renderTabContent = () => {
    if (isLoading) {
      return (
        <motion.div
          className="p-4 bg-white rounded-lg text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-sm text-black">Loading data...</p>
        </motion.div>
      );
    }

    const data = tabData[activeTab];
    const dataKey = activeTab === 'schools' ? 'rating' : activeTab === 'crime' ? 'incidents' : 'count';
    const label = activeTab === 'schools' ? 'Rating' : activeTab === 'crime' ? 'Incidents' : 'Count';

    // Debug data
    console.log(`Rendering chart for ${activeTab}:`, { data, dataKey });

    return (
      <motion.div
        className="chart-container text-black"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <BarChart
          width={Math.min(window.innerWidth - 40, 600)}
          height={350}
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          aria-label={`${activeTab} data chart`}
          aria-describedby="chart-description"
        >
          <XAxis dataKey="name" stroke="#000000" />
          <YAxis stroke="#000000" />
          <Tooltip formatter={(value) => `${value} ${label}`} />
          <Bar
            dataKey={dataKey}
            fill="url(#barGradient)"
            barSize={60}
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
        <svg width="0" height="0">
          <defs>
            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#000000" />
              <stop offset="100%" stopColor="#4b5563" />
            </linearGradient>
          </defs>
        </svg>
        <p id="chart-description" className="sr-only">
          Bar chart displaying {activeTab} data for the neighborhood.
        </p>
      </motion.div>
    );
  };

  return (
    <div className="w-full mx-auto px-6 py-12 ">
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
          .insights-container {
            background: white;
            border-radius: 16px;
            padding: 1.5rem;
            transition: box-shadow 0.3s ease, transform 0.3s ease;
          }
          .insights-container:hover {
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
            transform: translateY(-6px);
          }
          .btn-primary {
            background: linear-gradient(135deg, #000000, #4b5563);
            color: white;
            padding: 10px 20px;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 500;
            transition: all 0.3s ease;
          }
          .btn-primary:hover:not(:disabled) {
            background: linear-gradient(135deg, #1f2937, #6b7280);
            transform: translateY(-1px);
          }
          .btn-primary:disabled {
            opacity: 0.6;
            cursor: not-allowed;
          }
          .btn-reset {
            background: #e5e7eb;
            color: #000000;
            padding: 10px 20px;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 500;
            transition: all 0.3s ease;
          }
          .btn-reset:hover {
            background: #d1d5db;
            color: #1f2937;
            transform: translateY(-1px);
          }
          .tab {
            padding: 8px 16px;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 500;
            transition: all 0.3s ease;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 8px;
          }
          .tab-active {
            background: linear-gradient(135deg,rgb(67, 67, 67), #4b5563);
            color: white;
          }
          .tab-inactive {
            background: #e5e7eb;
            color: #000000;
          }
          .tab-inactive:hover {
            background: #d1d5db;
            color: #1f2937;
          }
          .chart-container {
            background: white;
            border-radius: 12px;
            padding: 16px;
          }
          .header {
            border-left: 6px solid #000000;
            padding-left: 1rem;
            margin-bottom: 2rem;
          }
          .sr-only {
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            margin: -1px;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            border: 0;
          }
        `}
      </style>

      <motion.div
        className=" animate-slideUp"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div style={{ borderLeft: '6px solid black', paddingLeft: '1rem', marginBottom: '2rem' }}>
        <h2 className="text-2xl font-bold text-gray-900">Neighborhood Insights</h2>
        <p className="text-sm text-gray-600 mt-1">Explore key metrics about the neighborhood</p>
        </div>

        <div className="flex flex-wrap gap-4 mb-4" role="tablist">
          {tabs.map((tab) => (
            <motion.button
              key={tab.key}
              onClick={() => {
                setIsLoading(true);
                setTimeout(() => {
                  setActiveTab(tab.key);
                  setIsLoading(false);
                }, 500); // Simulate loading
              }}
              className={`tab ${activeTab === tab.key ? 'tab-active' : 'tab-inactive'}`}
              whileHover={{ scale: 1.05 }}
              role="tab"
              aria-selected={activeTab === tab.key}
              aria-label={`View ${tab.name} insights`}
            >
              {tab.icon}
              {tab.name}
            </motion.button>
          ))}
        </div>

        {renderTabContent()}

        <div className="flex gap-4 mt-4">
          <motion.button
            className="btn-primary"
            whileHover={{ scale: 1.005 }}
            onClick={handleDownload}
            aria-label="Download neighborhood report"
            disabled={isLoading}
          >
            Download Report
          </motion.button>
          <motion.button
            className="btn-reset"
            whileHover={{ scale: 1.005 }}
            onClick={handleReset}
            aria-label="Reset to default tab"
          >
            Reset
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default NeighborhoodInsights;