import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import adminRecordSlice from './adminRecordsSlice';
import historyRecordSlice from './historyRecordsSlice';
import todayRecordSlice from './todayRecordsSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  adminRecords: adminRecordSlice,
  historyRecord:historyRecordSlice,
  todayRecordSlice:todayRecordSlice
});

export default rootReducer;
