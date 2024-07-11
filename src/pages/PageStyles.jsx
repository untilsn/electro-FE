import React from "react";
import Header from "../components/header/Header";
import DashboardFeature from "../modules/headerFeature/DashboardFeature";
import { Outlet } from "react-router-dom";
import FooterContact from "../modules/homepage/footer/FooterContact";
const PageStyles = () => {
  return (
    <>
      <Header></Header>
      <DashboardFeature></DashboardFeature>
      <Outlet></Outlet>
      <FooterContact></FooterContact>
    </>
  );
};

export default PageStyles;
