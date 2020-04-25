const express = require("express");
const Post = require("../../models/Post");
const router = express.Router();

// Get Posts
router.get("/", async (req, res, next) => {
  const posts = await Post.find().sort({ createdAt: "desc" });
  res.send(posts);
  next();
});

// Delete Post
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const deletedPost = await Post.findOneAndDelete({ _id: id });

  res.send(deletedPost);
});

// Create post
router.post("/", async (req, res) => {
  const { title, message } = req.body;
  const post = await new Post({
    title,
    message,
  }).save();
  res.status(201).send(post);
});

module.exports = router;
