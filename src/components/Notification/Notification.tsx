import { useEffect } from "react";
import styles from "./Notification.module.css"
import type { NotificationProps } from "../../types/Transaction";

const Notification = ({message, type, onClose}: NotificationProps) => {
    useEffect(()=>{
        const timer = setTimeout(()=>{
            onClose();
        },2000);

        return ()=>clearTimeout(timer);
    }, [onClose]);


  return (
    <div className={`${styles.notif} ${type === "success"? styles.success: styles.error}`}>{message}</div>
  )
}

export default Notification