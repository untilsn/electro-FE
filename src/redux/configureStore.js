import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storeSlice from "./slice/storeSlice";
import userSlice from "./slice/userSlice";
import productSlice from "./slice/productSlice";
import wishlist from "./slice/wishlistSlice";
import orderSlice from "./slice/orderSlice";
import storage from "redux-persist/lib/storage";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const rootReducer = combineReducers({
  store: storeSlice,
  user: userSlice,
  order: orderSlice,
  product: productSlice,
  wishlist: wishlist,
});

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["store"],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);


