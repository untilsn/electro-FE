import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import WishlistPage from "./pages/WishlistPage";
import ScrollTopButton from "./components/button/ScrollTopButton";
import DashboardPage from "./pages/DashboardPage";
import PageStyles from "./pages/PageStyles";
import DashboardProduct from "./pages/manage/DashboardProduct";
import DashboardCategory from "./pages/manage/DashboardCategory";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import AddCategories from "./pages/manage/AddCategories";
import AddProducts from "./pages/manage/AddProducts";
import BlogPage from "./pages/BlogPage";
import DashboardUser from "./pages/manage/DashboardUser";
import DashboardUpdateProduct from "./pages/manage/DashboardUpdateProduct";
import { useEffect } from "react";
import { isJsonString } from "./utils/utils";
import {
  axiosJWT,
  getDetailsUser,
  refreshTokenUser,
} from "./service/useService";
import { updateUser } from "./redux/slice/userSlice";
import ProfilePage from "./pages/profileuser/ProfilePage";
import CheckoutPage from "./pages/CheckoutPage";
import OrderUserPage from "./pages/OrderUserPage";
import DashboardOrder from "./pages/manage/DashboardOrder";
import DashboardManage from "./pages/manage/DashboardManage";
import AuthModal from "./modules/authen/AuthModal";
import NotFoundPage from "./pages/NotFoundPage";



function App() {
  const dispatch = useDispatch();
  // const { user } = useSelector((state) => state.auth);
  // useDataUser(user);
  // useDataFetcher();
  // useFetchingWishlists(user);
  // useFetchingProducts(user);
  // useEffect(() => {
  //   fetchApi();
  // }, []);

  // const fetchApi = async () => {
  //   const res = await axios.get(
  //     `${import.meta.env.VITE_API_URL_BACKEND}/product/getAll`
  //   );
  //   return res.data;
  // };

  // const query = useQuery({ queryKey: ["todos"], queryFn: fetchApi });

  useEffect(() => {
    const { storageData, decoded } = handleDecoded();

    if (decoded?.id) {
      handleGetDetailsUser(decoded?.id, storageData);
    }
  }, []);

  const handleDecoded = () => {
    let storageData = localStorage.getItem("access_token");
    let decoded = {};
    if (storageData && isJsonString(storageData)) {
      storageData = JSON.parse(storageData); //* lấy access_token
      decoded = jwtDecode(storageData); //* decore access_token để lấy thông tin user
    }
    return { decoded, storageData };
  };

  // axiosJWT.interceptors.request.use(
  //   async (config) => {
  //     const currentTime = new Date();
  //     const { decoded } = handleDecoded();
  //     if (decoded.exp < currentTime.getTime() / 1000) {
  //       const data = await refreshToken();
  //       localStorage.setItem(
  //         "access_token",
  //         JSON.stringify(data?.access_token)
  //       );
  //       config.headers["token"] = `Bearer ${data?.access_token}`;
  //     }
  //     return config;
  //   },
  //   (err) => {
  //     return Promise.reject(err);
  //   }
  // );

  axiosJWT.interceptors.request.use(
    async (config) => {
      const currentTime = new Date();
      const { decoded } = handleDecoded();
      let storageRefreshToken = localStorage.getItem("refresh_token");
      const refreshToken = JSON.parse(storageRefreshToken);
      const decodedRefreshToken = jwtDecode(refreshToken);
      if (decoded.exp < currentTime.getTime() / 1000) {
        if (decodedRefreshToken?.exp > currentTime.getTime() / 1000) {
          const data = await refreshTokenUser(refreshToken);
          config.headers["token"] = `Bearer ${data?.access_token}`;
        } else {
          console.log("rererere?.exp");
          dispatch(resetUser());
        }
      }
      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
  );

  const handleGetDetailsUser = async (id, access_token) => {
    let storageRefreshToken = localStorage.getItem("refresh_token");
    const refreshToken = JSON.parse(storageRefreshToken);
    const res = await getDetailsUser(id, access_token);
    dispatch(
      updateUser({
        ...res?.data,
        access_token: access_token,
        refresh_token: refreshToken,
      })
    );
  };

  return (
    <>
      <Routes>
        {/* main page */}
        <Route element={<PageStyles></PageStyles>}>
          <Route path="/" element={<HomePage></HomePage>}></Route>
          <Route path="/shop" element={<ShopPage></ShopPage>}></Route>
          <Route path="/cart" element={<CartPage></CartPage>}></Route>
          <Route
            path="/wishlist"
            element={<WishlistPage></WishlistPage>}
          ></Route>
          <Route path="/product" element={<ProductPage></ProductPage>}></Route>
          <Route path="/blog" element={<BlogPage></BlogPage>}></Route>
          <Route path="/cart" element={<CartPage></CartPage>}></Route>
          <Route path="/profile" element={<ProfilePage></ProfilePage>}></Route>
          <Route
            path="/checkout"
            element={<CheckoutPage></CheckoutPage>}
          ></Route>
          <Route
            path="/user-order"
            element={<OrderUserPage></OrderUserPage>}
          ></Route>
        <Route path="*" element={<NotFoundPage></NotFoundPage>}></Route>

        </Route>
        {/* dashboard */}
        <Route path="" element={<DashboardPage></DashboardPage>}>
          <Route
            path="/manage/product"
            element={<DashboardProduct></DashboardProduct>}
          ></Route>
          <Route
            path="/manage/add-product"
            element={<AddProducts></AddProducts>}
          ></Route>
          <Route
            path="/manage/products/update"
            element={<DashboardUpdateProduct></DashboardUpdateProduct>}
          ></Route>
          <Route
            path="/manage/categories"
            element={<DashboardCategory></DashboardCategory>}
          ></Route>
          {/* <Route
            path="/manage/add-categories"
            element={<AddCategories></AddCategories>}
          ></Route> */}
          <Route
            path="/manage/order"
            element={<DashboardOrder></DashboardOrder>}
          ></Route>
          <Route
            path="/manage/user"
            element={<DashboardUser></DashboardUser>}
          ></Route>
        </Route>
      </Routes>
      {/* funtion */}
      <AuthModal></AuthModal>
      <ScrollTopButton></ScrollTopButton>
    </>
  );
}

export default App;
