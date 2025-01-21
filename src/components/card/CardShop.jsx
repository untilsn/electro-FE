import React, { useState } from "react";
import { v4 } from "uuid";
import { FaCartPlus, FaHeart, FaRegHeart } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import IconReview from "../icon/IconReview";
import { formatPrice } from "../../utils/utils";
import { addOrderProduct } from "../../redux/slice/orderSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useCheckFavorite } from "../../hooks/useCheckFavorite";


const ProductCard = ({ item, classes, size = "normal" }) => {
  const [isHover, setIsHover] = useState(false);
  // const [isFavorite, setIsFavorite] = useState(false);
  const [isCart, setIsCart] = useState(false);
  const users = useSelector((state) => state.user);

  const dispatch = useDispatch()
  const cardStyles = {
    normal: "max-w-[275px]",
    small: "max-w-[200px] ",
  };

  const imageStyles = {
    normal: "h-[275px]",
    small: "h-[200px]",
  };

  const textStyles = {
    normal: "text-base",
    small: "text-sm",
  };

  const handleHoverImage = () => setIsHover(true);
  const handleNotHoverImage = () => setIsHover(false);

  const isFavorite = useCheckFavorite(item._id)


  const handleOrderProduct = () => {
    if (!users.access_token) {
      toast.error("you must be login to add cart!");
    } else {
      dispatch(
        addOrderProduct({
          orderItem: {
            name: item.name,
            amount: 1,
            brand: item.brand,
            image: item.image,
            price: item.price,
            productId: item._id,
            countInStock: item.countInStock,
          },
        })
      );
    }
  };







  return (
    <div className={`group hover:shadow-itemShadow transition duration-500 relative w-full border border-gray border-opacity-15 bg-white ${classes} ${cardStyles[size]}`}>
      <div onMouseEnter={handleHoverImage} onMouseLeave={handleNotHoverImage} className="relative w-full overflow-hidden">
        {/* Image */}
        <NavLink to={`/product?id=${item?._id}`}>
          <div className={`relative w-full overflow-hidden p-2 ${imageStyles[size]}`}>
            <img
              className={`absolute top-0 right-0 left-0 w-full h-full object-contain p-2 transition duration-500 ${isHover ? "opacity-0 scale-105" : "opacity-100 scale-100"} ${item?.type === "unknown" ? "blur-xl" : ""}`}
              src={item.image[0]}
              alt="product"
            />
            <img
              className={`absolute top-0 right-0 left-0 w-full h-full object-contain p-2 transition duration-500 ${isHover ? "opacity-100 scale-105" : "opacity-0 scale-100"}`}
              src={item.image[1]}
              alt="product alternative"
            />
          </div>
        </NavLink>
        {/* Favorite */}
        <div

          className="absolute w-7 h-7 flex items-center justify-center rounded-full right-4 top-4 bg-darkPrimary transition duration-300 opacity-0 group-hover:opacity-100 -translate-x-[50%] group-hover:translate-x-[5%] text-light text-sm">
          {isFavorite ? <FaHeart className="text-yellowColor"/> : <FaRegHeart />}
        </div>
        {/* Add to Cart */}
        <button onClick={handleOrderProduct} className="absolute bottom-0 left-0 right-0 flex items-center opacity-20 hover:bg-yellowColor justify-center gap-3 h-[40px] bg-darkPrimary text-light text-sm translate-y-[100%] group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition duration-300">
          <FaCartPlus className={`${isCart ? "text-yellowColor" : "text-white"} hover:text-yellowColor text-sm`} />
          Add to Cart
        </button>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2 px-3 py-4 bg-white">
        <div className="capitalize text-dark text-opacity-80 font-normal text-[13px] truncate h-[15px]">{item.brand} / {item.category}</div>
        <div>
          <Link
            // to={`/product?id=${item?._id}`}
            className="overflow-hidden text-darkPrimary text-center text-sm font-medium overflow-ellipsis h-[20px] line-clamp-2 mb-1">
            {item?.name}
          </Link>
          <h2 className={`text-darkPrimary text-center ${textStyles[size]}`}>{formatPrice(item?.price)}</h2>
        </div>
        <div className="flex items-center justify-center gap-3 text-nowrap overflow-ellipsis">
          <div className="flex items-center gap-1">
            {Array(item?.rating || 5).fill(0).map(() => <IconReview className="text-xs" key={v4()} />)}
          </div>
          <div className="text-xs text-grayColor">
            0 (review)
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
