import React from "react";

import ButtonItem from "../../components/button/ButtonItem";
const MainBanner = ({ img, title, subTitle, price, secondPrice, heading }) => {
  return (
    <div
      className="w-full h-full col-span-2"
      style={{
        backgroundImage: `url(${img})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="w-full py-10 px-20 h-[400px] inline-flex flex-col justify-center gap-4">
        <h2 className="text-xl font-light text-yellowColor">{heading}</h2>
        <h1 className="text-5xl font-bold text-darkPrimary">
          {title} <br />
          {subTitle}
        </h1>
        <p className="flex items-start gap-1 text-darkPrimary">
          <span
            className={`${
              secondPrice === "$49,99" ? " line-through" : ""
            } text-xl`}
          >
            {secondPrice}
          </span>
          <span className="text-5xl font-semibold text-yellowColor">
            {price}
          </span>
          <span className="text-2xl font-semibold text-yellowColor">.99</span>
        </p>
        <ButtonItem className="max-w-[180px] w-full justify-center mt-2 bg-opacity-95 hover:bg-warning">
          Click here
        </ButtonItem>
      </div>
    </div>
  );
};

export default MainBanner;
