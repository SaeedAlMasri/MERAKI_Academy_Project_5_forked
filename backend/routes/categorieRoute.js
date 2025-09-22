const express = require("express");
const { createCat, getAllCat, removeCatById } = require("../controllers/categorieController");
const { authentication } = require("../middlewares/authentication");
const catRouter = express.Router();

catRouter.post("/create",authentication,createCat);
catRouter.get("/getAllCat",authentication,getAllCat);
catRouter.delete("/removeFromCat/:id",authentication,removeCatById);







module.exports = catRouter;