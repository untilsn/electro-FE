import { useMutation } from "react-query";
import wishlistService from "../services/wishlistService";

// Hàm để thêm sản phẩm vào wishlist
const addToWishlist = async ({ userId, productId }) => {
  return await wishlistService.createWishlistItem(userId, productId);
};

// Custom hook để thêm sản phẩm vào wishlist
const useAddToWishlist = () => {
  // Sử dụng useMutation để thực hiện thao tác thêm vào wishlist
  const mutation = useMutation({
    mutationFn: addToWishlist,
    onSuccess: (data) => {
      console.log("Product added to wishlist:", data);
    },
    onError: (error) => {
      console.error("Error adding product to wishlist:", error);
    },
  });

  return {
    ...mutation,
    addToWishlist: mutation.mutate, // Trả về hàm mutate để thực hiện thêm vào wishlist
  };
};

export default useAddToWishlist;
