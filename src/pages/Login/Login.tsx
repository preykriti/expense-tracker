import { useEffect, useState } from "react";
import { loginUser } from "../../firebase/auth";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const {user}= useAuthContext();

  useEffect(()=>{
    if(user) navigate("/");
  },[user])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await loginUser(email, password);
      navigate("/");
      toast.success("Logged in successfully");
    } catch (err: any) {
      toast.error("Failed to log in: " + err.message);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
