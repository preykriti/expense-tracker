import { useEffect, useState } from "react";
import styles from "./Totals.module.css";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import type { Transaction } from "../../types/Transaction";

const Totals = () => {
    const [income, setIncome] = useState(0);
    const [expense, setExpense]= useState(0);

    useEffect(()=>{
        const fetchData = onSnapshot(collection(db, "transactions"), (snapshot) => {
            let incomeSum = 0;
            let expenseSum = 0;

            snapshot.forEach((doc)=> {
                const data = doc.data() as Transaction;
                if(data.type === "income"){
                    incomeSum += data.amount;
                }
                else if(data.type === "expense"){
                    expenseSum += data.amount;
                }
            });
            setIncome(incomeSum);
            setExpense(expenseSum);
        });

        return ()=>fetchData();
    },[]);

    const balance = income - expense;
  return (
    <div className={styles.totalsContainer}>
      <div className={styles.statBox}>
        <h4>Income</h4>
        <p>Rs. {income}</p>
      </div>
      <div className={styles.statBox}>
        <h4>Expenses</h4>
        <p>Rs. {expense}</p>
      </div>
      <div className={styles.statBox}>
        <h4>Balance</h4>
        <p>Rs. {balance}</p>
      </div>
    </div>
  )
}

export default Totals