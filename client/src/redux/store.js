import { configureStore, combineReducers } from "@reduxjs/toolkit";
import expenseReducer from "./features/expenseSlice";
import userReducer from "./features/userSlice";

const rootReducer = combineReducers({
  user: userReducer,
  expenseDetail: expenseReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
