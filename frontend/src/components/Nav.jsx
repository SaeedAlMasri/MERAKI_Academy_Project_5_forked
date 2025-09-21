import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material"
import { Link } from "react-router-dom";





const Nav = ()=>{



return(
    <AppBar position="fixed" sx={{ background: "#F5B474", color: "#4B2E1E" }}>
 <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
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
             
              sx={{ fontWeight: "bold" }}
            >
              Categories ▾
            </Button>

 <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
          <Typography variant="h6">saeed</Typography>
        </Box>
        
            <Button
              color="inherit"
              sx={{ fontWeight: "bold" }}
            >
             Edit Profile
            </Button>
            <Button
              color="inherit"
              sx={{ fontWeight: "bold" }}
            >
              Logout
            </Button>
            
</Toolbar>

</AppBar>
)
}

export default Nav