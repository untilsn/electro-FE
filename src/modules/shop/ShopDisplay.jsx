import React, { useState } from "react";
import CardShop from "../../components/card/CardShop";
import CardGrid from "../../components/card/CardGrid";
import { Input, Select, Option, Button } from "@material-tailwind/react";
import { getAllProduct } from "../../service/productService";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";

export const ICONLIST = [
  {
    id: 1,
    type: "grid-1",
    svg: (
      <svg width="16" height="10">
        <rect x="0" y="0" width="4" height="4"></rect>
        <rect x="6" y="0" width="10" height="4"></rect>
        <rect x="0" y="6" width="4" height="4"></rect>
        <rect x="6" y="6" width="10" height="4"></rect>
      </svg>
    ),
  },
  {
    id: 2,
    type: "grid-3",
    svg: (
      <svg width="16" height="10">
        <rect x="0" y="0" width="4" height="4"></rect>
        <rect x="6" y="0" width="4" height="4"></rect>
        <rect x="12" y="0" width="4" height="4"></rect>
        <rect x="0" y="6" width="4" height="4"></rect>
        <rect x="6" y="6" width="4" height="4"></rect>
        <rect x="12" y="6" width="4" height="4"></rect>
      </svg>
    ),
  },
  {
    id: 3,
    type: "grid-4",
    svg: (
      <svg width="22" height="10">
        <rect x="0" y="0" width="4" height="4"></rect>
        <rect x="6" y="0" width="4" height="4"></rect>
        <rect x="12" y="0" width="4" height="4"></rect>
        <rect x="18" y="0" width="4" height="4"></rect>
        <rect x="0" y="6" width="4" height="4"></rect>
        <rect x="6" y="6" width="4" height="4"></rect>
        <rect x="12" y="6" width="4" height="4"></rect>
        <rect x="18" y="6" width="4" height="4"></rect>
      </svg>
    ),
  },
];

const ShopDisplay = () => {
  const [search, setSearch] = useState("");
  const [valueSearch] = useDebounce(search, 1000);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentSort, setCurrentSort] = useState("");
  const [isActive, setIsActive] = useState("grid-1");
  const [limit, setLimit] = useState(10); // Number of items per page

  const fetchAllProduct = async (context) => {
    const limit = context?.queryKey[1];
    const search = context?.queryKey[2];
    const page = context?.queryKey[3];
    const sort = context?.queryKey[4];
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

  const handleSortChange = (event) => {
    setCurrentSort(event.target.value);
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <div className="flex items-center justify-between py-10">
        <h1 className="text-sm">
          Showing {(currentPage - 1) * limit + 1}–
          {Math.min(currentPage * limit, products?.total || 0)} of{" "}
          {products?.total || 0} Products
        </h1>
        <div className="flex items-center gap-5">
          {/* Sort */}
          <div className="flex items-center gap-3">
            <Select
              variant="outlined"
              label="Sort by"
              className="font-light rounded-none"
              onChange={handleSortChange}
            >
              <Option value="price-asc">Price: Low to High</Option>
              <Option value="price-desc">Price: High to Low</Option>
              <Option value="rating">Rating</Option>
            </Select>
          </div>
          {/* Search */}
          <div>
            <Input
              variant="static"
              placeholder="Search products..."
              color="black"
              className="placeholder:text-gray"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          {/* Grid item */}
          <div className="flex items-end gap-3">
            {ICONLIST.map((item) => (
              <div
                key={item?.id}
                onClick={() => setIsActive(item.type)}
                className={`${
                  isActive === item?.type
                    ? "opacity-100"
                    : "opacity-20 hover:opacity-100"
                } transition-all text-2xl`}
              >
                {item?.svg}
              </div>
            ))}
          </div>
        </div>
      </div>
      {products?.data?.length > 0 ? (
        <div>
          {isActive === "grid-1" ? (
            <div className="grid grid-cols-1 gap-6">
              {products?.data?.map((item, index) => (
                <CardGrid item={item} key={index}></CardGrid>
              ))}
            </div>
          ) : isActive === "grid-3" ? (
            <div className="grid grid-cols-3 gap-6">
              {products?.data?.map((item, index) => (
                <CardShop item={item} size="normal" key={index}></CardShop>
              ))}
            </div>
          ) : isActive === "grid-4" ? (
            <div className="grid grid-cols-4 gap-6">
              {products?.data?.map((item, index) => (
                <CardShop item={item} size="small" key={index}></CardShop>
              ))}
            </div>
          ) : null}
        </div>
      ) : (
        <div className="text-base font-light text-gray">
          No products matching your selection.
        </div>
      )}
      <div className="flex justify-center w-full mt-10">
        {/* Pagination */}
        <div className="flex items-center gap-4">
          <Button
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
            variant="outlined"
          >
            Previous
          </Button>
          <span className="text-sm">
            Page {currentPage} of {Math.ceil(products?.total / limit)}
          </span>
          <Button
            disabled={currentPage === Math.ceil(products?.total / limit)}
            onClick={() => handlePageChange(currentPage + 1)}
            variant="outlined"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ShopDisplay;
