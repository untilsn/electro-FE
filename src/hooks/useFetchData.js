import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect } from "react";
import { db } from "../config/firebaseConfigure";
import { useDispatch } from "react-redux";
import { fetchingProducts } from "../redux/slice/storeSlice";
import { useFormatDate } from "./useFormatDate";

// Định nghĩa functional component của bạn

export function useDataFetcher() {
  const dispatch = useDispatch();
  useEffect(() => {
    try {
      async function fetchData() {
        const q = query(
          collection(db, "products"),
          orderBy("createAt", "desc")
        );

        onSnapshot(q, (snapshot) => {
          let result = [];
          snapshot.forEach((doc) => {
            result.push({
              id: doc.id,
              ...doc.data(),
            });
          });
          const formattedResult = result.map((item) => {
            return { ...item, createAt: useFormatDate(item) };
          });

          dispatch(fetchingProducts(formattedResult));
        });
      }
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, []); // Đảm bảo useEffect chỉ chạy một lần (khi component được mount)

  // Component này không cần trả về gì cả
  return null;
}
