import React, { useEffect, useState } from "react";
import ShopBanner from "../modules/shop/ShopBanner";
import Breadcrumb from "../components/breadcrumb/Breadcrumb";
import { useMutationHook } from "../hooks/useMutation";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../service/orderService";
import { Radio } from "@material-tailwind/react";
import TitlePath from "../components/title/TitlePath";
import ButtonForm from "../components/button/ButtonForm";
import { toast } from "react-toastify";
import InputForm from "../components/input/InputForm";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { clearOrderProducts } from "../redux/slice/orderSlice";
import MainBreadcrumbs from "../components/breadcrumb/MainBreadcrumb";
import { formatPrice } from "../utils/utils";

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user);
  console.log(users)
  const [userName, setUserName] = useState("");
  const [address, setAddress] = useState(users?.address || "");
  const [phoneUser, setPhoneUser] = useState(users?.phone || "");
  const orderItems = useSelector((state) => state.order);
  const [payment, setPayment] = useState("cash-on-delivery");
  const [sdkReady, setSdkReady] = useState(false);
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm({
    defaultValues: "",
    mode: "onSubmit",
  });


  const handleAddOrder = () => {

    if (users.access_token && orderItems && address && userName && phone && users.id) {
      mutationAddOrder.mutate(
        {
          token: users?.access_token,
          orderItems: orderItems?.orderItems,
          fullName: users?.name,
          address: users?.address || "",
          phone: users.phone || Number(phoneUser),
          paymentMethod: payment,
          itemsPrice: orderItems?.itemsPrice,
          shippingPrice: orderItems?.shippingPrice,
          totalPrice: orderItems?.totalPrice,
          userId: users?.id,
          email: users?.email,
        },
        {
          onSuccess: () => {
            toast.success("order success");
            dispatch(clearOrderProducts());
            localStorage.removeItem("orderItems");
            navigate("/user-order", {
              state: {
                id: users?.id,
                token: users?.access_token,
              },
            });
          },
        }
      );
    } else {
      toast.warn('Bổ sung thông tin thanh toán')
    }
  };

  const mutationAddOrder = useMutationHook((data) => {
    const { userId, token, ...rest } = data;
    const res = createOrder(userId, token, { ...rest });
    return res;
  });

  // const addPaypalScript = async () => {
  //   const { data } = await getConfig();
  //   const script = document.createElement("script");
  //   script.type = "text/javascript";
  //   script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
  //   script.async = true;
  //   script.onload = () => {
  //     setSdkReady(true);
  //   };
  //   document.body.appendChild(script);
  // };

  // useEffect(() => {
  //   if (!window.paypal) {
  //     addPaypalScript();
  //   } else {
  //     setSdkReady(true);
  //   }
  // }, []);

  // const onSuccessPaypal = (details, data) => {
  //   mutationAddOrder.mutate(
  //     {
  //       token: users?.access_token,
  //       orderItems: orderItems?.orderItems,
  //       fullName: users?.name,
  //       address: users?.address || "",
  //       phone: users?.phone,
  //       city: users?.city || "",
  //       paymentMethod: payment,
  //       itemsPrice: orderItems?.itemsPrice,
  //       shippingPrice: orderItems?.shippingPrice,
  //       totalPrice: orderItems?.totalPrice,
  //       user: users?.id,
  //       city: city,
  //       address: address,
  //       isPaid: true,
  //       paidAt: details.update_time,
  //       email: users?.email,
  //     },
  //     {
  //       onSuccess: () => {
  //         toast.success("order success");
  //         dispatch(clearOrderProducts());
  //         localStorage.removeItem("orderItems");
  //         navigate("/user-order", {
  //           state: {
  //             id: users?.id,
  //             token: users?.access_token,
  //           },
  //         });
  //       },
  //     }
  //   );
  // };

  return (
    <div>
      <ShopBanner title="shop" subtitle="thanh toán"></ShopBanner>
      <MainBreadcrumbs></MainBreadcrumbs>
      <div className="container">
        <div className="grid grid-cols-[70%_30%] gap-5 mt-10 mb-40">
          <div className="w-full  p-10 border rounded-2xl border-gray border-opacity-20">
            <h1 className="pb-10 text-center font-semibold text-2xl capitalize">thông tin khách hàng</h1>
            <div className="flex flex-col gap-14">
              {/* <div className="flex flex-col gap-5 mb-5">
                <Radio
                  name="type"
                  color="light-blue"
                  label="Cash On Delivery"
                  defaultChecked={true}
                  onClick={() => setPayment("cash-on-delivery")}
                />
                <span className="ml-10">Pay with cash upon delivery.</span>
              </div>
              <div className="flex flex-col gap-5 mb-5">
                <Radio
                  name="type"
                  color="light-blue"
                  label="Paypal"
                  onClick={() => setPayment("paypal")}
                />
                <span className="ml-10">Pay with Paypal.</span>
              </div> */}
              <InputForm
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                name="username"
                control={control}
                placeholder="tên người nhận"
              ></InputForm>
              <InputForm
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                name="address"
                control={control}
                placeholder="địa chỉ"
              ></InputForm>
              <InputForm
                value={phoneUser}
                onChange={(e) => setPhoneUser(e.target.value)}
                name="phone"
                control={control}
                placeholder="liên lạc"
              ></InputForm>
            </div>
          </div>
          {/* card order */}
          <div>
            <div className="flex flex-col gap-10 pt-5 pb-10 border border-dashed rounded px-7 border-opacity-20 border-dark bg-gray bg-opacity-5">
              <h1 className="text-lg !font-normal border-b border-gray border-opacity-20 pb-5">
                Your order
              </h1>
              <div>
                <div className="flex items-center capitalize justify-between text-xl text-gray">
                  <span>sản phẩm</span>
                  <span>tổng phụ</span>
                </div>
                <div className="my-10">
                  {orderItems?.orderItems?.map((item) => (
                    <div
                      key={item?.productId}
                      className="flex items-center justify-between py-5 border-b border-gray border-opacity-20"
                    >
                      <div className="flex items-center gap-2">
                        <span className="overflow-hidden text-base text-gray  text-ellipsis whitespace-nowrap max-w-[180px] w-full">
                          {item?.name}
                        </span>
                        <span className="text-base flex items-center gap-1 font-medium text-darkPrimary">
                          <span>x</span>
                          {item?.amount}
                        </span>
                      </div>
                      <div className="text-base text-gray">
                        {formatPrice(item?.price * item?.amount)}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between py-5 text-xl capitalize border-b border-gray border-opacity-20">
                  <span>tổng phụ</span>
                  <span>{formatPrice(orderItems?.itemsPrice)}</span>
                </div>
                <div className="flex items-center justify-between py-5 text-xl capitalize text-yellowColor">
                  <span>tổng</span>
                  <span>{formatPrice(orderItems?.totalPrice)}</span>
                </div>
              </div>
              {payment === "paypal" ? (
                // <PayPalButton
                //   amount={orderItems?.totalPrice}
                //   // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
                //   onSuccess={onSuccessPaypal}
                // />
                ""
              ) : (
                <ButtonForm onClick={handleAddOrder} classname="border-[2px]">
                  tiến hành thanh toán
                </ButtonForm>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
