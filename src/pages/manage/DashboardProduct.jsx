import React, { Fragment, useRef, useState } from "react";
import { getAllProduct } from "../../service/productService";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import { DownloadTableExcel } from 'react-export-table-to-excel';
import { IoMdDownload } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import ButtonAction from "../../components/button/ButtonAction";
import { formatPrice } from "../../utils/utils";
import TableComponent from "../../components/table/TableComponent";


export const productColums = [
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
    cell: (info) => {
      const product = info.row.original
      return (
        <div className="flex space-x-2">
          <ButtonAction onClick={() => handleEditProduct(product)} icon={<FaRegEdit />}></ButtonAction>
          <ButtonAction onClick={() => handleEditProduct(product)} icon={<MdDeleteOutline />}></ButtonAction>
        </div>
      )
    },
  },
];



const DashboardProduct = () => {
  const [search, setSearch] = useState("");
  const [entries, setEntries] = useState(25);
  const [valueSearch] = useDebounce(search, 1000);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(100); 
  const [currentSort, setCurrentSort] = useState("");
  const tableRef = useRef(null)

  const fetchAllProduct = async ({ queryKey }) => {
    const [_, limit, search, page, sort] = queryKey;
    const res = await getAllProduct(search, limit, page, sort);
    return res;
  };

  const { data: products, isLoading } = useQuery({
    queryKey: ["products", limit, valueSearch, currentPage, currentSort],
    queryFn: fetchAllProduct,
    retry: 3,
    retryDelay: 1000,
    keepPreviousData: true,
  });


  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };


  if (isLoading) return <div>Loading...</div>;

  return (
    <Fragment>
      <div className="bg-white rounded-xl py-10 px-5 shadow-lg">
        {/* table */}
        <TableComponent column={productColums} tableRef={tableRef} data={products?.data}></TableComponent>
      </div>
    </Fragment>
  );
};

export default DashboardProduct;


