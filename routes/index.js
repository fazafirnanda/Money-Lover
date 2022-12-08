const express = require("express");
const Controller = require("../controllers/controller");
const router = express.Router();
const dashRoute = require("./dashboard");
const postRoute = require("./posts");

router.get("/", (req, res) => {
  res.send("hello world");
});
// router.get("/register",Controller);
// router.post("/register", Controller);
// router.get("/login");
// router.use("/dashboard", dashRoute);
// router.use("posts", postRoute);

module.exports = router;
