const express = require("express");
const Controller = require("../controllers/controller");
const router = express.Router();
const transactions = require("./transactions");
const middleware = require("../middleware/index");

router.get("/", middleware.checkLogin, Controller.home);
router.get("/login", Controller.getLogin);
router.post("/login", Controller.postLogin);
router.get("/register", Controller.getRegister);
router.post("/register", Controller.postRegister);
router.use("/transactions", transactions);
router.get("/addPost", middleware.checkLogin, Controller.addPost);
router.post("/addPost", middleware.checkLogin, Controller.postAdd);
router.get("/logout", Controller.logout);
router.get("/delete/:postId", middleware.checkLogin, Controller.deletePost);
router.get("/edit/:postId", middleware.checkLogin, Controller.editPost);
router.post("/edit/:postId", middleware.checkLogin, Controller.postEdit);

module.exports = router;
