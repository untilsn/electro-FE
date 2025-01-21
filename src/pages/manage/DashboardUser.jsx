import React, { Fragment } from "react";
import DashboardTitle from "../../modules/dashboard/DashboardTitle";
import { getAllUser } from "../../service/useService";
import { useQuery } from "@tanstack/react-query";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import TableComponent from "../../components/table/TableComponent";


export const userColumns = [
  {
    accessorKey: "_id",
    header: "ID",
    cell: (info) => <div className="text-left">{info.getValue()}</div>,
    enableSorting: true,
  },
  {
    accessorKey: "name",
    header: "Tên người dùng",
    cell: (info) => <div className="capitalize text-left">{info.getValue()}</div>,
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: (info) => <div className="text-left">{info.getValue()}</div>,
  },
  {
    accessorKey: "phone",
    header: "SĐT",
    cell: (info) => <div className="text-left">{info.getValue()}</div>,
  },
  {
    accessorKey: "isAdmin",
    header: "Vai trò",
    cell: (info) => (
      <div className={`font-bold ${info.getValue() ? "text-red-600" : "text-green-600"}`}>
        {info.getValue() ? "🛠️ Admin" : "👤 User"}
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Ngày tạo",
    cell: (info) => <div>{new Date(info.getValue()).toLocaleDateString("vi-VN")}</div>,
  },
  {
    accessorKey: "updatedAt",
    header: "Cập nhật lần cuối",
    cell: (info) => <div>{new Date(info.getValue()).toLocaleDateString("vi-VN")}</div>,
  },
  {
    accessorKey: "action",
    header: "Thao tác",
    enableSorting: false,
    cell: (info) => {
      const user = info.row.original;
      return (
        <div className="flex space-x-2">
          <button onClick={() => handleEditUser(user)} className="text-blue-500">
            <FaRegEdit />
          </button>
          <button onClick={() => handleDeleteUser(user)} className="text-red-500">
            <MdDeleteOutline />
          </button>
        </div>
      );
    },
  },
];

const DashboardUser = () => {

  const fetchAllUser = async () => {
    const res = await getAllUser();
    return res;
  };

  const { data: users, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: fetchAllUser,
    retry: 3,
    retryDelay: 1000,
    keepPreviousData: true,
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <Fragment>
      <div className="flex items-center justify-between">
        <DashboardTitle>quản lý người dùng</DashboardTitle>
      </div>
      <TableComponent column={userColumns} data={users?.data}></TableComponent>
    </Fragment>
  );
};

export default DashboardUser;
