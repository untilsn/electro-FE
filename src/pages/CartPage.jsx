import React, { useMemo } from "react";
import ShopBanner from "../modules/shop/ShopBanner";
import Breadcrumb from "../components/breadcrumb/Breadcrumb";
import MainTable from "../components/table/MainTable";
import CardTotal from "../components/card/CardTotal";
import { FaArrowRightLong } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { GrUpdate } from "react-icons/gr";
import BoxNoItem from "../components/BoxNoItem";
import { Link } from "react-router-dom";
import MainBreadcrumbs from "../components/breadcrumb/MainBreadcrumb";
import { FaCartPlus } from "react-icons/fa";

const CartPage = () => {
  const { cartArray } = useSelector((state) => state.store);
  const { orderItems } = useSelector((state) => state.order);

  const calculateTotalPrice = (items) => {
    return items.reduce((total, item) => total + item.price * item.amount, 0);
  };

  // Sử dụng useMemo để tối ưu hóa tính toán tổng giá
  const totalPrice = useMemo(
    () => calculateTotalPrice(orderItems),
    [orderItems]
  );

  return (
    <div>
      <ShopBanner title="shop" subtitle="giỏ hàng"> </ShopBanner>
      <MainBreadcrumbs></MainBreadcrumbs>
      <div className="container">
        {orderItems?.length === 0 || orderItems?.length === null ? (
          <BoxNoItem text="Hiện bạn chưa có sản phẩm trong giỏ hàng" icon={<FaCartPlus/>}></BoxNoItem>
        ) : (
          <div className="grid grid-cols-[72%_28%] gap-5 mt-10 mb-40">
            <div className="">
              <MainTable item={orderItems}></MainTable>
              <div className="flex items-center justify-between">
                <div className="flex items-center max-w-[350px] w-full gap-5">
                  <input
                    type="text"
                    className="w-full p-3 text-sm border-none bg-gray bg-opacity-5"
                    placeholder="coupon code"
                  />
                  <button className="p-4 text-sm border text-yellowColor border-yellowColor">
                    <FaArrowRightLong />
                  </button>
                </div>
                <button className="flex items-center gap-4 px-4 py-3 border text-dark border-gray border-opacity-30 hover:text-yellowColor">
                  <span className="uppercase text-opacity-60 ">
                    update cart
                  </span>
                  <GrUpdate />
                </button>
              </div>
            </div>
            {/* cart total */}
            <div>
              <CardTotal subTotal={totalPrice}></CardTotal>
              <Link
                to={`/shop`}
                className="flex items-center justify-center w-full gap-4 px-4 py-3 mt-10 border text-dark border-gray border-opacity-30 hover:text-yellowColor"
              >
                <span className="uppercase text-opacity-60">
                  tiếp tục mua sắm
                </span>
                <GrUpdate />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
