import { FaCaretDown } from "react-icons/fa";
import ProfileMenu from "../modules/menu/ProfileMenu";
import UserMenu from "../modules/menu/UserMenu";
import { FaAngleDown } from "react-icons/fa6";

export const HEADERNAVBAR = [
  {
    id: 1,
    name: "home",
    title: "trang chủ",
    url: "/",
  },
  {
    id: 2,
    name: "shop",
    title: "cửa hàng",
    url: "/shop",
  },
  {
    id: 5,
    name: "blog",
    title: "blogs",
    url: "/blog",
  },
  {
    id: 6,
    name: "info",
    title: "hồ sơ",
    url: "/user-info",
    icon: <FaAngleDown size={10} />,
    menu: <UserMenu></UserMenu>
  },
];
