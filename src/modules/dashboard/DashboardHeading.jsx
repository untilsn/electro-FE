import React from "react";

const DashboardHeading = ({ children }) => {
  return (
    <div className="text-2xl font-medium capitalize text-darkPrimary">
      {children}
    </div>
  );
};

export default DashboardHeading;
