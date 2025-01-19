import React, { useEffect, useState } from "react";
import ProductDetail from "../modules/product/ProductDetail";
import ProductDesc from "../modules/product/ProductDesc";
import ShopRelative from "../modules/shop/ShopRelative";
import Breadcrumb from "../components/breadcrumb/Breadcrumb";
import { useLocation } from "react-router-dom";
import { useMutationHook } from "../hooks/useMutation";
import { getDetailsProduct } from "../service/productService";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addOrderProduct } from "../redux/slice/orderSlice";
import MainBreadcrumbs from "../components/breadcrumb/MainBreadcrumb";

const ProductPage = () => {
  const users = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const productId = searchParams.get("id");

  const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity);
  };

  const mutation = useMutationHook(async (id) => {
    const result = await getDetailsProduct(id);
    return result;
  });
  
  const { data: detailProduct, isLoading, isError } = mutation;
  useEffect(() => {
    mutation.mutate(productId);
  }, [productId]);


  const handleOrderProduct = () => {
    if (!users.access_token) {
      toast.error("you must be login to add cart!");
    } else {
      dispatch(
        addOrderProduct({
          orderItem: {
            name: detailProduct?.data?.name,
            amount: quantity,
            brand: detailProduct?.data?.brand,
            image: detailProduct?.data?.image,
            price: detailProduct?.data?.price,
            productId: detailProduct?.data?._id,
            countInStock: detailProduct?.data?.countInStock,
          },
        })
      );
    }
  };

  return (
    <div>
      <MainBreadcrumbs></MainBreadcrumbs>
      <div className="container">
        <ProductDetail
          onClick={handleOrderProduct}
          item={detailProduct?.data}
          onQuantityChange={handleQuantityChange}
        ></ProductDetail>
        <ProductDesc item={detailProduct?.data}></ProductDesc>
        {/* <ShopRelative item={detailProduct?.data}></ShopRelative> */}
      </div>
    </div>
  );
};

export default ProductPage;
