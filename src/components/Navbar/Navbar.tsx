import LogoutButton from '../LogoutButton/LogoutButton'
import './Navbar.module.css'
const Navbar = () => {
  return (
    <nav>
      <h3>Expense Tracker</h3>
      <LogoutButton/>
    </nav>
  )
}

export default Navbar