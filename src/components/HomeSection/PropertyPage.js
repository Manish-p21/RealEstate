import React from "react";
import PropertyList from "./PropertyList.js";
import Sidebar from "./Sidebar.jsx";

const PropertyPage = () => {
  return (
    <div className="max-w px-40 mx-auto grid grid-cols-5 gap-6 p-6">
      <div className="col-span-4">
        <PropertyList />
      </div>
      <div className="col-span-1">
        <Sidebar />
      </div>
    </div>
  );
};

export default PropertyPage;
