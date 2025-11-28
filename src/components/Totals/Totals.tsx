
import styles from "./Totals.module.css";

import { useTransactionContext } from "../../context/TransactionContext";

const Totals = () => {
    const {totalIncome, totalExpense, balance} = useTransactionContext();
  return (
    <div className={styles.totalsContainer}>
      <div className={styles.statBox}>
        <h4>Income</h4>
        <p>Rs. {totalIncome}</p>
      </div>
      <div className={styles.statBox}>
        <h4>Expenses</h4>
        <p>Rs. {totalExpense}</p>
      </div>
      <div className={styles.statBox}>
        <h4>Balance</h4>
        <p>Rs. {balance}</p>
      </div>
    </div>
  )
}

export default Totals