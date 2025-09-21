import { useState } from "react"
import axios from "axios"
import { Alert, Box, Button, FormControl, IconButton, InputAdornment, InputLabel, MenuItem, Select, Snackbar, TextField } from "@mui/material";
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
const [open, setOpen] = useState(false);
const [message, setMessage] = useState("");
const [severity,setseverity]= useState("info")
const handleClose = () => setOpen(false);

const handleClickShowPassword = () => setShowPassword(!showPassword);
const districtsByGovernorate = {
    Amman: ["Al-Weibdeh", "Abdoun", "Shmeisani"],
    Irbid: ["Bani Obeid", "Irbid Center", "Al-Ramtha"],
    Zarqa: ["Al-Zarqa Center", "Russeifa"],
    Aqaba: ["Al-Aqaba City", "Al-Taybeh"]
  };
  const regFun = () => {
    const { userName, age, Governorate, District, email, password } = registerData;
  
    if (!userName || !age || !Governorate || !District || !email || !password) {
      setMessage("Please fill in all fields before submitting!");
      setseverity("error")
      setOpen(true);
     
      return;
    }
  
    axios.post("http://localhost:5000/users/register", registerData)
      .then(() => {
        setMessage("Registration successful!");
        setseverity("success")
        setOpen(true);
        
        navigate("/login");

      })
      .catch(() => {
        setMessage("Registration failed!");
        setseverity("error")
        setOpen(true);
      });
  };
    return (
      <Box 
  sx={{
    width: 400,
    margin: "50px auto",
    padding: 3,
    border: "1px solid #ccc",
    borderRadius: 2,
    boxShadow: 3
  }}
>
  <TextField 
    label="Name" 
    fullWidth 
    margin="normal"
    value={registerData.userName}
    onChange={(e)=>setRegisterData({...registerData,userName:e.target.value})}
  />

  <TextField 
    label="Age" 
    fullWidth 
    margin="normal"
    value={registerData.age}
    onChange={(e)=>setRegisterData({...registerData,age:e.target.value})}
  />

  <FormControl fullWidth margin="normal">
    <InputLabel>Governorate</InputLabel>
    <Select
      value={registerData.Governorate}
      onChange={(e)=>{
        setRegisterData({...registerData,Governorate:e.target.value})
        
      }

    }
    >
      <MenuItem value="">Select Governorate</MenuItem>
      {Object.keys(districtsByGovernorate).map((gov) => (
        <MenuItem key={gov} value={gov}>{gov}</MenuItem>
      ))}
    </Select>
  </FormControl>

  <FormControl fullWidth margin="normal">
    <InputLabel>District</InputLabel>
    <Select
      value={registerData.District}
      onChange={(e)=>setRegisterData({...registerData,District:e.target.value})}
      disabled={!registerData.Governorate}
    >
      <MenuItem value="">Select District</MenuItem>
      {registerData.Governorate && districtsByGovernorate[registerData.Governorate]?.map((dist) => (
        <MenuItem key={dist} value={dist}>{dist}</MenuItem>
      ))}
    </Select>
  </FormControl>

  <TextField 
    label="Email" 
    fullWidth 
    margin="normal"
    value={registerData.email}
    onChange={(e)=>setRegisterData({...registerData,email:e.target.value})}
  />

  <TextField
    label="Password"
    type={showPassword ? "text" : "password"}
    fullWidth
    margin="normal"
    value={registerData.password}
    onChange={(e)=>setRegisterData({...registerData, password:e.target.value})}
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

  <Button 
    variant="contained" 
    color="primary" 
    fullWidth 
    sx={{ mt: 2 }}
    onClick={regFun}
  >
    Register
  </Button>
  <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
    <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
      {message}
    </Alert>
  </Snackbar>
</Box>


    )
   
 
}

export default Register