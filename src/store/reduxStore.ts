import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import { accountReducer } from "./accountSlice";
import { cartReducer } from "./cartSlice";
import { categoryReducer } from "./categorySlice";
import { infoReducer } from "./infoSlice";
import { productsReducer } from "./productsSlice";
import { wishlistReducer } from "./wishlistSlice";

export const reduxStore = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    account: accountReducer,
    category: categoryReducer,
    info: infoReducer,
  },
});

export type RootState = ReturnType<typeof reduxStore.getState>;
export type AppDispatch = typeof reduxStore.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;