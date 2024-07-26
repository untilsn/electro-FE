import React, { Fragment, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CiGlass } from "react-icons/ci";
import { FaPen } from "react-icons/fa";
import { IoAdd } from "react-icons/io5";
import { MdDeleteForever } from "react-icons/md";
import { GrView } from "react-icons/gr";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Avatar,
  IconButton,
  Tooltip,
  CardFooter,
  Chip,
} from "@material-tailwind/react";
import TitlePath from "../../components/title/TitlePath";
import { getAllProduct } from "../../service/productService";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import { formatPrice } from "../../utils/utils";
import { FaMagnifyingGlass } from "react-icons/fa6";

const DashboardProduct = () => {
  const [search, setSearch] = useState("");
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
  console.log(products);
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <Fragment>
      <div className="flex items-center justify-between mb-10">
        <TitlePath>Manage Product</TitlePath>
      </div>
      <Card className="w-full h-full">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="flex items-center justify-between gap-8 mb-8"></div>
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex flex-col gap-2 shrink-0 sm:flex-row">
              <Link to={`/manage/add-product`}>
                <Button
                  className="flex items-center gap-3 text-darkPrimary"
                  size="sm"
                >
                  <IoAdd className="w-4 h-4" /> Add product
                </Button>
              </Link>
            </div>
            <div className="w-full md:w-72">
              <Input
                label="Search"
                icon={<FaMagnifyingGlass className="w-5 h-5" />}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardBody className="px-0 overflow-scroll">
          <table className="w-full mt-4 text-left table-auto min-w-max">
            <thead>
              <tr>
                {[
                  "Sản phẩm",
                  "Hãng",
                  "Danh mục",
                  "Giá",
                  "Tồn kho",
                  "Ngày",
                  "Thao tác",
                ].map((head) => (
                  <th
                    key={head}
                    className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-medium leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {products?.data?.length > 0 ? (
                products.data.map((item, index) => {
                  const isLast = index === products.data.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr key={item?._id}>
                      <td className={classes}>
                        <div className="flex items-center gap-3">
                          <div className="max-w-[80px] h-[80px]">
                            <img
                              src={item?.image[0]}
                              alt={item?.brand}
                              size="sm"
                              className="object-cover w-full h-full rounded-sm"
                            />
                          </div>
                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {item?.name}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          <Chip
                            color="blue"
                            className="text-center"
                            value={item?.brand}
                          />
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {item?.category}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {formatPrice(item?.price)}Đ
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {item?.countInStock}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {item?.updatedAt}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Tooltip content="View Product">
                          <IconButton variant="text">
                            <GrView className="w-4 h-4" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip content="Edit Product">
                          <IconButton variant="text">
                            <FaPen className="w-4 h-4" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip content="Delete Product">
                          <IconButton variant="text">
                            <MdDeleteForever className="w-4 h-4" />
                          </IconButton>
                        </Tooltip>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={7} className="p-4 text-center">
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </CardBody>
        <CardFooter className="flex items-center justify-between p-4 border-t border-blue-gray-50">
          <Typography variant="small" color="blue-gray" className="font-normal">
            Page {currentPage} of {Math.ceil(products?.total / limit)}
          </Typography>
          <div className="flex gap-2">
            <Button
              variant="outlined"
              size="sm"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <Button
              variant="outlined"
              size="sm"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === Math.ceil(products?.total / limit)}
            >
              Next
            </Button>
          </div>
        </CardFooter>
      </Card>
    </Fragment>
  );
};

export default DashboardProduct;
