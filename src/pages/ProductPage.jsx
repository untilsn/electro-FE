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

const ProductPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const productId = searchParams.get("id");
  const users = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity);
  };

  // const [detailItem] = useQueryData(productId);

  const mutation = useMutationHook(async (id) => {
    const result = await getDetailsProduct(id);
    return result;
  });
  const { data: detailProduct } = mutation;
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
      <Breadcrumb children="product"></Breadcrumb>
      <div className="container">
        <ProductDetail
          onClick={handleOrderProduct}
          item={detailProduct?.data}
          onQuantityChange={handleQuantityChange}
        ></ProductDetail>
        <ProductDesc></ProductDesc>
        <ShopRelative></ShopRelative>
      </div>
    </div>
  );
};

export default ProductPage;
