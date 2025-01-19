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
import { cancelOrder, getUserOrder } from "../service/orderService";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useMutationHook } from "../hooks/useMutation";
import { useSelector } from "react-redux";
import MainBreadcrumbs from "../components/breadcrumb/MainBreadcrumb";
import formatPrice from "../utils/formatPrice";
import BoxNoItem from "../components/BoxNoItem";
import { IoBagCheckOutline } from "react-icons/io5";
import { formatDate } from "../utils/utils";

const MySwal = withReactContent(Swal);

const TABLE_HEAD = ["Ảnh", "Sản phẩm", "Số lượng", "Giá"];

const OrderUserPage = () => {
  const location = useLocation();
  const { state } = location;
  const users = useSelector((state) => state.user);

  const fetchMyOrder = async (context) => {
    const userId = context?.queryKey[1];
    const access_token = context?.queryKey[2];
    if (!access_token || !userId) {
      throw new Error("Thiếu thông tin người dùng hoặc token");
    }
    try {
      const res = await getUserOrder(userId, access_token);
      return res;
    } catch (error) {
      console.error("Lỗi khi lấy đơn hàng:", error);
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
      title: "Bạn chắc chắn chứ?",
      text: "Bạn muốn hủy đơn hàng này không?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Có, hủy đơn hàng!",
      cancelButtonText: "Không, giữ lại",
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
                "Đã hủy!",
                "Đơn hàng của bạn đã được hủy.",
                "success"
              );
              queryOrder.refetch();
            },
          }
        );
      }
    });
  };

  return (
    <>
      <ShopBanner title="Trang người dùng" subtitle="Đơn hàng của bạn" />
      <MainBreadcrumbs />
      <div className="container py-6">
        {
          orderItem?.data?.length > 0 ?
            <div>
              {orderItem?.data?.map((order) => (
                <div key={order._id} className="my-10">
                  <Card className="w-full h-full shadow-lg rounded-none mb-20">
                    <div className="flex items-center justify-between p-5  text-lg font-medium text-dark bg-secondary bg-opacity-10 ">
                      <span>
                        Ngày đặt:{" "}
                        <span className="text-gray-500">{formatDate(order?.createdAt)}</span>
                      </span>
                      <span>
                        Tổng cộng:{" "}
                        <span className="text-red-500">{formatPrice(order?.totalPrice)}</span>
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
                                  {formatPrice(item?.price)}
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
                              <span className="text-green-400">Trạng thái đơn hàng:</span> Đã thanh toán
                            </div>
                          ) : (
                            <div>
                              <span className="text-red-400">Trạng thái đơn hàng:</span> Chưa thanh toán
                            </div>
                          )}
                        </div>
                        <div>
                          <span className="text-green-400">Phương thức thanh toán:</span> {order?.paymentMethod}
                        </div>
                      </div>
                      <div>
                        <Button variant="outlined" onClick={() => handleCancelOrder(order)}>
                          Hủy đơn hàng
                        </Button>
                      </div>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
            :
            <BoxNoItem text="Không có đơn hàng nào" icon={<IoBagCheckOutline />} />
        }
      </div>
    </>
  );
};

export default OrderUserPage;
