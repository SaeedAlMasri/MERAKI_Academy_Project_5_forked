import { AppBar, Box, Button, Menu, MenuItem, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { categoryIdFun } from "../redux/itemSlice";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/authSlice";
import { useEffect, useState } from "react";
import axios from "axios";

const Nav = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [categories, setCategories] = useState([]);
  const [anchorCat, setAnchorCat] = useState(null);
  const [anchorPersonal, setAnchorPersonal] = useState(null);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    axios
      .get("http://localhost:5000/cat/getAllCat")
      .then((result) => setCategories(result.data.result))
      .catch((err) => console.log(err));
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    setAnchorPersonal(null);
    navigate("/login");
  };

  const handleShowAll = () => {
    dispatch(categoryIdFun(null)); 
    navigate("/home");
  };

  return (
    <AppBar position="fixed" sx={{ background: "#f5e6d3", color: "#3b3f72" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Left Menu */}
        <Box sx={{ display: "flex", gap: 2 }}>
          {isLoggedIn && (
            <>
              <Button
                color="inherit"
                onClick={handleShowAll}
                sx={{
                  "&:hover": { bgcolor: "#e6d4ba" },
                  fontWeight: "bold",
                }}
              >
                Home
              </Button>

              <Button
                color="inherit"
                onClick={(e) => setAnchorCat(e.currentTarget)}
                sx={{ fontWeight: "bold", "&:hover": { bgcolor: "#e6d4ba" } }}
              >
                Categories ▾
              </Button>

              <Menu
                anchorEl={anchorCat}
                open={Boolean(anchorCat)}
                onClose={() => setAnchorCat(null)}
                PaperProps={{
                  sx: {
                    backgroundColor: "#fdf7f0",
                    color: "#3b3f72",
                    "& .MuiMenuItem-root": {
                      "&:hover": { bgcolor: "#3b3f72", color: "#fff" },
                    },
                  },
                }}
              >
                <MenuItem
                  onClick={() => {
                    handleShowAll();
                    setAnchorCat(null);
                  }}
                >
                  ALL Items
                </MenuItem>

                {categories.map((cat) => (
                  <MenuItem
                    key={cat.id}
                    onClick={() => {
                      dispatch(categoryIdFun(cat.id));
                      setAnchorCat(null);
                      navigate("/home");
                    }}
                  >
                    {cat.name}
                  </MenuItem>
                ))}
              </Menu>
            </>
          )}

          {!isLoggedIn && (
            <>
              <Button color="inherit" component={Link} to="/" sx={{ "&:hover": { bgcolor: "#e6d4ba" } }}>
                Register
              </Button>
              <Button color="inherit" component={Link} to="/login" sx={{ "&:hover": { bgcolor: "#e6d4ba" } }}>
                Login
              </Button>
            </>
          )}
        </Box>

        {/* Center Title */}
        <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          LoopX
          </Typography>
        </Box>

        {/* Personal Menu */}
        {isLoggedIn && (
          <Box>
            <Button
              color="inherit"
              onClick={(e) => setAnchorPersonal(e.currentTarget)}
              sx={{ fontWeight: "bold", "&:hover": { bgcolor: "#e6d4ba" } }}
            >
              Personal ▾
            </Button>
            <Menu
              anchorEl={anchorPersonal}
              open={Boolean(anchorPersonal)}
              onClose={() => setAnchorPersonal(null)}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              PaperProps={{
                sx: {
                  backgroundColor: "#fdf7f0",
                  color: "#3b3f72",
                  "& .MuiMenuItem-root": {
                    "&:hover": { bgcolor: "#3b3f72", color: "#fff" },
                  },
                },
              }}
            >
              <MenuItem component={Link} to="/createPost" onClick={() => setAnchorPersonal(null)}>
                Create Post
              </MenuItem>
              <MenuItem component={Link} to="/fav" onClick={() => setAnchorPersonal(null)}>
                Favorite
              </MenuItem>
              <MenuItem component={Link} to="/exchange" onClick={() => setAnchorPersonal(null)}>
                Exchange
              </MenuItem>
              <MenuItem component={Link} to="/editProfile" onClick={() => setAnchorPersonal(null)}>
                Edit Profile
              </MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Nav;
