
import './App.css'
// import InputForm from './components/InputForm/InputForm'
import Navbar from './components/Navbar/Navbar'
import Totals from './components/Totals/Totals'
import TransactionList from './components/TransactionList/TransactionList'

function App() {
  

  return (
    <>
      <Navbar/>
      <Totals/>
      {/* <InputForm/> */}
      <TransactionList/>
    </>
  )
}

export default App
