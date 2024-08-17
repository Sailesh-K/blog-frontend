import React, { useEffect, useState } from "react";
import Post from "../Post";
import axios from "axios";

function IndexPage(){
    const [posts,setPosts]=useState([]);
    useEffect(()=>{
        axios.get('https://blog-backend-74jb.onrender.com/api/post',{withCredentials:true})
        .then(response=>{
            setPosts(response.data);
        });
    },[]);
    return(
        <>
        {posts.length>0 && posts.map(post=>(
            <Post key={post._id} {...post}/>
        ))}
        </>
    );
}

export default IndexPage;