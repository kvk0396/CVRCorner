import React from 'react'
import './App.css'
import Footer from './Components/Footer'
import Navbar from './Components/Navbar'
import {Route, Routes } from 'react-router-dom';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
function App() {
  

  return ( 
    <>
      <Routes>
      
        {/* <Switch> */}
          <Route exact path="/signup" element={<SignUp/>} />
          <Route exact path="/" element={<Login/>} />
        {/* </Switch> */}
      
    </Routes>
    </>
  )
}

export default App
