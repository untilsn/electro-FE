import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    error: null,
    isLoading: false,
    authModal: false,
  },
  reducers: {
    // open modal
    openModalAuth: (state, action) => {
      return {
        ...state,
        authModal: action.payload,
      };
    },
    // login reducer
    loginStart: (state) => {
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    },
    loginSuccess: (state, action) => {
      return {
        ...state,
        user: action.payload,
      };
    },
    loginFailure: (state, action) => {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    },

    // register rudecer
    registerStart: (state) => {
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    },
    registerSuccess: (state, action) => {
      return {
        ...state,
        isLoading: false,
      };
    },
    registerFailure: (state, action) => {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    },
    // logout
    logout: (state, action) => {
      return {
        ...state,
        user: action.payload,
      };
    },
  },
});
export const {
  openModalAuth,
  registerFailure,
  registerSuccess,
  registerStart,
  logout,
  loginSuccess,
  loginFailure,
  loginStart,
} = authSlice.actions;

export default authSlice.reducer;
