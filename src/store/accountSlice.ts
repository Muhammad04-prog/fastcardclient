import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosRequest } from "../utils/token";

// Decode JWT to extract userId/userName of the logged-in user
function decodeJwt(token: string): Record<string, any> | null {
  try {
    const payload = token.split(".")[1];
    return JSON.parse(atob(payload));
  } catch {
    return null;
  }
}

export interface AccountData {
  userId: number | string;
  id?: number | string;
  userName?: string;
  firstName: string | null;
  lastName: string | null;
  email: string;
  address?: string;
  city?: string;
  phoneNumber?: string | null;
  dob?: string | null;
  image?: string | null;
}



export const fetchUserProfiles = createAsyncThunk(
  "account/fetchUserProfiles",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("store_token");
      if (!token) return null;

      // axiosRequest already has baseURL set — use relative path only
      const response = await axiosRequest.get("/UserProfile/get-user-profiles");

      // API shape: { data: { userProfiles: [...] }, statusCode: 200 }
      const profiles: AccountData[] =
        response.data?.data?.userProfiles ||
        response.data?.userProfiles ||
        (Array.isArray(response.data) ? response.data : []);

      // Decode JWT to find the current user
      const decoded = decodeJwt(token);
      const currentUserId =
        decoded?.["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"] ||
        decoded?.userId ||
        decoded?.sub ||
        decoded?.nameid;
      const currentUserName =
        decoded?.["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"] ||
        decoded?.userName ||
        decoded?.unique_name;

      // Try to find the logged-in user by userId or userName
      const me =
        profiles.find((p) => String(p.userId) === String(currentUserId)) ||
        profiles.find((p) => p.userName === currentUserName) ||
        profiles[0] ||
        null;

      return me;
    } catch (error: any) {
      console.error("fetchUserProfiles error:", error);
      return rejectWithValue(error.message || "Failed to fetch user profiles");
    }
  }
);

interface AccountState {
  data: AccountData | null;
  loading: boolean;
  error: string | null;
}

const initialState: AccountState = {
  data: null,
  loading: false,
  error: null,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    clearAccount: (state) => {
      state.data = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfiles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfiles.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchUserProfiles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearAccount } = accountSlice.actions;
export const accountReducer = accountSlice.reducer;