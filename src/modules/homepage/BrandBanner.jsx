import React, { Fragment } from "react";
import brand1 from "../../assets/image/brand/brand1.png";
import brand2 from "../../assets/image/brand/brand2.png";
import brand3 from "../../assets/image/brand/brand3.png";
import brand4 from "../../assets/image/brand/brand4.png";
import brand5 from "../../assets/image/brand/brand5.png";
import brand6 from "../../assets/image/brand/brand6.png";
import brand7 from "../../assets/image/brand/brand7.png";

export const brandIcon = [
  {
    id: 1,
    img: brand1,
    name: "logo-1",
  },
  {
    id: 2,
    img: brand2,
    name: "logo-2",
  },
  {
    id: 3,
    img: brand3,
    name: "logo-3",
  },
  {
    id: 4,
    img: brand4,
    name: "logo-4",
  },
  {
    id: 5,
    img: brand5,
    name: "logo-5",
  },
  {
    id: 6,
    img: brand6,
    name: "logo-6",
  },
  {
    id: 7,
    img: brand7,
    name: "logo-7",
  },
];

const BrandBanner = () => {
  return (
    <div className="w-full py-20 mb-16 bg-transparent border-b border-gray border-opacity-20">
      <div className="flex items-center justify-center w-full h-full gap-10">
        {brandIcon.map((item) => (
          <div key={item.id} className="max-w-[140px] w-full h-[50px]">
            <img
              style={{ objectPosition: "center top" }}
              className="object-contain w-full h-full"
              src={item.img} 
              alt={item.name}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrandBanner;
