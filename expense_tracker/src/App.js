import React from "react";
import ExpenseList from "./components/Expenses/ExpenseList";

const App = () => {
  return (
    <div className="App">
      <div className="expenseHeader">Expense Tracker</div>
      <br />

      <div className="expenses">
        <ExpenseList />
      </div>
    </div>
  );
};

export default App;
