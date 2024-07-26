import MenuCart from "../modules/menu/MenuCart";
import MenuShop from "../modules/menu/MenuShop";
import ProductMenu from "../modules/menu/ProductMenu";
import ProfileMenu from "../modules/menu/ProfileMenu";

export const NAVBARLIST = [
  {
    name: "trang chủ",
    title: "home",
    hover: false,
    url: "/",
  },
  {
    name: "cửa hàng",
    title: "shop",
    url: "/shop",
    hover: false,
    menu: <MenuShop></MenuShop>,
    subItems: [
      { title: "SHOP WITH SIDEBAR" },
      { title: "SHOP VARIATIONS" },
      { title: "SHOP PAGES" },
    ],
  },
  {
    name: "đặt hàng",
    title: "product",
    url: "/user-order",
    hover: false,
    menu: <ProductMenu></ProductMenu>,
    subItems: [
      { title: "Default" },
      { title: "Centered" },
      { title: "Extended InfoNEW" },
      { title: "Gallery" },
      { title: " Sticky Info" },
      { title: "Boxed With Sidebar" },
      { title: " Full Width" },
    ],
  },
  {
    name: "giỏ hàng",
    title: "cart",
    url: "/cart",
    hover: false,
    menu: <MenuCart></MenuCart>,
    subItems: [
      { title: "About" },
      { title: "Contact 01" },
      { title: "About" },
      { title: "Login" },
      { title: "Error 404" },
    ],
  },
  {
    name: "blogs",
    title: "blogs",
    url: "/blogs",
    hover: false,
    // menu: <BlogPage></BlogPage>,
  },
  {
    name: "hồ sơ",
    title: "profile",
    hover: false,
    menu: <ProfileMenu></ProfileMenu>,
    subItems: [
      { title: "Manage" },
      { title: "Profile" },
      { title: "My Order" },
      { title: "Logout" },
    ],
  },
];
