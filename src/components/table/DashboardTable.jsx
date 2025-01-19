import React, { useState } from "react";
import { useReactTable, getCoreRowModel, getFilteredRowModel, getSortedRowModel, flexRender } from "@tanstack/react-table";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";

const ProductTable = ({ products, onView, onEdit, onDelete }) => {
  const [searchInput, setSearchInput] = useState("");

  const columns = [
    {
      accessorKey: "name",
      header: "Tên sản phẩm",
      cell: (info) => <strong className="text-red-200">{info.getValue()}</strong>,
    },
    {
      accessorKey: "brand",
      header: "Thương hiệu",
    },
    {
      accessorKey: "category",
      header: "Danh mục",
    },
    {
      accessorKey: "price",
      header: "Giá",
      cell: (info) => `${info.getValue().toLocaleString()} VND`,
    },
    {
      accessorKey: "countInStock",
      header: "Tồn kho",
    },
    {
      accessorKey: "_id",
      header: "Hành động",
      cell: (info) => (
        <div className="flex space-x-2">
          <button className="bg-blue-500 text-white px-2 py-1 rounded" onClick={() => onView(info.getValue())}>
            Xem
          </button>
          <button className="bg-yellow-500 text-white px-2 py-1 rounded" onClick={() => onEdit(info.getValue())}>
            Chỉnh sửa
          </button>
          <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => onDelete(info.getValue())}>
            Xóa
          </button>
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data: products.filter((item) =>
      item.name.toLowerCase().includes(searchInput.toLowerCase())
    ),
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="p-4">
      <input
        type="text"
        placeholder="Tìm kiếm sản phẩm..."
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded w-full"
      />
      <table className="w-full border-collapse border border-gray-300">
        <thead className="bg-gray-200">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="border border-gray-300 p-2 text-left">
                  {header.isPlaceholder ? null : (
                    <div
                      {...header.column.getToggleSortingHandler()}
                      className="flex items-center cursor-pointer"
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {header.column.getIsSorted() === "asc" ? <FaSortUp /> : header.column.getIsSorted() === "desc" ? <FaSortDown /> : <FaSort />}
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.length > 0 ? (
            table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="hover:bg-gray-100">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="border border-gray-300 p-2">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="text-center p-4">
                Không có sản phẩm nào.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
