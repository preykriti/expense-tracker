export interface Transaction{
    id : string;
    title: string;
    type: 'income' | 'expense';
    amount: number;
    category: string;
    description : string;
    date: Date;
    createdAt: Date;
}

export interface TransactionInput{
  title: string;
  type: 'income' | 'expense';
  amount: number;
  category: string;
  description : string;
  date: Date;
}

export type TransactionListProps = {
  onAddClick: () => void;
  onEditClick: (transaction: Transaction) => void;
};