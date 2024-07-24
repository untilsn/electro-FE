import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";
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

const TABLE_HEAD = [
  "Sản phẩm",
  "Hãng",
  "Danh mục",
  "Giá",
  "Tồn kho",
  "Ngày",
  "Thao tác",
];

const TABLE_ROWS = [
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
    product: "Điện thoại A",
    brand: "Samsung",
    category: "Điện thoại",
    price: "10,000,000 VND",
    stock: 50,
    date: "23/04/18",
    action: "Chỉnh sửa",
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-2.jpg",
    product: "Điện thoại B",
    brand: "Apple",
    category: "Điện thoại",
    price: "20,000,000 VND",
    stock: 30,
    date: "23/04/18",
    action: "Chỉnh sửa",
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-1.jpg",
    product: "Điện thoại C",
    brand: "Xiaomi",
    category: "Điện thoại",
    price: "7,000,000 VND",
    stock: 20,
    date: "19/09/17",
    action: "Chỉnh sửa",
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-4.jpg",
    product: "Điện thoại D",
    brand: "Oppo",
    category: "Điện thoại",
    price: "5,000,000 VND",
    stock: 15,
    date: "24/12/08",
    action: "Chỉnh sửa",
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-5.jpg",
    product: "Điện thoại E",
    brand: "Vivo",
    category: "Điện thoại",
    price: "12,000,000 VND",
    stock: 25,
    date: "04/10/21",
    action: "Chỉnh sửa",
  },
];

const DashboardProduct = () => {
  const navigate = useNavigate();

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
              <Button variant="outlined" size="sm">
                Export Excel
              </Button>
              <Button
                className="flex items-center gap-3 text-darkPrimary"
                size="sm"
              >
                <IoAdd className="w-4 h-4" /> Add product
              </Button>
            </div>
            <div className="w-full md:w-72">
              <Input label="Search" icon={<CiGlass className="w-5 h-5" />} />
            </div>
          </div>
        </CardHeader>
        <CardBody className="px-0 overflow-scroll">
          <table className="w-full mt-4 text-left table-auto min-w-max">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TABLE_ROWS.map(
                (
                  { img, product, brand, category, price, stock, date, action },
                  index
                ) => {
                  const isLast = index === TABLE_ROWS.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr key={product}>
                      <td className={classes}>
                        <div className="flex items-center gap-3">
                          <Avatar src={img} alt={product} size="sm" />
                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {product}
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
                            value={brand}
                          />
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {category}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {price}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {stock}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {date}
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
                }
              )}
            </tbody>
          </table>
        </CardBody>
        <CardFooter className="flex items-center justify-between p-4 border-t border-blue-gray-50">
          <Typography variant="small" color="blue-gray" className="font-normal">
            Page 1 of 10
          </Typography>
          <div className="flex gap-2">
            <Button variant="outlined" size="sm">
              Previous
            </Button>
            <Button variant="outlined" size="sm">
              Next
            </Button>
          </div>
        </CardFooter>
      </Card>
    </Fragment>
  );
};

export default DashboardProduct;
