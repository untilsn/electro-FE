import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { displayWishlist } from "../redux/slice/storeSlice";
import { db } from "../config/firebaseConfigure";

export function useFetchingWishlists(user) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      dispatch(displayWishlist([])); // Nếu không có user, set giỏ hàng thành mảng rỗng
      return; // Trả về ngay sau khi set giỏ hàng để ngăn hook tiếp tục thực thi
    }
    const fetchData = async () => {
      try {
        const wishlistsQuery = query(
          collection(db, "wishlists"),
          where("userId", "==", user.id)
        );

        const snapshotListener = onSnapshot(wishlistsQuery, (snapshot) => {
          let newProductIds = [];
          snapshot.forEach((doc) => {
            const wishlistItem = doc.data();
            newProductIds.push(wishlistItem.productId);
          });

          if (newProductIds.length === 0) {
            dispatch(displayWishlist([]));
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
            dispatch(displayWishlist(fetchedProducts));
          });
        });

        return () => snapshotListener();
      } catch (error) {
        console.log("Error in useFetchingProducts:", error);
      }
    };

    fetchData();
    return () => {};
  }, [user, dispatch]);
}
