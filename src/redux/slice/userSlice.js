import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isModalOpen: false,
  isAdmin: false,
  name: "",
  email: "",
  phone: "",
  address: "",
  id: "",
  access_token: "",
  refresh_token: "",
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, action) => {
      return {
        ...state,
        name: action.payload.name || action.payload.email,
        email: action.payload.email,
        phone: action.payload.phone,
        address: action.payload.address,
        isAdmin: action.payload.isAdmin,
        id: action.payload._id,
        access_token: action.payload.access_token,
        refresh_token: action.payload.refresh_token,
      };
    },
    resetUser: (state, action) => {
      return {
        ...state,
        name: "",
        email: "",
        phone: "",
        address: "",
        isAdmin: false,
        id: "",
        access_token: "",
      };
    },
    openModal: (state) => {
      state.isModalOpen = true
    },
    closeModal: (state) => {
      state.isModalOpen = false
    },
  },
});

export const { updateUser, resetUser, closeModal, openModal } = userSlice.actions;

export default userSlice.reducer;
