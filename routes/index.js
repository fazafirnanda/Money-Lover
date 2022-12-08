const express = require("express");
const Controller = require("../controllers/controller");
const router = express.Router();
const transactions = require("./transactions");

router.get("/", Controller.home);
// router.get("/register",Controller);
// router.post("/register", Controller);
// router.get("/login");
router.use("/transactions", transactions);
router.use("/addPost/:userId", Controller.addPost);
//router.post("/addPost/:id", Controller.postAdd);
// test auuu
module.exports = router;
