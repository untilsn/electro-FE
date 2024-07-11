import React from "react";
import menuImg from "/public/menu-img1.jpg";

const ProductMenu = () => {
  return (
    <div className="flex h-[350px]  bg-white shadow-md absolute justify-between top-[100%] left-0 w-[450px]">
      <div>
        <div className="p-10 capitalize ">
          {/* 11 */}
          <div className="flex flex-col gap-4">
            <h1 className="text-[15px] font-normal uppercase">
              PRODUCT DETAILS
            </h1>
            <div className="text-sm font-light text-gray text-opacity-90 hover:text-yellowColor">
              Default
            </div>
            <div className="text-sm font-light text-gray text-opacity-90 hover:text-yellowColor">
              Centered
            </div>
            <div className="text-sm font-light text-gray text-opacity-90 hover:text-yellowColor">
              Extended InfoNEW
            </div>
            <div className="text-sm font-light text-gray text-opacity-90 hover:text-yellowColor">
              Gallery
            </div>
            <div className="text-sm font-light text-gray text-opacity-90 hover:text-yellowColor">
              Sticky Info
            </div>
            <div className="text-sm font-light text-gray text-opacity-90 hover:text-yellowColor">
              Boxed With Sidebar
            </div>
            <div className="text-sm font-light text-gray text-opacity-90 hover:text-yellowColor">
              Full Width
            </div>
          </div>
        </div>
      </div>
      <div
        className="h-auto "
        style={{
          backgroundImage: `url(${menuImg})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className="w-[220px] h-[360px] px-10 py-8 flex flex-col justify-end  mb-auto text-white text-xl uppercase">
          <div>new trends</div>
          <div className="text-3xl font-bold">spring 2024</div>
        </div>
      </div>
    </div>
  );
};

export default ProductMenu;
