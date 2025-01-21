import { RiMessengerLine } from "react-icons/ri";

import { MdFavoriteBorder } from "react-icons/md";
import { IoCartOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
const {wishlistItem} = useSelector(state => state.wishlist)
const {orderItem} = useSelector(state => state.order)


export const HEADERRIGHTsss = [
    {
      id: 2,
      name: "yêu thích",
      icon: <MdFavoriteBorder />,
      url: "/wishlist",
      length: wishlistItem.lenght
    },
    {
      id: 3,
      name: "giỏ hàng",
      icon: <IoCartOutline />,
      url: "/cart",
      length: orderItem.lenght
    },
  ];
  