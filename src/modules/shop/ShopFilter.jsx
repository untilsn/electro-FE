import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Accordion,
  AccordionBody,
  AccordionHeader,
} from "@material-tailwind/react";
import { IoMdArrowDropup } from "react-icons/io";
import {
  clearFilters,
  setBrand,
  setPrice,
  setRam,
} from "../../redux/slice/productSlice";

export const COLORLIST = [
  "#343a40", // Dark Gray
  "#007bff", // Blue
  "#d39e00", // Brown
  "#28a745", // Green
  "#f8f9fa", // Light Gray
  "#e83e8c", // Pink
  "#dc3545", // Red
  "#ffc107", // Yellow
];

const brandList = ["Apple", "Samsung", "Xiaomi", "Oppo", "Huawei", "Vivo"];
const ramList = ["2GB", "4GB", "6GB", "8GB", "12GB", "16GB"];
const priceList = [
  "Dưới 2 triệu",
  "2 - 5 triệu",
  "5 - 10 triệu",
  "10 - 15 triệu",
  "Trên 15 triệu",
];

function Icon({ id, open }) {
  return (
    <IoMdArrowDropup
      className={`${
        id === true ? "rotate-180" : ""
      } h-5 w-5 transition-transform text-opacity-50`}
    />
  );
}

const ShopFilter = () => {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.product);

  const [openAcc1, setOpenAcc1] = useState(true);
  const [openAcc2, setOpenAcc2] = useState(true);
  const [openAcc3, setOpenAcc3] = useState(true);

  const handleOpenAcc1 = () => setOpenAcc1((cur) => !cur);
  const handleOpenAcc2 = () => setOpenAcc2((cur) => !cur);
  const handleOpenAcc3 = () => setOpenAcc3((cur) => !cur);

  const handleBrandSelect = (brand) => {
    dispatch(setBrand(brand));
  };

  const handleRamSelect = (ram) => {
    dispatch(setRam(ram));
  };

  const handlePriceSelect = (price) => {
    dispatch(setPrice(price));
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
  };

  return (
    <div>
      <div className="flex items-center justify-between py-10">
        <h1 className="font-light text-gray">Filters:</h1>
        <button className="text-yellowColor" onClick={handleClearFilters}>
          Clean all
        </button>
      </div>
      {/* Accordion */}
      <div>
        {/* Accordion 1: Brand */}
        <Accordion
          open={openAcc1}
          icon={<Icon id={openAcc1} open={openAcc1} />}
        >
          <AccordionHeader
            className="text-base font-medium tracking-widest border-opacity-40 text-darkPrimary hover:text-darkPrimary text-opacity-80"
            onClick={handleOpenAcc1}
          >
            Category
          </AccordionHeader>
          <AccordionBody className="py-3 text-sm font-medium capitalize text-darkPrimary">
            {brandList.map((brand, index) => (
              <div
                key={index}
                className={`flex items-center justify-between px-2 py-2 transition duration-300 rounded group hover:bg-gray hover:bg-opacity-10 ${
                  brand === filter?.brand ? "bg-yellowColor bg-opacity-20" : ""
                }`}
                onClick={() => handleBrandSelect(brand)}
              >
                <span
                  className={`capitalize transition duration-300 text-darkPrimary group-hover:text-yellowColor ${
                    brand === filter?.brand ? "text-yellowColor " : ""
                  }`}
                >
                  {brand}
                </span>
              </div>
            ))}
          </AccordionBody>
        </Accordion>

        {/* Accordion 2: RAM */}
        <Accordion
          open={openAcc2}
          icon={<Icon id={openAcc2} open={openAcc2} />}
        >
          <AccordionHeader
            className="text-base font-medium tracking-widest border-opacity-40 text-darkPrimary hover:text-darkPrimary text-opacity-80"
            onClick={handleOpenAcc2}
          >
            RAM
          </AccordionHeader>
          <AccordionBody className="py-3 text-sm font-medium capitalize text-darkPrimary">
            <div className="flex flex-wrap gap-2">
              {ramList.map((ram, index) => (
                <div
                  key={index}
                  className={`px-2 py-2 border rounded border-gray border-opacity-20 ${
                    ram === filter?.ram ? "bg-yellowColor bg-opacity-20" : ""
                  }`}
                  onClick={() => handleRamSelect(ram)}
                >
                  <span
                    className={`capitalize text-darkPrimary hover:text-yellowColor ${
                      ram === filter?.ram ? "text-yellowColor" : ""
                    }`}
                  >
                    {ram}
                  </span>
                </div>
              ))}
            </div>
          </AccordionBody>
        </Accordion>

        {/* Accordion 3: Price */}
        <Accordion
          open={openAcc3}
          icon={<Icon id={openAcc3} open={openAcc3} />}
        >
          <AccordionHeader
            className="text-base font-medium tracking-widest border-opacity-40 text-darkPrimary hover:text-darkPrimary text-opacity-80"
            onClick={handleOpenAcc3}
          >
            Price
          </AccordionHeader>
          <AccordionBody className="py-3 text-sm font-medium capitalize text-darkPrimary">
            {priceList.map((price, index) => (
              <div
                key={index}
                className={`flex items-center justify-between px-2 py-2 transition duration-300 rounded group hover:bg-gray hover:bg-opacity-10 ${
                  price === filter?.price ? "bg-yellowColor bg-opacity-20" : ""
                }`}
                onClick={() => handlePriceSelect(price)}
              >
                <span
                  className={`capitalize transition duration-300 text-darkPrimary group-hover:text-yellowColor ${
                    price === filter?.price ? "text-yellowColor" : ""
                  }`}
                >
                  {price}
                </span>
              </div>
            ))}
          </AccordionBody>
        </Accordion>
      </div>
    </div>
  );
};

export default ShopFilter;
