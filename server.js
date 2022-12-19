const express = require("express");
// const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const app = express();
require("dotenv").config();

// app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.use(bodyParser.urlencoded({ extended: true }));
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
mongoose.set("strictQuery", false);
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
const newsRoute = require("./routes/newsRoute");

app.use("/api/admin", adminRoute);
app.use("/api/news", newsRoute);

app.get("/", (req, res) => {
  res.render("login");
});

app.get("/login", (req, res) => {
  return res.render("login");
});

app.get("/register", (req, res) => {
  res.render("register");
});
app.get("/home", (req, res) => {
  if (req.session.user) {
    const token = req.session.user;
    const name = req.session.name;
    const email = req.session.email;
    return res.render("home", { token, name, email });
  } else {
    return res.render("login");
  }
});

app.get("/editNews", (req, res) => {
  if (req.session.user) {
    const token = req.session.user;
    const name = req.session.name;
    const email = req.session.email;
    return res.render("editNews", { token, name, email });
  } else {
    return res.render("login");
  }
});
app.get("/logout", (req, res) => {
  req.session.destroy();
  

  return res.json({status:true})
});

app.listen(3000, () => {
  console.log("server running on port 3000");
});
