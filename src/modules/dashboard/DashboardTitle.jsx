import React from "react";

const DashboardTitle = ({ children }) => {
  return (
    <div className="text-2xl font-medium capitalize text-darkPrimary mb-5">
      {children}
    </div>
  );
};

export default DashboardTitle;
