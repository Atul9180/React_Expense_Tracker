import React from "react";
import Container from "react-bootstrap/Container";
import { ExpenseForm, ExpensesList } from "../components/index.js";

const Expenses = () => {
  return (
    <Container className="" style={{ minHeight: "85vh", paddingTop: "4vh" }}>
      <ExpenseForm />
      <ExpensesList />
    </Container>
  );
};

export default Expenses;
