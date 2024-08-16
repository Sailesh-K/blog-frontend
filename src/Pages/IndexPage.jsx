import React, { useEffect, useState } from "react";
import Post from "../Post";
import axios from "axios";

function IndexPage(){
    const [posts,setPosts]=useState([]);
    useEffect(()=>{
        axios.get('http://localhost:3000/api/post')
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