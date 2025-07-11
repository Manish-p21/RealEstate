import React from "react";

const Sidebar = () => {
  return (
    <aside className="w-full max-w-md space-y-10 mt-24">
      {/* Section 1: Welcome Banner */}
      <div
        className="relative h-[400px] rounded-2xl shadow-xl overflow-hidden text-white flex flex-col justify-end p-8"
        style={{
          backgroundImage: `url('https://realestate-3rel.onrender.com/uploads/4.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="relative z-10">
          <h2 className="text-4xl font-extrabold">Welcome to Your Real Estate Journey</h2>
          <p className="mt-2 text-sm opacity-90">
            Unlock the door to your dream property with personalized expert advice.
          </p>
          <button className="mt-6 bg-blue-600 text-white py-2 px-6 rounded-full font-semibold hover:bg-blue-700 transition-colors">
            Get Started
          </button>
        </div>
      </div>

      {/* Section 2: Featured Property */}
      <div className="bg-gray-50 p-6 rounded-2xl shadow-md">
        <h3 className="text-2xl font-bold text-gray-800 flex items-center">
          <span className="w-1.5 h-6 bg-black mr-3 rounded-full"></span> Featured Property
        </h3>
        <img
          src="https://realestate-3rel.onrender.com/uploads/3.jpg"
          alt="Featured Property"
          className="w-full h-72 object-cover mt-4 rounded-lg hover:scale-[1.03] transition-transform"
        />
        <div className="mt-4">
          <p className="text-lg font-medium">Oceanview Penthouse</p>
          <p className="text-sm text-gray-600">3 Beds • 2 Baths • $750,000</p>
          <button className="mt-3 text-blue-600 underline text-sm hover:text-blue-800">
            View Details
          </button>
        </div>
      </div>

      {/* Section 3: Market Insights */}
      <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200">
        <h3 className="text-2xl font-bold text-gray-800 flex items-center "><span className="w-1.5 h-6 bg-black mr-3 rounded-full"></span> Market Insights</h3>
        <p className="text-sm text-gray-600 mt-2">
          Stay ahead with the latest trends in real estate.
        </p>
        <ul className="mt-4 space-y-3 text-sm text-gray-700">
          <li className="flex items-center">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
            Prices up 5% in Q1 2025
          </li>
          <li className="flex items-center">
            <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
            High demand for urban condos
          </li>
          <li className="flex items-center">
            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
            Suburbs gaining popularity
          </li>
        </ul>
        <button className="mt-4 text-blue-600 underline text-sm hover:text-blue-800">
          Read Full Report
        </button>
      </div>

      {/* Section 4: Mortgage Calculator Promo */}
      <div
        className="h-64 rounded-2xl shadow-md p-6 text-white relative"
        style={{
          backgroundImage: `url('https://realestate-3rel.onrender.com/uploads/2.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/50 rounded-2xl"></div>
        <div className="relative z-10">
          <h3 className="text-2xl font-bold text-white-800 flex items-center"><span className="w-1.5 h-6 bg-white mr-3 rounded-full"></span> Plan Your Purchase</h3>
          <p className="text-sm mt-2">Use our free mortgage calculator to estimate your payments.</p>
          <button className="mt-4 bg-white text-black py-2 px-5 rounded-lg font-medium hover:bg-gray-100">
            Try It Now
          </button>
        </div>
      </div>

      {/* Section 5: Testimonials */}
      <div className="bg-gray-100 p-6 rounded-2xl shadow-md">
        <h3 className="text-2xl font-semibold text-gray-800 flex items-center"><span className="w-1.5 h-6 bg-black mr-3 rounded-full"></span>What Our Clients Say</h3>
        <div className="mt-4 space-y-4">
          <div>
            <p className="text-sm text-gray-700 italic">
              "Found my dream home in just two weeks thanks to their team!"
            </p>
            <p className="text-xs text-gray-500 mt-1">- Sarah M.</p>
          </div>
          <div>
            <p className="text-sm text-gray-700 italic">
              "Expert guidance made the process so smooth."
            </p>
            <p className="text-xs text-gray-500 mt-1">- John D.</p>
          </div>
        </div>
      </div>

      {/* Section 6: Upcoming Open Houses */}
      <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200">
        <h3 className="text-2xl font-semibold text-gray-800 flex items-center"><span className="w-1.5 h-6 bg-black mr-3 rounded-full"></span>Upcoming Open Houses</h3>
        <div className="mt-4 space-y-4">
          <div className="flex items-center">
            <img
              src="https://realestate-3rel.onrender.com/uploads/map.png"
              alt="Open House 1"
              className="w-20 h-20 object-cover rounded-lg mr-4"
            />
            <div>
              <p className="text-sm font-medium">Coastal Villa</p>
              <p className="text-xs text-gray-600">April 5, 2025 • 2-4 PM</p>
            </div>
          </div>
          <div className="flex items-center">
            <img
              src="/Images/2.jpg"
              alt="Open House 2"
              className="w-20 h-20 object-cover rounded-lg mr-4"
            />
            <div>
              <p className="text-sm font-medium">City Loft</p>
              <p className="text-xs text-gray-600">April 7, 2025 • 1-3 PM</p>
            </div>
          </div>
        </div>
        <button className="mt-4 text-blue-600 underline text-sm hover:text-blue-800">
          See All Events
        </button>
      </div>

      {/* Section 7: Quick Contact */}
      <div className="bg-blue-50 p-6 rounded-2xl shadow-md">
        <h3 className="text-2xl font-semibold text-gray-800 flex items-center"><span className="w-1.5 h-6 bg-black mr-3 rounded-full"></span>Need Help?</h3>
        <p className="text-sm text-gray-600 mt-2">
          Contact our team for instant support or to schedule a consultation.
        </p>
        <div className="mt-4 space-y-2">
          <p className="text-sm text-gray-700">📞 (555) 123-4567</p>
          <p className="text-sm text-gray-700">✉️ support@realestate.com</p>
        </div>
        <button className="mt-4 bg-blue-600 text-white py-2 px-5 rounded-lg font-medium hover:bg-blue-700">
          Contact Us
        </button>
      </div>

      {/* Section 8: Newsletter Signup */}
      <div
        className="h-72 rounded-2xl shadow-md p-6 text-white relative"
        style={{
          backgroundImage: `url('https://realestate-3rel.onrender.com/uploads/2.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-blue-600/60 rounded-2xl"></div>
        <div className="relative z-10">
          <h3 className="text-2xl font-bold flex items-center"><span className="w-1.5 h-6 bg-white mr-3 rounded-full"></span>Stay in the Loop</h3>
          <p className="text-sm mt-2">
            Subscribe to get exclusive property listings and market updates.
          </p>
          <input
            type="email"
            placeholder="Enter your email"
            className="mt-4 w-full py-2 px-4 rounded-lg text-black text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button className="mt-4 bg-white text-blue-600 py-2 px-6 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Subscribe
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;