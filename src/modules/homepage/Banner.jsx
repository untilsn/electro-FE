import React from "react";
import { BannerImage } from "../../utils/bannerItem";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Scrollbar, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import mainBanner from "../../assets/image/banner/banner1.jpg";
import secondBanner from "../../assets/image/banner/banner2.jpg";
import SubBanner from "./SubBanner";
import MainBanner from "./MainBanner";
const Banner = () => {
  return (
    <div className="grid grid-cols-1 gap-6 mb-16">
      <div className="col-span-2">
        <Swiper
          loop={true}
          modules={[Navigation, Scrollbar, A11y]}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
        >
          <SwiperSlide>
            <MainBanner
              img={mainBanner}
              heading="Ưu đãi hàng ngày"
              title="AirPods"
              subTitle="Earphones"
              // price="$247"
              // secondPrice="Today:"
            ></MainBanner>
          </SwiperSlide>
          <SwiperSlide>
            <MainBanner
              img={secondBanner}
              title="Echo Dot"
              subTitle="3rd Gen"
              // price="$29"
              heading="Ưu đãi và khuyến mãi"
              // secondPrice="$49,99"
            ></MainBanner>
          </SwiperSlide>
        </Swiper>
      </div>
      {/* <div className="grid grid-rows-3 gap-5">
        {BannerImage.map((item) => (
          <SubBanner key={item.id} img={item.img} content={item}></SubBanner>
        ))}
      </div> */}
    </div>
  );
};

export default Banner;
