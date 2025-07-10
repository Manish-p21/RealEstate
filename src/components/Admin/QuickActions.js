import React from "react";
import { Link } from "react-router-dom";

const QuickActions = () => {
  return (
    <section>
      <h2 className="text-2xl font-semibold mb-6">Quick Actions</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <button className="w-full bg-blue-500 text-white p-6 rounded-lg shadow-md hover:bg-blue-600 transition duration-300">
          Add New Product
        </button>

        {/* Ensure the button inside Link is full width */}
        <Link to="/ManageProducts" className="w-full">
          <button className="w-full bg-green-500 text-white p-6 rounded-lg shadow-md hover:bg-green-600 transition duration-300">
            Manage Orders
          </button>
        </Link>

        <button className="w-full bg-purple-500 text-white p-6 rounded-lg shadow-md hover:bg-purple-600 transition duration-300">
          View Reports
        </button>
      </div>
    </section>
  );
};

export default QuickActions;
