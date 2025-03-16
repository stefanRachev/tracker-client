import PropTypes from "prop-types";
import { BalanceContext } from "./BalanceContext";
import { useState, useEffect, useCallback } from "react";
import { useAuth } from "../auth/useAuth";

const API_URL = import.meta.env.VITE_API_URL;

export const BalanceProvider = ({ children }) => {
  const [balance, setBalance] = useState(0);
  const { user } = useAuth();

  const userId = user?._id;

  const fetchBalance = useCallback(async () => {
    if (!userId) return;

    try {
      const response = await fetch(`${API_URL}/api/balance?userId=${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
         
        },
      });

      if (response.ok) {
        const data = await response.json();
        setBalance(data.balance);
      } else {
        console.error("Грешка при зареждането на баланса!");
      }
    } catch (error) {
      console.error("Грешка при заявката:", error);
    }
  }, [userId]);

  useEffect(() => {
    fetchBalance();
  }, [fetchBalance]);

  return (
    <BalanceContext.Provider value={{ balance, setBalance }}>
      {children}
    </BalanceContext.Provider>
  );
};

BalanceProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
