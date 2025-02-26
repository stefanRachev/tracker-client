import { useContext } from "react";
import { UserContext } from "../context/UserContext"; 

function Dashboard() {
  const { user } = useContext(UserContext);

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-800">Здравей, {user.username}!</h1>
      <p className="text-lg text-gray-600 mb-6">Твоят бюджет и разходи за този месец.</p>

      {/* Баланс */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Общ баланс: $500</h2>
      </div>

      {/* Графика (тук можеш да сложиш Chart.js или Recharts) */}

      {/* Последни транзакции */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-800">Последни транзакции</h2>
        <ul className="mt-4">
          <li className="border-b py-2">🍔 Храна: -$15</li>
          <li className="border-b py-2">💰 Заплата: +$1000</li>
          <li className="border-b py-2">🚗 Гориво: -$50</li>
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;
