const express = require("express");
const { createExchange, getExchangesByUser, updateExchangeStatus } = require("../controllers/exchangeController");
const { authentication } = require("../middlewares/authentication");



const exchangeRoute = express.Router();


exchangeRoute.post("/createExchange",authentication,createExchange);
exchangeRoute.get("/getExchangeById/:id",authentication,getExchangesByUser);
exchangeRoute.put("/updateExchangeById/:id",authentication,updateExchangeStatus);



module.exports = exchangeRoute