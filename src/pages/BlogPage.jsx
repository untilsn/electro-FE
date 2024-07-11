import React, { Fragment } from "react";
import Breadcrumb from "../components/breadcrumb/Breadcrumb";
import CardBlog from "../modules/blogs/CardBlog";
import { blogInfo } from "../utils/blogContent";
import TitlePath from "../components/title/TitlePath";
import { v4 } from "uuid";
import { Input } from "@material-tailwind/react";
import { CiSearch } from "react-icons/ci";

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
      <Breadcrumb children="blogs"></Breadcrumb>
      <div className="container">
        <div className="grid grid-cols-[72%_28%] gap-5 py-10">
          <div className="flex flex-col gap-20">
            {blogInfo.map((item) => (
              <CardBlog key={item.id} item={item}></CardBlog>
            ))}
          </div>
          <div className="flex flex-col gap-10">
            <div>
              <TitlePath classname="!font-normal capitalize text-xl mb-5">
                {"search"}
              </TitlePath>
              <Input label="Input With Icon" icon={<CiSearch />} />
            </div>
            <div>
              <TitlePath classname="!font-normal capitalize text-xl mb-5">
                {"Categories"}
              </TitlePath>
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
              <TitlePath classname="!font-normal capitalize text-xl mb-5">
                {"Popular Posts"}
              </TitlePath>
              <div className="flex flex-col gap-5 ">
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
            <div className="sticky flex flex-col gap-10 top-20 ">
              <div
                style={{
                  backgroundImage: `url(${imgBanner})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
                className="max-w-[280px] w-full h-[280px] p-10 flex flex-col gap-3"
              >
                <h3 className="text-xs text-white">online & in-store</h3>
                <h2 className="text-xl text-white">SPRING SALE</h2>
                <h1 className="text-2xl font-semibold text-white">
                  UP TO 60% OFF <br />
                  FROM $55
                </h1>
                <button className="px-4 py-3 text-white uppercase border border-white">
                  shop now
                </button>
              </div>
              <div className="block w-full">
                <TitlePath classname="!font-normal capitalize text-xl mb-5">
                  {"Browse Tags"}
                </TitlePath>
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
              <div>
                <TitlePath classname="!font-normal capitalize text-xl mb-5">
                  {"About Blog"}
                </TitlePath>
                <p className="text-sm leading-6 text-gray">
                  Vestibulum volutpat, lacus a ultrices sagittis, mi neque
                  euismod dui, pulvinar nunc sapien ornare nisl.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default BlogPage;
