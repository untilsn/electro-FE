import wishlistService from "../service/wishlistService";
import { useMutationHook } from "./useMutation";

// Hàm gọi dịch vụ để tạo một mục wishlist mới
const addToWishlist = async ({ userId, productId }) => {
  return await wishlistService.createWishlistItem(userId, productId);
};

// Custom hook để thêm sản phẩm vào wishlist
const useAddToWishlist = () => {
  // Sử dụng useMutation để thực hiện thao tác thêm vào wishlist
  const mutation = useMutationHook({
    mutationFn: addToWishlist(),
    onSuccess: (data) => {
      console.log("Product added to wishlist:", data);
    },
    onError: (error) => {
      console.error("Error adding product to wishlist:", error);
    },
  });

  return mutation;
};

export default useAddToWishlist;
