import { useAuth } from "../context/auth/useAuth";
import { useNavigate } from "react-router-dom";
import { useBalance } from "../context/balance/useBalance";
import { useEffect } from "react";

export default function Dashboard() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const { balance } = useBalance();
  const navigate = useNavigate();

  

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      navigate("/login");
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (!user) {
    return <div>Loading...</div>; 
  }


  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 flex flex-col items-center">
      <header className="mb-6 text-center">
        <h1 className="text-2xl font-bold">👋 Hello, {user.username}</h1>
      </header>

      <div className="bg-gray-800 p-6 rounded-xl text-center shadow-md mb-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-2">Your Balance</h2>
        <p className="text-3xl font-bold">{balance.toFixed(2)}</p>
        <p className="text-gray-400">Current available balance.</p>
      </div>

      <div className="bg-gray-800 p-6 rounded-xl text-center shadow-md mb-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-2">Manage Your Finances</h2>
        <p className="text-gray-400">Easily track your income and expenses.</p>
      </div>

      <div className="w-full max-w-md flex flex-col gap-4">
        <button
          onClick={() => navigate("/set-monthly-income")}
          className="bg-green-600 px-6 py-3 rounded-lg text-lg shadow-lg hover:bg-green-700 transition w-full"
        >
          ➕ Add Income
        </button>

        <button
          onClick={() => navigate("/add-expense")}
          className="bg-red-600 px-6 py-3 rounded-lg text-lg shadow-lg hover:bg-red-700 transition w-full"
        >
          ➖ Add Expense
        </button>
      </div>
      <div className="w-full max-w-md flex flex-col gap-4 mt-6">
        <button
          onClick={() => navigate("/transactions")}
          className="bg-blue-600 px-6 py-3 rounded-lg text-lg shadow-lg hover:bg-blue-700 transition w-full"
        >
          📊 View Transactions
        </button>

        <button
          onClick={() => navigate("/expense-history")}
          className="bg-purple-600 px-6 py-3 rounded-lg text-lg shadow-lg hover:bg-purple-700 transition w-full"
        >
          🛒 Expense History
        </button>

        <button
          onClick={() => navigate("/income-history")}
          className="bg-yellow-600 px-6 py-3 rounded-lg text-lg shadow-lg hover:bg-yellow-700 transition w-full"
        >
          💰 Income History
        </button>
      </div>
    </div>
  );
}
