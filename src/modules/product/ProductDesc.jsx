import React, { useState } from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import ProductDescription from "./ProductDescription";
import ProductComment from "./ProductComment";
import ProductTerm from "./ProductTerm";
import { getAllBrand } from "../../service/productService";
import { useQuery } from "@tanstack/react-query";

const ProductDesc = ({ item }) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [activeTab, setActiveTab] = React.useState("Description");
  const handleRatingClick = (index) => {
    setRating(index);
  };

  const data = [
    {
      label: "Description",
      value: "Description",
      desc: <ProductDescription item={item}></ProductDescription>,
    },
    {
      label: "Reviews",
      value: "Reviews",
      desc: <ProductComment item={item}></ProductComment>,
    },
    {
      label: "Shipping & Returns",
      value: "Shipping & Returns",
      desc: <ProductTerm></ProductTerm>,
    },
  ];

  const fetchAllProductBrand = async (context) => {
    const brand = context?.queryKey[1];
    const res = await getAllBrand(brand);
    return res;
  };
  const { data: productsBrand, isLoading } = useQuery({
    queryKey: ["products", item?.brand],
    queryFn: fetchAllProductBrand,
    retry: 3,
    retryDelay: 1000,
    enabled: !!item?.brand,
  });
  console.log(productsBrand);
  return (
    <div className="container mb-20">
      <Tabs value={activeTab}>
        <div className="max-w-[800px] mx-auto">
          <TabsHeader
            className="justify-center p-0 bg-transparent rounded-none "
            indicatorProps={{
              className:
                "bg-transparent border-b border-gray-900 shadow-none rounded-none",
            }}
          >
            {data.map(({ label, value }) => (
              <Tab
                key={value}
                value={value}
                onClick={() => setActiveTab(value)}
                className={`${
                  activeTab === value ? "text-yellowColor " : " "
                } text-lg font-normal hover:text-yellowColor  transition duration-200 
                px-4 py-2 border-transparent cursor-pointer hover:border-orange-500
                `}
              >
                {label}
              </Tab>
            ))}
          </TabsHeader>
        </div>
        <TabsBody className="w-full p-10 border mt-14 border-gray border-opacity-20">
          {data.map(({ value, desc }) => (
            <TabPanel key={value} value={value}>
              {desc}
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>
    </div>
  );
};

export default ProductDesc;
