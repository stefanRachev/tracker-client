import PropTypes from "prop-types";
import { IncomeContext } from "./IncomeContext";
import { useState, useCallback } from "react";
import { deleteItem, editItem } from "../../utils/api";


const API_URL = import.meta.env.VITE_API_URL;

export const IncomeProvider = ({ children }) => {
  const [incomes, setIncomes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [editingIncome, setEditingIncome] = useState(null);

 

  const fetchIncomes = useCallback(async (userId, filters = {}, page = 1) => {
    setIsLoading(true);
    if (!userId) {
      console.error("Invalid userId");
      setIsLoading(false);
      return;
    }

    try {
      const queryParams = new URLSearchParams({
        userId,
        ...filters,
        page,
        limit: 10,
      }).toString();

      const response = await fetch(`${API_URL}/api/incomes?${queryParams}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Error fetching incomes");
      }

      const data = await response.json();
      setIncomes((prevIncomes) =>
        page === 1 ? data.incomes : [...prevIncomes, ...data.incomes]
      );
      setHasMore(data.hasMore);
    } catch (error) {
      console.error("Error fetching incomes:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleDelete = useCallback(async (itemId, token) => {
    if (!window.confirm("Are you sure you want to delete this income?")) return;

    await deleteItem("incomes", itemId, token, setIncomes);
  }, []);

  const saveEdit = useCallback(async (updatedIncome, token) => {
    const data = await editItem(
      "incomes",
      updatedIncome._id,
      updatedIncome,
      token,
      setIncomes
    );

    if (data) {
      setEditingIncome(null);
    }
  }, []);

  const value = {
    incomes,
    isLoading,
    hasMore,
    editingIncome,
    setEditingIncome,
    fetchIncomes,
    handleDelete,
    handleEdit: setEditingIncome,
    saveEdit,
  };

  return (
    <IncomeContext.Provider value={value}>{children}</IncomeContext.Provider>
  );
};

IncomeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
