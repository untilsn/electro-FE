import { useEffect } from "react";
import { db } from "../config/firebaseConfigure";
import { collection, onSnapshot } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { displayCategories } from "../redux/slice/storeSlice";

export function useFetchCategory() {
  const dispatch = useDispatch();

  useEffect(() => {
    const categoryRef = collection(db, "categories");
    onSnapshot(categoryRef, (snapshot) => {
      let result = [];
      snapshot.forEach((category) => {
        result.push({
          id: category.id,
          ...category.data(),
        });
      });
      dispatch(displayCategories(result));
    });
  }, []);
}
