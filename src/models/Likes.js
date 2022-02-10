const mongoose = require("mongoose");

const likeSchema = mongoose.Schema({
  article: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Article",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: "Users",
  },
});

const Like = mongoose.model("Like", likeSchema);

module.exports = Like;
