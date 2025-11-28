import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import type { Transaction, TransactionInput } from "../types/Transaction";
import { useAuthContext } from "./AuthContext";
import {
  addTransaction as addTransactionDb,
  updateTransaction as updateTransactionDb,
  deleteTransaction as deleteTransactionDb,
  subscribeToTransactions,
} from "../firebase/firestore/transaction";

interface TransactionContextType {
  transactions: Transaction[];
  loading: boolean;
  addTransaction: (transaction: TransactionInput) => Promise<void>;
  updateTransaction: (
    id: string,
    updates: Partial<TransactionInput>
  ) => Promise<void>;
  deleteTransaction: (id: string) => Promise<void>;
  totalIncome: number;
  totalExpense: number;
  balance: number;
}

const TransactionContext = createContext<TransactionContextType | undefined>(
  undefined
);

export const useTransactionContext = () => {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error(
      "useTransactionContext must be used within a TransactionProvider"
    );
  }
  return context;
};

export const TransactionProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuthContext();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(()=>{
    if(!user){
        setTransactions([])
        setLoading(false);
        return;
    }
    setLoading(true);
    const unsubscribe = subscribeToTransactions(user.uid, (newTransactions)=>{
        setTransactions(newTransactions);
        setLoading(false);
    })
  }, [user]);

  const addTransaction = useCallback(
    async (transaction: TransactionInput) => {
        if(!user) throw new Error("User not authenticated");
        await addTransactionDb(user.uid, transaction);
    },[user]
  );

  const updateTransaction = useCallback(
    async (id: string, updates: Partial<TransactionInput>) => {
       if(!user) throw new Error("User not authenticated");
       await updateTransactionDb(id, updates);
    },[user]
  );


    const deleteTransaction = useCallback(
    async (id: string) => {
      if (!user) {
        throw new Error("User must be authenticated to delete transaction");
      }
      await deleteTransactionDb(id);
    },
    [user]
  );

  const totalIncome = transactions.filter(t => t.type === "income").reduce((sum, t)=> sum + t.amount, 0);
  const totalExpense = transactions.filter(t => t.type === "expense").reduce((sum, t)=> sum + t.amount, 0);
  const balance = totalIncome - totalExpense;

  return (
    <TransactionContext.Provider value={{ transactions, loading, addTransaction, updateTransaction, deleteTransaction, totalIncome, totalExpense, balance }}>
      {children}
    </TransactionContext.Provider>
  );
};
