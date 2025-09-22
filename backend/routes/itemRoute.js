const express = require("express");
const { createItem, getAllItem, getItemById, updateItemById, deleteItemByIdSoft, getItemByCatId } = require("../controllers/itemController");
const { authentication } = require("../middlewares/authentication");
const { authorization } = require("../middlewares/authorization");


const itemRoute = express.Router();
itemRoute.post("/createItem",authentication,authorization("create_item"),createItem);
itemRoute.get("/getAllItem",getAllItem);
itemRoute.get("/getItem/:id",getItemById);
itemRoute.put("/updateItem/:id",authentication,authorization("update_item"),updateItemById);
itemRoute.delete("/deleteItem/:id",authentication,authorization("delete_item"),deleteItemByIdSoft)
itemRoute.get("getItemByCat_Id/:category_id",authentication,getItemByCatId)
module.exports = itemRoute    