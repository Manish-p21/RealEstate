import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const SalesOverview = ({ salesData }) => {
  // Sample data for the graph (replace with actual data)
  const graphData = [
    { day: "Mon", sales: 4000, profit: 2400 },
    { day: "Tue", sales: 3000, profit: 1398 },
    { day: "Wed", sales: 2000, profit: 9800 },
    { day: "Thu", sales: 2780, profit: 3908 },
    { day: "Fri", sales: 1890, profit: 4800 },
    { day: "Sat", sales: 2390, profit: 3800 },
    { day: "Sun", sales: 3490, profit: 4300 },
  ];

  // Custom Tooltip for the graph
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
          <p className="font-semibold">{label}</p>
          <p className="text-sm text-blue-500">Sales: ${payload[0].value.toLocaleString()}</p>
          <p className="text-sm text-green-500">Profit: ${payload[1].value.toLocaleString()}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-6">Sales Overview</h2>

      {/* Sales Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h3 className="text-lg font-semibold">Total Sales</h3>
          <p className="text-2xl font-bold text-blue-600">
            ${salesData.totalSales.toLocaleString()}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h3 className="text-lg font-semibold">Monthly Sales</h3>
          <p className="text-2xl font-bold text-green-600">
            ${salesData.monthlySales.toLocaleString()}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h3 className="text-lg font-semibold">Weekly Sales</h3>
          <p className="text-2xl font-bold text-purple-600">
            ${salesData.weeklySales.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Sales Graph */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Sales & Profit Trends</h3>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={graphData} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="day" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={{ r: 5 }}
                activeDot={{ r: 8 }}
              />
              <Line
                type="monotone"
                dataKey="profit"
                stroke="#10b981"
                strokeWidth={3}
                dot={{ r: 5 }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Analysis Section */}
      <div className="mt-12">
        <h3 className="text-xl font-semibold mb-6">Detailed Analysis</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h4 className="text-lg font-semibold mb-4">Top Performing Days</h4>
            <ul className="space-y-3">
              {graphData
                .sort((a, b) => b.sales - a.sales)
                .slice(0, 3)
                .map((item, index) => (
                  <li key={index} className="flex justify-between">
                    <span className="text-gray-700">{item.day}</span>
                    <span className="font-semibold text-blue-600">
                      ${item.sales.toLocaleString()}
                    </span>
                  </li>
                ))}
            </ul>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h4 className="text-lg font-semibold mb-4">Profit Insights</h4>
            <ul className="space-y-3">
              {graphData
                .sort((a, b) => b.profit - a.profit)
                .slice(0, 3)
                .map((item, index) => (
                  <li key={index} className="flex justify-between">
                    <span className="text-gray-700">{item.day}</span>
                    <span className="font-semibold text-green-600">
                      ${item.profit.toLocaleString()}
                    </span>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SalesOverview;