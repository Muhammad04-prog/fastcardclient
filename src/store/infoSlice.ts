import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosRequest, url } from "../utils/token";
import { type Product } from "./productsSlice";

interface InfoState {
  data: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: InfoState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchProductById = createAsyncThunk(
  "info/fetchProductById",
  async (id: string | number, { rejectWithValue }) => {
    try {
      const { data } = await axiosRequest.get(`${url}/Product/get-product-by-id?id=${id}`);
      return data?.data || data || [];
    } catch (error: any) {
      console.error(error);
      return rejectWithValue(error.message || "Failed to fetch product details");
    }
  }
);

const infoSlice = createSlice({
  name: "info",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.data = Array.isArray(action.payload) ? action.payload : [action.payload];
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const infoReducer = infoSlice.reducer;
