import React, { useState, useEffect } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

import { useDispatch, useSelector } from "react-redux";
import {
  addExpenseToFirebase,
  selectedEditedExpense,
  updateEditedExpense,
} from "../../redux/features/expenseSlice";

const ExpenseForm = () => {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Food");
  const [isEdit, setEdit] = useState(false);

  const editedExpense = useSelector(selectedEditedExpense);

  const dispatch = useDispatch();

  const generateUniqueId = () => {
    if (isEdit) return editedExpense?.id;
    else return uuidv4();
  };

  const clearInputs = () => {
    setAmount("");
    setDescription("");
    setCategory("Choose category");
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const expense = {
      id: generateUniqueId(),
      amount: parseFloat(amount),
      description,
      category,
      createdDate: new Date().toISOString(),
    };

    if (!amount || !description || !category) {
      toast.error("All fields mandatory!");
      return;
    }

    if (isEdit) {
      try {
        // console.log("updating expense:", expense);

        dispatch(updateEditedExpense({ ...expense }));
        toast.success("Expense updated successfully");
        setEdit(false);
        clearInputs();
      } catch (error) {
        toast.error(error.message);
      }
    } else {
      try {
        toast.success("Expense added successfully");
        dispatch(addExpenseToFirebase({ ...expense }));
        clearInputs();
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  useEffect(() => {
    if (editedExpense !== null) {
      const { amount, description, category, isEdit } = editedExpense;
      setAmount(amount);
      setDescription(description);
      setCategory(category);
      setEdit(isEdit);
    }
  }, [editedExpense]);

  return (
    <div className="shadow rounded pt-2 pb-2 mb-6">
      <div className="pt-1 pb-1 mb-4 borderBottom shadow text-center rounded flex">
        <h2>Add Expense</h2>
      </div>

      <Form
        onSubmit={handleFormSubmit}
        style={{ fontWeight: "bold", marginBottom: "15px" }}
      >
        <Row className="justify-content-center mb-3 ">
          <Form.Group as={Col} md="3" controlId="validationCustom01">
            <Form.Label>Enter Amount</Form.Label>
            <Form.Control
              required
              type="number"
              placeholder="Expense Amount"
              min={1}
              max={99999999}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} md="4" controlId="validationCustom02">
            <Form.Label>Expense Description</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Expense desription"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} md="3" controlId="validationCustom03">
            <Form.Label>Expense Category</Form.Label>
            <Form.Select
              name="expenseCategory"
              required
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option>Choose category</option>
              <option value="Food">Food</option>
              <option value="Petrol">Petrol</option>
              <option value="Salary">Salary</option>
            </Form.Select>
          </Form.Group>
        </Row>

        <Row className="justify-content-center mb-2">
          <Col md="5">
            <Button
              type="submit"
              variant="primary"
              className="wave-effect mt-3 w-100 w-sm-auto w-md-70 w-lg-50"
              style={{ fontWeight: "bold" }}
            >
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default ExpenseForm;
