import type { Timestamp } from "firebase/firestore";

export interface Transaction{
    id : string;
    title: string;
    type: 'income' | 'expense';
    amount: number;
    category: string;
    description : string;
    createdAt: Timestamp;
}

export type NotificationProps = {
    message: string;
    type: "success" | "error";
    onClose: ()=>void;
}

export type TransactionListProps = {
  onAddClick: () => void;
  onEditClick: (transaction: Transaction) => void;
  showNotification: (msg: string, type: "success" | "error") => void;
};