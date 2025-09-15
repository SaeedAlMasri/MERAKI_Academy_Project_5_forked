const express = require("express");
const { createNewRole, createNewPermission, createNewRolePermission } = require("../controllers/roleController");

const roleRoute = express.Router();
roleRoute.post("/addRole",createNewRole);
roleRoute.post("/addPermission",createNewPermission)
roleRoute.post("/role_Permission",createNewRolePermission)

module.exports = roleRoute;
