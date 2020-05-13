const Joi = require("joi");
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const commentSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    slug: String,
    website: { type: String, required: true },
    content: { type: String, required: true },
  },
  {
    timestamps: true,
    usePushEach: true,
  }
);

const Comment = mongoose.model("Comment", commentSchema);

function validateComment(comment) {
  const schema = {
    name: Joi.string(),
    email: Joi.email(),
    slug: Joi.string(),
    website: Joi.string().uri().required(),
    content: Joi.string().required(),
    deletedAt: Joi.number(),
  };

  return Joi.validate(comment, schema);
}

exports.Comment = Comment;
exports.validate = validateComment;
