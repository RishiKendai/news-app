const router = require("express").Router();

const { add, fetch, update } = require("../controllers/newsController");
const newsAddMiddleware = require("../middleware/newsAdd");

router.post("/add", newsAddMiddleware, add);
router.get("/fetch", fetch);
router.post("/update", update);

module.exports = router;
