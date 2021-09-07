const Post = require("../models/Post");
const fs = require("fs");

exports.getPosts = async (req, res) => {
  try {
    const currentPage = req.query.page || 1;
    const perPage = req.query.perPage || 3;

    const totalPosts = await Post.find().countDocuments();
    const post = await Post.find()
      .skip((parseInt(currentPage) - 1) * parseInt(perPage))
      .limit(parseInt(perPage))
      .sort({ createdAt: -1 });

    res.status(200).json({
      post,
      totalPosts,
      currentPage: parseInt(currentPage),
      totalPage: Math.ceil(totalPosts / perPage),
    });
  } catch (err) {
    res.status(500).json(err.message);
  }
};

exports.getPost = async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.id });

    if (!post) {
      return res.status(404).json("post not found");
    }

    return res.status(200).json(post);
  } catch (err) {
    return res.status(500).json("get post  failed");
  }
};

exports.getPostBySearch = async (req, res) => {
  try {
    const title = new RegExp(req.query.title, "i");
    const post = await Post.find({
      $or: [
        {
          title,
        },
        {
          tags: {
            $elemMatch: {
              $in: req.query.tags.split(","),
            },
          },
        },
      ],
    });

    return res.status(200).json({
      post,
    });
  } catch (err) {
    res.status(500).json(err.message);
  }
};

exports.createPost = async (req, res) => {
  try {
    if (!req.userId) {
      return res.status(403).json({ message: "Unauthenticated" });
    }

    const tags = req.body.tags;
    const post = new Post(req.body);

    post.tags = tags.split(",");
    post.image = req.file.filename;

    await post.save();
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

exports.deletePost = async (req, res) => {
  try {
    if (!req.userId) {
      return res.status(403).json({ message: "Unauthenticated" });
    }

    const post = await Post.findOne({ _id: req.params.id });

    if (!post) {
      return res.status(404).json("post not found");
    }

    const path = `public/images/${post.image}`;
    fs.unlink(path, (err) => console.log(err));

    await Post.deleteOne({ _id: post._id });

    res.status(200).json("delete post success");
  } catch (err) {
    res.status(500).json(err.message);
  }
};

exports.editPost = async (req, res) => {
  try {
    if (!req.userId) {
      return res.status(403).json({ message: "Unauthenticated" });
    }

    let post = await Post.findOne({ _id: req.params.id });
    const tags = req.body.tags.split(",");

    if (!post) res.status(404).json("post not found");

    post.title = req.body.title;
    post.body = req.body.body;
    post.creator = req.body.creator;
    post.tags = tags;

    if (req.file) {
      const path = `public/images/${post.image}`;
      fs.unlink(path, (err) => console.log(err));

      post.image = req.file.filename;
    }

    await post.save();

    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "edit post failed",
    });
  }
};

exports.likePost = async (req, res) => {
  try {
    if (!req.userId) {
      return res.status(403).json({ message: "Unauthenticated" });
    }

    const post = await Post.findOne({ _id: req.params.id });

    if (!post.likes.includes(req.userId)) {
      post.likes.push(String(req.userId));
    } else {
      post.likes.pull(String(req.userId));
    }

    await post.save();

    res.status(200).json(post);
  } catch (err) {
    console.log(err);
  }
};

exports.commentPost = async (req, res) => {
  if (!req.userId) {
    return res.status(403).json({ message: "Unauthenticated" });
  }

  const post = await Post.findOne({ _id: req.params.id });

  if (!post) {
    return res.status(404).json("post not found");
  }

  post.comments.push(req.body);

  await post.save();

  return res.status(200).json(post);
};
