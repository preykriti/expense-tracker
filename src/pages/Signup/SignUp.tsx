import { useEffect, useState } from "react";
import { registerUser } from "../../firebase/auth";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";

const SignUp = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  const { user } = useAuthContext();

  useEffect(() => {
    if (user) navigate("/");
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await registerUser(email, password);
      navigate("/");
      toast.success("Signed up successfully");
    } catch (err: any) {
      toast.error("Failed to sign up: " + err.message);
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
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
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
