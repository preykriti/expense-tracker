
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home.tsx'
import Login from './pages/Login/Login.tsx'
import SignUp from './pages/Signup/SignUp.tsx'
import ProtectedRoute from './components/ProtectedRoute.tsx'
import HomeLayout from './layout/HomeLayout/HomeLayout.tsx'
import History from './pages/History/History.tsx'
import Budget from './pages/Budget/Budget.tsx'
import Settings from './pages/Settings/Settings.tsx'

function App() {
  return (
    <>
     <Routes>
        <Route path="/" element={
          <ProtectedRoute>
            <HomeLayout />
          </ProtectedRoute>
        } >
          <Route index element={<Home />} />  
          <Route path="history" element={<History/>}/>
          <Route path="budget" element={<Budget/>}/>
          <Route path="settings" element={<Settings/>}/>
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </>
  )
}

export default App
