import React, { Fragment, useState } from "react";
import DashboardHeading from "../../modules/dashboard/DashboardHeading";
import { Card, Chip, Typography } from "@material-tailwind/react";
import ActionView from "../../components/action/ActionView";
import ActionEdit from "../../components/action/ActionEdit";
import ActionDelete from "../../components/action/ActionDelete";
import { useQuery } from "@tanstack/react-query";
import { getAllOrder } from "../../service/orderService";
import { formatPrice } from "../../utils/utils";

const TABLE_HEAD = [
  "id",
  "order date",
  "total amount",
  "payment status",
  "action",
];

const DashboardOrder = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const fetchAllOrders = async () => {
    const res = await getAllOrder(); // Fetch orders instead of users
    return res;
  };

  const { data: orders, isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: fetchAllOrders,
    retry: 3,
    retryDelay: 1000,
    keepPreviousData: true,
  });
  console.log(orders);
  // Filter orders based on the search term
  const filteredOrders =
    orders?.data?.filter(
      (order) =>
        order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.date.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  if (isLoading) return <div>Loading...</div>;

  return (
    <Fragment>
      <div className="flex items-center justify-between">
        <DashboardHeading>Manage Orders</DashboardHeading>
        <input
          type="search"
          placeholder="Search orders"
          className="p-3 bg-transparent focus:border-warning max-w-[300px] w-full border border-darkPrimary border-opacity-75 rounded-md outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <Card shadow={false} className="w-full mt-10">
        <table className="w-full text-left min-w-max">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="p-4 border-b border-gray border-opacity-20"
                >
                  <Typography
                    variant="small"
                    color="gray"
                    className={
                      head === "payment status" || head === "action"
                        ? "text-sm leading-none text-center font-medium capitalize text-dark"
                        : "text-sm leading-none text-left font-medium capitalize text-dark"
                    }
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length > 0 ? (
              filteredOrders.map((item, index) => {
                const isLast = index === filteredOrders.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-gray border-opacity-20";
                return (
                  <tr
                    key={item?._id}
                    className="border-none hover:bg-bgColor hover:bg-opacity-60"
                  >
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="gray"
                        className="text-sm font-normal"
                      >
                        {item?._id}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="gray"
                        className="text-sm font-normal"
                      >
                        <span>{item?.createdAt}</span>
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="gray"
                        className="text-sm font-normal"
                      >
                        <span>{formatPrice(item?.totalPrice)}Đ</span>
                      </Typography>
                    </td>
                    <td className={classes}>
                      <div className="flex items-center justify-center">
                        <Chip
                          size="lg"
                          variant="ghost"
                          value={item?.paymentStatus ? "Paid" : "Pending"}
                          color={item?.paymentStatus ? "green" : "red"}
                        />
                      </div>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="gray"
                        className="text-sm font-normal"
                      >
                        <span className="flex items-center justify-center gap-3">
                          <ActionView />
                          <ActionEdit />
                          <ActionDelete />
                        </span>
                      </Typography>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={TABLE_HEAD.length} className="p-4 text-center">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Card>
    </Fragment>
  );
};

export default DashboardOrder;
