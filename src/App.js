import { useEffect, useState } from "react";
import Expenses from "./components/Expenses";
import NewExpense from "./components/NewExpense";

function App() {
  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem("expenseList");
    const initialValue = JSON.parse(saved);
    if (initialValue === null) {
      return initialValue || [];
    } else {
      const savedExpenses = initialValue.map((expense) => {
        expense.date = new Date(expense.date);
        return expense;
      });
      return savedExpenses || [];
    }
  });

  const addExpenseHandler = (expense) => {
    setExpenses([expense, ...expenses]);
  };

  useEffect(() => {
    localStorage.setItem("expenseList", JSON.stringify(expenses));
  });

  return (
    <div>
      <NewExpense onAddExpense={addExpenseHandler} />
      <Expenses items={expenses} />
    </div>
  );
}

export default App;