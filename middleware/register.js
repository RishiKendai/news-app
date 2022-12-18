module.exports = async (req, res, next) => {
  const { userName, email, password } = req.body;
  if (userName === "" || email === "" || password === "") {
    return res.render("register");
  }
  const emailPattern =
    /^([a-zA-Z0-9\.-]+)@([a-zA-Z0-9-]+)\.([a-z]{2,8})(.[a-z]{2,8})?$/;
  if (!emailPattern.test(email)) {
    return res.render("register");
  }
  next();
};
