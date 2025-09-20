import { useState } from "react"
import axios from "axios"

import { Box } from "@mui/system"
import { Button, TextField } from "@mui/material"
import { useDispatch } from "react-redux";
import { logIn } from "../redux/authSlice";
 


const Login = ()=>{
const [loginData,setLoginData]= useState({
    email:"",
    password:""
})
const dispatch = useDispatch();
const logFun = ()=>{
axios.post("http://localhost:5000/users/login",loginData).then((result)=>{
    
    dispatch(logIn(result.data))

    alert("LogIn successful!")

}).catch((err)=>{
    alert("LogIn failed!")

})
 
 

}


    return (
        <Box
        sx={{
            width: 400,
            margin: "50px auto",
            border: "1px solid #ccc",
            borderRadius: 2,
          }}>
            <TextField placeholder="please  enter your email" onChange={(e)=>{
                setLoginData({...loginData,email:e.target.value})
            }}>
             
            </TextField>
            <TextField placeholder="please  enter your passworsd" onChange={(e)=>{
                setLoginData({...loginData,password:e.target.value})
            }}>
             
            </TextField>
            <Button onClick={()=>{
                logFun()
            }}>LogIn</Button>




        </Box>
    )
}

export default Login