import styles from "./AddButton.module.css";

const AddButton = ({onClick}:{onClick:()=>void}) => {

  return (
    <button className={styles.addBtn} onClick={onClick}>
      Add
    </button>
  );
};

export default AddButton;
