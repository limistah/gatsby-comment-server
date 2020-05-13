var express = require("express");
var router = express.Router();
var commentModel = require("../models/comments");
var { Comment, validate } = commentModel;
/* GET comment listings. */
router.get("/", function (req, res, next) {
  const { page, limit, website, slug } = req.query;
  return res.status(200).json({ page, limit, website, slug });
});

/* GET comment listings. */
router.post("/", async function (req, res, next) {
  // var comment = req.body;
  // const errors = validate(comment);
  var comment = { content: "ases", website: "asd" };

  comment = new Comment(comment);
  await comment.save();

  return res.status(201).json({ data: comment, statusCode: 201 });
});

module.exports = router;
