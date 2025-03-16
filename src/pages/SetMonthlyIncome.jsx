import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth/useAuth";
import { useBalance } from "../context/balance/useBalance";
import { FaArrowUp, FaDollarSign } from "react-icons/fa";

const API_URL = import.meta.env.VITE_API_URL;

export default function SetMonthlyIncome() {
  const [income, setIncome] = useState(0);
  const [description, setDescription] = useState("");
  const [type, setType] = useState("salary");
  const [subType, setSubType] = useState("other");
  const [message, setMessage] = useState("");
  const { user } = useAuth();
  const { balance, setBalance } = useBalance();

  const navigate = useNavigate();

  const userId = user?._id;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!income) {
      setMessage("Please fill in all required fields.");
      return;
    }

    const newIncome = parseFloat(income);
    if (isNaN(newIncome) || newIncome <= 0) {
      setMessage("Please enter a valid amount.");
      return;
    }

    const data = {
      userId,
      amount: income,
      description,
      type,
      subType,
    };

    try {
      const response = await fetch(`${API_URL}/api/incomes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setMessage("Monthly income added successfully!");
        setIncome(0);
        setDescription("");
        setType("");
        setSubType("");

        setBalance(balance + newIncome);

        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      } else {
        setMessage("An error occurred while adding income.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Error sending the request.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <h2 className="text-xl text-center font-semibold mb-6 p-6 text-green-500 flex items-center justify-center">
        <FaArrowUp className="mr-2" /> Add Income
      </h2>

      <div className="bg-gray-800 p-6 rounded-xl mb-6 max-w-md mx-auto">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="income" className="block mb-2 text-sm font-medium">
              Amount <span className="text-green-500">*</span>
            </label>
            <input
              type="number"
              id="income"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              className="p-2 w-full bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="description"
              className="block mb-2 text-sm font-medium"
            >
              Description <span className="text-green-500">*</span>
            </label>
            <textarea
              id="description"
              placeholder="Add description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="p-2 w-full bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="type" className="block mb-2 text-sm font-medium">
              Income type <span className="text-green-500">*</span>
            </label>
            <select
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="p-2 w-full bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="salary">Salary</option>
              <option value="bonus">Bonus</option>
              <option value="investment">Investment</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="subType" className="block mb-2 text-sm font-medium">
              Income sub-type
            </label>
            <select
              id="subType"
              value={subType}
              onChange={(e) => setSubType(e.target.value)}
              className="p-2 w-full bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="sale">Sale</option>
              <option value="gambling">Gambling</option>
              <option value="gift">Gift</option>
              <option value="refund">Refund</option>
              <option value="other">Other</option>
            </select>
          </div>

          <button
            type="submit"
            className="bg-green-600 px-6 py-3 rounded-lg text-lg shadow-lg hover:bg-green-700 transition w-full flex items-center justify-center"
          >
            <FaDollarSign className="mr-2 w-5 h-5" />
            Save Income
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
