import React, { useState } from "react";
import "./ExpenseForm.css";

const ExpenseForm = () => {
  const [formData, setFormData] = useState({
    expenseTitle: "",
    expenseAmount: "",
    expenseDate: "",
  });
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.expenseTitle ||
      !formData.expenseAmount ||
      !formData.expenseDate
    ) {
      setError("All fields are required");
      return;
    }

    const expenseData = { ...formData };
    console.log(expenseData);

    setFormData({
      expenseTitle: "",
      expenseAmount: "",
      expenseDate: "",
    });
    setError("");
  };

  return (
    <div className="expenseForm">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="expenseTitle"
          placeholder="Enter Title of expense..."
          value={formData.expenseTitle}
          onChange={handleInputChange}
          required
          className="input-group"
        />

        <input
          type="text"
          name="expenseAmount"
          placeholder="Enter Amount of expense..."
          value={formData.expenseAmount}
          onChange={handleInputChange}
          required
          className="input-group"
        />

        <input
          type="date"
          name="expenseDate"
          value={formData.expenseDate}
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
