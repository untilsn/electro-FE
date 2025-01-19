import React, { Fragment, useState } from "react";
import Banner from "../modules/homepage/Banner";
import ShopReview from "../modules/shopReview/ShopReview";
import PromoBanner from "../components/banner/PromoBanner";
import DealOutlet from "../modules/homepage/DealOutlet";
import BrandBanner from "../modules/homepage/BrandBanner";
import SupportServicesBanner from "../modules/homepage/SupportServicesBanner";
import FooterBanner from "../modules/homepage/footer/FooterBanner";
import { getAllProduct } from "../service/productService";
import { useQuery } from "@tanstack/react-query";

const HomePage = () => {
  const [limit, setLimit] = useState(8);

  const fetchAllProduct = async (context) => {
    const limit = context?.queryKey[1];
    const res = await getAllProduct(limit);
    return res;
  };

  const { data, isLoading } = useQuery({
    queryKey: ["products", limit],
    queryFn: fetchAllProduct,
    // retry: 3,
    // retryDelay: 1000,
  });

  console.log(data)
  return (
    <Fragment>
      <div className="container py-10">
        <Banner></Banner>
        <ShopReview getProduct={data}></ShopReview>
        <PromoBanner></PromoBanner>
      </div>
      <div className="w-full py-16 bg-bgColor">
        <DealOutlet item={data}></DealOutlet>
      </div>
      <div className="container">
        <BrandBanner></BrandBanner>
        {/* <TrendProduct></TrendProduct> */}
        <SupportServicesBanner></SupportServicesBanner>
        <FooterBanner></FooterBanner>
      </div>
    </Fragment>
  );
};

export default HomePage;
