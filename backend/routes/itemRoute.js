const express = require("express");
const { createItem, getAllItem, getItemById, updateItemById, deleteItemByIdSoft } = require("../controllers/itemController");


const itemRoute = express.Router();
itemRoute.post("/createItem",createItem);
itemRoute.get("/getAllItem",getAllItem);
itemRoute.get("/getItem/:id",getItemById);
itemRoute.put("/updateItem/:id",updateItemById);
itemRoute.delete("/deleteItem/:id",deleteItemByIdSoft)

module.exports = itemRoute