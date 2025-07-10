import React from "react";

const UserActivity = ({ userActivity }) => {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-6">User Activity</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">Total Users</h3>
          <p className="text-2xl font-bold">{userActivity.totalUsers}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">New Users</h3>
          <p className="text-2xl font-bold">{userActivity.newUsers}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">Active Users</h3>
          <p className="text-2xl font-bold">{userActivity.activeUsers}</p>
        </div>
      </div>
    </section>
  );
};

export default UserActivity;