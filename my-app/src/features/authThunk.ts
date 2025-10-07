import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../api/axiosClient";

interface LoginPayload {
  username: string;
  password: string;
}

interface LoginResponse {
  token: string;
}

export const loginThunk = createAsyncThunk<LoginResponse, LoginPayload>(
  "auth/login",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post("/login", data);
      
      return response.data as LoginResponse;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Login failed");
    }
  }
);
