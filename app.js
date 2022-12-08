const express = require("express");
const session = require('express-session')
const routers = require("./routes");
const app = express();
const port = 3300;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use( session({
  secret: 'secret by yorima_',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))
app.use("/", routers);

app.listen(port, () => console.log(`Example app listening on port ${port}`));
