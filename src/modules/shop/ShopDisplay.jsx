import React, { useEffect, useState } from "react";
import { BiGridHorizontal, BiGridSmall } from "react-icons/bi";
import CardGrid from "../../components/card/CardGrid";
import CardShop from "../../components/card/CardShop";
import { useSelector } from "react-redux";
import { Button, Input } from "@material-tailwind/react";
import Pagination from "../../components/pagination/Pagination";
import { getAllProduct } from "../../service/productService";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";

const ShopDisplay = () => {
  //todo firebase product
  const [search, setSearch] = useState("");
  const [valueSearch] = useDebounce(search, 1000);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentSort, setCurrentSort] = useState("");
  const [isActive, setIsActive] = useState("grid-1");
  const [paginate, setPaginate] = useState({
    page: 0,
    limit: 4,
    total: 1,
  });

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  const handleSortChange = (newSort) => {
    setCurrentSort(newSort);
  };

  // //todo
  // const [products, setProducts] = useState([]);
  // const [currentPage, setCurrentPage] = useState(1);
  // const [totalPages, setTotalPages] = useState(0);
  // const limit = 4;

  // useEffect(() => {
  //   const getProducts = async () => {
  //     const data = await fetchAllProduct(limit, currentPage - 1);
  //     setProducts(data.data);
  //     setTotalPages(data.totalPage);
  //   };

  //   getProducts();c
  // }, [currentPage]);

  // const handlePageChange = (page) => {
  //   setCurrentPage(page);
  // };
  // const { categoryProducts } = useSelector((state) => state.store);
  // const [currentPage, setCurrentPage] = useState(1);
  // const [itemPerPage, setItemPerPage] = useState(8);
  // const lastPostIndex = currentPage * itemPerPage;
  // const firstPostIndex = lastPostIndex - itemPerPage;
  // search method
  // filter method
  // const filterProducts = categoryProducts?.filter((product) =>
  //   product.title.toLowerCase().includes(search)
  // );
  //* display grid
  //todo server product
  const [limit, setLimit] = useState(2);
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
  return (
    <div>
      <div className="flex items-center justify-between py-10">
        <h1 className="text-sm">
          Showing{" "}
          <span>
            {products?.data?.length} of {products?.totalProduct}
          </span>{" "}
          Products
        </h1>
        <div className="flex items-center gap-5">
          <div>
            <span>sort by: </span>
            <select onChange={(e) => handleSortChange(e.target.value)}>
              <option value="">Default</option>
              <option value="asc,name">Name Ascending</option>
              <option value="desc,name">Name Descending</option>
            </select>
          </div>
          <div className="flex items-end gap-3 text-2xl">
            <BiGridSmall
              onClick={() => setIsActive("grid-1")}
              className={`${
                isActive === "grid-1"
                  ? "opacity-100"
                  : "opacity-20 hover:opacity-100"
              } transition-all`}
            />
            <BiGridHorizontal
              onClick={() => setIsActive("grid-4")}
              className={`${
                isActive === "grid-4"
                  ? "opacity-100"
                  : "opacity-20 hover:opacity-100"
              } transition-all`}
            />
          </div>
          <div>
            <Input
              variant="standard"
              label="search products"
              placeholder="Search products..."
              color="black"
              value={search}
              onChange={(e) => setSearch(e.target.value.toLowerCase())}
            />
          </div>
        </div>
      </div>
      {products?.data?.length > 0 ? (
        <div>
          {/* {isActive === "grid-1" ? (
            <div className="grid grid-cols-1 gap-5">
              {products?.data.map((item) => (
                <CardGrid key={item._id} item={item}></CardGrid>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-6">
              {products?.data.map((item) => (
                <CardShop key={item._id} item={item}></CardShop>
              ))}
            </div>
          )} */}
          <div className="grid grid-cols-4 gap-6">
            {products?.data.map((item) => (
              <CardShop key={item._id} item={item} size="small"></CardShop>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-base font-light text-gray">
          No products matching your selection.
        </div>
      )}
      <div className="flex justify-center w-full mt-10">
        {/* <Button
          disabled={products?.totalProduct === products?.data?.length}
          onClick={() => setLimit((prev) => prev + 4)}
          variant="outlined"
        >
          loadm more
        </Button> */}
        <Pagination
          currentPage={products?.currentPage}
          totalPage={products?.totalPage || 1}
          onPageChange={handlePageChange}
        ></Pagination>
      </div>
    </div>
  );
};

export default ShopDisplay;
