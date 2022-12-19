module.exports = async (req, res, next) => {
  const { title, description, url, urlToImage, publishedAt } = req.body;

  if (
    title === "" ||
    description === "" ||
    url === "" ||
    urlToImage === "" ||
    publishedAt === ""
  )
    return res.json({ status: "false", res: "Field is Empty.." }); // Validate Fields
  next();
};
