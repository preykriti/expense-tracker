import { useState } from "react"
import InputForm from "../../components/InputForm/InputForm"
import styles from "./Home.module.css"
import Totals from "../../components/Totals/Totals"
import TransactionCard from "../../components/TransactionCard/TransactionCard"
import type { Transaction } from "../../types/Transaction"
import { useTransactionContext } from "../../context/TransactionContext"
import Navbar from "../../components/Navbar/Navbar"

const Home = () => {
    const [showForm, setShowForm] = useState<boolean>(false);
    const [editTransaction, setEditTransaction] = useState<Transaction | null> (null);
    const {transactions}  = useTransactionContext();
    const [searchQuery, setSearchQuery] = useState<string>("");


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


  return (
    <div>
       
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
                    }} editableTransaction={editTransaction}/>
                </div>
            </div>

        )}


    </div>
  )
}

export default Home