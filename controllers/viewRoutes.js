const router = require("express").Router();
const { User, BlogPost, Comment } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    const blogPostData = await BlogPost.findAll({
      include: {
        model: User,
        attributes: ["name"],
      },
      order: [["createdAt", "DESC"]],
    });

    const blogPosts = blogPostData.map((blogPost) =>
      blogPost.get({ plain: true })
    );

    res.render("homepage", {
      blogPosts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(`\n\nError: ${err}\n\n`);
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

router.get("/signup", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("signup");
});

router.get("/dashboard", withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [
        {
          model: BlogPost,
          attributes: ["id", "title", "content"],
        },
      ],
    });

    console.log("\n\nUser data object:\n", userData, "\n\n");

    if (!userData) {
      // Handle case where userData is empty
      return res.status(404).json({ error: "User data not found" });
    }

    const user = userData.get({ plain: true });

    res.render("dashboard", {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/blog/:id", async (req, res) => {
  try {
    const blogPostData = await BlogPost.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["name"],
        },
        {
          model: Comment,
          attributes: ["content", "createdAt"],
          include: {
            model: User,
            attributes: ["name"],
          },
        },
      ],
      attributes: ["title", "content", "createdAt"],
    });

    const blogPost = blogPostData.get({ plain: true });

    res.render("blogpost", {
      ...blogPost,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
