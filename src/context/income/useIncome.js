import { useContext } from "react";
import { IncomeContext } from "./IncomeContext";

export const useIncome = () => {
  return useContext(IncomeContext);
};
