import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { useMutationHook } from "../hooks/useMutation";
import { toast } from "react-toastify";
import { Card, Typography } from "@material-tailwind/react";
import { IoCloseOutline } from "react-icons/io5";
import { FaCartPlus } from "react-icons/fa";
import ShopBanner from "../modules/shop/ShopBanner";
import MainBreadcrumbs from "../components/breadcrumb/MainBreadcrumb";
import BoxNoItem from "../components/BoxNoItem";
import { getWishlistByUserId, removeItemFromWishlist } from "../service/wishlistService";
import { removeFromWishlist, setWishlist } from "../redux/slice/wishlistSlice";
import { FooterIconContact } from "../components/icon/IconContact";
import { formatPrice } from "../utils/utils";
import { GrFavorite } from "react-icons/gr";
import { addOrderProduct } from "../redux/slice/orderSlice";

const TABLE_HEAD = ["Product", "Price", "Stock", "Actions"];

const WishlistPage = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user); // Get users object from state

  const fetchAllWishlist = async ({ queryKey }) => {
    const userId = queryKey[1];
    if (!userId) return [];
    return await getWishlistByUserId(userId);
  };

  const { data: wishlists = [], isLoading, refetch } = useQuery({
    queryKey: ["wishlist", users.id], // Use users.id here
    queryFn: fetchAllWishlist,
    enabled: !!users.id,
  });

  const mutation = useMutationHook(async ({ userId, productId }) => {
    return await removeItemFromWishlist(userId, productId);
  });

  const handleRemoveFromWishlist = (productId) => {
    if (!users.id || !productId) return;
    mutation.mutate(
      { userId: users.id, productId }, // Use users.id here
      {
        onSuccess: () => {
          refetch();
          dispatch(removeFromWishlist());
        },
        onError: (error) => {
          console.error(error);
        },
      }
    );
  };


    const handleOrderProduct = (item) => {
      if (!users.access_token) {
        toast.error("you must be login to add cart!");
      } else {
        dispatch(
          addOrderProduct({
            orderItem: {
              name: item.productId.name,
              amount: 1,
              brand: item.productId.brand,
              image: item.productId.image,
              price: item.productId.price,
              productId: item.productId._id,
              countInStock: item.productId.countInStock,
            },
          })
        );
        handleRemoveFromWishlist(item.productId._id)
      }
    };
  
  

  return (
    <div>
      <ShopBanner title="Wishlist" />
      <MainBreadcrumbs />
      <div className="container">
        {isLoading ? (
          <p>Loading wishlist...</p>
        ) : wishlists.length === 0 ? (
          <BoxNoItem text="Danh sách yêu thích chưa có sản phẩm nào." icon={<GrFavorite />} />
        ) : (
          <Card shadow={false} className="container w-full h-full mt-20">
            <table className="w-full text-left table-auto min-w-max">
              <thead>
                <tr>
                  {TABLE_HEAD.map((head) => (
                    <th key={head} className="p-4 border-b border-gray border-opacity-10">
                      <Typography variant="small" color="gray" className="text-base font-medium opacity-70">
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {wishlists.map((item, index) => {
                  const isLast = index === wishlists.length - 1;
                  const rowClass = isLast ? "p-4 text-base" : "p-4 border-b border-gray border-opacity-10 text-base";

                  return (
                    <tr key={item.productId._id}>
                      <td className={`${rowClass} max-w-[580px]`}>
                        <div className="flex items-center gap-5">
                          <Link to={`/product?id=${item.productId._id}`} className="max-w-[100px] w-[100px] h-[100px]">
                            <img className="object-cover w-full h-full" src={item.productId.image[0]} alt="" />
                          </Link>
                          <Typography variant="small" color="gray" className="flex-1 text-base font-medium hover:text-yellowColor">
                            <Link to={`/product?id=${item.productId._id}`}>{item.productId.name}</Link>
                          </Typography>
                        </div>
                      </td>
                      <td className={rowClass}>
                        <Typography variant="small" color="gray" className="text-lg font-base text-yellowColor">
                          {formatPrice(item.productId.price)}
                        </Typography>
                      </td>
                      <td className={rowClass}>
                        <Typography variant="small" color="gray" className="text-lg font-base text-yellowColor">
                          {item.productId.countInStock > 0 ? "In stock" : "Out of stock"}
                        </Typography>
                      </td>
                      <td className={`${rowClass} max-w-[270px]`}>
                        <div className="flex items-center gap-8 text-sm font-medium text-center text-yellowColor w-[270px]">
                          <span
                            onClick={() => handleOrderProduct(item)}
                          className="flex items-center justify-center gap-5 p-4 uppercase bg-white border border-gray border-opacity-20 text-yellowColor max-w-[250px] w-full hover:bg-yellowColor hover:text-white">
                            <FaCartPlus />
                            <span>Add to Cart</span>
                          </span>
                          <button onClick={() => handleRemoveFromWishlist(item.productId._id)}>
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
        )}

        <div className="flex items-center gap-5 my-20">
          <span className="text-base text-gray text-opacity-60">Share on:</span>
          <div className="flex items-center gap-2">
            {FooterIconContact.map((item) => (
              <span key={item.id} className="inline-flex items-center p-3 bg-white border rounded-full text-gray border-gray hover:text-yellowColor hover:border-yellowColor">
                {item.icon}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;
