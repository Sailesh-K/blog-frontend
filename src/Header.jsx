import axios from "axios";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Usercontext } from "./UserContext";

function Header(){
  const {userInfo,setUserInfo}=useContext(Usercontext);


  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get("https://blog-backend-74jb.onrender.com/api/test", {
          withCredentials: true
        });
        setUserInfo(response.data);
      } catch (error) {
        console.error("Failed to fetch user info:", error);
        //setUserInfo(null); 
      }
    };
    fetchUserInfo();
  }, [setUserInfo]);

  async function logout(){
    try {
      await axios.post("https://blog-backend-74jb.onrender.com/api/logout", {
        withCredentials: true,
      });
      setUserInfo(null);
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  }
  
  const username=userInfo?.username;

  return (
    <header>
      <Link to="/" className="logo">MyBlog</Link>
      <nav>
        {username && (
          <>
            <Link to="/create">Create new post</Link>
            <a onClick={logout}>Logout ({username})</a>
          </>
        )}
        {!username && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
