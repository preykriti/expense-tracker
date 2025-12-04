import { useState } from "react";
import styles from "./History.module.css";
import { useTransactionContext } from "../../context/TransactionContext";
import type { Transaction } from "../../types/Transaction";
import TransactionCard from "../../components/TransactionCard/TransactionCard";
import InputForm from "../../components/InputForm/InputForm";

const History = () => {
  const [showForm, setShowForm] = useState<boolean>(false);
  const [editTransaction, setEditTransaction] = useState<Transaction | null>(
    null
  );
  const { transactions } = useTransactionContext();
  const [searchQuery, setSearchQuery] = useState<string>("");

  const toggleForm = () => {
    setShowForm((prev) => !prev);
  };

  const handleEdit = (id: string) => {
    const tx = transactions.find((t) => t.id === id);
    if (tx) {
      setEditTransaction(tx);
      setShowForm(true);
    }
  };

  return (
    <div className={styles.historyContainer}>
      <div className={styles.topContainer}>

        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={styles.searchInput}
        />
      </div>
      <TransactionCard onEdit={handleEdit} searchQuery={searchQuery} />
    </div>
  );
};

export default History;
