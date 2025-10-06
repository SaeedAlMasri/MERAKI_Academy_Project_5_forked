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
import ScheduleExchange from './components/ScheduleExchange';
import CreatePost from './components/createPost';
import EditProfile from './components/editProfile';



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
      <Route path='/exchange/schedule/:id' element={<ScheduleExchange />} />
      <Route path='/createPost' element={<CreatePost />} />
      <Route path='/editProfile' element={<EditProfile />} />
     </Routes>
    </div>
  )
}

export default App
