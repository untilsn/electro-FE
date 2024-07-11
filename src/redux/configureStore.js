import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./slice/authSlice";
import storeSlice from "./slice/storeSlice";
import userSlice from "./slice/userSlice";
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
  auth: authSlice,
  store: storeSlice,
  user: userSlice,
  order: orderSlice,
});

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["auth", "store", "user"],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
// export const store = configureStore({
//   reducer,
//   middleware: (gDM) => gDM().concat(logger),
// });
// const persistedReducer = persistReducer(persistConfig, reducer);
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

// export const persistor = persistStore(store);
