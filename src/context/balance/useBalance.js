import { useContext } from "react";
import { BalanceContext } from "./BalanceContext";

export const useBalance = () => {
  return useContext(BalanceContext);
};
