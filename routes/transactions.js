const express = require("express");
const Controller = require("../controllers/controller");
const router = express.Router();
const middleware = require("../middleware");

//router.get("/", Controller.renderTransactions);
router.get("/date", middleware.checkLogin, Controller.renderDate);
router.get("/category", middleware.checkLogin, Controller.renderCategory);

module.exports = router;
