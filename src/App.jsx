import React from 'react'
import './App.css'
import {Routes,Route} from 'react-router-dom'
import Layout from './Layout';
import IndexPage from './Pages/IndexPage';
import Login from './Pages/Login';
import Register from './Pages/Register';
import { Usercontext, UsercontextProvider } from './UserContext';
import CreatePage from './Pages/CreatePage';
import PostPage from './Pages/PostPage';
import EditPage from './Pages/EditPage';

function App() {
  return (
    <UsercontextProvider>

    <Routes>
      <Route path='/' element={<Layout/>}>
        <Route index element={<IndexPage/>}/>
        <Route path={'/login'} element={<Login/>}/>   
        <Route path={'/register'} element={<Register/>}/>
        <Route path={'/create'} element={<CreatePage/>}/>        
        <Route path={'/post/:id'} element={<PostPage/>}/>
        <Route path={'/edit/:id'} element={<EditPage/>}/>
      </Route>
    </Routes>

    </UsercontextProvider>
  );
}

export default App
