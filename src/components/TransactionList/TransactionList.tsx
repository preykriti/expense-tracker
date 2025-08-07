import { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../../firebase"; // adjust the path as needed
import { type Transaction } from "../../types/Transaction"; // your custom type

const TransactionList = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const q = query(collection(db, "transactions"), orderBy("createdAt", "desc"));
        const snapshot = await getDocs(q);
        const data: Transaction[] = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as Transaction[];

        setTransactions(data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (transactions.length === 0) return <div>No transactions found.</div>;

  return (
    <div>
      <h2>Transaction List</h2>
      <ul>
        {transactions.map((tx) => (
          <li key={tx.id}>
            <strong>Rs. {tx.amount}</strong> – {tx.description || "No description"} <br />
            <small>{tx.createdAt?.toDate().toLocaleString()}</small>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionList;
