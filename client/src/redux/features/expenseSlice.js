import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  expenses: JSON.parse(localStorage.getItem("expenses")) || [],
  editedExpense: null,
  isPremiumMember: false,
};

const expenseSlice = createSlice({
  name: "expenseDetail",
  initialState,
  reducers: {
    setAllExpenses: (state, action) => {
      state.expenses = action.payload;
    },

    addExpenseToFirebase: (state, action) => {
      state.expenses = [...state.expenses, action.payload];
    },

    deleteExpenseItem: (state, action) => {
      const updatedExpense = state.expenses.filter(
        (exp) => exp.id !== action.payload
      );
      state.expenses = [...updatedExpense];
    },

    setEditedExpense: (state, action) => {
      state.editedExpense = { ...action.payload, isEdit: true };
    },

    updateEditedExpense: (state, action) => {
      const updatedExpense = action.payload;
      const index = state.expenses.findIndex(
        (expense) => expense.id === updatedExpense.id
      );
      if (index !== -1) {
        state.expenses[index] = updatedExpense;
        state.editedExpense = null;
      }
    },

    clearEditedExpense: (state) => {
      state.editedExpense = null;
    },

    setPremiumMembership: (state, action) => {
      state.isPremiumMember = action.payload;
    },
  },
});

export const {
  setAllExpenses,
  addExpenseToFirebase,
  deleteExpenseItem,
  setEditedExpense,
  updateEditedExpense,
  clearEditedExpense,
  setPremiumMembership,
} = expenseSlice.actions;

export const selectedExpenses = (state) => state.expenseDetail.expenses;
export const selectedEditedExpense = (state) =>
  state.expenseDetail.editedExpense;
export const selectIsPremiumMember = (state) =>
  state.expenseDetail.isPremiumMember;

export default expenseSlice.reducer;
