import React, { useState } from "react";
import ExpenseItem from "./ExpenseItem";
import ExpensesFilter from "./ExpensesFilter";
// import "./Expenses.css";

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

  return (
    <>
      <ExpensesFilter
        selected={filteredYear}
        onChangeFilter={filterChangeHandler}
      />
      {filteredExpenses.map((expense) => (
        <ExpenseItem
          key={expense.id}
          expense={expense}
          onDelete={props.deleteExpenseHandler}
        />
      ))}
    </>
  );
};

export default Expenses;
