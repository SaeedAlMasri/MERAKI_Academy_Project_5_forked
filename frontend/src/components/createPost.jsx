import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Snackbar,
  Alert,
} from "@mui/material";

const CreatePost = () => {
  const token = useSelector((state) => state.auth.token);
  const userId = useSelector((state) => state.auth.userId);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [status, setStatus] = useState("available");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:5000/cat/getAllCat");
      setCategories(res.data.result);
    } catch (err) {
      console.log(err.message);
      showSnackbar("Failed to fetch categories", "error");
    }
  };

  const showSnackbar = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!name || !description || !price || !selectedCategory || !imageFile) {
      return showSnackbar("Please fill all fields and select an image", "warning");
    }

    try {
      const formData = new FormData();
      formData.append("file", imageFile);
      formData.append("upload_preset", "saeedPresent");

      const cloudRes = await axios.post(
        "https://api.cloudinary.com/v1_1/dwalzlry8/image/upload",
        formData
      );

      const imageUrl = cloudRes.data.secure_url;

      await axios.post(
        "http://localhost:5000/item/createItem",
        {
          name,
          description,
          price,
          status,
          category_id: selectedCategory,
          user_id: userId,
          image_url: imageUrl,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      showSnackbar("Post created successfully!", "success");
      setName("");
      setDescription("");
      setPrice("");
      setSelectedCategory("");
      setImageFile(null);
      setStatus("available");
    } catch (err) {
      console.log(err.message);
      showSnackbar("Failed to create post", "error");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        py: 10,
        background: "linear-gradient(to bottom right, #d6ccc2, #4b3f72)", // 🎨 نفس خلفية Home
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container
        maxWidth="sm"
        sx={{
          backgroundColor: "rgba(255,255,255,0.9)",
          p: 4,
          borderRadius: 3,
          boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          textAlign="center"
          sx={{ fontWeight: "bold", mb: 3, color: "#1a237e" }}
        >
          Create Post
        </Typography>

        <TextField
          label="Name"
          fullWidth
          sx={{
            mb: 2,
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#4b3f72" },
              "&:hover fieldset": { borderColor: "#1a237e" },
            },
          }}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <TextField
          label="Description"
          fullWidth
          multiline
          rows={4}
          sx={{
            mb: 2,
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#4b3f72" },
              "&:hover fieldset": { borderColor: "#1a237e" },
            },
          }}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <TextField
          label="Price"
          type="number"
          fullWidth
          sx={{
            mb: 2,
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#4b3f72" },
              "&:hover fieldset": { borderColor: "#1a237e" },
            },
          }}
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Category</InputLabel>
          <Select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            label="Category"
            sx={{
              "& .MuiOutlinedInput-notchedOutline": { borderColor: "#4b3f72" },
              "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#1a237e" },
            }}
          >
            {categories.map((cat) => (
              <MenuItem key={cat.id} value={cat.id}>
                {cat.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          type="file"
          fullWidth
          sx={{
            mb: 2,
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#4b3f72" },
              "&:hover fieldset": { borderColor: "#1a237e" },
            },
          }}
          onChange={handleImageChange}
        />

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            label="Status"
            sx={{
              "& .MuiOutlinedInput-notchedOutline": { borderColor: "#4b3f72" },
              "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#1a237e" },
            }}
          >
            <MenuItem value="available">Available</MenuItem>
            <MenuItem value="sold">Sold</MenuItem>
          </Select>
        </FormControl>

        <Button
          variant="contained"
          fullWidth
          onClick={handleSubmit}
          sx={{
            backgroundColor: "#1a237e",
            "&:hover": { backgroundColor: "#3949ab", transform: "scale(1.05)" },
            fontWeight: "bold",
            color: "#fff",
            mt: 1,
            transition: "0.2s",
          }}
        >
          Create Post
        </Button>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbar.severity}
            sx={{ width: "100%" }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default CreatePost;
