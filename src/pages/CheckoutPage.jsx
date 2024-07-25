import React, { useState } from "react";
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

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user);
  const [city, setCity] = useState(users?.city || "");
  const [address, setAddress] = useState(users?.address || "");
  const orderItems = useSelector((state) => state.order);
  const [payment, setPayment] = useState("cash-on-delivery");
  const [phoneUser, setPhoneUser] = useState("");
  const [sdkReady, setSdkReady] = useState(false);
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: "",
    mode: "onSubmit",
  });

  const handleAddOrder = () => {
    if (users.access_token && orderItems && city && address) {
      mutationAddOrder.mutate(
        {
          token: users?.access_token,
          orderItems: orderItems?.orderItems,
          fullName: users?.name,
          address: users?.address || "",
          phone: users.phone || Number(phoneUser),
          city: users?.city || "",
          paymentMethod: payment,
          itemsPrice: orderItems?.itemsPrice,
          shippingPrice: orderItems?.shippingPrice,
          totalPrice: orderItems?.totalPrice,
          user: users?.id,
          city: city,
          address: address,
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
    }
  };

  const mutationAddOrder = useMutationHook((data) => {
    console.log(data);
    const { token, ...rest } = data;
    const res = createOrder(token, { ...rest });
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
      <ShopBanner title="shop" subtitle="checkout"></ShopBanner>
      <Breadcrumb children="checkout"></Breadcrumb>
      <div className="container">
        <div className="grid grid-cols-[70%_30%] gap-5 mt-10 mb-40">
          <div className="w-full h-auto p-5 border rounded-2xl border-gray border-opacity-20">
            <TitlePath classname="mb-10 capitalize ">
              setting payment methob
            </TitlePath>
            <div className="flex flex-col gap-10">
              <div className="flex flex-col gap-5 mb-5">
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
              </div>
              <InputForm
                value={city}
                onChange={(e) => setCity(e.target.value)}
                name="address"
                control={control}
                placeholder="House number and street name"
              ></InputForm>
              <InputForm
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                name="city"
                control={control}
                placeholder="town/city"
              ></InputForm>
              <InputForm
                value={phoneUser}
                onChange={(e) => setPhoneUser(e.target.value)}
                name="phone"
                control={control}
                placeholder="your contact"
              ></InputForm>
            </div>
          </div>
          {/* card order */}
          <div>
            <div className="flex flex-col gap-10 pt-5 pb-10 border border-dashed rounded px-7 border-opacity-20 border-dark bg-gray bg-opacity-5">
              <TitlePath classname="text-lg !font-normal border-b border-gray border-opacity-20 pb-5">
                Your order
              </TitlePath>
              <div>
                <div className="flex items-center justify-between text-xl text-gray">
                  <span>Product</span>
                  <span>Subtotal</span>
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
                        <span className="text-base font-medium text-darkPrimary">
                          x {item?.amount}
                        </span>
                      </div>
                      <div className="text-base text-gray">
                        ${item?.price * item?.amount}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between py-5 text-xl capitalize border-b border-gray border-opacity-20">
                  <span>subtotal</span>
                  <span>${orderItems?.itemsPrice}</span>
                </div>
                <div className="flex items-center justify-between py-5 text-xl capitalize text-yellowColor">
                  <span>total</span>
                  <span>${orderItems?.totalPrice}</span>
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
                  proceed to checkout
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
