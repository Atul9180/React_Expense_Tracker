import React, { useState } from "react";
import ExpenseDetails from "./ExpenseDetails";

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([
    {
      expenseId: 1,
      expenseDate: new Date(2023, 2, 28),
      expenseItemDescription: "Rent",
      locationOfExpenditure: "Gurgaon",
      expenseItemPrice: 10000,
    },
    {
      expenseId: 2,
      expenseDate: new Date(2023, 3, 28),
      expenseItemDescription: "Groceries",
      locationOfExpenditure: "Lucknow",
      expenseItemPrice: 2000,
    },
    {
      expenseId: 3,
      expenseDate: new Date(2023, 3, 28),
      expenseItemDescription: "Car Insurance",
      locationOfExpenditure: "Lucknow",
      expenseItemPrice: 5000,
    },
    {
      expenseId: 4,
      expenseDate: new Date(2023, 3, 30),
      expenseItemDescription: "Party",
      locationOfExpenditure: "Lucknow",
      expenseItemPrice: 5000,
    },
  ]);

  const handleDelete = (expenseId) => {
    const updatedExpenses = expenses.filter(
      (expense) => expense.expenseId !== expenseId
    );
    setExpenses(updatedExpenses);
  };

  return (
    <>
      {expenses.map((expense) => (
        <ExpenseDetails
          key={expense.expenseId}
          expense={expense}
          onDelete={handleDelete}
        />
      ))}
    </>
  );
};

export default ExpenseList;
