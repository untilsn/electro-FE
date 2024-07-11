import { useEffect, useState } from "react";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "../config/firebaseConfigure";

export function useQueryData(productId) {
  const [detailItem, setDetailItem] = useState("");
  useEffect(() => {
    if (!productId) return;

    async function fetchDetailProduct() {
      try {
        const colRef = collection(db, "products");
        const querySnapshot = query(
          colRef,
          where("productId", "==", productId)
        );
        onSnapshot(querySnapshot, (snapshot) => {
          snapshot.forEach((doc) => {
            setDetailItem(doc.data());
          });
        });
      } catch (error) {
        console.log(error);
      }
    }

    fetchDetailProduct();
  }, [productId]);

  return [detailItem];
}
