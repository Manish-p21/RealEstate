import React from "react";
import PropertyList from "./PropertyList.js";
import Sidebar from "./Sidebar.jsx";

const PropertyPage = () => {
  return (
    <div className="w-full px-0 sm:px-0 md:px-16 lg:px-40 mx-auto grid grid-cols-1 lg:grid-cols-5 gap-6 p-6">
      <div className="col-span-1 lg:col-span-4">
        <PropertyList />
      </div>
      <div className="hidden lg:block lg:col-span-1">
        <Sidebar />
      </div>
    </div>
  );
};

export default PropertyPage;