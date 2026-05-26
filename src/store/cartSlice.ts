import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { url } from "../utils/token";
import { message } from "../components/ui/toast";
import { type Product } from "./productsSlice";

export interface CartItem {
  id: number | string;
  product: Product;
  quantity: number;
}

interface CartState {
  data: CartItem[];
  loading: boolean;
}

const initialState: CartState = {
  data: [],
  loading: false,
};

const STORAGE_KEY = "store_cart";

export const addCartThunk = createAsyncThunk<
  { type: "increment"; productId: number | string } | { type: "new"; item: CartItem },
  string | number
>("cart/addCart", async (id, { getState, rejectWithValue }) => {
  try {
    const token = localStorage.getItem("store_token");
    if (!token) {
      message.error("Please login first to add products to cart");
      return rejectWithValue("Not logged in");
    }

    const productId = Number(id) || id;
    const state = getState() as any;
    const cartItems = state.cart.data;
    const existingItem = cartItems.find((item: CartItem) => {
      const itemProductId = item.product?.id || item.id;
      return itemProductId === productId;
    });

    if (existingItem) {
      return { type: "increment", productId };
    }
    const products = state.products.data || [];
    let prod = products.find((p: Product) => p.id === productId);
    if (!prod) {
      try {
        const res = await axios.get(`${url}/Product/get-product-by-id?id=${productId}`);
        prod = res.data?.data || res.data;
      } catch (err) {
        console.error("Failed to fetch product for cart:", err);
      }
    }
    if (!prod) {
      message.error("Product details not found");
      return rejectWithValue("Product details not found");
    }
    const newItem: CartItem = {
      id: productId,
      product: {
        ...prod,
        id: prod.id,
        productName: prod.productName || prod.name || "",
        image: prod.image || "",
        price: prod.price || 0,
      },
      quantity: 1,
    };
    return { type: "new", item: newItem };
  } catch (error: any) {
    console.error("Error adding to cart:", error);
    message.error("Failed to add product to cart");
    return rejectWithValue(error.message);
  }
});

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    getData: (state) => {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        state.data = saved ? JSON.parse(saved) : [];
      } catch (error) {
        console.error("Error reading cart from localStorage:", error);
        state.data = [];
      }
    },
    deleteCart: (state, action: PayloadAction<string | number>) => {
      try {
        const productId = Number(action.payload) || action.payload;
        state.data = state.data.filter((item) => {
          const itemProductId = item.product?.id || item.id;
          return itemProductId !== productId;
        });
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state.data));
        message.success("Product removed from cart");
      } catch (error) {
        console.error("Error deleting from cart:", error);
        message.error("Failed to remove product from cart");
      }
    },
    increaseCart: (state, action: PayloadAction<string | number>) => {
      try {
        const productId = Number(action.payload) || action.payload;
        state.data = state.data.map((item) => {
          const itemProductId = item.product?.id || item.id;
          if (itemProductId === productId) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        });
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state.data));
      } catch (error) {
        console.error("Error increasing quantity:", error);
      }
    },
    reduceCart: (state, action: PayloadAction<string | number>) => {
      try {
        const productId = Number(action.payload) || action.payload;
        const item = state.data.find((item) => {
          const itemProductId = item.product?.id || item.id;
          return itemProductId === productId;
        });
        if (!item) return;

        if (item.quantity <= 1) {
          state.data = state.data.filter((item) => {
            const itemProductId = item.product?.id || item.id;
            return itemProductId !== productId;
          });
        } else {
          state.data = state.data.map((item) => {
            const itemProductId = item.product?.id || item.id;
            if (itemProductId === productId) {
              return { ...item, quantity: item.quantity - 1 };
            }
            return item;
          });
        }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state.data));
      } catch (error) {
        console.error("Error reducing quantity:", error);
      }
    },
    clearCart: (state) => {
      try {
        localStorage.removeItem(STORAGE_KEY);
        state.data = [];
        message.success("Cart cleared successfully");
      } catch (error) {
        console.error("Error clearing cart:", error);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addCartThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(addCartThunk.fulfilled, (state, action) => {
        state.loading = false;
        const payload = action.payload;
        if (payload.type === "increment") {
          state.data = state.data.map((item) => {
            const itemProductId = item.product?.id || item.id;
            if (itemProductId === payload.productId) {
              return { ...item, quantity: item.quantity + 1 };
            }
            return item;
          });
        } else {
          state.data = [...state.data, payload.item];
        }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state.data));
        message.success("Product added to cart successfully");
      })
      .addCase(addCartThunk.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const cartActions = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
