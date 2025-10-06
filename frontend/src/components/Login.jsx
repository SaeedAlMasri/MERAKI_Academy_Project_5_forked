import { useState } from "react";
import axios from "axios";
import {
  Box,
  Alert,
  Button,
  Snackbar,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logIn } from "../redux/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("info");

  const handleClose = () => setOpen(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const logFun = () => {
    const { email, password } = loginData;

    if (!email || !password) {
      setMessage("Please fill in all fields before submitting!");
      setSeverity("error");
      setOpen(true);
      return;
    }

    axios.post("http://localhost:5000/users/login", loginData)
      .then((res) => {
        dispatch(logIn(res.data));
        setMessage("Login Successful!");
        setSeverity("success");
        setOpen(true);
        navigate("/home");
      })
      .catch((err) => {
        setMessage(err.response?.data?.message || "Login Failed!");
        setSeverity("error");
        setOpen(true);
      });
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom right, #d6ccc2, #4b3f72)", // باكجراوند ترابي وكحلي
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start", // ثابت أسفل Navbar
        pt: 14, // padding top لتثبيت البوكس أسفل navbar
      }}
    >
      <Box
        sx={{
          width: 400,
          padding: 4,
          borderRadius: 3,
          boxShadow: 5,
          backgroundColor: "#f5f5f5", // لون فاتح للبوكس
        }}
      >
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          value={loginData.email}
          onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
          sx={{
            "& .MuiInputBase-root": { color: "#1a237e" },
            "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": { borderColor: "#1a237e" },
            "& .MuiInputLabel-root": { color: "#1a237e" },
          }}
        />

        <TextField
          label="Password"
          type={showPassword ? "text" : "password"}
          fullWidth
          margin="normal"
          value={loginData.password}
          onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleClickShowPassword}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiInputBase-root": { color: "#1a237e" },
            "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": { borderColor: "#1a237e" },
            "& .MuiInputLabel-root": { color: "#1a237e" },
          }}
        />

        <Button
          variant="contained"
          fullWidth
          sx={{
            mt: 2,
            backgroundColor: "#1a237e",
            "&:hover": { backgroundColor: "#3949ab" },
          }}
          onClick={logFun}
        >
          Log In
        </Button>

        <Snackbar
          open={open}
          autoHideDuration={3000}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
            {message}
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
};

export default Login;
