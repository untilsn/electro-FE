import React, { useState } from "react";
import CardShop from "../../components/card/CardShop";
import { Input, Select } from "@material-tailwind/react";
import { getAllProduct } from "../../service/productService";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import CardGrid from "../../components/card/CardGrid";

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
        <h1 className="text-sm">Showing 1–8 of 15 Products</h1>
        <div className="flex items-center gap-5">
          {/* sort */}
          <div className="flex items-center gap-3">
            {/* <span className="text-sm ">sort by: </span> */}
            <Select
              variant="outlined"
              label="Select Version"
              className="font-light rounded-none"
            >
              <Option>Material Tailwind HTML</Option>
              <Option>Material Tailwind React</Option>
              <Option>Material Tailwind Vue</Option>
              <Option>Material Tailwind Angular</Option>
              <Option>Material Tailwind Svelte</Option>
            </Select>
          </div>
          {/* search */}
          <div>
            <Input
              variant="static"
              placeholder="Search products..."
              color="black"
              className=" placeholder:text-gray"
            />
          </div>
          {/* grid item */}
          <div className="flex items-end gap-3 ">
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
      {8 > 0 ? (
        <div>
          {isActive === "grid-1" ? (
            <div className="grid grid-cols-1 ">
              {products?.data?.map((item, index) => (
                // <ProductCardRow item={item} key={index}></ProductCardRow>
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
          ) : (
            ""
          )}
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
        {/* <Pagination
      currentPage={products?.currentPage}
      totalPage={products?.totalPage || 1}
      onPageChange={handlePageChange}
    ></Pagination> */}
      </div>
    </div>
  );
};

export default ShopDisplay;
