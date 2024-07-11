import React from "react";
import menuImg from "/public/menu-img.jpg";
const MenuShop = () => {
  return (
    <div className="flex justify-between items-start overflow-hidden  h-[350px] bg-white shadow-md absolute top-[100%] left-0 w-[450px]">
      <div className="grid h-auto grid-cols-1 p-10 capitalize">
        {/* 11 */}
        <div className="flex flex-col gap-4">
          <h1 className="text-[15px] font-normal uppercase">Shop List</h1>
          <div className="text-[14px] font-light text-gray text-opacity-80 hover:text-yellowColor">
            Shop grid column 2
          </div>
          <div className="text-[14px] font-light text-gray text-opacity-80 hover:text-yellowColor">
            Shop grid column 3
          </div>
          <div className="text-[14px] font-light text-gray text-opacity-80 hover:text-yellowColor">
            Shop grid column 4
          </div>
        </div>
        {/* 22 */}
        <div className="flex flex-col gap-4 mt-7">
          <h1 className="text-[15px] font-normal uppercase">shop pages</h1>
          <div className="text-[14px] font-light text-gray text-opacity-80 hover:text-yellowColor">
            carts
          </div>
          <div className="text-[14px] font-light text-gray text-opacity-80 hover:text-yellowColor">
            checkout
          </div>
          <div className="text-[14px] font-light text-gray text-opacity-80 hover:text-yellowColor">
            wishlist
          </div>
          <div className="text-[14px] font-light text-gray text-opacity-80">
            my account
          </div>
        </div>
      </div>
      {/*  */}
      <div
        className="h-auto "
        style={{
          backgroundImage: `url(${menuImg})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className="w-[220px]  h-[360px] py-10 px-7 text-white text-xl uppercase">
          last <br /> chance <br />
          <span className="text-3xl font-bold">sale</span>
        </div>
      </div>
    </div>
  );
};

export default MenuShop;
