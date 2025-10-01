const express = require ("express");
const { addToFav, getAllFav, removeFromFav } = require("../controllers/favoriteController");

const { authentication } = require("../middlewares/authentication");
const { authorization } = require("../middlewares/authorization");


const favRoute = express.Router();
favRoute.post("/addToFav", authentication,addToFav);
 
favRoute.get("/getAllFav/:user_id",authentication,getAllFav);
favRoute.delete("/deleteFav",authentication,removeFromFav)







module.exports = favRoute;