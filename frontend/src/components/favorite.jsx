import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";

const Favorite = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const userId = useSelector((state) => state.auth.userId);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:5000/fav/getAllFav/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFavorites(res.data.data || []);
    } catch (err) {
      console.log(err);
      showSnackbar("Failed to load favorites", "error");
    } finally {
      setLoading(false);
    }
  };

  const removeFav = async (favoriteId) => {
    try {
      await axios.delete("http://localhost:5000/fav/deleteFav", {
        headers: { Authorization: `Bearer ${token}` },
        data: { user_id: userId, item_id: favoriteId },
      });
      setFavorites((prev) => prev.filter((item) => item.id !== favoriteId));
      showSnackbar("Removed from favorites", "success");
    } catch (err) {
      console.log(err);
      showSnackbar("Failed to remove", "error");
    }
  };

  const showSnackbar = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
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
      }}
    >
      <Typography variant="h4" textAlign="center" gutterBottom sx={{ fontWeight: "bold", color: "#1a237e", mb: 4 }}>
        My Favorites
      </Typography>

      <Box
        sx={{
          display: "grid",
          gap: 3,
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
        }}
      >
        {favorites.length > 0 ? (
          favorites.map((fav) => (
            <Card
              key={fav.item_id}
              sx={{
                borderRadius: 3,
                boxShadow: 5,
                overflow: "hidden",
                transition: "transform 0.2s",
                "&:hover": { transform: "scale(1.03)" },
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              {fav.image_url ? (
                <CardMedia component="img" height="200" image={fav.image_url} alt={fav.name} />
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

              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" sx={{ color: "#1a237e" }}>
                  {fav.name}
                </Typography>
                <Typography variant="subtitle1" fontWeight="bold" sx={{ color: "#4b3f72" }}>
                  {fav.price ? `$${fav.price}` : "No price"}
                </Typography>
              </CardContent>

              <IconButton
                onClick={() => removeFav(fav.id)}
                sx={{ color: "red", mx: "auto", mb: 2 }}
                size="large"
              >
                <FavoriteIcon fontSize="inherit" />
              </IconButton>
            </Card>
          ))
        ) : (
          <Typography textAlign="center" sx={{ color: "#1a237e" }}>
            No favorite items found.
          </Typography>
        )}
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Favorite;
