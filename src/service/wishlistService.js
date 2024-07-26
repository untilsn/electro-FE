import axios from "axios";

// Đặt URL cơ sở của API

// Tạo một mục wishlist mới
export const createWishlistItem = async (data) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL_BACKEND}/wishlist/create`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error creating wishlist item:", error);
    throw error;
  }
};

// Xóa sản phẩm khỏi wishlist
export const removeItemFromWishlist = async (userId, productId) => {
  try {
    const response = await axios.delete(
      `${
        import.meta.env.VITE_API_URL_BACKEND
      }/wishlist/remove/${userId}/${productId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error removing item from wishlist:", error);
    throw error;
  }
};

// Lấy wishlist của người dùng
export const getWishlistByUserId = async (userId) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL_BACKEND}/wishlist/getAll/${userId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    throw error;
  }
};
