const Admin = require("../models/adminModel");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports.register = async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    const hasAdminAcc = await Admin.findOne({ email }); // Check for Same user
    if (hasAdminAcc) return res.render("register");

    const hashedPassword = await bcryptjs.hash(password, 10); // hash the password
    let admin = await Admin.create({
      userName,
      email,
      password: hashedPassword,
    });
    const user = { name: email };
    const access_token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
    req.session.user = access_token;
    return res.redirect("/home");
  } catch (err) {
    console.log(err);
  }
};

// ! Login
module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body; // Get Admin Details
    const user = await Admin.findOne({ email }); // Find admin in db

      if (!user) return res.redirect("/login");

      // Decrypt Password and validate the password
    const isdecryptedPassword = await bcryptjs.compare(password, user.password);
    if (!isdecryptedPassword) return res.redirect("/");
    const jwt_user = { name: email };
    const access_token = jwt.sign(jwt_user, process.env.ACCESS_TOKEN_SECRET); // Create jwt

    req.session.user = access_token;
    req.session.name = user.userName
    req.session.email = user.email
    return res.redirect("/home");
  } catch (err) {
    // Error
    console.log(err);
  }
};
