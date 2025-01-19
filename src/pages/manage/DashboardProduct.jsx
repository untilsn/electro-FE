import React, { Fragment, useState } from "react";
import { getAllProduct } from "../../service/productService";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import TableTest from "../../components/table/TableTest";

const DashboardProduct = () => {
  const [search, setSearch] = useState("");
  const [entries, setEntries] = useState(25);
  const [valueSearch] = useDebounce(search, 1000);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(4); // Number of items per page
  const [currentSort, setCurrentSort] = useState("");


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
      {/* function */}
      <div className="flex items-center justify-between mb-10">
        {/* show entries */}
        <div className="flex items-center space-x-2">
          <label className="text-gray-700">Show</label>
          <select
            className="border rounded px-2 py-1"
            value={entries}
            onChange={(e) => setEntries(Number(e.target.value))}
          >
            {[10, 25, 50, 100].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
          <span className="text-gray-700">entries</span>
        </div>
        {/* search */}
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
      </div>
      {/* table */}
      <div>
      <TableTest products={products?.data}></TableTest>
      </div>
     </div>
    
    </Fragment>
  );
};

export default DashboardProduct;


