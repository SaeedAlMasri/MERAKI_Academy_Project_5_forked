import { useState } from "react";
import axios from "axios";
import { Alert, Box, Button, FormControl, IconButton, InputAdornment, InputLabel, MenuItem, Select, Snackbar, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [registerData, setRegisterData] = useState({
    userName: "",
    age: "",
    Governorate: "",
    District: "",
    email: "",
    password: "",
    role_id: 2
  });

  const [showPassword, setShowPassword] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("info");

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
      setSeverity("error");
      setOpen(true);
      return;
    }

    axios.post("http://localhost:5000/users/register", registerData)
      .then(() => {
        setMessage("Registration successful!");
        setSeverity("success");
        setOpen(true);
        navigate("/login");
      })
      .catch(() => {
        setMessage("Registration failed!");
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
        alignItems: "flex-start", // يثبت البوكس أسفل الـ Nav
        pt: 14, // padding top لتثبيت البوكس أسفل الـ navbar
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
          label="Name"
          fullWidth
          margin="normal"
          value={registerData.userName}
          onChange={(e) => setRegisterData({ ...registerData, userName: e.target.value })}
          sx={{
            "& .MuiInputBase-root": { color: "#1a237e" }, // النص بالداخل كحلي
            "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": { borderColor: "#1a237e" }, // حد الحقل كحلي
            "& .MuiInputLabel-root": { color: "#1a237e" }, // الليبل كحلي
          }}
        />

        <TextField
          label="Age"
          fullWidth
          margin="normal"
          value={registerData.age}
          onChange={(e) => setRegisterData({ ...registerData, age: e.target.value })}
          sx={{
            "& .MuiInputBase-root": { color: "#1a237e" },
            "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": { borderColor: "#1a237e" },
            "& .MuiInputLabel-root": { color: "#1a237e" },
          }}
        />

        <FormControl fullWidth margin="normal">
          <InputLabel sx={{ color: "#1a237e" }}>Governorate</InputLabel>
          <Select
            value={registerData.Governorate}
            onChange={(e) => setRegisterData({ ...registerData, Governorate: e.target.value })}
            sx={{ color: "#1a237e" }}
          >
            <MenuItem value="">Select Governorate</MenuItem>
            {Object.keys(districtsByGovernorate).map((gov) => (
              <MenuItem key={gov} value={gov}>{gov}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel sx={{ color: "#1a237e" }}>District</InputLabel>
          <Select
            value={registerData.District}
            onChange={(e) => setRegisterData({ ...registerData, District: e.target.value })}
            disabled={!registerData.Governorate}
            sx={{ color: "#1a237e" }}
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
          onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
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
          value={registerData.password}
          onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            )
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
          onClick={regFun}
        >
          Register
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

export default Register;
