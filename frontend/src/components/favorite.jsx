import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Box, Typography, Card, CardMedia, CardContent, IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";

const Favorite = () => {
  const [favorites, setFavorites] = useState([]);
  const userId = useSelector((state) => state.auth.userId);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/fav/getAllFav/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFavorites(res.data.data); // array of favorite items
    } catch (err) {
      console.log(err);
    }
  };

  const removeFav = async (favoriteId) => {
    try {
      await axios.delete("http://localhost:5000/fav/deleteFav", {
        headers: { Authorization: `Bearer ${token}` },
        data: { user_id: userId, item_id: favoriteId }, 
      });
     
      setFavorites((prev) => prev.filter((item) => item.id !== favoriteId));
    } catch (err) {
      console.log(err);
    }
  };
  
  return (
    <Box sx={{ py: 5, px: 3 }}>
      <Typography variant="h4" textAlign="center" gutterBottom>
        My Favorites
      </Typography>

      <Box sx={{ display: "grid", gap: 3, gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))" }}>
        {favorites.length > 0 ? (
          favorites.map((fav) => (
            <Card key={fav.item_id}>
              <CardMedia
                component="img"
                height="200"
                image={fav.image_url || ""}
                alt={fav.name}
              />
              <CardContent>
                <Typography variant="h6">{fav.name}</Typography>
                <Typography variant="subtitle1" fontWeight="bold">
                  {fav.price ? `$${fav.price}` : "No price"}
                </Typography>
              </CardContent>
              <IconButton onClick={() => removeFav(fav.id)} sx={{ color: "red", mx: "auto", mb: 2 }}>
                <FavoriteIcon />
              </IconButton>
            </Card>
          ))
        ) : (
          <Typography textAlign="center">No favorite items found.</Typography>
        )}
      </Box>
    </Box>
  );
};

export default Favorite;
