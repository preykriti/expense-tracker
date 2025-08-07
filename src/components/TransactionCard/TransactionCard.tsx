import { FaEdit, FaTrash } from "react-icons/fa";
import { useTransactionContext } from "../../context/TransactionContext";
import styles from "./TransactionCard.module.css";
import { useTransactions } from "../../hooks/transaction.hooks";

type CardProps = {
  onEdit: (id: string) => void;
  searchQuery: string;
};

const TransactionCard = ({ onEdit, searchQuery }: CardProps) => {
  const {transactions} = useTransactionContext();
  const { deleteTransaction } = useTransactions();

  const filteredTransactions = transactions.filter((transaction) => {
    const q = searchQuery.toLowerCase();
    return (
      transaction.title.toLowerCase().includes(q) ||
      transaction.category.toLowerCase().includes(q)
    );
  });

  if (transactions.length === 0) {
    return <div>No transactions found.</div>;
  }
  return (
    <div className={styles.cardContainer}>
      {filteredTransactions.map((t)=>(
        <div className={styles.card} key={t.id}>
          <div className={styles.info}>
            <div className={styles.details}>
              <h4 className={styles.title}>{t.title}</h4>
              <span className={styles.category}>Category: {t.category}</span>
              {t.description && (
                <p className={styles.description}>{t.description}</p>
              )}
            </div>
            <div className={styles.options}>
              <FaEdit
                className={styles.icon}
                onClick={() => onEdit(t.id)}
              />
              <FaTrash
                className={`${styles.icon} ${styles.deleteIcon}`}
                onClick={() => deleteTransaction(t.id)}
              />
            </div>
          </div>
            <div className={styles.amount}>
              {t.type === "expense" ? "-" : "+"}Rs {t.amount}
            </div>
        </div>
      ))}
    </div>
  )
}

export default TransactionCard