import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { url } from "../utils/token";
export interface CategoryData {
  id: number;
  categoryName: string;
  image?: string;
}

interface CategoryState {
  data: CategoryData[];
  loading: boolean;
  error: string | null;
}

const initialState: CategoryState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchCategories = createAsyncThunk(
  "category/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${url}/Category/get-categories`);
      return data?.data || data || [];
    } catch (error: any) {
      console.error(error);
      return rejectWithValue(error.message || "Failed to fetch categories");
    }
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const categoryReducer = categorySlice.reducer;
