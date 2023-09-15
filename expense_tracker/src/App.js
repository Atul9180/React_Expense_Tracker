import React, { useState } from "react";
import NewExpense from "./components/NewExpense/NewExpense";
import Expenses from "./components/Expenses/Expenses";

const App = () => {
  const [expenses, setExpenses] = useState([
    {
      id: "e1",
      title: "Toilet Paper",
      amount: 94.12,
      location: "Lucknow",
      date: new Date(2020, 7, 14),
    },
    {
      id: "e2",
      title: "New TV",
      amount: 799.49,
      location: "Delhi",
      date: new Date(2019, 2, 12),
    },
    {
      id: "e3",
      title: "Car Insurance",
      amount: 294.67,
      location: "Lucknow",
      date: new Date(2022, 2, 28),
    },
    {
      id: "e4",
      title: "New Desk (Wooden)",
      amount: 450,
      location: "gurgaon",
      date: new Date(2021, 5, 12),
    },
    {
      id: "e5",
      title: "New Cloths",
      amount: 4500,
      location: "Gurgaon",
      date: new Date(2023, 5, 12),
    },
  ]);

  const addExpenseHandler = (expense) => {
    // console.log("inside app1: ", expense);
    setExpenses((prevExpenses) => [expense, ...prevExpenses]);
    // console.log("inside app.js 2: ", expenses);
  };

  const deleteExpenseHandler = (expenseId) => {
    setExpenses((prevExpenses) =>
      prevExpenses.filter((expense) => expense.id !== expenseId)
    );
  };

  return (
    <div className="App">
      <div className="expenseHeader">Expense Tracker</div>
      <br />

      <div className="expenses">
        <NewExpense onAddExpense={addExpenseHandler} />
        <Expenses
          items={expenses}
          deleteExpenseHandler={deleteExpenseHandler}
        />
      </div>
    </div>
  );
};

export default App;
