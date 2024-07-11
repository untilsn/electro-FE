import React, { Fragment } from "react";

export const brandIcon = [
  {
    id: 1,
    img: "./brand1.png 2x",
    name: "logo-1",
  },
  {
    id: 2,
    img: "./brand2.png 2x",
    name: "logo-2",
  },
  {
    id: 3,
    img: "./brand3.png 2x",
    name: "logo-3",
  },
  {
    id: 4,
    img: "./brand4.png 2x",
    name: "logo-4",
  },
  {
    id: 5,
    img: "./brand5.png 2x",
    name: "logo-5",
  },
  {
    id: 6,
    img: "./brand6.png 2x",
    name: "logo-6",
  },
  {
    id: 7,
    img: "./brand7.png 2x",
    name: "logo-7",
  },
];

const BrandBanner = () => {
  return (
    <div className="w-full py-20 mb-16 bg-transparent border-b border-gray border-opacity-20">
      <div className="flex items-center justify-center w-full h-full gap-10">
        {brandIcon.map((item) => (
          <div key={item.id} className="max-w-[140px] w-full h-[50px] ">
            <img
              style={{ objectPosition: "center top" }}
              className="object-contain w-full h-full"
              srcSet={item.img}
              alt={item.name}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrandBanner;
