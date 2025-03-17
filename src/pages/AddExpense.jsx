import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth/useAuth";
import { useBalance } from "../context/balance/useBalance";
import { FaDollarSign } from "react-icons/fa";

const API_URL = import.meta.env.VITE_API_URL;

export default function AddExpense() {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");

  const { balance, setBalance } = useBalance();
  const { user } = useAuth();
  const navigate = useNavigate();

  const userId = user?._id;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!amount || !description) {
      setMessage("Please fill in all required fields.");
      return;
    }

    const newExpense = parseFloat(amount);
    if (isNaN(newExpense) || newExpense <= 0) {
      setMessage("Please enter a valid amount.");
      return;
    }

    const data = {
      userId,
      amount,
      description,
      category,
    };

    try {
      const response = await fetch(`${API_URL}/api/expenses`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setMessage("Expense added successfully!");
        setDescription("");
        setAmount(0);
        setCategory("");

        setBalance(balance - newExpense);

        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      } else {
        setMessage("Error adding expense.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Error sending request.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <h2 className="text-xl text-center font-semibold mb-6 p-6 text-red-500 flex items-center justify-center">
        <FaDollarSign className="mr-2" /> Add Expense
      </h2>

      <div className="bg-gray-800 p-6 rounded-xl mb-6 max-w-md mx-auto">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="amount" className="block mb-2 text-sm font-medium">
              Amount <span className="text-red-500">*</span>
            </label>

            <input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="p-2 w-full bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block mb-2 text-sm font-medium"
            >
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              placeholder="Add description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="p-2 w-full bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="category"
              className="block mb-2 text-sm font-medium"
            >
              Category <span className="text-red-500">*</span>
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="p-2 w-full bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            >
              <option value="">Select a category</option>
              <option value="essential">Essential</option>
              <option value="entertainment">Entertainment</option>
              <option value="unexpected">Unexpected</option>
              <option value="harmful">Harmful</option>
            </select>
          </div>

          <button
            type="submit"
            className="bg-red-600 px-6 py-3 rounded-lg text-lg shadow-lg hover:bg-red-700 transition w-full"
          >
            Add Expense
          </button>
          {message && (
            <p
              className={`mt-4 text-center ${
                message.includes("successfully")
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
