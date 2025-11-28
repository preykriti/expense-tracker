import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import {type Transaction, type TransactionInput } from "../../types/Transaction";
import { Timestamp } from "firebase/firestore";
import styles from "./InputForm.module.css"
import { useTransactionContext } from "../../context/TransactionContext";

type InputFormProps = {
    onClose: () => void;
    showNotification: (message: string, type: "success" | "error") => void;
    editableTransaction?: Transaction | null;
};

const InputForm = ({ onClose, showNotification, editableTransaction }: InputFormProps) => {
    const [formData, setFormData] = useState<TransactionInput>({
        title: '',
        type: 'expense',
        amount: 0,
        category: '',
        description : '' ,
        date: new Date(),
    });

    useEffect(() => {
        if(editableTransaction) {
            const {title, type, amount, category, description, date} = editableTransaction;
            setFormData({
              title,
                type,
                amount,
                category,
                description: description || "", 
                date: date,
            });
        }
    },[editableTransaction]);

    const {addTransaction, updateTransaction} = useTransactionContext();

    const expenseCategories = ["Food", "Transportation", "Health", "Entertainment", "Utilities", "Other"];
    const incomeCategories = ["Salary", "Business", "Investments", "Loans", "Gifts", "Other"];

    const handleSubmit = async (e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        console.log("about to submit");

        if(!formData.title.trim() || formData.amount <= 0 || !formData.category){
            showNotification("Title, amount and category cannot be empty!", "error");
            return;
        }

        try {
            if(editableTransaction){
                await updateTransaction(editableTransaction.id, {
                    ...formData,
                    amount: Number(formData.amount)}
                );
                showNotification("Transaction updated", "success");
            }
            else{
                await addTransaction({
                    ...formData,
                    amount: Number(formData.amount),
                   });

                console.log("added transaction");

                showNotification("Transaction added", "success");
            }

            onClose();
            
        } catch (error) {
            console.log(error);
            showNotification("failed to add transaction", "error");
        }

        console.log("submited");
    }

    const handleChange = (e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>)=>{
        setFormData((prev)=>({...prev, [e.target.name]: e.target.value}));
    }

  return (
    <>
    <form onSubmit={handleSubmit} >
        <label htmlFor="title">Title
            <input type="text" id="title" name="title" value = {formData.title} onChange = {handleChange}/>
        </label>

        <label htmlFor="type-dropdown">
            Type
            <select id="type-dropdown" name="type" value = {formData.type} onChange = {handleChange}>
                <option value="expense">Expense</option>
                <option value="income">Income</option>
            </select>
        </label>

        <label htmlFor="amount">
            Amount:
            <input type="number" id="amount" name="amount" value = {formData.amount} onChange = {handleChange}/>
        </label>

        <label htmlFor="category">
            Category:
            <select name = "category" value={formData.category} onChange={handleChange}>
                <option value="">Select a category</option>
                {formData.type === "income" ? incomeCategories.map((cat) => <option key={cat} value={cat}>{cat}</option>) :
                expenseCategories.map((cat)=> <option key={cat} value={cat}>{cat}</option>)}
            </select>
        </label>

        <label htmlFor="description">
            Description:
            <textarea name="description" value={formData.description} id="description" onChange={handleChange}></textarea>
        </label>

        <button className={styles.submitBtn} type="submit">Submit</button>
    </form>
    </>
  )
}

export default InputForm;