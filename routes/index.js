const express = require("express");
const Controller = require("../controllers/controller");
const router = express.Router();
const transactions = require("./transactions");

router.get("/", Controller.home );
router.get('/login', Controller.getLogin )
router.post('/login', Controller.postLogin )
router.get('/register', Controller.getRegister )
router.post('/register', Controller.postRegister )
router.use("/transactions", transactions);
router.use("/addPost/:userId", Controller.addPost);

module.exports = router;
