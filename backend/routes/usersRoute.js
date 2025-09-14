const express = require("express");
const { Register, LogIn } = require("../controllers/usersController");

const userRoute = express.Router();

userRoute.post("/register",Register)
userRoute.post("/login",LogIn)





module.exports = userRoute;
