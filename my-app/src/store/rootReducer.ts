import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import adminRecordSlice from './adminRecordsSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  adminRecords: adminRecordSlice,
});

export default rootReducer;
