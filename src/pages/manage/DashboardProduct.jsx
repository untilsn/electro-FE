import React, { Fragment, useState } from "react";
import DashboardHeading from "../../modules/dashboard/DashboardHeading";
import ActionView from "../../components/action/ActionView";
import ActionEdit from "../../components/action/ActionEdit";
import ActionDelete from "../../components/action/ActionDelete";
import { Chip, Typography, Card } from "@material-tailwind/react";
import { useSelector } from "react-redux";
import Pagination from "../../components/pagination/Pagination";
import { useNavigate } from "react-router-dom";
import { getAllProduct } from "../../service/productService";
import { useMutationHook } from "../../hooks/useMutation";
import { useQuery } from "@tanstack/react-query";
const TABLE_HEAD = [
  "id",
  "product",
  "categore/stock",
  "user",
  "status",
  "action",
];

const DashboardProduct = () => {
  const navigate = useNavigate();
  const getAllProducts = async () => {
    const res = await getAllProduct();
    return res.data;
  };

  const { isloading: isLoadingProduct, data: product } = useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });
  return (
    <Fragment>
      <div className="flex items-center justify-between">
        <DashboardHeading>Manage Product</DashboardHeading>
      </div>
      <Card shadow={false} className="w-full mt-10">
        <table className="w-full text-left min-w-max">
          <thead className="">
            <tr>
              {TABLE_HEAD.map((head) => (
                <th key={head} className="py-4 border-b border-gray-100">
                  <Typography
                    variant="small"
                    color="gray"
                    className={
                      head === "product"
                        ? "text-sm  leading-none text-left  font-medium capitalize text-dark "
                        : "text-sm  leading-none text-center font-medium capitalize text-dark "
                    }
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {product?.map((item, index) => {
              return (
                <tr
                  key={item._id}
                  className="text-center hover:bg-bgColor hover:bg-opacity-60"
                >
                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="gray"
                      className="text-sm font-normal"
                      title={item?._id}
                    >
                      {item?._id.slice(0, 5) + "..."}
                    </Typography>
                  </td>
                  <td className="py-4 w-[500px]">
                    <Typography
                      variant="small"
                      color="gray"
                      className="text-sm font-normal w-[500px]"
                    >
                      <span className="flex items-center justify-start gap-3 max-w-[500px]">
                        <span className="max-w-[150px] w-full  h-[100px]">
                          <img
                            className="object-contain w-full h-full rounded"
                            src={item?.image[0]}
                            alt={item?.type}
                          />
                        </span>
                        <span className="flex flex-col justify-start gap-1">
                          <span
                            className="font-medium overflow-hidden overflow-ellipsis h-[40px] max-w-[300px]"
                            style={
                              {
                                // textOverflow: "ellipsis",
                                // whiteSpace: "nowrap",
                              }
                            }
                            title={item?.name}
                          >
                            {item?.name}
                          </span>
                          <span>Date: {item?.createAt}</span>
                        </span>
                      </span>
                    </Typography>
                  </td>
                  <td>
                    <Typography
                      variant="small"
                      color="gray"
                      className="text-sm font-normal text-center"
                    >
                      <span className="flex flex-col gap-1">
                        <span>{item?.type}</span>
                        <span>{item?.countInStock}</span>
                      </span>
                    </Typography>
                  </td>
                  <td>
                    <Typography
                      variant="small"
                      color="gray"
                      className="text-sm font-normal"
                    >
                      <span>John Michael</span>
                    </Typography>
                  </td>
                  <td className="p-4">
                    <div className="mx-auto text- w-max">
                      <Chip
                        size="lg"
                        variant="ghost"
                        value="APPROVED"
                        color={
                          status === ""
                            ? "green"
                            : status === "pending"
                            ? "amber"
                            : "red"
                        }
                      />
                    </div>
                  </td>
                  <td>
                    <Typography
                      variant="small"
                      color="gray"
                      className="text-sm font-normal"
                    >
                      <span className="flex items-center justify-center gap-3">
                        <ActionView></ActionView>
                        <ActionEdit
                          onClick={() =>
                            navigate(`/manage/products/update?id=${item._id}`)
                          }
                        ></ActionEdit>
                        <ActionDelete></ActionDelete>
                      </span>
                    </Typography>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </Fragment>
  );
};

export default DashboardProduct;
