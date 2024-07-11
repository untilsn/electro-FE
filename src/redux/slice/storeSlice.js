import { createSlice } from "@reduxjs/toolkit";

const storeSlice = createSlice({
  name: "store",
  initialState: {
    categories: [],
    products: [],
    wishlistArray: [],
    cartArray: [],
    categoryProducts: [],
    total: 0,
  },
  reducers: {
    fetchingProducts: (state, action) => {
      return {
        ...state,
        products: action.payload,
      };
    },
    displayWishlist: (state, action) => {
      return {
        ...state,
        wishlistArray: action.payload,
      };
    },
    displayCart: (state, action) => {
      return {
        ...state,
        cartArray: action.payload,
      };
    },
    displayCategories: (state, action) => {
      return {
        ...state,
        categories: action.payload,
      };
    },
    displayTotal: (state, action) => {
      return {
        ...state,
        total: action.payload,
      };
    },
    displayCategoryProducts: (state, action) => {
      return {
        ...state,
        categoryProducts: action.payload,
      };
    },
  },
});
export const {
  fetchingProducts,
  displayWishlist,
  displayCart,
  displayCategories,
  displayTotal,
  displayCategoryProducts,
} = storeSlice.actions;
export default storeSlice.reducer;
