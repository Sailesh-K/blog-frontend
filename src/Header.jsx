import axios from "axios";
import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Usercontext } from "./UserContext";

function Header() {
  const { userInfo, setUserInfo } = useContext(Usercontext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const storedUserInfo = localStorage.getItem("userInfo");
        if (storedUserInfo) {
          setUserInfo(JSON.parse(storedUserInfo));
        } else {
          const response = await axios.get("https://blog-backend-74jb.onrender.com/api/test", {
            withCredentials: true
          });
          setUserInfo(response.data);
          localStorage.setItem("userInfo", JSON.stringify(response.data));
        }
      } catch (error) {
        console.error("Failed to fetch user info:", error);
      }
    };
    fetchUserInfo();
  }, [setUserInfo]);

  async function logout() {
    try {
      await axios.post("https://blog-backend-74jb.onrender.com/api/logout", {}, {
        withCredentials: true,
      });
      setUserInfo(null);
      localStorage.removeItem("userInfo"); // Clear localStorage on logout
      navigate("/login");
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  }

  const username = userInfo?.username;

  return (
    <header>
      <Link to="/indexpage" className="logo">MyBlog</Link>
      <nav>
        {username ? (
          <>
            <div onClick={() => navigate('/create')}>Create Post</div>
            <a onClick={logout}>Logout ({username})</a>
          </>
        ) : (
          <>
            <div onClick={() => navigate('/login')}>
              <span>Login</span>
            </div>
            <div onClick={() => navigate('/register')}>
              <span>Sign Up</span>
            </div>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
