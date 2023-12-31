import { configureStore, combineReducers } from "@reduxjs/toolkit";
import expenseReducer from "./features/expenseSlice";
import userReducer from "./features/userSlice";
import uiReducer from "./features/themeSlice";

const rootReducer = combineReducers({
  user: userReducer,
  expenseDetail: expenseReducer,
  theme: uiReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
