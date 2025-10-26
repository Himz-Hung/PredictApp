import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../api/axiosClient";
import { isAxiosError } from "axios";

interface LoginPayload {
  username: string;
  password: string;
}

interface LoginResponse {
  token: string;
}

// export const loginThunk = createAsyncThunk<LoginResponse, LoginPayload>(
//   "auth/login",
//   async (data, { rejectWithValue }) => {
//     try {
//       const response = await axios.post("/login", data);
//       return response.data as LoginResponse;
//     } catch (error: unknown) {
//       if (error instanceof Error && error.message) {
//         return rejectWithValue(error?.message);
//       }
//       return rejectWithValue("Login failed");
//     }
//   }
// );
export const loginThunk = createAsyncThunk<LoginResponse, LoginPayload>(
  "auth/login",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post("/login", data);
      return response.data as LoginResponse;
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        const message =
          error.response?.data?.message ||
          error.message ||
          "Login failed. Please try again.";

        return rejectWithValue(message);
      }
      return rejectWithValue("Unexpected error occurred.");
    }
  }
);
