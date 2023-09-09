import React from "react";
import ExpenseList from "./components/Expenses/ExpenseList";

const App = () => {
  const expenses = [
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
    {
      expenseId: 5,
      expenseDate: new Date(2023, 4, 8),
      expenseItemDescription: "Shopping",
      locationOfExpenditure: "Delhi",
      expenseItemPrice: 8000,
    },
  ];

  return (
    <div className="App">
      <div className="expenseHeader">Expense Tracker</div>
      <br />

      <div className="expenses">
        <ExpenseList expenses={expenses} />
      </div>
    </div>
  );
};

export default App;
