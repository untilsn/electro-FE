import { createSlice } from "@reduxjs/toolkit";



const initialState = {
  orderItems: [],
  shippingAddress: {},
  paymentMethod: "",
  itemsPrice: 0,
  shippingPrice: 0,
  totalPrice: 0,
  user: "",
  isPaid: false,
  paidAt: "",
  isDelivered: false,
  deliveredAt: "",
}

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addOrderProduct: (state, action) => {
      const { orderItem } = action?.payload || {};
      const itemOrder = state.orderItems.find(
        (item) => item?.productId === orderItem?.productId
      );
      if (itemOrder) {
        itemOrder.amount += orderItem?.amount; // Sửa lỗi cú pháp
      } else {
        state.orderItems.push(orderItem);
      }
    },
    incrementAmount: (state, action) => {
      const idProduct = action.payload;
      const itemOrder = state?.orderItems?.find(
        (item) => item?.productId === idProduct
      );
      if (itemOrder) {
        itemOrder.amount++;
      } else {
        console.error("Item not found");
      }
    },
    decrementAmount: (state, action) => {
      const idProduct = action.payload;
      const itemOrder = state?.orderItems?.find(
        (item) => item?.productId === idProduct
      );
      if (itemOrder) {
        itemOrder.amount--;
      } else {
        console.error("Item not found");
      }
    },
    removeOrderProduct: (state, action) => {
      const productId = action?.payload;
      const itemOrder = state?.orderItems?.filter(
        (item) => item?.productId !== productId
      );
      state.orderItems = itemOrder;
    },
    addCheckoutProduct: (state, action) => {
      const { itemsPrice, shippingPrice, totalPrice } = action.payload;
      return {
        ...state,
        itemsPrice,
        shippingPrice,
        totalPrice,
      };
    },
    clearOrderProducts: (state) => {
      state.orderItems = [];
      state.itemsPrice = 0;
      state.shippingPrice = 0;
      state.totalPrice = 0;
    },
  },
});
export const {
  addOrderProduct,
  removeOrderProduct,
  incrementAmount,
  decrementAmount,
  addCheckoutProduct,
  clearOrderProducts,
} = orderSlice.actions;

export default orderSlice.reducer;
