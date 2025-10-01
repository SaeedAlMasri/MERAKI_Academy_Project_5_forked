import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {
  Box,
  Container,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  Select,
  Snackbar,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [dataFavourite, setDataFav] = useState([]);
  const [myItems, setMyItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedOffered, setSelectedOffered] = useState("");
  const [selectedRequested, setSelectedRequested] = useState(null);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const category_id = useSelector((state) => state.items.categoryId);
  const userId = useSelector((state) => state.auth.userId);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    fetchItems();
    fetchFav();
    fetchMyItems();
  }, [category_id]);

  const fetchItems = async () => {
    try {
      const url = category_id
        ? `http://localhost:5000/item/getItemByCat_Id/${category_id}`
        : "http://localhost:5000/item/getAllItem";

      const res = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setItems(res.data.result);
    } catch (err) {
      console.log(err.message);
    }
  };

  const fetchFav = () => {
    axios
      .get(`http://localhost:5000/fav/getAllFav/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const favIds = res.data.data.map((fav) => fav.id);
        setDataFav(favIds);
      })
      .catch((err) => console.log(err.message));
  };

  const fetchMyItems = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/item/getItemByUser/${userId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMyItems(res.data.result);
    } catch (err) {
      console.log(err.message);
    }
  };

  const addFav = (itemId) => {
    axios
      .post(
        "http://localhost:5000/fav/addToFav",
        { user_id: userId, item_id: itemId },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => {
        setDataFav((prev) => [...prev, itemId]);
      })
      .catch((err) => console.log(err.message));
  };

  const removeFav = (itemId) => {
    axios
      .delete("http://localhost:5000/fav/deleteFav", {
        headers: { Authorization: `Bearer ${token}` },
        data: { user_id: userId, item_id: itemId },
      })
      .then(() => {
        setDataFav((prev) => prev.filter((id) => id !== itemId));
      })
      .catch((err) => console.log(err.message));
  };

  const handleOpen = (item) => {
    setSelectedRequested(item);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedRequested(null);
    setSelectedOffered("");
  };

  const handleSnackbar = (message, severity = "success") => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleExchange = async () => {
    try {
      await axios.post(
        "http://localhost:5000/exchange/createExchange",
        {
          item_offered_id: selectedOffered,
          item_requested_id: selectedRequested.id,
          from_user_id: userId,
          to_user_id: selectedRequested.user_id,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      handleClose();
      handleSnackbar("Exchange request sent!", "success");
      navigate("/exchange");
    } catch (err) {
      console.log(err.message);
      handleSnackbar("Failed to send exchange request.", "error");
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", py: 10 }}>
      <Container>
        <Typography
          variant="h4"
          gutterBottom
          textAlign="center"
          sx={{ fontWeight: "bold", mb: 4 }}
        >
          Welcome to Home
        </Typography>

        <Box
          sx={{
            display: "grid",
            gap: 3,
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          }}
        >
          {items.length > 0 ? (
            items.map((item) => (
              <Card key={item.id}>
                {item.image_url ? (
                  <CardMedia
                    component="img"
                    height="200"
                    image={item.image_url}
                    alt={item.name}
                  />
                ) : (
                  <CardMedia
                    component="div"
                    sx={{
                      height: 200,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      bgcolor: "grey.200",
                    }}
                  >
                    <Typography color="text.secondary">No Image</Typography>
                  </CardMedia>
                )}

                <CardContent>
                  <Typography variant="h6">{item.name}</Typography>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {item.price ? `$${item.price}` : "No price"}
                  </Typography>
                </CardContent>

                {item.user_id !== userId && (
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{
                      mt: 1,
                      mb: 1,
                      bgcolor: "#F5B474",
                      "&:hover": { bgcolor: "#8B4513" },
                      color: "#4B2E1E",
                      fontWeight: "bold",
                    }}
                    onClick={() => handleOpen(item)}
                  >
                    Exchange Item
                  </Button>
                )}

                {dataFavourite.includes(Number(item.id)) ? (
                  <FavoriteIcon
                    sx={{ color: "red", cursor: "pointer", mx: "auto", mb: 2 }}
                    onClick={() => removeFav(item.id)}
                  />
                ) : (
                  <FavoriteBorderIcon
                    sx={{ cursor: "pointer", mx: "auto", mb: 2 }}
                    onClick={() => addFav(item.id)}
                  />
                )}
              </Card>
            ))
          ) : (
            <Typography textAlign="center">No products found.</Typography>
          )}
        </Box>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Select one of your items to offer</DialogTitle>
          <DialogContent>
            <Select
              value={selectedOffered}
              onChange={(e) => setSelectedOffered(e.target.value)}
              fullWidth
            >
              {myItems.length > 0 ? (
                myItems.map((myItem) => (
                  <MenuItem key={myItem.id} value={myItem.id}>
                    {myItem.name}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>No items available</MenuItem>
              )}
            </Select>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="error">
              Cancel
            </Button>
            <Button
              onClick={handleExchange}
              variant="contained"
              disabled={!selectedOffered}
            >
              Confirm Exchange
            </Button>
          </DialogActions>
        </Dialog>

        {/* Snackbar */}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={() => setSnackbarOpen(false)}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={() => setSnackbarOpen(false)}
            severity={snackbarSeverity}
            sx={{ width: "100%" }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default Home;
