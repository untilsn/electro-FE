import React from "react";
import ShopNavigation from "./ShopNavigation";
import CardItem from "../../components/card/CardItem";
import { v4 } from "uuid";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Scrollbar, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import { useSelector } from "react-redux";
import CardHomePage from "../../components/card/CardHomePage";

const ShopReview = (getProduct) => {
  // const { products } = useSelector((state) => state.store);
  const products = getProduct?.getProduct?.data;

  return (
    <div>
      <ShopNavigation></ShopNavigation>
      <div className="mt-10">
        <Swiper
          modules={[Navigation, Scrollbar, A11y]}
          spaceBetween={20}
          slidesPerView={4}
          navigation
          pagination={{ clickable: true }}
        >
          {products?.map((item) => (
            <SwiperSlide key={v4()}>
              <CardHomePage item={item}></CardHomePage>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ShopReview;
