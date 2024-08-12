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

// PUT to update a comment
router.put("/:id", withAuth, async (req, res) => {
  try {
    const updatedComment = await Comment.update(
      {
        content: req.body.content,
      },
      {
        where: {
          id: req.params.id,
          user_id: req.session.user_id, // Ensure only the owner can update their comment
        },
      }
    );

    if (!updatedComment) {
      res.status(404).json({ message: "No comment found with this id!" });
      return;
    }

    res.status(200).json(updatedComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE a comment
router.delete("/:id", withAuth, async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id, // Ensure only the owner can delete their comment
      },
    });

    if (!commentData) {
      res.status(404).json({ message: "No comment found with this id!" });
      return;
    }

    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
