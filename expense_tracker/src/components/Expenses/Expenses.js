import React, { useState } from "react";
import ExpenseItem from "./ExpenseItem";
import ExpensesFilter from "./ExpensesFilter";
import ExpensesChart from "./ExpensesChart";
import "./Expenses.css";

const Expenses = (props) => {
  const currYear = new Date().getFullYear().toString();
  const [filteredYear, setFilteredYear] = useState(currYear);

  const filterChangeHandler = (selectedYear) => {
    setFilteredYear(selectedYear);
  };

  // Filter expenses based on the selected year
  const filteredExpenses = props.items.filter((expense) => {
    return expense.date.getFullYear().toString() === filteredYear;
  });

  // Sort expenses by date (latest first)
  filteredExpenses.sort((a, b) => b.date - a.date);

  const totalExpensesAvaible = filteredExpenses.length;

  let expensesContent = <p className="NoExpenseFound">No expense found...</p>;

  if (totalExpensesAvaible > 0) {
    expensesContent = filteredExpenses.map((expense) => (
      <ExpenseItem
        key={expense.id}
        expense={expense}
        onDelete={props.deleteExpenseHandler}
      />
    ));
  }

  return (
    <>
      <ExpensesFilter
        selected={filteredYear}
        onChangeFilter={filterChangeHandler}
      />
      <ExpensesChart expenses={filteredExpenses} />
      {expensesContent}
    </>
  );
};

export default Expenses;
