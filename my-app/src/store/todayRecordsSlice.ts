import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import axiosClient from "../api/axiosClient";
import type {
  FetchRecordsParams,
  MainTableData,
  MainTableDataRespond,
} from "../models/mainTableModels";
import type { GameStatusType } from "../models/gameStatusEnum";

interface RecordState {
  data: MainTableData[] | undefined;
  loading: boolean;
  error: string | null;
}

const initialState: RecordState = {
  data: undefined,
  loading: false,
  error: null,
};

const formatRecordsData = (data: MainTableDataRespond[]): MainTableData[] => {
  return data.map((item, index) => ({
    id: `${index}`,
    recordId: item?.id,
    date: new Date(item.date)
      .toLocaleString("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
      .replace(",", ""),
    games: item.game,
    pick: item.predictValue,
    sportType: item.sportType ? item.sportType.split("-")[0].toUpperCase() : "",
    result: (item.result || "").toUpperCase() as GameStatusType,
    profit: item.profit,
    predictValue: item.predictValue,
  }));
};

export const fetchTodayRecords = createAsyncThunk<
  MainTableData[],
  FetchRecordsParams,
  { rejectValue: string }
>("todayRecord/fetch", async (searchParams, { rejectWithValue }) => {
  try {
    const response = await axiosClient.get("/predict_records", {
      params: {
        page: 1,
        sportType: searchParams.sportType,
        "date[strictly_before]": searchParams.dateTo,
        "date[strictly_after]": searchParams.dateFrom,
      },
    });

    const member: MainTableDataRespond[] = response?.data?.member ?? [];
    return formatRecordsData(member);
  } catch (error: unknown) {
    if (error instanceof Error) {
      if (error && error.message === "JWT-INVALID") {
        return rejectWithValue("JWT-INVALID");
      }
    }
    return rejectWithValue("Failed to save record");
  }
});

const todayRecordSlice = createSlice({
  name: "todayRecord",
  initialState,
  reducers: {
    clearRecords(state) {
      state.data = undefined;
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchTodayRecords.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchTodayRecords.fulfilled,
        (state, action: PayloadAction<MainTableData[]>) => {
          state.loading = false;
          state.data = action.payload;
        }
      )
      .addCase(fetchTodayRecords.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Unknown error";
      });
  },
});

export const { clearRecords } = todayRecordSlice.actions;
export default todayRecordSlice.reducer;
