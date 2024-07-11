import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useEffect } from "react";
import { db } from "../config/firebaseConfigure";
import { useDispatch } from "react-redux";
import { displayCategoryProducts } from "../redux/slice/storeSlice";
import { useFormatDate } from "./useFormatDate";

// Định nghĩa functional component của bạn

export function useFetchProductCategory(category) {
  const dispatch = useDispatch();
  useEffect(() => {
    try {
      async function fetchData() {
        const q = category
          ? query(collection(db, "products"), where("category", "==", category))
          : query(collection(db, "products"), orderBy("createAt", "desc"));

        onSnapshot(q, (snapshot) => {
          let result = [];
          snapshot.forEach((doc) => {
            result.push({
              id: doc.id,
              ...doc.data(),
            });
          });
          dispatch(displayCategoryProducts(result));
        });
      }
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, [category]); // Đảm bảo useEffect chỉ chạy một lần (khi component được mount)

  // Component này không cần trả về gì cả
  return null;
}
