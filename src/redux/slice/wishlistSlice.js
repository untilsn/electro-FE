import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wishlist: [], 
}
const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    setWishlist: (state, action) => {
      const wishlistId = action.payload;
      console.log(wishlistId)
      const existingWishlist = state.wishlist.findIndex(
        (item) => item === wishlistId
      );
      if (existingWishlist === -1) {
        state.wishlist.push(wishlistId);
      }
    },
    removeFromWishlist: (state, action) => {
      state.wishlist = state.wishlist.filter(
        (item) => item.id !== action.payload
      );
    },
    clearWishlist: (state) => {
      state.wishlist = [];
    },
  },
});

export const { setWishlist, removeFromWishlist, clearWishlist } =
  wishlistSlice.actions;
export default wishlistSlice.reducer;
