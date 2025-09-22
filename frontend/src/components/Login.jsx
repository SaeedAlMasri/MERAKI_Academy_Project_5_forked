import { useState } from "react"
import axios from "axios"


import {Box, Alert, Button, Snackbar, TextField, InputAdornment, IconButton } from "@mui/material"
import { useDispatch } from "react-redux";
import { logIn } from "../redux/authSlice";
import {useNavigate} from "react-router-dom"
import { Visibility, VisibilityOff } from "@mui/icons-material";


const Login = ()=>{


const navigate = useNavigate()
const [open, setOpen] = useState(false);
const [message, setMessage] = useState("");
const [severity,setseverity]= useState("info");

const [loginData,setLoginData]= useState({
    email:"",
    password:""
})
const dispatch = useDispatch();
const handleClose = () => setOpen(false);

const [showPassword, setShowPassword] = useState(false);
const handleClickShowPassword = () => setShowPassword(!showPassword);
const logFun = ()=>{
    const {email,password}= loginData;
    if(!email || !password){
        setMessage("Please fill in all fields before submitting!");
        setseverity("error")
        setOpen(true);
       
        return;
    
    }
axios.post("http://localhost:5000/users/login",loginData).then((result)=>{
    
    dispatch(logIn(result.data))
    setMessage("Login Successfuly");
    setseverity("success")
    setOpen(true);
    navigate("/home");
   
    

}).catch((err)=>{
    
    setMessage(err.message);
    setseverity("error")
    setOpen(true);

})
 
 

}


    return (
        <Box
        sx={{
            width: 400,
            margin: "50px auto",
            padding: 3,
            border: "1px solid #ccc",
            borderRadius: 2,
            boxShadow: 3
            
          }}>
            <TextField
             label="Email" 
             fullWidth 
             margin="normal" 
             value={loginData.email}
             onChange={(e)=>{
                setLoginData({...loginData,email:e.target.value})
            }}>
             
            </TextField>
            <TextField 
            label="Password" 
            type={showPassword ? "text" : "password"}
            fullWidth 
            margin="normal" 
            value={loginData.password}
             onChange={(e)=>{
                setLoginData({...loginData,password:e.target.value})
                
            }}
             InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleClickShowPassword}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
            >
             
            </TextField>
            <Button 
             variant="contained" 
             color="primary" 
             fullWidth 
             sx={{ mt: 2 }}
            onClick={()=>{
                logFun()
            }}>LogIn</Button>


         <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
           <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
             {message}
           </Alert>
         </Snackbar>

        </Box>
    )
}

export default Login