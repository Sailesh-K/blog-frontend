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
        const response = await axios.get("http://localhost:3000/api/test", {
          withCredentials: true
        });
        setUserInfo(response.data);
      } catch (error) {
        console.error("Failed to fetch user info:", error);
        setUserInfo(null); 
      }
    };
    fetchUserInfo();
  }, []);

  async function logout(){
    try {
      await axios.post("http://localhost:3000/api/logout", {
        withCredentials: true,
      });
      setUserInfo(null);
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  }
  
  const username=userInfo?.username;

  return(
    <header>
      <Link to="/" className='logo'>Blog</Link>
      <nav>
        {username ? (
          <>
            <span>Hello, {username}</span>
            <Link to="/create">Create New Post</Link>
            <a onClick={logout}>logout</a>
          </>
        )

        : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Sign Up</Link>
          </>
        )}
      </nav>
    </header>
    );
}

export default Header;
