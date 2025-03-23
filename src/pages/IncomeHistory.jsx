import { useState, useEffect, useCallback } from "react";
import { useAuth } from "../context/auth/useAuth";
import { useIncome } from "../context/income/useIncome";
import IncomeChart from "../components/IncomeChart";

const IncomeHistory = () => {
  const {
    incomes,
    isLoading,
    hasMore,
    editingIncome,
    setEditingIncome,
    fetchIncomes,
    handleDelete,
    handleEdit,
    saveEdit,
  } = useIncome();
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [subType, setSubType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [page, setPage] = useState(1);

  const { user, token } = useAuth();
  const userId = user?._id;

  const applyFilters = useCallback(() => {
    setPage(1);
    const filters = { description, type, subType, startDate, endDate };
    fetchIncomes(userId, filters, 1);
  }, [description, type, subType, startDate, endDate, fetchIncomes, userId]);

  const resetFilters = () => {
    setDescription("");
    setType("");
    setSubType("");
    setStartDate("");
    setEndDate("");
    setPage(1);
    fetchIncomes(userId, {}, 1);
  };

  useEffect(() => {
    if (userId) {
      const filters = { description, type, subType, startDate, endDate };
      fetchIncomes(userId, filters, page);
    }
  }, [
    userId,
    page,
    description,
    type,
    subType,
    startDate,
    endDate,
    fetchIncomes,
  ]);

  const loadMore = () => {
    if (hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };
  return (
    <div className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Income History
      </h1>
      <div className="w-full max-w-sm md:max-w-3/4 lg:max-w-1/2 mx-auto p-6 bg-white rounded-lg shadow-lg mb-6">
        <div className="w-full h-72 md:h-96 lg:h-96">
          <IncomeChart data={incomes} />
        </div>
      </div>

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
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All categories</option>
            <option value="salary">Salary</option>
            <option value="bonus">Bonus</option>
            <option value="investment">Investment</option>
            <option value="other">Other</option>
          </select>
          <select
            value={subType}
            onChange={(e) => setSubType(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All categories</option>
            <option value="sale">Sale</option>
            <option value="gambling">Gambling</option>
            <option value="gift">Gift</option>
            <option value="refund">Refund</option>
            <option value="other">Other</option>
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
            onClick={applyFilters}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Search
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        {isLoading ? (
          <p className="text-center text-gray-600">Loading data...</p>
        ) : incomes.length === 0 ? (
          <p className="text-center text-gray-600">No incomes found.</p>
        ) : (
          <div className="overflow-x-auto">
            <div className="hidden md:block">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-3 text-left text-gray-700">Description</th>
                    <th className="p-3 text-left text-gray-700">Amount</th>
                    <th className="p-3 text-left text-gray-700">Type</th>
                    <th className="p-3 text-left text-gray-700">Sub Type</th>
                    <th className="p-3 text-left text-gray-700">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {incomes.map((income) => (
                    <tr key={income._id} className="border-b hover:bg-gray-50">
                      <td className="p-3 text-gray-800">
                        {income.description}
                      </td>
                      <td className="p-3 text-gray-800">{income.amount} lv.</td>
                      <td className="p-3 text-gray-800">{income.type}</td>
                      <td className="p-3 text-gray-800">{income.subType}</td>
                      <td className="p-3 text-gray-800">
                        {new Date(income.createdAt).toLocaleDateString()}
                      </td>
                      <td className="p-3 flex gap-2">
                        <button
                          onClick={() => handleEdit(income)}
                          className="text-blue-500 hover:underline"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(income._id, token)}
                          className="text-red-500 hover:underline"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {editingIncome && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                  <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-xl font-bold mb-4">Edit Income</h2>
                    <input
                      type="text"
                      value={editingIncome.description}
                      onChange={(e) =>
                        setEditingIncome({
                          ...editingIncome,
                          description: e.target.value,
                        })
                      }
                      className="w-full p-2 border rounded mb-2"
                    />
                    <input
                      type="number"
                      value={editingIncome.amount}
                      onChange={(e) =>
                        setEditingIncome({
                          ...editingIncome,
                          amount: e.target.value,
                        })
                      }
                      className="w-full p-2 border rounded mb-2"
                    />
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setEditingIncome(null)}
                        className="bg-gray-500 text-white px-4 py-2 rounded"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => saveEdit()}
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="md:hidden">
              {incomes.map((income) => (
                <div key={income._id} className="border-b p-4 hover:bg-gray-50">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-gray-800">
                        {income.description}
                      </p>
                      <p className="text-sm text-gray-600">{income.type}</p>
                      <p className="text-sm text-gray-600">{income.subType}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-800">{income.amount} lv.</p>
                      <p className="text-sm text-gray-600">
                        {new Date(income.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 mt-2">
                    <button
                      onClick={() => handleEdit(income)}
                      className="text-blue-500 hover:text-blue-600 focus:outline-none"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(income._id, token)}
                      className="text-red-500 hover:text-red-600 focus:outline-none"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {hasMore && (
          <div className="flex justify-center mt-4">
            <button
              onClick={loadMore}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Load More"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default IncomeHistory;
