import React, { useEffect } from "react";
import Breadcrumb from "../components/breadcrumb/Breadcrumb";
import ShopBanner from "../modules/shop/ShopBanner";
import DashboardSidebar from "../modules/dashboard/DashboardSidebar";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import DashboardLayout from "./manage/DashboardLayout";
import { toast } from "react-toastify";

const DashboardPage = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  // useEffect(() => {
  //   if (user?.isAdmin !== true) {
  //     toast.warning("you dont have right to manage page");
  //     navigate("/"); // Navigate to home page
  //   }

  //   return;
  // }, [user]);
  return (
    <div>
      <ShopBanner title="dashboard" subtitle="user"></ShopBanner>
      <Breadcrumb children="dashboard" item={user}></Breadcrumb>
      <div className="border-t border-gray border-opacity-10">
        <div className="grid grid-cols-[300px_minmax(0,_1fr)] ">
          <DashboardSidebar></DashboardSidebar>
          <DashboardLayout>
            <Outlet></Outlet>
          </DashboardLayout>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
