import type { ReactNode } from "react"
import { useAuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

type ProtectedRouteProps = {
    children: ReactNode;
}

const ProtectedRoute = ({children}: ProtectedRouteProps) => {

    const {user, loading}= useAuthContext();
    if(loading){
        return <p>Loading...</p>
    }

    if(!user){
        return <Navigate to="/login" replace />;
    }
  return (
    <>{children}</>
  )
}

export default ProtectedRoute