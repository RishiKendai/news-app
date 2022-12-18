module.exports = async (req, res, next) => {
  const { email, password } = req.body;
  if (email === "" || password === "") {
    return res.redirect("/login");
  }
  const emailPattern =
    /^([a-zA-Z0-9\.-]+)@([a-zA-Z0-9-]+)\.([a-z]{2,8})(.[a-z]{2,8})?$/;
  if (!emailPattern.test(email)) {
    return res.redirect("/login");
  }
  next();
};
