import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import axiosClient from "../api/axiosClient";
import type {
  CreateGameRecordData,
  FetchRecordsParams,
  MainTableData,
  MainTableDataRespond,
  RespondDataMainTable,
  UpdateRecordModal,
} from "../models/mainTableModels";
import type { GameStatusType } from "../models/gameStatusEnum";

interface RecordState {
  data: RespondDataMainTable | undefined;
  loading: boolean;
  error: string | null;
  saving: boolean;
}

const initialState: RecordState = {
  data: undefined,
  loading: false,
  error: null,
  saving: false,
};

const formatRecordsData = (data: MainTableDataRespond[]): MainTableData[] => {
  return data.map((item) => ({
    id: item?.id,
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

export const fetchRecords = createAsyncThunk<
  RespondDataMainTable,
  FetchRecordsParams,
  { rejectValue: string }
>("record/fetchRecords", async (searchParams, { rejectWithValue }) => {
  try {
    const response = await axiosClient.get("/predict_records", {
      params: {
        page: searchParams?.page || 1,
        sportType: searchParams.sportType,
        "date[strictly_before]": searchParams.dateTo,
        "date[strictly_after]": searchParams.dateFrom,
      },
    });
    console.log(searchParams);
    
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
    return rejectWithValue("Failed to load records");
  }
});

export const createRecord = createAsyncThunk<
  void,
  CreateGameRecordData,
  { rejectValue: string }
>("record/createRecord", async (data, { rejectWithValue }) => {
  try {
    await axiosClient.post("/predict_records", data);
  } catch (error: unknown) {
    if (error instanceof Error) {
      if (error && error.message === "JWT-INVALID") {
        return rejectWithValue("JWT-INVALID");
      }
    }
    return rejectWithValue("Failed to save record");
  }
});
export const updateRecord = createAsyncThunk<
  void,
  UpdateRecordModal,
  { rejectValue: string }
>("record/updateRecord", async (data, { rejectWithValue }) => {
  try {
    await axiosClient.patch(
      `/predict_records/${data?.id}`,
      {
        result: data.result,
        profit: data.profit,
      },
      {
        headers: {
          "Content-Type": "application/merge-patch+json",
        },
      }
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      if (error && error.message === "JWT-INVALID") {
        return rejectWithValue("JWT-INVALID");
      }
    }
    return rejectWithValue("Failed to save record");
  }
});

const adminRecordSlice = createSlice({
  name: "record",
  initialState,
  reducers: {
    clearRecords(state) {
      state.data = undefined;
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      // FETCH
      .addCase(fetchRecords.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchRecords.fulfilled,
        (state, action: PayloadAction<RespondDataMainTable>) => {
          state.loading = false;
          state.data = action.payload;
        }
      )
      .addCase(fetchRecords.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Unknown error";
      })

      // CREATE
      .addCase(createRecord.pending, state => {
        state.saving = true;
        state.error = null;
      })
      .addCase(createRecord.fulfilled, state => {
        state.saving = false;
      })
      .addCase(createRecord.rejected, (state, action) => {
        state.saving = false;
        state.error = action.payload ?? "Unknown error";
      })

      //update
      .addCase(updateRecord.pending, state => {
        state.saving = true;
        state.error = null;
      })
      .addCase(updateRecord.fulfilled, state => {
        state.saving = false;
      })
      .addCase(updateRecord.rejected, (state, action) => {
        state.saving = false;
        state.error = action.payload ?? "Unknown error";
      });
  },
});

export const { clearRecords } = adminRecordSlice.actions;
export default adminRecordSlice.reducer;
