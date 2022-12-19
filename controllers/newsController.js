const News = require("../models/newsAdd");

// ! Add
module.exports.add = async (req, res) => {
  try {
    const { title, description, url, urlToImage, publishedAt } = req.body;
    News.create(
      {
        title,
        description,
        url,
        urlToImage,
        publishedAt,
      },
      function (err, data) {
        if (err) return res.json({ status: false, res: "Couldnot add News" });
        return res.json({ status: true, res: "Added Successfully" });
      }
    );
  } catch (err) {
    console.log(err);
  }
};

// ! Fetch
module.exports.fetch = async (req, res) => {
  News.find({}, "_id title description publishedAt", function (err, data) {
    if (err) return res.json({ status: false, res: "unable to fetch news" });
    return res.json({ status: true, res: data });
  });
};

// ! Update
module.exports.update = async (req, res) => {
  const { id, title, description, publishedAt } = req.body;
  News.findByIdAndUpdate(
    id,
    {
      $set: {
        title: title,
        description: description,
        publishedAt: publishedAt,
      },
    },
    function (err, date) {
      if (err) return res.json({ status: false, res: "unable to update" });
      return res.json({ status: true, res: "updated Successfully" });
    }
  );
};
