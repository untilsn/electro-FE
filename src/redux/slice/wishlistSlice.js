import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    wishlistItem: [], // Danh sách các sản phẩm trong wishlist
  },
  reducers: {
    setWishlist: (state, action) => {
      // Thêm item vào danh sách wishlist
      const newItem = action.payload;

      // Kiểm tra nếu sản phẩm đã có trong wishlist
      const existingItemIndex = state.wishlistItem.findIndex(
        (item) => item._id === newItem._id
      );

      if (existingItemIndex === -1) {
        // Nếu chưa có, thêm sản phẩm vào wishlist
        state.wishlistItem.push(newItem);
      }
      // Nếu đã có, không làm gì hoặc có thể cập nhật nếu cần thiết
    },
    // Optional: Bạn có thể thêm các reducer khác như xóa wishlist item hoặc reset wishlist
    removeFromWishlist: (state, action) => {
      // Xóa item khỏi wishlist dựa trên productId
      state.wishlistItem = state.wishlistItem.filter(
        (item) => item.id !== action.payload.id
      );
    },
    clearWishlist: (state) => {
      // Xóa toàn bộ wishlist
      state.wishlistItem = [];
    },
  },
});

export const { setWishlist, removeFromWishlist, clearWishlist } =
  wishlistSlice.actions;
export default wishlistSlice.reducer;
