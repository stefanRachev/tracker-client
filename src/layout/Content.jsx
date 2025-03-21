import { Route, Routes } from "react-router-dom";
import RegisterPage from "../pages/RegisterPage";
import LandingPage from "../pages/LandingPage";
import LoginPage from "../pages/LoginPage";
import NotFound from "../pages/NoFound";
import Dashboard from "../pages/Dashboard";
import SetMonthlyIncome from "../pages/SetMonthlyIncome";
import AddExpense from "../pages/AddExpense";
import ExpenseHistory from "../pages/ExpenseHistory";
import IncomeHistory from "../pages/IncomeHistory";
import ProtectedRoute from "./ProtectedRoute";


function Content() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/set-monthly-income"
        element={
          <ProtectedRoute>
            <SetMonthlyIncome />
          </ProtectedRoute>
        }
      />
      <Route
        path="/add-expense"
        element={
          <ProtectedRoute>
            <AddExpense />
          </ProtectedRoute>
        }
      />
      <Route
        path="/expense-history"
        element={
          <ProtectedRoute>
            <ExpenseHistory />
          </ProtectedRoute>
        }
      />
      <Route
        path="/income-history"
        element={
          <ProtectedRoute>
            <IncomeHistory />
          </ProtectedRoute>
        }
      />

    
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default Content;
