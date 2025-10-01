import { AppBar, Box, Button, Menu, MenuItem, Toolbar, Typography } from "@mui/material"
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { categoryIdFun } from "../redux/itemSlice";
import { useNavigate } from "react-router-dom";
import {logout } from "../redux/authSlice";
import { useEffect, useState } from "react";
import axios from "axios";

const Nav = ()=>{

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [categories, setCategories] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    axios
      .get("http://localhost:5000/cat/getAllCat")
      .then((result) => {
        setCategories(result.data.result);
        console.log("dacgvfsdh",result.data);
        
      })
      .catch((err) => console.log(err));
  }, []);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

return(
    <AppBar position="fixed" sx={{ background: "#F5B474", color: "#4B2E1E" }}>
   <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
   {isLoggedIn ?(<>
    <Button
              color="inherit"
              component={Link}
              to="/home"
              sx={{ fontWeight: "bold" }}
            >
              Home
            </Button>
            <Button
              color="inherit"
              component={Link}
              to="/fav"
              sx={{ fontWeight: "bold" }}
            >
              Favorite
            </Button>
            <Button
              color="inherit"
              onClick={handleClick}
              sx={{ fontWeight: "bold" }}
            >
              Categories ▾
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
                <MenuItem
                  key={0}
                  onClick={() => {
                    dispatch(categoryIdFun(undefined));
                    handleClose();
                    navigate("/home");
                  }}
                  sx={{ color: "#4B2E1E", fontWeight: "bold" }}
                >
                 ALL Items
                </MenuItem>
              {categories.map((cat) => (
                <MenuItem
                  key={cat.id}
                  onClick={() => {
                    dispatch(categoryIdFun(cat.id));
                    handleClose();
                    navigate("/home");
                  }}
                  sx={{ color: "#4B2E1E", fontWeight: "bold" }}
                >
                  {cat.name}
                </MenuItem>
              ))}
            </Menu>
   </>):(<>
    <Button
              color="inherit"
              component={Link}
              to="/"
              sx={{ fontWeight: "bold" }}
              >
              REgister
            </Button>
   </>)}

 <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
          <Typography variant="h6">saeed</Typography>
        </Box>
        
           {isLoggedIn ?(<>
            <Button
              color="inherit"
              sx={{ fontWeight: "bold" }}
            >
             Edit Profile
            </Button>
            <Button
              color="inherit"
              sx={{ fontWeight: "bold" }}
              onClick={handleLogout}
            >
              Logout
            </Button>
           </>):(<>
            <Button
              color="inherit"
              component={Link}
              to="/login"
              sx={{ fontWeight: "bold" }}
              >
              login
            </Button>
           </>)}
            
</Toolbar>

</AppBar>
)
}

export default Nav