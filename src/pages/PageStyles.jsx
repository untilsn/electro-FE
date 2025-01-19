import React from "react";
import Header from "../components/header/Header";
import { Outlet } from "react-router-dom";
import FooterContact from "../modules/homepage/footer/FooterContact";
import Footer from "../modules/homepage/footer/Footer";
const PageStyles = () => {
  return (
    <>
      <Header></Header>
      <Outlet></Outlet>
      <Footer></Footer>
    </>
  );
};

export default PageStyles;
