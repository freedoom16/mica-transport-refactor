import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
// import authReducer from "./Auth/authSlice";
import { useDispatch } from "react-redux";
import { usersApi } from "./Api/quotesApi";

import { setupListeners } from "@reduxjs/toolkit/query/react";

const store = configureStore({
  reducer: {
    // auth: authReducer,
    [usersApi.reducerPath]: usersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(usersApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default store;
