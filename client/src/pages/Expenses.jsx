import React from "react";
import Container from "react-bootstrap/Container";
import { ExpenseForm, ExpensesList } from "../components/index.js";

import { selectTheme } from "../redux/features/themeSlice.js";
import { useSelector } from "react-redux";

const Expenses = () => {
  const isDarkMode = useSelector(selectTheme);

  return (
    <Container
      className={isDarkMode ? "bg-dark text-light" : "bg-light text-dark"}
      style={{ minHeight: "85vh", paddingTop: "4vh" }}
    >
      <ExpenseForm />
      <ExpensesList />
    </Container>
  );
};

export default Expenses;
