import { useEffect } from "react";
import { type Transaction } from "../../types/Transaction";
import styles from "./InputForm.module.css";
import { useTransactionContext } from "../../context/TransactionContext";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

type InputFormProps = {
  onClose: () => void;
  editableTransaction?: Transaction | null;
};

const transactionSchema = z.object({
  title: z.string().min(1, "Title is required"),
  type: z.enum(["income", "expense"]),
  amount: z.number().positive("Amount must be greater than 0"),
  category: z.string().min(1, "Category is required"),
  description: z.string().optional(),
  date: z.date(),
});

type TransactionFormData = z.infer<typeof transactionSchema>;

const InputForm = ({ onClose, editableTransaction }: InputFormProps) => {
  const { addTransaction, updateTransaction } = useTransactionContext();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<TransactionFormData>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      title: "",
      type: "expense",
      amount: 0,
      category: "Other",
      description: "",
      date: new Date(),
    },
  });

  const formatDateForInput = (date: Date) => {
    return date.toISOString().split("T")[0];
  };

  useEffect(() => {
    if (editableTransaction) {
      const { title, type, amount, category, description, date } =
        editableTransaction;
      setValue("title", title);
      setValue("type", type);
      setValue("amount", amount);
      setValue("category", category);
      setValue("description", description || "");
      setValue("date", new Date(date));
    }
  }, [editableTransaction, setValue]);

  const expenseCategories = [
    "Food",
    "Transportation",
    "Health",
    "Entertainment",
    "Utilities",
    "Other",
  ];
  const incomeCategories = [
    "Salary",
    "Business",
    "Investments",
    "Loans",
    "Gifts",
    "Other",
  ];

  const selectedType = watch("type");
  const selectedDate = watch("date");

  const onSubmit = async (data: TransactionFormData) => {
    try {
      if (editableTransaction) {
        await updateTransaction(editableTransaction.id, data);
        toast.success("Transaction updated");
      } else {
        await addTransaction(data);

        console.log("added transaction");
        toast.success("Transaction added");
      }

      onClose();
    } catch (error) {
      console.log(error);
      toast.error("Failed to add transaction");
    }

    console.log("submited");
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="title">
          Title
          <input {...register("title")} />
          {errors.title && (
            <p className={styles.error}>{errors.title.message}</p>
          )}
        </label>

        <label>
          Type:
          <div className={styles.typeContainer}>
            <label className={styles.typeLabel}>
              <input
                className={styles.radioInput}
                type="radio"
                {...register("type")}
                value="expense"
                checked={selectedType === "expense"}
              />
              <span>Expense</span>
            </label>

            <label className={styles.typeLabel}>
              <input
                className={styles.radioInput}
                type="radio"
                {...register("type")}
                value="income"
                checked={selectedType === "income"}
              />
              <span>Income</span>
            </label>
          </div>
          {errors.type && <p className={styles.error}>{errors.type.message}</p>}
        </label>

        <label htmlFor="category">
          Category:
          <select {...register("category")}>
            {(selectedType === "income"
              ? incomeCategories
              : expenseCategories
            ).map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className={styles.error}>{errors.category.message}</p>
          )}
        </label>

        <div className={styles.row}>
          <label className={styles.rowHalf} htmlFor="amount">
            Amount:
            <input
              type="number"
              {...register("amount", { valueAsNumber: true })}
              onFocus={(e) => e.target.select()}
            />
            {errors.amount && (
              <p className={styles.error}>{errors.amount.message}</p>
            )}
          </label>

          <label className={styles.rowHalf} htmlFor="date">
            Date:
            <input
              type="date"
              {...register("date", { valueAsDate: true })}
              value={
                selectedDate
                  ? formatDateForInput(selectedDate)
                  : formatDateForInput(new Date())
              }
              max={formatDateForInput(new Date())}
            />
            {errors.date && (
              <p className={styles.error}>{errors.date.message}</p>
            )}
          </label>
        </div>

        <label htmlFor="description">
          Description:
          <textarea {...register("description")}></textarea>
        </label>

        <button className={styles.submitBtn} type="submit">
          Submit
        </button>
      </form>
    </>
  );
};

export default InputForm;
