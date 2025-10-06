const express = require("express");

const { Register, LogIn, updateProfileById, deleteAccountById, getUserById } = require("../controllers/usersController");
const { authorization } = require("../middlewares/authorization");
const { authentication } = require("../middlewares/authentication");

const userRoute = express.Router();

userRoute.post("/register",Register)
userRoute.post("/login",LogIn)
userRoute.put("/updateById/:id",authentication,updateProfileById);
userRoute.put("/deleteById",authentication,authorization("delete_own_account"), deleteAccountById)

userRoute.get("/:id", authentication, getUserById);
 


module.exports = userRoute;
