import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import type { Transaction } from "../types/Transaction";
import { db } from "../firebase/firebaseConfig";
import { useTransactionContext } from "../context/TransactionContext";
import { useEffect } from "react";

export const useTransactions =() => {
    const {transactions, setTransactions} = useTransactionContext();
    
    useEffect(() => {
        const fetchTransactions = async () => {
        const snapshot = await getDocs(collection(db, "transactions"));
        const fetched: Transaction[] = snapshot.docs.map(doc=>({
        id: doc.id,
        ...doc.data(),
        })) as Transaction[];

        setTransactions(fetched);
        };

        fetchTransactions();
    }, [setTransactions]);

    const addTransaction = async (payload: Omit<Transaction, "id">) => {
        const response = await addDoc(collection(db, "transactions"), payload);
        const newTransaction: Transaction = {
            id: response.id, ...payload 
        };
        setTransactions(prev => [...prev, newTransaction]);
    };

    const updateTransaction = async (id: string, payload: Partial<Omit<Transaction, "id">>) => {
        const response = doc(db, "transactions", id);
        await updateDoc(response, payload);
        setTransactions(prev => prev.map((tx) => tx.id === id ? {...tx, ...payload} : tx));
    }

    const deleteTransaction = async (id: string) => {
        await deleteDoc(doc(db, "transactions", id));
        setTransactions(prev => prev.filter((tx) => tx.id !== id));
    }


return {transactions, addTransaction, deleteTransaction, updateTransaction};
};