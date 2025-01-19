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
import { useQuery } from "@tanstack/react-query";
import { getAllBrand } from "../../service/brandService";



const ramList = ["2GB", "4GB", "6GB", "8GB", "12GB", "16GB"];
const priceList = [
  { name: "Dưới 2 triệu", value: { min: 0, max: 2000000 } },
  { name: "2 - 5 triệu", value: { min: 2000000, max: 5000000 } },
  { name: "5 - 10 triệu", value: { min: 5000000, max: 10000000 } },
  { name: "10 - 15 triệu", value: { min: 10000000, max: 15000000 } },
  { name: "Trên 15 triệu", value: { min: 15000000, max: Infinity } },
];


function Icon({ id, open }) {
  return (
    <IoMdArrowDropup
      className={`${id === true ? "rotate-180" : ""
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


  const handlePriceSelect = (price) => {

  };



  const handleGetallBrand = async (context) => {
    const res = await getAllBrand();
    return res;
  };

  const { data: brands } = useQuery({
    queryKey: [],
    queryFn: handleGetallBrand
  })


  return (
    <div>
      <div className="flex items-center justify-between py-5">
        <h1 className="font-base text-xl text-gray">Filters:</h1>
        <button className="text-yellowColor" onClick={() => dispatch(clearFilters())}>
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
            className="text-base font-semibold tracking-widest capitalize border-opacity-40 text-darkPrimary hover:text-darkPrimary text-opacity-80"
            onClick={handleOpenAcc1}
          >
            hãng
          </AccordionHeader>
          <AccordionBody className="py-3 text-sm font-medium capitalize text-darkPrimary">
            <div>
              {brands?.map((brand, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between px-2 py-2 transition duration-300 rounded group hover:bg-gray hover:bg-opacity-10 ${brand.name === filter?.brand ? "bg-yellowColor/10" : ""
                    }`}
                  onClick={() => dispatch(setBrand(brand.name))}
                >
                  <div className="flex items-center gap-3 ">
                    <span
                      className={`capitalize transition duration-300 text-darkPrimary group-hover:text-yellowColor ${filter?.brand?.includes(brand.name) ? "text-yellowColor " : ""
                        }`}
                    >
                      {brand.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </AccordionBody>
        </Accordion>

        {/* Accordion 2: RAM */}
        <Accordion
          open={openAcc2}
          icon={<Icon id={openAcc2} open={openAcc2} />}
        >
          <AccordionHeader
            className="text-base font-semibold tracking-widest border-opacity-40 text-darkPrimary hover:text-darkPrimary text-opacity-80"
            onClick={handleOpenAcc2}
          >
            RAM
          </AccordionHeader>
          <AccordionBody className="py-3 text-sm font-medium capitalize text-darkPrimary">
            <div className="flex flex-wrap gap-2">
              {ramList.map((ram, index) => (
                <div
                  key={index}
                  className={`px-2 py-2 border rounded border-gray border-opacity-20 ${filter?.ram.includes(ram) ? "bg-yellowColor bg-opacity-20" : ""
                    }`}
                  onClick={() => dispatch(setRam(ram))}
                >
                  <span
                    className={`capitalize text-darkPrimary hover:text-yellowColor ${filter?.ram.includes(ram) ? "text-yellowColor" : ""
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
            className="text-base font-semibold tracking-widest capitalize border-opacity-40 text-darkPrimary hover:text-darkPrimary text-opacity-80"
            onClick={handleOpenAcc3}
          >
            giá
          </AccordionHeader>
          <AccordionBody className="py-3 text-sm font-medium capitalize text-darkPrimary">
            {priceList.map((price, index) => (
              <div
                key={index}
                className={`flex items-center justify-between px-2 py-2 transition duration-300 rounded group hover:bg-gray hover:bg-opacity-10 ${filter?.price?.min === price.value.min && filter?.price?.max === price.value.max
                    ? "bg-yellowColor bg-opacity-20"
                    : ""
                  }`}
                onClick={() => dispatch(setPrice(price.value))}
              >
                <span
                  className={`capitalize transition duration-300 text-darkPrimary group-hover:text-yellowColor ${filter?.price?.min === price.value.min && filter?.price?.max === price.value.max
                      ? "text-yellowColor"
                      : ""
                    }`}
                >
                  {price.name}
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
