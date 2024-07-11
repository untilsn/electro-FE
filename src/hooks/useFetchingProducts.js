import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../config/firebaseConfigure";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { displayCart } from "../redux/slice/storeSlice";

export function useFetchingProducts(user) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      dispatch(displayCart([])); // Nếu không có user, set giỏ hàng thành mảng rỗng
      return; // Trả về ngay sau khi set giỏ hàng để ngăn hook tiếp tục thực thi
    }
    const fetchData = async () => {
      try {
        const wishlistsQuery = query(
          collection(db, "carts"),
          where("userId", "==", user.id)
        );

        const snapshotListener = onSnapshot(wishlistsQuery, (snapshot) => {
          let newProductIds = [];

          snapshot.forEach((doc) => {
            const wishlistItem = doc.data();
            newProductIds.push(wishlistItem.productId);
          });

          if (newProductIds.length === 0) {
            dispatch(displayCart([]));
            return;
          }

          const productsQuery = query(
            collection(db, "products"),
            where("productId", "in", newProductIds)
          );

          onSnapshot(productsQuery, (snapshot) => {
            const fetchedProducts = [];
            snapshot.forEach((doc) => {
              fetchedProducts.push(doc.data());
            });
            dispatch(displayCart(fetchedProducts));
          });
        });

        return () => {
          snapshotListener(); // Hủy đăng ký khỏi trình nghe snapshot
        };
      } catch (error) {
        console.log("Lỗi trong useFetchingProducts:", error);
        console.log(error);
      }
    };

    fetchData();

    return () => {}; // Hàm dọn dẹp cho lần render ban đầu
  }, [user, dispatch]);
}
