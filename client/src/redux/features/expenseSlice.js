import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  expenses: [],
};

const expenseSlice = createSlice({
  name: "expenseDetail",
  initialState,
  reducers: {
    SET_EXPENSE: (state, action) => {
      console.log(action.payload);
      state.expenses = action.payload;
    },
  },
});

export const { SET_EXPENSE } = expenseSlice.actions;

export const selectedExpenses = (state) => state.expenseDetail.expenses;

export default expenseSlice.reducer;
