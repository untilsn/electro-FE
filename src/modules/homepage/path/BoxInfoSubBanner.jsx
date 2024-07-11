import React from "react";
import { FaLongArrowAltRight } from "react-icons/fa";

const BoxInfoSubBanner = ({ title, subTitle, heading }) => {
  return (
    <div className="inline-flex flex-col px-8 pt-3 pb-2">
      <h2 className="text-sm text-gray text-opacity-60">{heading}</h2>
      <h1 className="text-xl font-semibold text-darkPrimary">
        {title} <br />
        <span>{subTitle}</span>
      </h1>
      <button className="inline-flex items-center justify-start gap-3 px-3 py-2 -ml-3 max-w-[120px] w-full bg-transparent rounded-full text-yellowColor hover:bg-yellowColor hover:text-white">
        Shop Now
        <span>
          <FaLongArrowAltRight />
        </span>
      </button>
    </div>
  );
};

export default BoxInfoSubBanner;
