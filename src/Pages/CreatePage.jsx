import axios from "axios";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { Navigate } from "react-router-dom";
import Editor from "../Editor";


function CreatePage(){
    const [title,setTitle]=useState('');
    const [summary,setSummary]=useState('');
    const [content,setContent]=useState('');
    const [files,setFiles]=useState('');
    const [redirect,setRedirect]=useState(false);

    async function createPost(e){
        e.preventDefault();
        const data= new FormData();
        data.set('title',title);
        data.set('summary',summary);
        data.set('content',content);
        data.set('file',files[0]);
        const response=await axios.post('http://localhost:3000/api/post',data,
            {
                headers:{
                    'Content-Type':'multipart/form-data',
                },
                withCredentials:true
            }
        );
        if(response.status===200){
            setRedirect(true);
        }
    }

    if(redirect){
        return <Navigate to={"/"}/>
    }

    return(
        <form onSubmit={createPost}>
            <input type="title" placeholder={'Title'} value={title} onChange={e=>setTitle(e.target.value)}/>
            <input type="summary" placeholder={'Summary'} value={summary} onChange={e=>setSummary(e.target.value)}/>
            <input type="file"  onChange={e=>setFiles(e.target.files)}/>
            <Editor value={content} onChange={setContent}/>
            <button type="submit" style={{marginTop:'5px'}}>Create Post</button>
        </form>
    );
};

export default CreatePage;