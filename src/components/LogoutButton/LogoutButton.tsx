import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../firebase/auth";
import styles from "./LogoutButton.module.css";

const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogout = async () =>{
      try{
        await logoutUser();
        navigate("/login");
      }catch(error: any){
        console.log("logout failed: " , error.message)
      }
    }

  return (
    <button className={styles.logoutButton} onClick={handleLogout}>Logout</button>
  )
}

export default LogoutButton