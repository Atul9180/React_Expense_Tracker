import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Button, Row, Col, Table } from "react-bootstrap";

import { useSelector, useDispatch } from "react-redux";

import { selectedExpenses } from "../../redux/features/expenseSlice.js";
import {
  deleteExpenseItem,
  setAllExpenses,
  setEditedExpense,
} from "../../redux/features/expenseSlice.js";
import {
  deleteExpenseFromFirestore,
  fetchAllExpensesFromFirestore,
} from "../../firebase/authService.js";

const ExpensesList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const expenses = useSelector(selectedExpenses);

  const dispatch = useDispatch();

  //deleteExpense:
  const deleteExpense = async (id) => {
    try {
      setIsLoading(true);
      const res = await deleteExpenseFromFirestore(id);
      if (res.success) {
        dispatch(deleteExpenseItem(id));
        toast.success("expense item deleted successfully.!");
      } else throw new Error(res.error);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  //editExpense:
  const editExpense = (id, amount, description, category) => {
    try {
      setIsLoading(true);
      dispatch(setEditedExpense({ id, amount, description, category }));
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  //calculate total expense amount
  const premiumAmountLimitReached = expenses.reduce(
    (acc, currExpense) => (acc = acc + currExpense.amount),
    0
  );

  useEffect(() => {
    setIsLoading(true);
    const fetchExpenses = async () => {
      try {
        const res = await fetchAllExpensesFromFirestore();
        if (res.success && res.expenses.length > 0) {
          dispatch(setAllExpenses(res.expenses));
          localStorage.setItem("expenses", JSON.stringify(res.expenses));
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchExpenses();
  }, [dispatch]);

  return (
    <div className="shadow rounded p-1 px-4 mb-2">
      <Row className="p-1 mx-1 borderBottom shadow text-center rounded flex">
        <Col>
          {premiumAmountLimitReached >= 10000 ? (
            <Button
              variant="success"
              className="mx-4  wave-effect btn btn-sm"
              onClick={() => alert("soon launching feature.....")}
              style={{ fontWeight: "bold" }}
            >
              Premium Feature
            </Button>
          ) : (
            ""
          )}
        </Col>
        <Col xs={6}>
          <h2>Expense Details</h2>
        </Col>
        <Col>
          {premiumAmountLimitReached >= 10000 ? (
            <Button
              variant="success"
              className="mx-4  wave-effect btn btn-sm"
              onClick={() => alert("soon launching feature.....")}
              style={{ fontWeight: "bold" }}
            >
              Download List
            </Button>
          ) : (
            ""
          )}
        </Col>
      </Row>

      <Table responsive="sm" className="text-center mx-1">
        <thead>
          <tr>
            <th>#</th>
            <th>Expense Description</th>
            <th>Amount</th>
            <th>Expense Category</th>
            <th colSpan={2}>Actions</th>
          </tr>
        </thead>
        <tbody style={{ fontWeight: "bold" }}>
          {isLoading && (
            <tr>
              <td colSpan={6} style={{ color: "red" }}>
                Loading... Please wait!
              </td>
            </tr>
          )}

          {!isLoading && expenses.length === 0 && (
            <tr>
              <td colSpan={6} style={{ color: "red" }}>
                No Expense Found...
              </td>
            </tr>
          )}

          {!isLoading &&
            expenses.length >= 1 &&
            expenses.map((expense, index) => {
              const { id, amount, description, category } = expense;
              return (
                <tr key={id} style={{ color: "gray" }}>
                  <td style={{ color: "gray" }}>{index + 1}</td>
                  <td style={{ color: "green" }}>{description}</td>
                  <td style={{ color: "gray" }}>{amount}</td>
                  <td style={{ color: "gray" }}>{category}</td>
                  <td colSpan={2}>
                    {!isLoading && (
                      <>
                        <Button
                          variant="danger"
                          className="mx-3 wave-effect btn btn-sm fontWeight-bold"
                          onClick={() => deleteExpense(`${id}`)}
                          style={{ fontWeight: "bold" }}
                        >
                          Delete
                        </Button>
                        <Button
                          variant="warning"
                          className="mx-3  wave-effect btn btn-sm"
                          onClick={() =>
                            editExpense(id, amount, description, category)
                          }
                          style={{ fontWeight: "bold" }}
                        >
                          Edit
                        </Button>
                      </>
                    )}
                    {isLoading && (
                      <h6
                        style={{
                          fontWeight: "bolder",
                          fontSize: "large",
                          color: "green",
                        }}
                      >
                        Processing...
                      </h6>
                    )}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </div>
  );
};

export default ExpensesList;
