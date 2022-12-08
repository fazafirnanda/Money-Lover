const express = require("express");
const Controller = require("../controllers/controller");
const router = express.Router();

router.get("/", Controller.renderTransactions);
router.get("/date", Controller.renderDate);
router.get("/category", Controller.renderCategory);
router.get("/category/:id");
router.get("/date/:id");

module.exports = router;
