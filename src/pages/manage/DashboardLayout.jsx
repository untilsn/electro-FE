import { Breadcrumbs } from "@material-tailwind/react";
import React from "react";
import { FaSignInAlt, FaCog, FaBell } from "react-icons/fa";
import Breadcrumb from "../../components/breadcrumb/Breadcrumb";

const DashboardLayout = ({ children }) => {
  return (
    <div className="p-10">
      {/* body */}
      {children}
    </div>
  );
};

export default DashboardLayout;
