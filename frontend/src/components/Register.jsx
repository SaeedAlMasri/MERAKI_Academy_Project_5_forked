import { useState } from "react"
import axios from "axios"
import { Box, Button, FormControl, IconButton, InputAdornment, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {useNavigate} from "react-router-dom"
const Register = ()=>{
  const navigate = useNavigate()
const [registerData,setRegisterData] = useState({
    userName:"",
    age:"",
    Governorate:"",
    District:"",
    email:"",
    password:"",
    role_id:2
})
const [showPassword, setShowPassword] = useState(false);

const handleClickShowPassword = () => setShowPassword(!showPassword);
const districtsByGovernorate = {
    Amman: ["Al-Weibdeh", "Abdoun", "Shmeisani"],
    Irbid: ["Bani Obeid", "Irbid Center", "Al-Ramtha"],
    Zarqa: ["Al-Zarqa Center", "Russeifa"],
    Aqaba: ["Al-Aqaba City", "Al-Taybeh"]
  };
const regFun = ()=>{
    axios.post("http://localhost:5000/users/register",registerData).then((result)=>{
        
        alert("Registration successful!")
        navigate("/login")
    }).catch((err)=>{
        alert("Registration failed!")
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
        <TextField placeholder="Please Enter Your Name" onChange={(e)=>{
            setRegisterData({...registerData,userName:e.target.value})
        }}></TextField>
         <TextField placeholder="Please Enter Your age" onChange={(e)=>{
            setRegisterData({...registerData,age:e.target.value})
        }}></TextField>
        
         <FormControl fullWidth sx={{ mt: 2 }}>
      <InputLabel id="gov-label">Governorate</InputLabel>
      <Select
        labelId="gov-label"
        value={registerData.Governorate}
        onChange={(e)=>{
            setRegisterData({...registerData,Governorate:e.target.value})
        }}
        label="Governorate"
      >
        <MenuItem value="">Select Governorate</MenuItem>
        <MenuItem value="Amman">Amman</MenuItem>
        <MenuItem value="Irbid">Irbid</MenuItem>
        <MenuItem value="Zarqa">Zarqa</MenuItem>
        <MenuItem value="Aqaba">Aqaba</MenuItem>
       
      </Select>
    </FormControl>


    <FormControl fullWidth sx={{ mt: 2 }}>
  <InputLabel id="district-label">District</InputLabel>
  <Select
    labelId="district-label"
    value={registerData.District}
    onChange={(e) => setRegisterData({ ...registerData, District: e.target.value })}
    label="District"
    disabled={!registerData.Governorate} 
  >
    <MenuItem value="">Select District</MenuItem>
    {registerData.Governorate &&
      districtsByGovernorate[registerData.Governorate].map((dist) => (
        <MenuItem key={dist} value={dist}>{dist}</MenuItem>
      ))
    }
  </Select>
</FormControl>
<TextField placeholder="Please Enter Your email" onChange={(e)=>{
            setRegisterData({...registerData,email:e.target.value})
        }}></TextField>
        <TextField
  type={showPassword ? "text" : "password"} 
  label="Password"
  value={registerData.password}
  onChange={(e) => setRegisterData({...registerData, password: e.target.value})}
  fullWidth
  margin="normal"
  InputProps={{
    endAdornment: (
      <InputAdornment position="end">
        <IconButton onClick={handleClickShowPassword}>
          {showPassword ? <VisibilityOff /> : <Visibility />}
        </IconButton>
      </InputAdornment>
    )
  }}
/>
  <Button onClick={()=>{
    regFun();
    
  }}>Register</Button>
        </Box>
    )
   
 
}

export default Register