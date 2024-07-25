import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "filters",
  initialState: {
    brand: null,
    ram: null,
    price: null,
  },
  reducers: {
    setBrand(state, action) {
      state.brand = action.payload;
    },
    setRam(state, action) {
      state.ram = action.payload;
    },
    setPrice(state, action) {
      state.price = action.payload;
    },
    clearFilters(state) {
      state.brand = null;
      state.ram = null;
      state.price = null;
    },
  },
});

export const { setBrand, setRam, setPrice, clearFilters } =
  productSlice.actions;

export default productSlice.reducer;
