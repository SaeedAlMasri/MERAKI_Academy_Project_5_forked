import React from 'react'
import "./App.css";
import Register from './components/Register';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import Nav from './components/Nav';
import Favorite from './components/favorite';
import Exchange from './components/exchange';
import ExchangePage from './components/exchange';



const App = () => {
  return (
   <div className="App">
 
     <Nav/>

     <Routes>
      <Route path='/' element = {<Register/>}/>
      <Route path='/login' element = {<Login/>}/>
      <Route path='/home' element = {<Home/>}/>
      <Route path='/fav' element = {<Favorite/>}/>
      <Route path='/exchange' element = {<ExchangePage/>}/>
     </Routes>
    </div>
  )
}

export default App
