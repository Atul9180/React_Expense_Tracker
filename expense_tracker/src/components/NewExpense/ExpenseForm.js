import React, { useState } from "react";
import "./ExpenseForm.css";

const ExpenseForm = (props) => {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredAmount, setEnteredAmount] = useState("");
  const [enteredLocation, setEnteredLocation] = useState("");
  const [enteredDate, setEnteredDate] = useState("");

  //const [userInput,setUserInput]=useState({
  //   enteredTitle: "",
  //   enteredAmount: "",
  //   enteredLocation:"",
  //   enteredDate: "",
  // });

  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "date") setEnteredDate(value);
    else if (name === "title") setEnteredTitle(value);
    else if (name === "amount") setEnteredAmount(value);
    else setEnteredLocation(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!enteredTitle || !enteredAmount || !enteredDate || !enteredLocation) {
      setError("All fields are required");
      return;
    }

    const expenseData = {
      title: enteredTitle,
      amount: enteredAmount,
      location: enteredLocation,
      date: new Date(enteredDate),
    };
    props.onSaveExpenseData(expenseData);

    setEnteredTitle("");
    setEnteredAmount("");
    setEnteredDate("");
    setEnteredLocation("");
    setError("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="new-expense__controls">
        <div className="new-expense__control">
          <label>Title</label>
          <input
            type="text"
            name="title"
            placeholder="Enter Title of expense..."
            value={enteredTitle}
            onChange={handleInputChange}
            required
            className="input-group"
          />
        </div>

        <div className="new-expense__control">
          <label>Amount</label>
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
        </div>

        <div className="new-expense__control">
          <label>Location</label>
          <input
            type="text"
            name="location"
            placeholder="Enter place of expense..."
            value={enteredLocation}
            onChange={handleInputChange}
            required
            className="input-group"
          />
        </div>

        <div className="new-expense__control">
          <label>Date</label>
          <input
            type="date"
            name="date"
            value={enteredDate}
            onChange={handleInputChange}
            max={new Date().toISOString().split("T")[0]}
            required
            className="input-group"
          />
        </div>

        <div className="new-expense__actions btns">
          <button
            type="button"
            style={{ background: "red" }}
            onClick={props.onCancel}
          >
            Cancel
          </button>
          <button type="submit">Add Expense</button>
          {error && <p className="error">{error}</p>}
        </div>
      </div>
    </form>
  );
};

export default ExpenseForm;
