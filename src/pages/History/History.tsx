import { useState } from "react";
import styles from "./History.module.css";
import { useTransactionContext } from "../../context/TransactionContext";
import type { Transaction } from "../../types/Transaction";
import TransactionCard from "../../components/TransactionCard/TransactionCard";
import { useOutletContext } from "react-router-dom";

type ContextType = {
  handleEdit: (transaction: Transaction) => void;
};

const History = () => {
  const { transactions } = useTransactionContext();
  const {handleEdit} = useOutletContext<ContextType>();
  const [searchQuery, setSearchQuery] = useState<string>("");


  const handleEditClick = (id: string) => {
    const tx = transactions.find((t) => t.id === id);
    if (tx) {
      handleEdit(tx);
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
      <TransactionCard onEdit={handleEditClick} searchQuery={searchQuery} />
    </div>
  );
};

export default History;
