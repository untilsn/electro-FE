import { toast } from "react-toastify";
import { createWishlistItem } from "../service/wishlistService";
import { useMutationHook } from "./useMutation"

const mutation = useMutationHook((data) => {
  const result = createWishlistItem(data);
  return result;
})


export const addWishlist = ({ userId, productId }) => {
  try {
    mutation.mutate({ userId, productId })
    toast.success("add wishlist success")
  } catch (error) {
    console.log(error)
  }
}