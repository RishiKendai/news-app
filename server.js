const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const app = express();
require("dotenv").config();

app.use(express.json({ extended: true }));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(
  session({
    secret: "asdfasdfawefbvav23faSDcS",
    resave: false,
    saveUninitialized: true,
  })
);
app.set("view engine", "ejs");

// Connect Mongodb
const uri = process.env.MONGO_URL;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log(`MongoDB Connected`);
});

// Router
const adminRoute = require("./routes/adminRoute");

app.use("/api/admin", adminRoute);

app.get("/", (req, res) => {
  res.render("login");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/register", (req, res) => {
  res.render("register");
});
app.get("/home", (req, res) => {
  if (req.session.user) {
    const token = req.session.user;
    const name = req.session.name;
    const email = req.session.email;
    res.render("home", { token, name, email });
  } else {
    res.render("login");
  }
});

app.get("/editNews", (req, res) => {
  res.render("editNews");
});
app.get("/logout", (req, res) => {
  req.session.destroy();
});

app.listen(3000, () => {
  console.log("server running on port 3000");
});
