const express = require("express");
const Controller = require("../controllers/controller");
const router = express.Router();
const dashRoute = require("./dashboard");
const postRoute = require("./posts");

router.get("/", Controller.home );
router.get('/login', Controller.getLogin )
router.post('/login', Controller.postLogin )
router.get('/register', Controller.getRegister )
router.post('/register', Controller.postRegister )
router.use("/dashboard", dashRoute);
router.use("posts", postRoute);


module.exports = router;
