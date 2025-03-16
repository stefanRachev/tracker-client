import { useState, useEffect, useCallback } from "react";
import { useAuth } from "../context/auth/useAuth";

const API_URL = import.meta.env.VITE_API_URL;

const ExpenseHistory = () => {
  const [expenses, setExpenses] = useState([]);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useAuth();
  const userId = user?._id;

  const fetchExpenses = useCallback(async () => {
    setIsLoading(true);
    if (!userId) {
      console.error("Invalid userId");
      setIsLoading(false);
      return;
    }
    try {
      const queryParams = new URLSearchParams({
        userId,
        description,
        category,
        startDate,
        endDate,
      }).toString();

      const response = await fetch(`${API_URL}/api/expenses?${queryParams}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Error fetching expenses");
      }

      const data = await response.json();
      setExpenses(data);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    } finally {
      setIsLoading(false);
    }
  }, [userId, description, category, startDate, endDate]);

  useEffect(() => {
    if (userId) {
      fetchExpenses();
    }
  }, [fetchExpenses, userId]);

  const resetFilters = () => {
    setDescription("");
    setCategory("");
    setStartDate("");
    setEndDate("");
    fetchExpenses();
  };

  return (
    <div className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Expense History
      </h1>

      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Search by description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All categories</option>
            <option value="essential">Essential</option>
            <option value="entertainment">Entertainment</option>
            <option value="unexpected">Unexpected</option>
            <option value="harmful">Harmful</option>
          </select>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={resetFilters}
            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
          >
            Reset Filters
          </button>
          <button
            onClick={fetchExpenses}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Search
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        {isLoading ? (
          <p className="text-center text-gray-600">Loading data...</p>
        ) : expenses.length === 0 ? (
          <p className="text-center text-gray-600">No expenses found.</p>
        ) : (
          <div className="overflow-x-auto">
            <div className="hidden md:block">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-3 text-left text-gray-700">Description</th>
                    <th className="p-3 text-left text-gray-700">Amount</th>
                    <th className="p-3 text-left text-gray-700">Category</th>
                    <th className="p-3 text-left text-gray-700">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {expenses.map((expense) => (
                    <tr key={expense._id} className="border-b hover:bg-gray-50">
                      <td className="p-3 text-gray-800">
                        {expense.description}
                      </td>
                      <td className="p-3 text-gray-800">
                        {expense.amount} lv.
                      </td>
                      <td className="p-3 text-gray-800">{expense.category}</td>
                      <td className="p-3 text-gray-800">
                        {new Date(expense.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="md:hidden">
              {expenses.map((expense) => (
                <div
                  key={expense._id}
                  className="border-b p-4 hover:bg-gray-50"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-gray-800">
                        {expense.description}
                      </p>
                      <p className="text-sm text-gray-600">
                        {expense.category}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-800">{expense.amount} lv.</p>
                      <p className="text-sm text-gray-600">
                        {new Date(expense.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpenseHistory;