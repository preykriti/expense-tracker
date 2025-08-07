import { useState } from "react"
import InputForm from "../InputForm/InputForm"
import styles from "./Home.module.css"
import Totals from "../Totals/Totals"
import Notification from "../Notification/Notification"
import TransactionCard from "../TransactionCard/TransactionCard"
import { useTransactions } from "../../hooks/transaction.hooks"
import type { Transaction } from "../../types/Transaction"
import Navbar from "../Navbar/Navbar"

const Home = () => {
    const [showForm, setShowForm] = useState(false);
    const [editTransaction, setEditTransaction] = useState<Transaction | null> (null);
    const {transactions}  = useTransactions();
    const [notification, setNotification] = useState<{message: string; type: "success" | "error"} | null>(null);
    const [searchQuery, setSearchQuery] = useState("");

    const showNotification = (message: string, type: "success" | "error") => {
        setNotification({message, type});
    };

    const toggleForm = () => {  
        setShowForm(prev => !prev);
    }

    const handleEdit = (id: string)=>{
         const tx = transactions.find(t => t.id === id);
        if (tx) {
            setEditTransaction(tx);
            setShowForm(true);
        }
    }

    useTransactions();

  return (
    <div>
        {notification && (
            <Notification 
                message={notification.message} 
                type={notification.type} 
                onClose={() => setNotification(null)} 
            />
        )}
       
        <Navbar />
        <Totals />
        <div className={styles.topContainer}>
            <button className={styles.addBtn} onClick={toggleForm}>Add</button>
            
                <input
                    type="text"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={styles.searchInput}
                />
         
        </div>
        <TransactionCard onEdit={handleEdit} searchQuery={searchQuery}/>

        {showForm && (
            <div className={styles.formContainer} onClick={toggleForm}>
                <div className={styles.form} onClick={(e) => e.stopPropagation()}>
                    <InputForm onClose={()=>{setShowForm(false) 
                        setEditTransaction(null);
                    }} showNotification={showNotification} editableTransaction={editTransaction}/>
                </div>
            </div>

        )}


    </div>
  )
}

export default Home