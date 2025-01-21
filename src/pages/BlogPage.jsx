import React, { Fragment } from "react";
import Breadcrumb from "../components/breadcrumb/Breadcrumb";
import CardBlog from "../modules/blogs/CardBlog";
import { blogInfo } from "../utils/blogContent";
import TitlePath from "../components/title/TitlePath";
import { v4 } from "uuid";
import { Input } from "@material-tailwind/react";
import { CiSearch } from "react-icons/ci";
import MainBreadcrumbs from "../components/breadcrumb/MainBreadcrumb";

export const CategoryList = [
  "Lifestyle",
  "Shopping",
  "Travel",
  "Hobbies",
  "Fashion",
];
export const imgBanner = "/public/blogs/subbanner.jpg";

const BlogPage = () => {
  return (
    <Fragment>
      <MainBreadcrumbs />
      <div className="container">
        <div className="grid grid-cols-[72%_28%] gap-5 py-10">
          <div className="flex flex-col gap-20">
            {blogInfo.map((item) => (
              <CardBlog key={item.id} item={item} />
            ))}
          </div>
          <div className="flex flex-col gap-10">
            <div>
              <h1 className="font-normal capitalize text-xl mb-10">Search</h1>
              <Input label="Input With Icon" icon={<CiSearch />} />
            </div>
            <div>
              <h1 className="font-normal capitalize text-xl mb-5">
                Categories
              </h1>
              <div className="flex flex-col gap-5 px-5">
                {CategoryList.map((item) => (
                  <a
                    href="#"
                    key={v4()}
                    className="text-base capitalize text-gray"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h1 className="font-normal capitalize text-xl mb-5">
                Popular Posts
              </h1>
              <div className="flex flex-col gap-5">
                {blogInfo.map((item) => (
                  <div className="flex items-center gap-5" key={item?.id}>
                    <img
                      src={item?.img}
                      alt="img"
                      className="max-w-[100px] w-full h-[100px] object-cover"
                    />
                    <div>
                      <div className="text-base capitalize text-gray">
                        {item?.date}
                      </div>
                      <div className="text-base capitalize text-dark">
                        {item?.title}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="sticky flex flex-col gap-10 top-20">
              <div
                style={{
                  backgroundImage: `url(${imgBanner})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
                className="max-w-[280px] w-full h-[280px] p-10 flex flex-col gap-3"
              >
                <h3 className="text-xs text-white">Online & In-store</h3>
                <h2 className="text-xl text-white">SPRING SALE</h2>
                <h1 className="text-2xl font-semibold text-white">
                  UP TO 60% OFF <br />
                  FROM $55
                </h1>
                <button className="px-4 py-3 text-white uppercase border border-white">
                  Shop Now
                </button>
              </div>
              <div className="block w-full">
                <h1 className="font-normal capitalize text-xl mb-5">
                  Browse Tags
                </h1>
                <div className="flex flex-wrap gap-5 grid-a">
                  {CategoryList.map((item) => (
                    <div
                      key={item}
                      className="block p-3 border bg-gray bg-opacity-5 border-gray border-opacity-20 text-dark text-opacity-65"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default BlogPage;
