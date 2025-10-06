import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import {
  Box,
  Container,
  TextField,
  MenuItem,
  Button,
  Typography,
  Snackbar,
  Alert,
  FormControl,
  InputLabel,
  Select,
  CircularProgress,
} from "@mui/material";

const EditProfile = () => {
  const userId = useSelector((state) => state.auth.userId);
  const token = useSelector((state) => state.auth.token);

  const [userName, setUserName] = useState("");
  const [age, setAge] = useState("");
  const [Governorate, setGovernorate] = useState("");
  const [District, setDistrict] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const districtsByGovernorate = {
    Amman: ["Al-Weibdeh", "Abdoun", "Shmeisani"],
    Irbid: ["Bani Obeid", "Irbid Center", "Al-Ramtha"],
    Zarqa: ["Al-Zarqa Center", "Russeifa"],
    Aqaba: ["Al-Aqaba City", "Al-Taybeh"],
  };

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`http://localhost:5000/users/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const user = res.data.result[0];
        setUserName(user.username || "");
        setAge(user.age || "");
        setGovernorate(user.governorate || "");
        setDistrict(user.district || "");
        setEmail(user.email || "");
      } catch (err) {
        console.log(err.message);
        showSnackbar("Failed to load profile data", "error");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [userId, token]);

  const showSnackbar = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleGovernorateChange = (e) => {
    setGovernorate(e.target.value);
    setDistrict("");
  };

  const handleSubmit = async () => {
    try {
      await axios.put(
        `http://localhost:5000/users/updateById/${userId}`,
        { userName, age, Governorate, District, email, password },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      showSnackbar("Profile updated successfully!", "success");
    } catch (err) {
      console.log(err.message);
      showSnackbar("Failed to update profile", "error");
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(to bottom right, #d6ccc2, #4b3f72)",
        }}
      >
        <CircularProgress size={80} thickness={5} sx={{ color: "#1a237e" }} />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        py: 10,
        background: "linear-gradient(to bottom right, #d6ccc2, #4b3f72)",
        display: "flex",
        justifyContent: "center",
      }}
    >

      <Box
        sx={{
          bgcolor: "#fff",
          p: 4,
          borderRadius: 3,
          boxShadow: 5,
          width: { xs: "90%", sm: "600px" },
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          textAlign="center"
          sx={{ fontWeight: "bold", color: "#1a237e", mb: 4 }}
        >
          Edit Profile
        </Typography>

        <TextField
          label="Username"
          fullWidth
          sx={{ mb: 2 }}
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <TextField
          label="Age"
          type="number"
          fullWidth
          sx={{ mb: 2 }}
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Governorate</InputLabel>
          <Select value={Governorate} onChange={handleGovernorateChange} label="Governorate">
            {Object.keys(districtsByGovernorate).map((gov) => (
              <MenuItem key={gov} value={gov}>
                {gov}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>District</InputLabel>
          <Select
            value={District}
            onChange={(e) => setDistrict(e.target.value)}
            label="District"
            disabled={!Governorate}
          >
            {(districtsByGovernorate[Governorate] || []).map((dist) => (
              <MenuItem key={dist} value={dist}>
                {dist}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="Email"
          fullWidth
          sx={{ mb: 2 }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          sx={{ mb: 2 }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          variant="contained"
          fullWidth
          sx={{
            bgcolor: "#1a237e",
            "&:hover": { bgcolor: "#3949ab" },
            color: "#fff",
            fontWeight: "bold",
          }}
          onClick={handleSubmit}
        >
          Save Changes
        </Button>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: "100%" }}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
};

export default EditProfile;
