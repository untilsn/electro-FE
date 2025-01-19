import { Breadcrumbs } from "@material-tailwind/react";
import React from "react";
import { FaSignInAlt, FaCog, FaBell } from "react-icons/fa";
import Breadcrumb from "../../components/breadcrumb/Breadcrumb";
import DashboardHeading from "../../modules/dashboard/DashboardHeading";

const DashboardLayout = ({ children }) => {
  return (
    <div>
      <DashboardHeading></DashboardHeading>
      <div className="px-5">
        {/* body */}
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
