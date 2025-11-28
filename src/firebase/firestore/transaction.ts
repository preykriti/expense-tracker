import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, Timestamp, updateDoc, where } from "firebase/firestore";
import type { Transaction, TransactionInput } from "../../types/Transaction";
import { db } from "../firebaseConfig";
import type { Unsubscribe } from "firebase/auth";

export const addTransaction = async (
  userId: string,
  transaction: TransactionInput
): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, "transactions"), {
      userId,
      title: transaction.title,
      type: transaction.type,
      amount: transaction.amount,
      category: transaction.category,
      description: transaction.description,
      date: Timestamp.fromDate(transaction.date),
      createdAt: Timestamp.now(),
    });
    return docRef.id;
  } catch (error) {
    console.log("error adding transaction: ", error);
    throw error;
  }
};

export const updateTransaction = async (
  transactionId: string,
  updates: Partial<TransactionInput>
): Promise<void> => {
  try {
    const transactionRef = doc(db, "transactions", transactionId);
    const updateData: any = { ...updates };
    
    if (updates.date) {
      updateData.date = Timestamp.fromDate(updates.date);
    }
    
    await updateDoc(transactionRef, updateData);
  } catch (error) {
    console.error("Error updating transaction:", error);
    throw error;
  }
};

export const deleteTransaction = async (
  transactionId: string
): Promise<void> => {
  try {
    const transactionRef = doc(db, "transactions", transactionId);
    await deleteDoc(transactionRef);
  } catch (error) {
    console.error("Error deleting transaction:", error);
    throw error;
  }
};

export const subscribeToTransactions = (
  userId: string,
  callback: (transactions: Transaction[]) => void
): Unsubscribe => {
  const q = query(
    collection(db, "transactions"),
    where("userId", "==", userId),
    orderBy("date", "desc")
  );

  return onSnapshot(
    q,
    (snapshot) => {
      const transactions: Transaction[] = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          title: data.title,
          userId: data.userId,
          type: data.type,
          amount: data.amount,
          category: data.category,
          description: data.description,
          date: data.date.toDate(),
          createdAt: data.createdAt.toDate(),
        };
      });
      callback(transactions);
    },
    (error: any) => {
      console.error("Error subscribing to transactions:", error);
    }
  );
};