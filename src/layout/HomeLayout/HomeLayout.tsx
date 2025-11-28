import { Outlet } from "react-router-dom";
import styles from "./HomeLayout.module.css";
import Sidebar from "../../components/Sidebar/Sidebar";

const HomeLayout = () => {
  return (
    <div className={styles.layout}>
      <Sidebar />
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
};

export default HomeLayout;
