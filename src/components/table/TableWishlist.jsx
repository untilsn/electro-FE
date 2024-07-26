import React from "react";
import { Card, Typography } from "@material-tailwind/react";
import { FaCartPlus } from "react-icons/fa6";
import { IoCloseOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import {
  collection,
  deleteDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../../config/firebaseConfigure";
import { displayWishlist } from "../../redux/slice/storeSlice";
import { removeFromWishlist } from "../../redux/slice/wishlistSlice";
import { toast } from "react-toastify";
import { useMutationHook } from "../../hooks/useMutation";
import { removeItemFromWishlist } from "../../service/wishlistService";

const TABLE_HEAD = ["Product", "Price", "Stock Status", ""];

const TableWishlist = ({ Wishlists }) => {
  const users = useSelector((state) => state.user);
  console.log(Wishlists);
  const dispatch = useDispatch();

  const mutation = useMutationHook((data) => {
    const { userId, productId } = data;
    const result = removeItemFromWishlist(userId, productId);
    return result;
  });

  const handleRemoveFromWishlist = (productId) => {
    try {
      dispatch(removeFromWishlist(productId));
      mutation.mutate(
        {
          userId: users?.id,
          productId: productId,
        },
        {
          onSuccess: () => {
            toast.success("remove wishlists success");
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Card shadow={false} className="container w-full h-full mt-20">
        <table className="w-full text-left table-auto min-w-max">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="p-4 border-b border-gray border-opacity-10"
                >
                  <Typography
                    variant="small"
                    color="gray"
                    className="text-base font-medium leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Wishlists?.map((item, index) => {
              const isLast = index === Wishlists?.length - 1;
              const classes = isLast
                ? "p-4 text-base"
                : "p-4 border-b border-gray border-opacity-10 text-base";
              return (
                <tr key={item?.productId?._id}>
                  <td className={`${classes} max-w-[580px] `}>
                    <div className="flex items-center gap-5">
                      <Link
                        to={`/product?id=${item?.productId?._id}`}
                        className="max-w-[100px] w-[100px] h-[100px]"
                      >
                        <img
                          className="object-cover w-full h-full"
                          src={item?.productId?.image[0]}
                          alt=""
                        />
                      </Link>
                      <Typography
                        variant="small"
                        color="gray"
                        className="flex-1 text-base font-medium hover:text-yellowColor"
                      >
                        <Link to={`/product?id=${item?.productId?._id}`}>
                          {item?.productId?.name}
                        </Link>
                      </Typography>
                    </div>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="gray"
                      className="text-lg text-left font-base text-yellowColor"
                    >
                      ${item?.productId?.price}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="gray"
                      className="text-lg text-left font-base text-yellowColor"
                    >
                      {item?.productId?.countInStock !== 0
                        ? "In stock"
                        : "Out stock"}
                    </Typography>
                  </td>
                  <td className={`${classes} max-w-[270px]`}>
                    <div className="flex items-center gap-8 text-sm font-medium text-center text-yellowColor w-[270px]">
                      <span
                        onClick={() => handleAddCartWishlist(item)}
                        className="flex items-center justify-center gap-5 p-4 uppercase bg-white border border-gray border-opacity-20 text-yellowColor max-w-[250px] w-full  hover:bg-yellowColor hover:text-white"
                      >
                        <span>
                          <FaCartPlus />
                        </span>
                        <span>Add to Cart</span>
                      </span>
                      <button
                        onClick={() =>
                          handleRemoveFromWishlist(item?.productId?._id)
                        }
                      >
                        <IoCloseOutline className="text-3xl text-gray text-opacity-65 hover:text-opacity-100" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default TableWishlist;
