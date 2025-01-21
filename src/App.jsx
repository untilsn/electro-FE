import React, { Suspense, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { axiosJWT, getDetailsUser, refreshTokenUser } from "./service/useService";
import { updateUser, resetUser } from "./redux/slice/userSlice";
import { isJsonString } from "./utils/utils";

// Lazy load components
const HomePage = React.lazy(() => import("./pages/HomePage"));
const ShopPage = React.lazy(() => import("./pages/ShopPage"));
const ProductPage = React.lazy(() => import("./pages/ProductPage"));
const CartPage = React.lazy(() => import("./pages/CartPage"));
const WishlistPage = React.lazy(() => import("./pages/WishlistPage"));
const BlogPage = React.lazy(() => import("./pages/BlogPage"));
const CheckoutPage = React.lazy(() => import("./pages/CheckoutPage"));
const OrderUserPage = React.lazy(() => import("./pages/OrderUserPage"));
const ProfilePage = React.lazy(() => import("./pages/profileuser/ProfilePage"));
const NotFoundPage = React.lazy(() => import("./pages/NotFoundPage"));

// Dashboard components
const DashboardPage = React.lazy(() => import("./pages/DashboardPage"));
const DashboardProduct = React.lazy(() => import("./pages/manage/DashboardProduct"));
const AddProducts = React.lazy(() => import("./pages/manage/AddProducts"));
const DashboardUpdateProduct = React.lazy(() => import("./pages/manage/DashboardUpdateProduct"));
const DashboardOrder = React.lazy(() => import("./pages/manage/DashboardOrder"));
const DashboardUser = React.lazy(() => import("./pages/manage/DashboardUser"));

// Layout and Other Components
const PageStyles = React.lazy(() => import("./pages/PageStyles"));
const AuthModal = React.lazy(() => import("./modules/authen/AuthModal"));
const ScrollTopButton = React.lazy(() => import("./components/button/ScrollTopButton"));

function App() {
  const dispatch = useDispatch();

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
      storageData = JSON.parse(storageData); 
      decoded = jwtDecode(storageData); 
    }
    return { decoded, storageData };
  };

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
      <Suspense >
        <Routes>
          {/* main page */}
          <Route element={<PageStyles />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/product" element={<ProductPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/user-order" element={<OrderUserPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>

          {/* dashboard */}
          <Route path="" element={<DashboardPage />}>
            <Route path="/manage/product" element={<DashboardProduct />} />
            <Route path="/manage/add-product" element={<AddProducts />} />
            <Route path="/manage/products/update" element={<DashboardUpdateProduct />} />
            <Route path="/manage/order" element={<DashboardOrder />} />
            <Route path="/manage/user" element={<DashboardUser />} />
          </Route>
        </Routes>

        {/* function components */}
        <AuthModal />
        <ScrollTopButton />
      </Suspense>
    </>
  );
}

export default App;
