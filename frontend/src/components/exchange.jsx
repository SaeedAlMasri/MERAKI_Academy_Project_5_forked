import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Divider,
  Snackbar,
  Alert,
} from "@mui/material";

const ExchangePage = () => {
  const [sentRequests, setSentRequests] = useState([]);
  const [receivedRequests, setReceivedRequests] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const userId = useSelector((state) => state.auth.userId);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    fetchExchanges();
  }, []);

  const fetchExchanges = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/exchange/getExchangeById/${userId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const allExchanges = res.data.exchanges;

      setSentRequests(allExchanges.filter(e => e.from_user_id === userId));
      setReceivedRequests(allExchanges.filter(e => e.to_user_id === userId));
    } catch (err) {
      console.log(err.message);
      showSnackbar("Failed to fetch exchanges", "error");
    }
  };

  const showSnackbar = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleAccept = async (exchangeId) => {
    try {
      await axios.put(
        `http://localhost:5000/exchange/updateExchangeById/${exchangeId}`,
        { status: "accepted" },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setReceivedRequests(prev =>
        prev.map(req => req.id === exchangeId ? { ...req, status: "accepted" } : req)
      );
      showSnackbar("Request accepted!", "success");
    } catch (err) {
      console.log(err.message);
      showSnackbar("Failed to accept request", "error");
    }
  };

  const handleReject = async (exchangeId) => {
    try {
      await axios.put(
        `http://localhost:5000/exchange/updateExchangeById/${exchangeId}`,
        { status: "rejected" },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setReceivedRequests(prev =>
        prev.map(req => req.id === exchangeId ? { ...req, status: "rejected" } : req)
      );
      showSnackbar("Request rejected!", "info");
    } catch (err) {
      console.log(err.message);
      showSnackbar("Failed to reject request", "error");
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", py: 10 }}>
      <Container>
        <Typography variant="h4" gutterBottom textAlign="center" sx={{ mb: 4 }}>
          Exchange Requests
        </Typography>

      
        <Typography variant="h6" gutterBottom>
          Sent Requests
        </Typography>
        {sentRequests.length > 0 ? (
          sentRequests.map((req) => (
            <Card key={req.id} sx={{ mb: 2 }}>
              <CardContent>
                <Typography>
                  You offered <b>{req.item_offered_id}</b> for <b>{req.item_requested_id}</b> to user {req.to_user_id}
                </Typography>
                <Typography color="text.secondary">
                  Status: {req.status}
                </Typography>
              </CardContent>
            </Card>
          ))
        ) : (
          <Typography>No sent requests</Typography>
        )}

        <Divider sx={{ my: 4 }} />

      
        <Typography variant="h6" gutterBottom>
          Received Requests
        </Typography>
        {receivedRequests.length > 0 ? (
          receivedRequests.map((req) => (
            <Card key={req.id} sx={{ mb: 2 }}>
              <CardContent>
                <Typography>
                  User {req.from_user_id} offered <b>{req.item_offered_id}</b> for <b>{req.item_requested_id}</b>
                </Typography>
                <Typography color="text.secondary">
                  Status: {req.status}
                </Typography>
              </CardContent>

            
              {req.status === "pending" && (
                <Box sx={{ display: "flex", gap: 2, p: 2 }}>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => handleAccept(req.id)}
                  >
                    Accept
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleReject(req.id)}
                  >
                    Reject
                  </Button>
                </Box>
              )}
            </Card>
          ))
        ) : (
          <Typography>No received requests</Typography>
        )}

  
        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default ExchangePage;
