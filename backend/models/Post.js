const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema(
  {
    name: {
      type: String,
      // required: true,
    },
    creator: {
      type: String,
      // required: true,
    },
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
      min: 5,
    },
    image: {
      type: String,
    },
    tags: {
      type: Array,
      default: [],
    },
    likes: {
      type: [String],
      default: [],
    },
    comments: {
      type: [Object],
      default: []
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Post", PostSchema);
