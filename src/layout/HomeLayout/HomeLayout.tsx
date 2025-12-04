import { Outlet } from "react-router-dom";
import styles from "./HomeLayout.module.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useState } from "react";
import AddButton from "../../components/AddButton/AddButton";
import InputForm from "../../components/InputForm/InputForm";
import type { Transaction } from "../../types/Transaction";

const HomeLayout = () => {
  const [showForm, setShowForm] = useState(false);
  const [editTransaction, setEditTransaction] = useState<Transaction | null>(
    null
  );
  const toggleForm = () => {
    setShowForm((prev) => !prev);
    if (showForm) {
      setEditTransaction(null);
    }
  };

  const handleEdit = (transaction: Transaction) => {
    setEditTransaction(transaction);
    setShowForm(true);
  }
  return (
    <div className={styles.layout}>
      <Sidebar />
      <div className={styles.content}>
        <Outlet context={{handleEdit}}/>
      </div>

      <div className={styles.addBtnWrapper}>
        <AddButton onClick={toggleForm} />
      </div>

      {showForm && (
        <div className={styles.formContainer} onClick={toggleForm}>
          <div className={styles.form} onClick={(e) => e.stopPropagation()}>
            <InputForm onClose={toggleForm} editableTransaction={editTransaction} />
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeLayout;
