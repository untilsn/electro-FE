import React from "react";

const CardBlog = ({ item }) => {
  return (
    <div>
      <div className="max-w-[870px] w-full ">
        <img className="object-cover w-full h-full " src={item?.img} alt="" />
      </div>
      <div className="flex flex-col gap-3 py-5">
        {/* by */}
        <div className="text-base text-gray">
          by <span>{item?.by1}</span> | <span>{item?.by2}</span> |{" "}
          <span>{item?.by3}</span>
        </div>
        {/* title */}
        <div className="text-2xl font-medium text-dark">{item?.title}</div>
        {/* category */}
        <div className="flex items-center gap-1 text-base text-gray">
          in
          <a className=" hover:text-yellowColor" href="#">
            {item?.category1}
          </a>
          <a className=" hover:text-yellowColor" href="#">
            {item?.category2}
          </a>
        </div>
        {/* desc */}
        <p className="text-base text-gray">{item?.desc}</p>
        {/* button */}
        <button className="text-xl text-yellowColor">Continue Reading</button>
      </div>
    </div>
  );
};

export default CardBlog;
