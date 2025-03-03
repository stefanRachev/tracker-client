import { useState } from "react";

export default function Dashboard() {
  const [balance, setBalance] = useState(850);
  const [transactions, setTransactions] = useState([
    { id: 1, title: "Food", amount: -20 },
    { id: 2, title: "Transport", amount: -50 },
    { id: 3, title: "Fitness", amount: -30 },
  ]);
  const [newTransaction, setNewTransaction] = useState({
    title: "",
    amount: 0,
  });

  const handleAddTransaction = () => {
    if (newTransaction.title && newTransaction.amount !== 0) {
      const updatedTransactions = [
        ...transactions,
        {
          id: transactions.length + 1,
          title: newTransaction.title,
          amount: parseFloat(newTransaction.amount),
        },
      ];
      setTransactions(updatedTransactions);
      setBalance(balance + parseFloat(newTransaction.amount));
      setNewTransaction({ title: "", amount: 0 });
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">👋 Hello, Ivan!</h1>
        <button className="bg-red-600 px-4 py-2 rounded-lg shadow hover:bg-red-700">
          🚪 Logout
        </button>
      </header>

      <div className="bg-gray-800 p-6 rounded-xl text-center shadow-md mb-6">
        <h2 className="text-xl">Current Balance</h2>
        <p className="text-4xl font-bold mt-2">{balance} lv.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-800 p-4 rounded-xl shadow-md">
          <h3 className="text-lg font-bold mb-4">📜 Recent Transactions</h3>
          <ul>
            {transactions.map((tx) => (
              <li
                key={tx.id}
                className="flex justify-between py-2 border-b border-gray-700"
              >
                <span>{tx.title}</span>
                <span
                  className={tx.amount < 0 ? "text-red-500" : "text-green-500"}
                >
                  {tx.amount} lv.
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-gray-800 p-4 rounded-xl shadow-md text-center">
          <h3 className="text-lg font-bold mb-4">📊 Expense Chart</h3>
          <div className="w-full h-40 bg-gray-700 rounded-lg flex items-center justify-center">
            <span className="text-gray-400">[Chart Placeholder]</span>
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-col md:flex-row gap-4">
        <button
          onClick={() => handleAddTransaction()}
          className="bg-blue-600 px-6 py-3 rounded-lg text-lg shadow-lg hover:bg-blue-700 transition w-full md:w-auto"
        >
          ➕ Add Transaction
        </button>
      </div>

      <div className="mt-6 bg-gray-800 p-6 rounded-xl">
        <h3 className="text-lg font-bold mb-4">Add New Transaction</h3>
        <input
          type="text"
          placeholder="Заглавие на транзакцията"
          value={newTransaction.title}
          onChange={(e) =>
            setNewTransaction({ ...newTransaction, title: e.target.value })
          }
          className="mb-4 p-2 w-full bg-gray-700 rounded-lg"
        />
        <input
          type="number"
          placeholder="Сума"
          value={newTransaction.amount}
          onChange={(e) =>
            setNewTransaction({ ...newTransaction, amount: e.target.value })
          }
          className="mb-4 p-2 w-full bg-gray-700 rounded-lg"
        />
      </div>
    </div>
  );
}
