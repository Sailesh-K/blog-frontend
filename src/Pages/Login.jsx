import { useContext, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { Usercontext } from "../UserContext";

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const { setUserInfo } = useContext(Usercontext);

  useEffect(() => {
    // Check if user info is already stored in localStorage
    const storedUserInfo = localStorage.getItem("userInfo");
    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo));
      setRedirect(true);  // Automatically redirect if user is already logged in
    }
  }, [setUserInfo]);

  async function login(ev) {
    ev.preventDefault();
    const response = await fetch('https://blog-backend-74jb.onrender.com/api/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });
    if (response.ok) {
      const userInfo = await response.json();
      setUserInfo(userInfo);
      localStorage.setItem("userInfo", JSON.stringify(userInfo)); // Save user info to localStorage
      setRedirect(true);
    } else {
      alert('Wrong credentials. Please try again.');
    }
  }

  if (redirect) {
    return <Navigate to={'/indexpage'} />;
  }

  return (
    <form className="login" onSubmit={login}>
      <h1>Login</h1>
      <input 
        type="text"
        placeholder="Email"
        value={email}
        onChange={ev => setEmail(ev.target.value)}
      />
      <input 
        type="password"
        placeholder="Password"
        value={password}
        onChange={ev => setPassword(ev.target.value)}
      />
      <button>Login</button>
    </form>
  );
}
