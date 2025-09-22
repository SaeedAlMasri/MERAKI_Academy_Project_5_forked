import { useEffect, useState } from "react";
import axios from "axios"
import { useSelector } from "react-redux";

import {Box, Alert, Button, Snackbar, TextField, InputAdornment, IconButton, Container, Typography, Card } from "@mui/material"
const Home = ()=>{

const [items,setItems] = useState([]);
const category_id = useSelector((state) => state.items.categoryId);
const userId = useSelector((state) => state.auth.userId);
const token = useSelector((state) => state.auth.token);
useEffect(()=>{
   const fetchItem =async ()=>{
      try{
        const url = category_id
        ? `http://localhost:5000/item/getItemByCat_Id/${category_id}`
        : "http://localhost:5000/item/getAllItem";

        const result = await axios.get(url, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setItems(result.data.data)


      }
      catch(err){
        console.log(err.message);
      }
    }
    fetchItem()
},[category_id])

return (
    <Box sx={{
        minHeight: "100vh",
        py: 10,
       // backgroundImage: `url("https://img.freepik.com/free-photo/arrangement-black-friday-shopping-carts-with-copy-space_23-2148667047.jpg")`,
        backgroundRepeat: "no-repeat",  
        backgroundSize: "cover",         
        backgroundPosition: "center",  
        backgroundAttachment: "fixed",  
      }}>
        <Container>
        <Typography
      variant="h4"
      gutterBottom
      textAlign="center"
      sx={{ fontWeight: "bold", mb: 4, color: "#ffffff" }}
    >
      Welcome to Home
    </Typography>

    <Box sx={{
        display: "grid",
        gap: 10,  
        gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", 
        
         
      }}> 


      
      {items.length >0 ?(
        items.map((item)=>
        <Card
        key={item.id}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          p: 1,
          bgcolor: "#fff",
          width: "100%", 
        }}
      
        >
         
  
        </Card>)
      ):(
        <Typography color="text.secondary" textAlign="center">
          No products found.
        </Typography>
      )}

    </Box>









        </Container>

    </Box>
)


}


export default Home; 