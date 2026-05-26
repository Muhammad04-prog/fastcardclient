import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { url } from "../utils/token";
export interface Product {
  id: number;
  productName: string;
  price: number;
  description?: string;
  image?: string;
  rating?: number;
  brand?: string | { id?: number; brandName?: string };
  brandId?: number;
  stock?: number;
  category?: string;
  categoryName?: string;
  name?: string;
  discount?: number;
}

interface ProductsState {
  data: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${url}/Product/get-products`);
      return data?.data?.products || data?.data || [];
    } catch (error: any) {
      console.error(error);
      return rejectWithValue(error.message || "Failed to load products");
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const productsReducer = productsSlice.reducer;
