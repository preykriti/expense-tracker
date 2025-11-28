import {NavLink } from "react-router-dom";
import LogoutButton from "../LogoutButton/LogoutButton";
import styles from "./Sidebar.module.css";
import { RiDashboardFill } from "react-icons/ri";
import { RiHistoryFill } from "react-icons/ri";

const Sidebar = () => {
  const menuItems = [
    { to: "/", label: "Dashboard", icon: <RiDashboardFill className={styles.icon}/> },
    { to: "/history", label: "History", icon: <RiHistoryFill className={styles.icon}/> },
    { to: "/budget", label: "Budget", icon: <RiDashboardFill className={styles.icon}/> },
    { to: "/settings", label: "Settings", icon: <RiDashboardFill className={styles.icon}/> },
  ];
  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarContent}>
        <h2 className={styles.title}>Tracker</h2>
        <div className={styles.menu}>
          {menuItems.map((item) => (
            <NavLink
              to={item.to}
              key={item.to}
              className={({ isActive }) =>
                isActive
                  ? `${styles.menuItem} ${styles.active}`
                  : styles.menuItem
              }
            >
              {item.icon}
              <span className={styles.text}>{item.label}</span>
            </NavLink>
          ))}
        </div>
      </div>
      <LogoutButton />
    </div>
  );
};

export default Sidebar;
