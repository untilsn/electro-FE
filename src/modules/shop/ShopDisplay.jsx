import React, { useState, useEffect } from "react";
import CardShop from "../../components/card/CardShop";
import CardGrid from "../../components/card/CardGrid";
import { Input, Button } from "@material-tailwind/react";
import { getAllProduct } from "../../service/productService";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import { useSelector } from "react-redux";
import Pagination from "../../components/pagination/Pagination";

export const ICONLIST = [

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
  const [sortOption, setSortOption] = useState("");
  const [isActive, setIsActive] = useState("grid-3");
  const [limit, setLimit] = useState(8);
  const filter = useSelector((state) => state.product);



  useEffect(() => {
    switch (isActive) {
      case "grid-3":
        setLimit(9);
        break;
      case "grid-4":
        setLimit(8);
        break;
      default:
        setLimit(8);
    }
  }, [isActive]);

  // fetch product
  const fetchAllProduct = async (context) => {
    const limit = context?.queryKey[1];
    const search = context?.queryKey[2];
    const page = context?.queryKey[3];
    const sort = context?.queryKey[4];
    const brand = context?.queryKey[5];
    const ram = context?.queryKey[6];
    const price = context?.queryKey[7];
    const res = await getAllProduct(
      search,
      limit,
      page,
      sort,
      brand,
      ram,
      price
    );
    return res;
  };
  const { data: products, isLoading } = useQuery({
    queryKey: [
      "products",
      limit,
      valueSearch,
      currentPage,
      sortOption,
      filter.brand,
      filter.ram,
      filter.price,
    ],
    queryFn: fetchAllProduct,
    retry: 3,
    retryDelay: 1000,
    keepPreviousData: true,
  });



  const handlePageChange = (page) => {
    setCurrentPage(page);
  };



  const handleSortChange = (e) => {
    const selectedSortOption = e.target.value;
    setSortOption(selectedSortOption);
  };


  // if (isLoading) return <div>Loading...</div>;
  return (
    <div>
      <div className="flex items-center justify-between py-10">
        <h1 className="text-sm">
          Hiển thỉ {" "}
          <span className="font-semibold">
            {Math.min(currentPage * limit, products?.total || 0)}
          </span>
          {" "} trên {" "}
          <span className="font-semibold">
          {products?.total || 0}
          </span>
          {" "}
           sản phẩm
        </h1>
        <div className="flex items-center gap-5">
          {/* sort */}
          <div className="mb-4">
            <label htmlFor="sort" className="text-sm font-medium text-darkPrimary mr-5">
              Lọc bởi:
            </label>
            <select
              id="sort"
              value={sortOption || ""}
              onChange={handleSortChange}
              className="mt-2 px-4 py-2 border border-gray-300"
            >
              <option value="">sản phẩm</option> {/* Default value (no selection) */}
              <option value="newest">Mới nhất</option>
              <option value="oldest">Cũ nhất</option>
              <option value="rating">Đánh giá</option>
            </select>
          </div>
          {/* Search */}
          <div>
            <Input
              variant="static"
              placeholder="Tìm sản phẩm..."
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
                className={`${isActive === item?.type
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
          {isActive === "grid-3" ? (
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

        <Pagination
          currentPage={currentPage}
          total={products?.total || 0}
          limit={limit}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default ShopDisplay;
