var express = require("express");
var router = express.Router();

/* GET comment listings. */
router.get("/", function (req, res, next) {
  const { page, limit, website, slug } = req.query;
  return res.status(200).json({ page, limit, website, slug });
});

module.exports = router;
