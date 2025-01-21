import React from "react";
import DashboardSidebar from "../modules/dashboard/DashboardSidebar";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import DashboardLayout from "./manage/DashboardLayout";

const DashboardPage = () => {
  const users = useSelector((state) => state.user);

  return (
    <>
      {users.isAdmin ?
          <div className="bg-[#F8F9FA]">
            <div className="border-t border-gray border-opacity-10">
              <div className="grid grid-cols-[300px_minmax(0,_1fr)] ">
                <DashboardSidebar></DashboardSidebar>
                <DashboardLayout>
                  <Outlet></Outlet>
                </DashboardLayout>
              </div>
            </div>
          </div>
          : <Navigate to="/"></Navigate>
      }
    </>
  );
};

export default DashboardPage;
