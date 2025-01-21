import React from "react";
import ButtonItem from "../button/ButtonItem";
import promoBannerImage from '../../assets/image/banner/promo_banner.jpg';

const PromoBanner = () => {
  return (
    <div className="mb-20">
    <div
      className="w-full h-full p-5 bg-cover bg-center"
      style={{ backgroundImage: `url(${promoBannerImage})` }}
    >
      <div className="bg-white p-5 flex items-center gap-10 h-[140px]">
        <div className="text-2xl font-semibold text-end">
          <span className="text-yellowColor">Ưu Đãi Mới</span>
          <div className="text-darkPrimary">Bắt đầu hàng ngày lúc 12 giờ</div>
        </div>
        <div className="text-sm text-gray max-w-[440px] font-medium leading-7">
          <p>
            Nhận <span className="text-darkPrimary">MIỄN PHÍ VẬN CHUYỂN* & 5%</span> phần thưởng trên mỗi đơn hàng với chương trình phần thưởng của Molla Theme
          </p>
        </div>
        <div className="flex-1 flex justify-center items-center">
        <ButtonItem>Thêm vào giỏ hàng </ButtonItem>
        </div>
      </div>
    </div>
  </div>
  );
};

export default PromoBanner;


