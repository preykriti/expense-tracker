import styles from "./Home.module.css"
import Totals from "../../components/Totals/Totals"
const Home = () => {


  return (
    <div className={styles.homeContainer}>
        {/* <Navbar /> */}
        <Totals />
    </div>
  )
}

export default Home