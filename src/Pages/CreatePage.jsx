import axios from "axios";
import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import Editor from "../Editor";
import 'react-quill/dist/quill.snow.css';

function CreatePage() {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null); // Change to handle a single file
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState(null);

  async function createPost(e) {
    e.preventDefault();
    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    if (file) {
      data.append('file', file); // Handling a single file upload
    }

    try {
      const response = await axios.post('https://blog-backend-74jb.onrender.com/api/post', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });

      if (response.status === 200) {
        setRedirect(true);
      }
    } catch (error) {
      setError('Error creating post. Please try again later.');
      console.error('Error creating post:', error);
    }
  }

  if (redirect) {
    return <Navigate to="/indexpage" />;
  }

  return (
    <form onSubmit={createPost}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Summary"
        value={summary}
        onChange={e => setSummary(e.target.value)}
        required
      />
      <input
        type="file"
        onChange={e => setFile(e.target.files[0])} // Handle a single file
      />
      <Editor
        value={content}
        onChange={setContent}
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit" style={{ marginTop: '5px' }}>
        Create Post
      </button>
    </form>
  );
}

export default CreatePage;
