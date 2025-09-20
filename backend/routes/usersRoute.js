const express = require("express");

const { Register, LogIn, updateProfileById, deleteAccountById } = require("../controllers/usersController");
const { authorization } = require("../middlewares/authorization");
const { authentication } = require("../middlewares/authentication");

const userRoute = express.Router();

userRoute.post("/register",Register)
userRoute.post("/login",LogIn)
userRoute.put("/updateById/:id",authentication,authorization("update_own_profile"),updateProfileById);
userRoute.put("/deleteById",authentication,authorization("delete_own_account"), deleteAccountById)

 


module.exports = userRoute;
