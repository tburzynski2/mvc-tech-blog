const router = require("express").Router();
const { Comment, BlogPost, User } = require("../../models");
const withAuth = require("../../utils/auth");

// POST a new comment
router.post("/", withAuth, async (req, res) => {
  console.log("\n\nComment POST route hit.\n\nComment data:\n", req.body);

  try {
    const newComment = await Comment.create({
      content: req.body.comment_text,
      user_id: req.session.user_id,
      blogpost_id: req.body.blog_post_id,
    });
    res.status(201).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
