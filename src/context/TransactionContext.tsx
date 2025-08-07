import { createContext, useContext, useState, type ReactNode } from "react";
import type { Transaction } from "../types/Transaction";

interface TransactionContextType {
    transactions: Transaction[];
    setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
}

const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

export const TransactionProvider = ({children}: {children: ReactNode}) => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    return (
        <TransactionContext.Provider value={{transactions, setTransactions}}>
            {children}
        </TransactionContext.Provider>
    )
}

export const useTransactionContext = () => {
    const context = useContext(TransactionContext);
    if (!context) {
        throw new Error("useTransactionContext must be used within a TransactionProvider");
    }
    return context;
}

