import React from "react";
import Table from "react-bootstrap/Table";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { selectedExpenses } from "../../redux/features/expenseSlice.js";
import { Button } from "react-bootstrap";
import {
  deleteExpenseItem,
  setEditedExpense,
} from "../../redux/features/expenseSlice.js";

const ExpensesList = () => {
  const expenses = useSelector(selectedExpenses);
  const dispatch = useDispatch();

  //deleteExpense:
  const deleteExpense = (id) => {
    try {
      dispatch(deleteExpenseItem(id));
      toast.success("expense item deleted successfully.!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  //editExpense:
  const editExpense = (id, amount, description, category) => {
    try {
      dispatch(setEditedExpense({ id, amount, description, category }));
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="shadow rounded pt-2 pb-2 mb-6">
      <div className="pt-1 pb-1 mb-3 borderBottom shadow text-center rounded flex">
        <h2>Expense Details</h2>
      </div>

      <Table responsive="sm" className="text-center">
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
          {expenses.length === 0 && (
            <tr>
              <td colSpan={6} style={{ color: "red" }}>
                No Expense Found...
              </td>
            </tr>
          )}

          {expenses.length >= 1 &&
            expenses.map((expense, index) => {
              const { id, amount, description, category } = expense;
              return (
                <tr key={id} style={{ color: "gray" }}>
                  <td style={{ color: "gray" }}>{index + 1}</td>
                  <td style={{ color: "green" }}>{description}</td>
                  <td style={{ color: "gray" }}>{amount}</td>
                  <td style={{ color: "gray" }}>{category}</td>
                  <td colSpan={2}>
                    <Button
                      variant="danger"
                      className="mx-3 wave-effect btn btn-sm fontWeight-bold"
                      onClick={() => deleteExpense(`${id}`)}
                    >
                      Delete
                    </Button>
                    <Button
                      variant="warning"
                      className="mx-3  wave-effect btn btn-sm"
                      onClick={() =>
                        editExpense(id, amount, description, category)
                      }
                    >
                      Edit
                    </Button>
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
