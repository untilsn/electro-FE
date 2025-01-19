import React from 'react';
import { Typography } from '@material-tailwind/react';
import { flexRender, getCoreRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import { RiArrowUpDownFill } from "react-icons/ri";
import ActionEdit from '../action/ActionEdit';
import ActionView from '../action/ActionView';
import ActionDelete from '../action/ActionDelete';
import { formatPrice } from '../../utils/utils';
import ButtonAction from '../button/ButtonAction';

const columns = [
  {
    accessorKey: "name",
    header: "Tên sản phẩm",
    size: 350,
    cell: (info) => {
      const product = info.row.original;
      return (
        <div className="flex items-center space-x-2">
          <img src={product.image[0]} alt={product.name} className="w-10 h-10 object-cover rounded-md" />
          <span className="text-sm">{product.name}</span>
        </div>
      );
    },
    enableSorting: true, 
  },
  {
    accessorKey: "brand",
    header: "hãng",
    cell: (info) => <div className='capitalize text-left'>{info.getValue()}</div>,
  },
  {
    accessorKey: "category",
    header: "loại sản phẩm",
    cell: (info) => <div className='capitalize'>{info.getValue()}</div>,
  },
  {
    accessorKey: "price",
    header: "giá",
    cell: (info) => <div>{formatPrice(info.getValue())}</div>,
  },
  {
    accessorKey: "countInStock",
    header: "tồn kho",
    cell: (info) => <div>{info.getValue()}</div>,
  },
  {
    accessorKey: "action",
    header: "thao tác",
    enableSorting: false, 
    cell: (info) => (
      <div className="flex space-x-2">
        {/* <ActionEdit onClick={() => onView(info.getValue())}></ActionEdit>
        <ActionView onClick={() => onView(info.getValue())}></ActionView>
        <ActionDelete onClick={() => onView(info.getValue())}></ActionDelete> */}
        <ButtonAction icon={<RiArrowUpDownFill />}></ButtonAction>
        <ButtonAction icon={<RiArrowUpDownFill />}></ButtonAction>
        <ButtonAction icon={<RiArrowUpDownFill />}></ButtonAction>
      </div>
    ),
  },
];

const TableTest = ({ products }) => {
  const table = useReactTable({
    data: products, // `products` is the data passed to the table
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel()
  });
  return (
    <div>
      <table className="min-w-full table-auto" width={table.getTotalSize()}>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header, index) => (
                <th key={header.id} className='text-dark font-semibold capitalize  p-4 border border-gray border-opacity-10 ' width={header.getSize()}>
                  <div className='flex items-center justify-between'>
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    <div className='flex items-center gap-2'>

                    {header.column.getIsSorted()}
                    {header.column.getCanSort() &&
                      <RiArrowUpDownFill onClick={header.column.getToggleSortingHandler()} className='text-textColor' />
                    }
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getSortedRowModel().rows.map((row) => (
            <tr key={row.id} className='hover:bg-textColor hover:bg-opacity-10'>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className='text-center p-3 border-b border-gray border-opacity-10 ' width={cell.column.getSize()}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableTest;
