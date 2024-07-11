import { MdCompareArrows } from "react-icons/md";
import { IoCartOutline } from "react-icons/io5";
import { IoMdHeartEmpty } from "react-icons/io";

export const iconHeaderList = [
  {
    icon: <MdCompareArrows className="text-3xl" />,
    title: "compare",
    url: "",
  },
  {
    icon: <IoMdHeartEmpty className="text-3xl" />,
    title: "wishlist",
    url: "/wishlist",
  },
  {
    icon: <IoCartOutline className="text-3xl" />,
    title: "cart",
    url: "/cart",
  },
];
