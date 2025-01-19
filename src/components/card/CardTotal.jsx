import React, { useEffect, useMemo, useState } from "react";
import TitlePath from "../title/TitlePath";
import CheckboxCart from "../checkbox/CheckboxCart";
import { Link, useNavigate } from "react-router-dom";
import ButtonForm from "../button/ButtonForm";
import { useDispatch } from "react-redux";
import { addCheckoutProduct } from "../../redux/slice/orderSlice";
import { formatPrice } from "../../utils/utils";



const CardTotal = ({ subTotal, onClick = () => { } }) => {
  const navigate = useNavigate();
  const [shipping, setShipping] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    setShipping(0); // Reset shipping khi subTotal thay đổi
  }, []);

  const handleCheckShipping = (shippingCost) => {
    setShipping(shippingCost);
  };

  const totalCheckout = useMemo(() => {
    return Number(subTotal) + Number(shipping);
  }, [subTotal, shipping]);

  const handleCheckout = () => {
    dispatch(
      addCheckoutProduct({
        itemsPrice: subTotal,
        shippingPrice: shipping,
        totalPrice: totalCheckout,
      })
    );
    navigate("/checkout");
  };

  return (
    <div className="flex flex-col pt-5 pb-10 border border-dashed rounded px-7 border-opacity-20 border-dark bg-gray bg-opacity-5">
      <div className="text-lg py-5 font-semibold border-b border-gray border-opacity-20 ">
        Tổng số giỏ hàng
      </div>
      <div className="flex items-center justify-between py-5 border-b_primary">
        <span className="text-base font-medium">Tổng phụ:</span>
        <span className="text-base font-semibold">{formatPrice(subTotal) || "0"}</span>
      </div>
      <div className="py-5">
      <h1 className="text-base font-medium">phí giao hàng</h1>
        <div className="flex flex-col py-5">
          <CheckboxCart
            onChange={() => handleCheckShipping(0)}
            price="0.00"
            labelItem="Miễn phí vận chuyển:"
          ></CheckboxCart>
          <CheckboxCart
            onChange={() => handleCheckShipping(10000)}
            price="10.000"
            labelItem="Tiêu chuẩn:"
          ></CheckboxCart>
          <CheckboxCart
            onChange={() => handleCheckShipping(20000)}
            price="20.000"
            labelItem="Nhanh:"
          ></CheckboxCart>
        </div>
      </div>
      <div className="flex items-center font-semibold text-lg justify-between py-5 border-t border-gray border-opacity-20">
        <h1 className=" text-dark">
          Tổng:
        </h1>
        <h1 className=" text-yellowColor hover:underline">
          {formatPrice(totalCheckout.toFixed(2))}
        </h1>
      </div>
      <ButtonForm onClick={handleCheckout} classname="border-[2px]">
      tiến hành thanh toán
      </ButtonForm>
    </div>
  );
};

export default CardTotal;
