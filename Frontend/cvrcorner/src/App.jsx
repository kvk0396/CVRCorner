import React from 'react'
import './App.css'
import {Route, Routes } from 'react-router-dom';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import PostDetails from './Pages/PostDetails';
import CreatePost from './Pages/CreatePost';
import EditPost from './Pages/EditPost';
import Profile from './Pages/ProfilePage';
import Home from './Pages/Home';
import { UserContextProvider } from './Context/UserContext';
function App() {
  

  return ( 
    <UserContextProvider>
      
      <Routes>
      <Route exact path="/" element={<Login/>}/>
      <Route exact path="/login" element={<Login/>}/>
      <Route exact path="/home" element={<Home/>}/>
      <Route exact path="/signup" element={<SignUp/>}/>
      <Route exact path="/write" element={<CreatePost/>}/>
      <Route exact path="/posts/post/:id" element={<PostDetails/>}/>
      <Route exact path="/edit/:id" element={<EditPost/>}/>
      {/* <Route exact path="/myblogs/:id" element={<MyBlogs/>}/> */}
      <Route exact path="/profile/:id" element={<Profile/>}/>
      </Routes>
    
    </UserContextProvider>
  )
}

export default App
