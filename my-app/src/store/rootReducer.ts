import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import adminRecordSlice from './adminRecordsSlice';
import historyRecordSlice from './historyRecordsSlice';
import todayRecordSlice from './todayRecordsSlice';
import userPackageSlice from './getUserPackageSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  adminRecords: adminRecordSlice,
  historyRecord:historyRecordSlice,
  todayRecordSlice:todayRecordSlice,
  userPackageSlice: userPackageSlice,
});

export default rootReducer;
