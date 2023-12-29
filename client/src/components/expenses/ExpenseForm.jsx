import React, { useState, useEffect } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import Loader from "../loader/Loader";

import { useDispatch, useSelector } from "react-redux";
import {
  addExpenseToFirebase,
  selectedEditedExpense,
  updateEditedExpense,
} from "../../redux/features/expenseSlice";
import {
  addExpenseToFirestore,
  updateExpenseInFirestore,
} from "../../firebase/authService";

const ExpenseForm = () => {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Food");
  const [isEdit, setEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

  const handleFormSubmit = async (event) => {
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

    setIsLoading(true);
    if (isEdit) {
      try {
        const res = await updateExpenseInFirestore(editedExpense?.id, expense);
        if (res.success) {
          dispatch(updateEditedExpense({ ...expense }));
          toast.success("Expense updated successfully");
          setEdit(false);
          clearInputs();
        } else throw new Error(res.error);
      } catch (error) {
        toast.error(error.message);
      }
    } else {
      try {
        const result = await addExpenseToFirestore(expense);
        if (result.success) {
          toast.success("Expense added successfully");
          dispatch(addExpenseToFirebase({ ...expense }));
          clearInputs();
        } else throw new Error(result.error);
      } catch (error) {
        toast.error(error.message);
      }
    }
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    if (editedExpense !== null) {
      const { amount, description, category, isEdit } = editedExpense;
      setAmount(amount);
      setDescription(description);
      setCategory(category);
      setEdit(isEdit);
    }
    setIsLoading(false);
  }, [editedExpense]);

  return (
    <div className="shadow rounded p-1 mb-4">
      <div className="p-2 mb-3 borderBottom shadow text-center rounded flex">
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

        <Row className="justify-content-center mb-1">
          <Col md="5">
            <Button
              type="submit"
              variant="primary"
              className="wave-effect mt-2 w-100 w-sm-auto w-md-70 w-lg-50"
              style={{ fontWeight: "bold" }}
            >
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
      {isLoading && <Loader />}
    </div>
  );
};

export default ExpenseForm;
