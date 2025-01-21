import React, { Fragment } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllOrder } from "../../service/orderService";
import { formatPrice } from "../../utils/utils";
import TableComponent from "../../components/table/TableComponent";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

export const orderColumns = [
  {
    accessorKey: "_id",
    header: "Mã đơn",
    cell: (info) => <div className="capitalize text-left">{info.getValue()}</div>,
    enableSorting: true,
  },
  {
    accessorKey: "shippingAddress.fullName",
    header: "Người nhận",
    cell: (info) => <div className="capitalize text-left">{info.getValue()}</div>,
  },
  {
    accessorKey: "shippingAddress.phone",
    header: "SĐT",
    cell: (info) => <div className="capitalize">{info.getValue()}</div>,
  },
  {
    accessorKey: "shippingAddress.address",
    header: "Địa chỉ",
    cell: (info) => <div className="text-left">{info.getValue()}</div>,
  },
  {
    accessorKey: "isPaid",
    header: "Thanh toán",
    cell: (info) => (
      <div className={`font-bold ${info.getValue() ? "text-green-600" : "text-red-600"}`}>
        {info.getValue() ? "✅ Đã thanh toán" : "❌ Chưa thanh toán"}
      </div>
    ),
  },
  {
    accessorKey: "isDelivered",
    header: "Giao hàng",
    cell: (info) => (
      <div className={`font-bold ${info.getValue() ? "text-green-600" : "text-blue-600"}`}>
        {info.getValue() ? "✅ Đã giao" : "🚚 Đang giao"}
      </div>
    ),
  },
  {
    accessorKey: "totalPrice",
    header: "Tổng tiền",
    cell: (info) => <div className="font-bold">{formatPrice(info.getValue())}</div>,
  },
  {
    accessorKey: "createdAt",
    header: "Ngày đặt",
    cell: (info) => <div>{new Date(info.getValue()).toLocaleDateString("vi-VN")}</div>,
  },
];


const DashboardOrder = () => {

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
  console.log(orders)
  if (isLoading) return <div>Loading...</div>;

  return (
    <Fragment>
      <TableComponent column={orderColumns} data={orders?.data}></TableComponent>
    </Fragment>
  );
};

export default DashboardOrder;
