
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home/Home.tsx'
import Login from './pages/Login/Login.tsx'
import SignUp from './pages/Signup/SignUp.tsx'

function App() {
  return (
    <>
     <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />   
        <Route path="/signup" element={<SignUp />} />   
      </Routes>      
    </>
  )
}

export default App
