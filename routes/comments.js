var express = require("express");
var router = express.Router();
var commentModel = require("../models/comments");
var { Comment, validate } = commentModel;

/* GET comment listings. */
router.get("/", async function (req, res, next) {
  let { page, limit, website, slug } = req.query;

  page = (page && page + 1) || 1;
  limit = limit || 10;

  const query = {};
  if (website) {
    query.website = website;
  }
  if (slug) {
    query.slug = slug;
  }

  const comments = await Comment.find(query)
    .limit(limit)
    .skip(limit * page);

  return res.status(200).json({ data: comments, page, limit, website, slug });
});

/* GET comment listings. */
router.post("/", async function (req, res, next) {
  var comment = req.body;

  const { error } = validate(comment);
  if (error) {
    return res.status(400).json({
      error: { msg: error.details[0].message, statusCode: 400 },
      statusCode: 400,
    });
  }

  comment = new Comment(comment);
  await comment.save();

  return res.status(201).json({ data: comment, statusCode: 201 });
});

module.exports = router;
