import React from "react";
import ExpenseList from "./components/Expenses/ExpenseList";
import ExpenseForm from "./components/Expenses/ExpenseForm";

const App = () => {
  return (
    <div className="App">
      <div className="expenseHeader">Expense Tracker</div>
      <br />

      <div className="expenses">
        <ExpenseForm />
        <ExpenseList />
      </div>
    </div>
  );
};

export default App;
