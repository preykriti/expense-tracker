import { useState } from "react"
import InputForm from "../InputForm/InputForm"
import styles from "./Home.module.css"
import Totals from "../Totals/Totals"
import TransactionList from "../TransactionList/TransactionList"
import Notification from "../Notification/Notification"

const Home = () => {
    const [showForm, setShowForm] = useState(false);
    const [notification, setNotification] = useState<{message: string; type: "success" | "error"} | null>(null);

    const showNotification = (message: string, type: "success" | "error") => {
        setNotification({message, type});
    };

    const toggleForm = () => {  
        setShowForm(prev => !prev);
    }

  return (
    <div>
        {notification && (
            <Notification 
                message={notification.message} 
                type={notification.type} 
                onClose={() => setNotification(null)} 
            />
        )}
       
        <Totals />
        <button className={styles.addBtn} onClick={toggleForm}>Add Transaction</button>
        {/* <TransactionList /> */}

        {showForm && (
            <div className={styles.formContainer} onClick={toggleForm}>
                <div className={styles.form} onClick={(e) => e.stopPropagation()}>
                    <InputForm onClose={()=>{setShowForm(false)}} showNotification={showNotification}/>
                </div>
            </div>

        )}


    </div>
  )
}

export default Home