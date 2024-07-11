import React from "react";
import { IoIosCloudUpload } from "react-icons/io";
import { v4 } from "uuid";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Scrollbar, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import { IoCloseSharp } from "react-icons/io5";
import { useFirebaseImage } from "../hooks/useFirebaseImage";

const ImageUpload = ({ onchange = () => {}, image, onClick }) => {
  return (
    <div className=" max-h-[400px] h-full  p-5 border-2 border-dashed border-[#B0BEC5] rounded-lg">
      {image.length <= 0 ? (
        <div className="flex flex-col gap-10 max-w-[200px] h-[355px] mx-auto items-center w-full  justify-center">
          <IoIosCloudUpload className="text-7xl text-purpleColor" />
          <label
            htmlFor="image"
            className="px-3 py-2 text-white rounded bg-purpleColor"
          >
            Select images
            <input
              onChange={onchange}
              type="file"
              id="image"
              className="hidden"
            />
          </label>
        </div>
      ) : (
        <Swiper
          modules={[Navigation, Scrollbar, A11y]}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          className="w-full h-full"
        >
          {image.map((img, index) => (
            <SwiperSlide
              key={v4()}
              className="relative flex items-center justify-center w-full h-full group"
            >
              <img
                className="object-contain w-full h-full border rounded"
                src={img}
                alt=""
              />
              <div
                onClick={() => onClick(img)}
                className="absolute flex items-center justify-center invisible w-8 h-8 transition-all rounded-full opacity-0 select-none bg-opacity-15 group-hover:visible group-hover:select-auto group-hover:opacity-100 bg-gray top-5 right-5"
              >
                <IoCloseSharp />
              </div>
            </SwiperSlide>
          ))}
          <SwiperSlide>
            <div className="flex flex-col items-center justify-center w-full h-full gap-10 p-20 mx-auto border border-dashed">
              <IoIosCloudUpload className="text-7xl text-purpleColor" />
              <label
                htmlFor="image"
                className="px-3 py-2 text-white rounded bg-purpleColor"
              >
                Select images
                <input
                  onChange={onchange}
                  type="file"
                  id="image"
                  className="hidden"
                />
              </label>
            </div>
          </SwiperSlide>
        </Swiper>
      )}
      {/* {image.length > 0 && (
        <div
          style={{
            width: `${Math.ceil(progress)}%`,
          }}
          className="h-1 transition-all bg-red-500 "
        ></div>
      )} */}
    </div>
  );
};

export default ImageUpload;
