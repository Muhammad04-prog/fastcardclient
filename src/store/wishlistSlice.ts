import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface WishlistItem {
  id: number;
  productName: string;
  price: number;
  image?: string;
}

interface WishlistState {
  items: WishlistItem[];
}

const initialState: WishlistState = {
  items: [],
};

const STORAGE_KEY = "store_wishlist";

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    initWishlist: (state) => {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        state.items = saved ? JSON.parse(saved) : [];
      } catch (error) {
        console.error(error);
        state.items = [];
      }
    },
    addToWishlist: (state, action: PayloadAction<WishlistItem>) => {
      try {
        const newItem = action.payload;
        state.items = [...state.items, newItem];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
      } catch (error) {
        console.error(error);
      }
    },
    removeFromWishlist: (state, action: PayloadAction<number>) => {
      try {
        state.items = state.items.filter((item) => item.id !== action.payload);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
      } catch (error) {
        console.error(error);
      }
    },
    toggleWishlist: (state, action: PayloadAction<WishlistItem>) => {
      try {
        const product = action.payload;
        const exists = state.items.some((item) => item.id === product.id);
        if (exists) {
          state.items = state.items.filter((item) => item.id !== product.id);
        } else {
          state.items = [...state.items, product];
        }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
      } catch (error) {
        console.error(error);
      }
    },
    clearWishlist: (state) => {
      try {
        localStorage.removeItem(STORAGE_KEY);
        state.items = [];
      } catch (error) {
        console.error(error);
      }
    },
  },
});

export const wishlistActions = wishlistSlice.actions;
export const wishlistReducer = wishlistSlice.reducer;
