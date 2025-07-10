import React from "react";

const PlatformStatus = ({ platformStatus }) => {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-6">Platform Status</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">Total Products</h3>
          <p className="text-2xl font-bold">{platformStatus.totalProducts}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">Pending Approvals</h3>
          <p className="text-2xl font-bold">{platformStatus.pendingApprovals}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">Total Vendors</h3>
          <p className="text-2xl font-bold">{platformStatus.totalVendors}</p>
        </div>
      </div>
    </section>
  );
};

export default PlatformStatus;