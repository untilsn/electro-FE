import BlogPage from "../../pages/BlogPage";
import MenuCart from "../menu/MenuCart";
import MenuShop from "../menu/MenuShop";
import ProductMenu from "../menu/ProductMenu";
import ProfileMenu from "../menu/ProfileMenu";

export const dashboardLink = [
  {
    name: "home",
    url: "/",
  },
  {
    name: "shop",
    url: "/shop",
    menu: <MenuShop></MenuShop>,
    hover: false,
  },
  {
    name: "product",
    url: "/product",
    hover: false,
    menu: <ProductMenu></ProductMenu>,
  },
  {
    name: "cart",
    url: "/cart",
    hover: false,
    menu: <MenuCart></MenuCart>,
  },
  {
    name: "blogs",
    url: "/blogs",
    hover: false,
    // menu: <BlogPage></BlogPage>,
  },
  {
    name: "profile",
    hover: false,
    menu: <ProfileMenu></ProfileMenu>,
  },
];
