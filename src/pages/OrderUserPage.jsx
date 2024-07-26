import React from "react";
import ShopBanner from "../modules/shop/ShopBanner";
import Breadcrumb from "../components/breadcrumb/Breadcrumb";
import {
  Button,
  ButtonGroup,
  Card,
  Typography,
} from "@material-tailwind/react";
import { useQuery } from "@tanstack/react-query";
import { cancelOrder, getDetailsOrders } from "../service/orderService";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useMutationHook } from "../hooks/useMutation";
import { useSelector } from "react-redux";

const MySwal = withReactContent(Swal);

const TABLE_HEAD = ["Images", "Product", "Pieces", "Cost"];

const OrderUserPage = () => {
  const location = useLocation();
  const { state } = location;
  const users = useSelector((state) => state.user);
  const fetchMyOrder = async (context) => {
    const userId = context?.queryKey[1];
    const access_token = context?.queryKey[2];
    console.log(userId, access_token);
    if (!access_token || !userId) {
      throw new Error("Missing user ID or token");
    }
    try {
      const res = await getDetailsOrders(userId, access_token);
      return res;
    } catch (error) {
      console.error("Error fetching orders:", error);
      throw error;
    }
  };

  const queryOrder = useQuery({
    queryKey: ["orders", users.id, users.access_token],
    queryFn: fetchMyOrder,
    enabled: !!users.id && !!users.access_token,
  });

  const { isLoading, data: orderItem, isError } = queryOrder;
  const mutation = useMutationHook(async (data) => {
    const { id, token, orderItems } = data;
    const res = await cancelOrder(id, token, orderItems);
    return res;
  });

  const handleCancelOrder = (order) => {
    MySwal.fire({
      title: "Are you sure?",
      text: "Do you want to cancel this order?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it!",
      cancelButtonText: "No, keep it",
    }).then((result) => {
      if (result.isConfirmed) {
        mutation.mutate(
          {
            id: order?._id,
            token: users?.access_token,
            orderItems: order?.orderItems,
          },
          {
            onSuccess: () => {
              MySwal.fire(
                "Cancelled!",
                "Your order has been cancelled.",
                "success"
              );
              queryOrder.refetch();
            },
          }
        );
      }
    });
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {isError?.message}</div>;

  return (
    <>
      <ShopBanner title="User" subtitle="Order" />
      <Breadcrumb children="Checkout" />
      <div className="container">
        {orderItem?.data?.map((order) => (
          <div key={order._id} className="my-10">
            <Card className="w-full h-full p-0 overflow-scroll">
              <div className="flex items-center justify-between p-5 mb-10 text-lg font-medium capitalize text-dark bg-blue-gray-50">
                <span>
                  Order date:{" "}
                  <span className="text-gray">{order?.createdAt}</span>
                </span>
                <span>
                  Total cost:{" "}
                  <span className="text-redColor">${order?.totalPrice}</span>
                </span>
              </div>
              <table className="w-full text-left table-auto min-w-max">
                <thead>
                  <tr>
                    {TABLE_HEAD.map((head) => (
                      <th
                        key={head}
                        className="p-4 border-b border-blue-gray-100"
                      >
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="text-lg font-medium leading-none text-black opacity-70"
                        >
                          {head}
                        </Typography>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {order?.orderItems?.map((item, index) => {
                    const isLast = index === order.orderItems.length - 1;
                    const classes = isLast
                      ? "p-4"
                      : "p-4 border-b border-blue-gray-50";

                    return (
                      <tr key={item?._id}>
                        <td className={classes}>
                          <img
                            src={item?.image[0]}
                            alt={item?.name}
                            className="object-contain w-full h-[100px] max-w-[100px] rounded-lg"
                          />
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="max-w-[700px] w-full text-blueColor text-base font-normal"
                          >
                            {item?.name}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="text-base font-normal"
                          >
                            {item?.amount}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            as="a"
                            href="#"
                            variant="small"
                            color="blue-gray"
                            className="text-base font-medium"
                          >
                            ${item?.price}
                          </Typography>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <div className="flex items-center justify-between p-5 bg-blue-gray-50">
                <div className="flex flex-col gap-3">
                  <div>
                    {order?.isPaid ? (
                      <div>
                        <span className="text-green-400">Order status:</span>{" "}
                        Paid
                      </div>
                    ) : (
                      <div>
                        <span className="text-red-400">Order status:</span> Not
                        Paid
                      </div>
                    )}
                  </div>
                  <div>
                    <div>
                      <span className="text-green-400">Payment method:</span>{" "}
                      {order?.paymentMethod}
                    </div>
                  </div>
                </div>
                <div>
                  <ButtonGroup variant="outlined">
                    <Button onClick={() => handleCancelOrder(order)}>
                      Cancel Order
                    </Button>
                    <Button>Details</Button>
                  </ButtonGroup>
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </>
  );
};

export default OrderUserPage;
