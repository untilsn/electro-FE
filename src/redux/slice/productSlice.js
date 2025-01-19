import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  brand: [],
  ram: [],
  price: { min: 0, max: Infinity },
}


const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setBrand(state, action) {
      const brandName = action.payload;
      if (state.brand.includes(brandName)) {
        state.brand = state.brand.filter((b) => b !== brandName);
      } else {
        state.brand = [...state.brand, brandName];
      }
    },
    setRam(state, action) {
      const ram = action.payload;
      if (state.ram.includes(ram)) {
        state.ram = state.ram.filter((b) => b !== ram);
      } else {
        state.ram = [...state.ram, ram];
      }
    },
    setPrice(state, action) {
      const { min, max } = action.payload;
      if (state.price) {
        state.price = null;
      } else {
        state.price = { min, max };
      }
    },
    clearFilters(state) {
      state.brand = [];
      state.ram = [];
      state.price = { min: 0, max: Infinity };
    },
  },
});

export const { setBrand, setRam, setPrice, clearFilters } =
  productSlice.actions;

export default productSlice.reducer;
