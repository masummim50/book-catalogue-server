const express = require("express");
const { checkAuth } = require("../../middlewares/authCheck");
const UserController = require("./user.controller");

const UserRoutes = express.Router();

UserRoutes.get("/wishlistAndReadingList", checkAuth, UserController.getLists)

module.exports = UserRoutes;
