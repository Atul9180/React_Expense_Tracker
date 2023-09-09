import "./ExpenseItem.css";

const ExpenseItem = () => {
  return (
    <>
      <div className="underline text-3xl font-bold">Expense Items Food</div>
      <br />

      {/* items of expense 1 */}
      <div className="expense-item">
        <div className="">March 29th 2023</div>
        <div className="expense-item__description">
          <h2>Food </h2>
          <h2>Lucknow</h2>
          <div className="expense-item__price">Rs 1000</div>
        </div>
      </div>

      {/* items of expense 2 */}
      <div className="expense-item">
        <div className="">March 30th 2023</div>
        <div className="expense-item__description">
          <h2>Car Insurance </h2>
          <h2>Lucknow</h2>
          <div className="expense-item__price">Rs 5000</div>
        </div>
      </div>

      {/* items of expense 3 */}
      <div className="expense-item">
        <div className="">April 29th 2023</div>
        <div className="expense-item__description">
          <h2>College Fee</h2>
          <h2>Lucknow</h2>
          <div className="expense-item__price">Rs 70000</div>
        </div>
      </div>
    </>
  );
};

export default ExpenseItem;
