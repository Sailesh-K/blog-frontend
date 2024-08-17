import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom"
import Editor from "../Editor";
import axios from "axios";

function EditPage(){
    const {id}=useParams();
    const [title,setTitle]=useState('');
    const [summary,setSummary]=useState('');
    const [content,setContent]=useState('');
    const [files,setFiles]=useState('');
    const [redirect,setRedirect]=useState(false);
    
    useEffect(() => {
        axios.get(`https://blog-backend-74jb.onrender.com/api/post/${id}`,{withCredentials:true})
          .then(response => {
            const postInfo = response.data;
            setTitle(postInfo.title);
            setContent(postInfo.content);
            setSummary(postInfo.summary);
          })
          .catch(error => {
            console.error("Error fetching post data:", error);
          });
      }, []);
    
    
    async function updatePost(e){
        e.preventDefault();
        const data=new FormData();
        data.set('title',title);
        data.set('summary',summary);
        data.set('content',content);
        data.set('id',id);
        if(files?.[0]){
            data.set('file',files?.[0]);
        }
       const response=await axios.put(`https://blog-backend-74jb.onrender.com/api/post`,data,{withCredentials:true})
       if(response.status===200) setRedirect(true);
    }

    if(redirect){
        return <Navigate to={"/post/"+id}/>
    }
    
    return(
        <form onSubmit={updatePost}>
            <input type="title" 
                   placeholder={'Title'}
                   value={title}
                   onChange={e=>setTitle(e.target.value)}/>
            <input type="summary"
                   placeholder={'Summary'}
                   value={summary}
                   onChange={e=>setSummary(e.target.value)}/>
            <input type="file"
                   onChange={e=>setFiles(e.target.files)}/>
            <Editor value={content} onChange={setContent}/>
            <button type="submit" style={{marginTop:'5px'}}>Update Post</button>
        </form>
    );
}

export default EditPage;