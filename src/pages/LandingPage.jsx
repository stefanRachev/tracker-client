import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth/useAuth";
import { useEffect } from "react";

export default function LandingPage() {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, isLoading, navigate]);

  
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-800 text-white p-6">
      <div className="text-center max-w-3xl">
        <h1 className="text-4xl font-bold mb-4">Simple Expense Tracker 💰</h1>
        <p className="text-lg mb-6">
          Manage your expenses with ease! Add income and expenses, analyze your
          budget with charts, and track your finances effectively.
        </p>

        <div className="grid md:grid-cols-3 gap-6 text-left mb-8">
          <div className="p-4 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800">
              📊 Charts & Statistics
            </h3>
            <p className="text-sm text-gray-600">
              Monitor your budget with visual reports.
            </p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800">
              📂 Expense Categorization
            </h3>
            <p className="text-sm text-gray-600">
              Group your expenses into categories.
            </p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800">
              🔒 Secure Data Storage
            </h3>
            <p className="text-sm text-gray-600">
              Your financial data is safely stored and protected.
            </p>
          </div>
        </div>

        <button
          onClick={() => navigate("/register")}
          className="bg-blue-600 text-white px-8 py-4 rounded-lg text-xl shadow-lg hover:bg-blue-700 transition transform hover:scale-105"
        >
          🚀 Start Managing Your Expenses Now
        </button>

        <p className="mt-4 text-gray-600">
          Already have an account?{" "}
          <span
            className="text-blue-600 cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Log in here
          </span>
        </p>
      </div>
    </div>
  );
}
