import React from "react";
import dealBanner from "../../assets/image/banner/dealoutletbanner.jpg";
import ButtonItem from "../../components/button/ButtonItem";
import TitlePath from "../../components/title/TitlePath";
import DisplayTime from "./DisplayTime";
import CardShop from "../../components/card/CardShop";

const DealOutlet = ({ item }) => {
  return (
    <div className="container">
      <div className="text-center">
        <TitlePath title="Ưu Đãi & Outlet" subTitle="Ưu đãi hôm nay và nhiều hơn nữa">Ưu Đãi & Outlet</TitlePath>
      </div>
      {/* nội dung */}
      <div className="grid grid-cols-4 gap-8 my-16 ">
        <div
          className="w-full h-full col-span-2 "
          style={{
            backgroundImage: `url(${dealBanner})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="flex flex-col gap-20 p-10">
            <div>
              <div className="text-2xl font-semibold text-redColor text-opacity-60">
                Ưu Đãi Của Ngày.
              </div>
              <div className="text-sm text-gray">Số lượng có hạn.</div>
            </div>
            <div>
              <div className="text-sm ">Áo khoác lông giả màu nâu dáng dài</div>
              <div className="text-2xl text-redColor text-opacity-60">
                $310.00{" "}
                <span className="text-gray text-opacity-60">
                  {" "}
                  Giá cũ $190.00
                </span>
              </div>
            </div>
            <div>
              <DisplayTime></DisplayTime>
            </div>
          </div>
        </div>
        {item?.data?.slice(0, 2).map((item, index) => (
          <div key={index}>
            <CardShop key={index} item={item}></CardShop>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center w-full mx-auto">
        <ButtonItem kind="secondary">Mua thêm ưu đãi Outlet</ButtonItem>
      </div>
    </div>
  );
};

export default DealOutlet;
