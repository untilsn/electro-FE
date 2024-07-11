import {
  addDoc,
  collection,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "../config/firebaseConfigure";
import { useSelector } from "react-redux";
export function useAddProduct() {
  const { user } = useSelector((state) => state.auth);

  const handleAddItem = async (item, type) => {
    if (!user) {
      toast.error("You must be login to add products..");
    }
    try {
      const docRef = collection(db, type);
      const unsubscribe = await getDocs(
        query(
          docRef,
          where("userId", "==", user?.id),
          where("productId", "==", item?.productId)
        )
      );
      if (unsubscribe.size > 0) {
        console.log("Product already exists ");
        return;
      }
      // Add wishlist item if it doesn't exist
      const wishlistDocRef = collection(db, type);
      addDoc(wishlistDocRef, {
        userId: user.id,
        productId: item.productId,
        timeAdded: serverTimestamp(),
        category: item.category,
      })
        .then(() => {
          if (type === "wishlists") {
            toast.success("Added to wishlist");
          } else if (type === "carts") {
            toast.success("Added to cartsuccess");
          }
        })
        .catch((error) => {
          console.log("Error adding wishlist item:", error);
        });
    } catch (error) {
      console.log("Error handling wishlist:", error);
    }
  };
  return {
    handleAddItem,
  };
}
