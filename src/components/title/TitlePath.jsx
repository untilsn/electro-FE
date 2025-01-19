import React from "react";

const TitlePath = ({title = "Ưu Đãi & Outlet", subTitle = "Ưu đãi hôm nay và nhiều hơn nữa"}) => {
  return <div className='text-center mb-20'>
    <h1 className='capitalize text-2xl text-darkPrimary font-semibold mb-2'>
      {title}
    </h1>
    <h2 className='mt-2 text-[15px] text-darkGray text-opacity-70'>
      {subTitle}
    </h2>
  </div>;
};

export default TitlePath;
