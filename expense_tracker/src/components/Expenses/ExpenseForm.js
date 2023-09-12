import React, { useState } from "react";
import "./ExpenseForm.css";

const ExpenseForm = () => {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredAmount, setEnteredAmount] = useState("");
  const [enteredDate, setEnteredDate] = useState("");

  //const [userInput,setUserInput]=useState({
  //   enteredTitle: "",
  //   enteredAmount: "",
  //   enteredDate: "",
  // });

  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "date") setEnteredDate(value);
    else if (name === "title") setEnteredTitle(value);
    else if (name === "amount") setEnteredAmount(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!enteredTitle || !enteredAmount || !enteredDate) {
      setError("All fields are required");
      return;
    }

    const expenseData = {
      title: enteredTitle,
      amount: enteredAmount,
      date: new Date(enteredDate),
    };
    console.log(expenseData);

    setEnteredTitle("");
    setEnteredAmount("");
    setEnteredDate("");
    setError("");
  };

  return (
    <div className="expenseForm">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Enter Title of expense..."
          value={enteredTitle}
          onChange={handleInputChange}
          required
          className="input-group"
        />

        <input
          type="number"
          name="amount"
          min="0"
          placeholder="Enter Amount of expense..."
          value={enteredAmount}
          onChange={handleInputChange}
          required
          className="input-group"
        />

        <input
          type="date"
          name="date"
          value={enteredDate}
          onChange={handleInputChange}
          required
          className="input-group"
        />

        <button type="submit">Add</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default ExpenseForm;
