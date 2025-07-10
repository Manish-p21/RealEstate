import React from "react";
import PropertyList from "./PropertyDetail.jsx";
import Sidebar from "./Sidebar.jsx";

const PropertyPage = () => {
  return (
    <div className="w-full   grid grid-cols-10 gap-0 p-6">
      <div className="col-span-7">
        <PropertyList />
      </div>
      <div className="col-span-3 pr-40">
        <Sidebar />
      </div>
    </div>
  );
};

export default PropertyPage;
