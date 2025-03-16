import { Route, Routes } from "react-router-dom";
import RegisterPage from "../pages/RegisterPage";
import LandingPage from "../pages/LandingPage";
import LoginPage from "../pages/LoginPage";
import NotFound from "../pages/NoFound";
import Dashboard from "../pages/Dashboard";
import SetMonthlyIncome from "../pages/SetMonthlyIncome";
import AddExpense from "../pages/AddExpense";
import ExpenseHistory from "../pages/ExpenseHistory";

function Content() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/set-monthly-income" element={<SetMonthlyIncome />} />
      <Route path="/add-expense" element={<AddExpense />} />
      <Route path="/expense-history" element={<ExpenseHistory />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default Content;