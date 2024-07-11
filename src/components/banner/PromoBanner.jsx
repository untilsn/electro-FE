import React from "react";
import backgroundPromo from "/public/promobanner.jpg";
import ButtonItem from "../button/ButtonItem";

const PromoBanner = () => {
  return (
    <div className="py-20">
      <div
        className="w-full h-full p-5"
        style={{
          backgroundImage: `url(${backgroundPromo})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="bg-white p-5 w-full h-[140px] flex items-center justify-center gap-x-20">
          <div className="text-2xl font-semibold text-end">
            <span className="text-yellowColor">New Deals</span>
            <div>Start Daily at 12pm e.t.</div>
          </div>
          <div className="text-sm text-gray max-w-[440px] w-full ">
            <p>
              Get<span className="text-darkPrimary">FREE SHIPPING* & 5% </span>
              rewards on every order with Molla Theme rewards program
            </p>
          </div>
          <div>
            <ButtonItem>Add to Cart for $50.00/yr</ButtonItem>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromoBanner;
