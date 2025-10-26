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
  RespondDataMainTable,
} from "../models/mainTableModels";
import type { GameStatusType } from "../models/gameStatusEnum";

interface RecordState {
  data: RespondDataMainTable | undefined;
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
  RespondDataMainTable,
  FetchRecordsParams,
  { rejectValue: string }
>("todayRecord/fetch", async (searchParams, { rejectWithValue }) => {
  try {
    const response = await axiosClient.get("/predict_records", {
      params: {
        page: searchParams?.page || 1,
        sportType: searchParams.sportType,
        "date[strictly_before]": searchParams.dateTo,
        "date[strictly_after]": searchParams.dateFrom,
      },
    });

    const member: MainTableDataRespond[] = response?.data?.member ?? [];
    const respondData: RespondDataMainTable = {
      mainData: formatRecordsData(member),
      currentPage: searchParams.page || 1,
      totalRecords: response?.data?.totalItems || 0,
    };
    return respondData;
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
        (state, action: PayloadAction<RespondDataMainTable>) => {
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
