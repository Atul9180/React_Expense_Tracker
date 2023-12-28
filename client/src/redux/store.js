import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import expenseReducer from "./features/expenseSlice";
import userReducer from "./features/userSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  expenseDetail: expenseReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
