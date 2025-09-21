const express = require ("express");
const { addToFav, getAllFav, removeFromFav } = require("../controllers/favoriteController");

const { authentication } = require("../middlewares/authentication");
const { authorization } = require("../middlewares/authorization");


const favRoute = express.Router();

favRoute.post("/addToFav",authentication,addToFav);
favRoute.get("/getAllFav",authentication,getAllFav);
favRoute.delete("/deleteFav/:id",authentication,removeFromFav)







module.exports = favRoute;