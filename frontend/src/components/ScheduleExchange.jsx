import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Button,
  TextField,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import { useSelector } from "react-redux";

const ScheduleExchange = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);

  const [exchangeDate, setExchangeDate] = useState("");
  const [exchangeTime, setExchangeTime] = useState("");
  const [location, setLocation] = useState("");
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("info");

  const handleClose = () => setOpen(false);

  const handleSubmit = async () => {
    if (!exchangeDate || !exchangeTime || !location) {
      setMessage("Please fill all fields before saving!");
      setSeverity("error");
      setOpen(true);
      return;
    }

    try {
      await axios.put(
        `http://localhost:5000/exchange/schedule/${id}`,
        { exchange_date: exchangeDate, exchange_time: exchangeTime, location },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessage("Exchange scheduled successfully!");
      setSeverity("success");
      setOpen(true);
      setTimeout(() => navigate("/exchange"), 1000);
    } catch (err) {
      console.log(err.message);
      setMessage("Failed to schedule exchange!");
      setSeverity("error");
      setOpen(true);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom right, #d6ccc2, #4b3f72)", // نفس خلفية اللوج إن
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        pt: 14,
      }}
    >
      <Box
        sx={{
          width: 400,
          p: 4,
          borderRadius: 3,
          boxShadow: 5,
          backgroundColor: "#f5f5f5",
        }}
      >
        <Typography
          variant="h5"
          textAlign="center"
          sx={{ mb: 3, color: "#1a237e", fontWeight: "bold" }}
        >
          Schedule Exchange
        </Typography>

        <TextField
          fullWidth
          type="date"
          label="Exchange Date"
          value={exchangeDate}
          onChange={(e) => setExchangeDate(e.target.value)}
          sx={{
            mb: 2,
            "& .MuiInputBase-root": { color: "#1a237e" },
            "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
              borderColor: "#1a237e",
            },
            "& .MuiInputLabel-root": { color: "#1a237e" },
          }}
        />

        <TextField
          fullWidth
          type="time"
          label="Exchange Time"
          value={exchangeTime}
          onChange={(e) => setExchangeTime(e.target.value)}
          sx={{
            mb: 2,
            "& .MuiInputBase-root": { color: "#1a237e" },
            "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
              borderColor: "#1a237e",
            },
            "& .MuiInputLabel-root": { color: "#1a237e" },
          }}
        />

        <TextField
          fullWidth
          label="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          sx={{
            mb: 3,
            "& .MuiInputBase-root": { color: "#1a237e" },
            "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
              borderColor: "#1a237e",
            },
            "& .MuiInputLabel-root": { color: "#1a237e" },
          }}
        />

        <Button
          variant="contained"
          fullWidth
          sx={{
            backgroundColor: "#1a237e",
            "&:hover": { backgroundColor: "#3949ab" },
          }}
          onClick={handleSubmit}
        >
          Save Schedule
        </Button>

        <Snackbar
          open={open}
          autoHideDuration={3000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={handleClose}
            severity={severity}
            sx={{ width: "100%" }}
          >
            {message}
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
};

export default ScheduleExchange;
