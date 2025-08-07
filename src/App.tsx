
import './App.css'

import Home from './components/Home/Home.tsx'
import Navbar from './components/Navbar/Navbar.tsx'

function App() {
  // const { setTransactions } = useTransactionContext();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const res = await useFetchTransactions();
  //     setTransactions(res);
  //   };
  //   fetchData();
  // }, []);
  return (
    <>
      <Home />
    </>
  )
}

export default App
