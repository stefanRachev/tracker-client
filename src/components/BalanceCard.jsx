import { useState, useEffect } from "react";
import { useAuth } from "../context/useAuth";

const API_URL = import.meta.env.VITE_API_URL;

export default function BalanceDisplay() {
  const [balance, setBalance] = useState(0);
  const [message, setMessage] = useState("");
  const { user } = useAuth();

  const userId = user?._id;

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await fetch(`${API_URL}/api/incomes/${userId}`);
        if (response.ok) {
          const data = await response.json();
          const totalBalance = data.reduce((acc, income) => acc + income.amount, 0);
          setBalance(totalBalance);
        } else {
          setMessage("Не може да заредим доходите.");
        }
      } catch (error) {
        console.error("Грешка при зареждане на доходите:", error);
        setMessage("Грешка при свързване със сървъра.");
      }
    };

    if (userId) {
      fetchBalance();
    }
  }, [userId]);

  return (
    <div className="bg-gray-800 p-6 rounded-xl text-center shadow-md mb-6">
      <h2 className="text-xl">Текущ баланс</h2>
      {message ? (
        <p className="text-red-500">{message}</p>
      ) : (
        <p className="text-4xl font-bold mt-2">{balance} лв.</p>
      )}
    </div>
  );
}
