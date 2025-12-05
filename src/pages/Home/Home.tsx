import styles from "./Home.module.css";
import Totals from "../../components/Totals/Totals";
import CategoryPieChart from "../../components/charts/CategoryPieChart/CategoryPieChart";
const Home = () => {
  return (
    <div className={styles.homeContainer}>
      <Totals />
      <CategoryPieChart />
    </div>
  );
};

export default Home;
