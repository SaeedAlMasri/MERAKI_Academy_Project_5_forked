import React from 'react'
import "./App.css";
import Register from './components/Register';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';


const App = () => {
  return (
   <div className="App">
 



     <Routes>
      <Route path='/' element = {<Register/>}/>
      <Route path='/login' element = {<Login/>}/>

     </Routes>
    </div>
  )
}

export default App
