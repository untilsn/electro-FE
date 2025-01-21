import React, { useRef, useState } from 'react';
import { Button, ButtonGroup } from '@material-tailwind/react';
import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import { RiArrowUpDownFill } from "react-icons/ri";
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { DownloadTableExcel } from 'react-export-table-to-excel';
import { IoMdDownload } from 'react-icons/io';

const TableComponent = ({ data, column }) => {
  const tableRef = useRef(null);
  const [search, setSearch] = useState(""); 

  const table = useReactTable({
    data,
    columns: column,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      globalFilter: search, 
    },
    onGlobalFilterChange: setSearch, 
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: 10,
      },
    },
  });

  return (
    <div>
      <div className='flex items-center justify-between mb-10'>
        <div className="flex items-center gap-3">
          <span className="capitalize">search:</span>
          <input
            type="text"
            placeholder="Search..."
            className="border rounded px-3 py-1"
            value={search}
            onChange={(e) => setSearch(e.target.value)} 
          />
        </div>

        <div>
          <DownloadTableExcel
            filename="users table"
            sheet="users"
            currentTableRef={tableRef.current}
          >
            <button className="px-5 py-4 flex items-center gap-3 hover:text-yellowColor border border-gray border-opacity-20">
              <IoMdDownload />
              Export excel
            </button>
          </DownloadTableExcel>
        </div>
      </div>

      {/* 🔹 Bảng dữ liệu */}
      <table ref={tableRef} className="min-w-full table-auto" width={table.getTotalSize()}>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className='text-dark font-semibold capitalize p-4 border border-gray border-opacity-10 ' width={header.getSize()}>
                  <div className='flex items-center justify-between'>
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    {header.column.getCanSort() && (
                      <RiArrowUpDownFill onClick={header.column.getToggleSortingHandler()} className='text-textColor cursor-pointer' />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
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

      {/* 🔹 Pagination */}
      <div className="mt-4 flex items-start gap-5 flex-col justify-between">
        <span>
          Trang {table.getState().pagination.pageIndex + 1} / {table.getPageCount()}
        </span>
        <ButtonGroup variant="outlined">
          <Button
            disabled={!table.getCanPreviousPage()}
            onClick={() => table.previousPage()}
          >
            <FaChevronLeft />
          </Button>
          <Button
            disabled={!table.getCanNextPage()}
            onClick={() => table.nextPage()}
          >
            <FaChevronRight />
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
};

export default TableComponent;
