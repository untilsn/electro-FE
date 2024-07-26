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
            <span className="text-yellowColor">Ưu Đãi Mới</span>
            <div>Bắt đầu hàng ngày lúc 12 giờ </div>
          </div>
          <div className="text-sm text-gray max-w-[440px] w-full ">
            <p>
              Nhận
              <span className="text-darkPrimary">
                MIỄN PHÍ VẬN CHUYỂN* & 5%{" "}
              </span>
              phần thưởng trên mỗi đơn hàng với chương trình phần thưởng của
              Molla Theme
            </p>
          </div>
          <div>
            <ButtonItem>Thêm vào giỏ hàng </ButtonItem>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromoBanner;
