import React from "react";
import { Card, Typography } from "@material-tailwind/react";
import { IoCloseOutline } from "react-icons/io5";
import { FiMinus, FiPlus } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  decrementAmount,
  incrementAmount,
  removeOrderProduct,
} from "../../redux/slice/orderSlice";
import { formatPrice } from "../../utils/utils";

const TABLE_HEAD = ["sản phẩm", "giá", "số lượng", "tổng cộng", ""];

const MainTable = ({ item }) => {
  const dispatch = useDispatch();

  const handleDecrement = (productId, amount) => {
    if (amount > 1) {
      dispatch(decrementAmount(productId));
    }
  };

  const handleIncrement = (productId, amount, countInStock) => {
    if (amount < countInStock) {
      dispatch(incrementAmount(productId));
    }
  };

  return (
    <Card shadow={false} className="w-full mb-10 bg-transparent">
      <table className="w-full text-left min-w-max ">
        <thead className="">
          <tr>
            {TABLE_HEAD.map((head) => (
              <th
                key={head}
                className="p-4 border-b border-gray border-opacity-40"
              >
                <Typography
                  variant="small"
                  color="gray"
                  className={
                    head === "product" || head === "total"
                      ? "text-base font-normal leading-none text-left capitalize text-dark "
                      : "text-base font-normal leading-none text-center capitalize text-dark "
                  }
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {item?.map((doc) => {
            // const total = totalPrices[doc.productId] || 0;
            return (
              <tr key={doc.productId} className="border-b border-gray border-opacity-20">
                <td className="p-4 max-w-[440px]">
                  <Typography
                    variant="small"
                    color="gray"
                    className="text-sm font-normal"
                  >
                    <span className="flex items-center gap-2">
                      <Link
                        to={`/product?id=${doc.productId}`}
                        className="hover:shadow-sm max-w-[60px] w-full h-[80px]"
                      >
                        <img
                          className="object-contain w-full h-full "
                          src={doc?.image[0]}
                          alt="img"
                        />
                      </Link>
                      <Link
                        to={`/product?id=${doc.productId}`}
                        className="text-base font-medium text-dark overflow-hidden overflow-ellipsis h-[50px] hover:text-yellowColor"
                      >
                        {doc?.name}
                      </Link>
                    </span>
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography
                    variant="small"
                    color="gray"
                    className="text-lg font-normal text-center"
                  >
                    {formatPrice(doc?.price)}
                  </Typography>
                </td>
                <td className="p-4 mx-auto">
                  <span className="flex mx-auto select-none items-center justify-between px-2  py-3 border border-gray w-[100px] border-opacity-30 ">
                    <span
                      onClick={() => handleDecrement(doc.productId, doc.amount)}
                    >
                      <FiMinus />
                    </span>
                    <span>{doc?.amount}</span>
                    <span
                      onClick={() =>
                        handleIncrement(
                          doc.productId,
                          doc.amount,
                          doc.countInStock
                        )
                      }
                    >
                      <FiPlus />
                    </span>
                  </span>
                </td>
                <td>
                  <Typography
                    variant="small"
                    color="gray"
                    className="text-lg max-w-[120px] w-full font-medium text-center text-yellowColor"
                  >
                    {formatPrice(doc?.price * doc?.amount)}

                  </Typography>
                </td>
                <td>
                  <span
                    onClick={() =>
                      dispatch(removeOrderProduct(doc.productId))
                    }
                    className="text-dark"
                  >
                    <IoCloseOutline></IoCloseOutline>
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Card>
  );
};

export default MainTable;
