import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import axiosClient from "../api/axiosClient";
import type { UserPackageRespond } from "../models/packageModels";

interface RecordState {
  data: UserPackageRespond[] | undefined;
  loading: boolean;
  error: string | null;
}

const initialState: RecordState = {
  data: undefined,
  loading: false,
  error: null,
};

export const fetchUserPackage = createAsyncThunk<
  UserPackageRespond[],
  void,
  { rejectValue: string }
>("userPackage/fetch", async (_, { rejectWithValue }) => {
  try {
    const response = await axiosClient.get("/user-packages", {
      params: { page: 1 },
    });

    const member: UserPackageRespond[] = response?.data?.member ?? [];
    const formattedData: UserPackageRespond[] = member.map(
      (item: UserPackageRespond) => ({
        status: item.status,
        sports: item.sports,
        packageCode: item.packageCode,
        expiresAt: item.expiresAt,
      })
    );
    return formattedData;
  } catch (error: unknown) {
    if (error instanceof Error) {
      if (error && error.message === "JWT-INVALID") {
        return rejectWithValue("JWT-INVALID");
      }
    }
    return rejectWithValue("Failed to load Status");
  }
});

const userPackageSlice = createSlice({
  name: "userPackage",
  initialState,
  reducers: {
    clearRecords(state) {
      state.data = undefined;
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUserPackage.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchUserPackage.fulfilled,
        (state, action: PayloadAction<UserPackageRespond[]>) => {
          state.loading = false;
          state.data = action.payload;
        }
      )
      .addCase(fetchUserPackage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Unknown error";
      });
  },
});

export const { clearRecords } = userPackageSlice.actions;
export default userPackageSlice.reducer;
