const User = require("./User");
const BlogPost = require("./BlogPost");
const Comment = require("./Comment");

// A User can have many BlogPosts
User.hasMany(BlogPost, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

// A User can have many Comments
User.hasMany(Comment, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

// Each BlogPost belongs to a User
BlogPost.belongsTo(User, {
  foreignKey: "user_id",
});

// A BlogPost can have many Comments
BlogPost.hasMany(Comment, {
  foreignKey: "blogpost_id",
  onDelete: "CASCADE",
});

// Each Comment belongs to a BlogPost
Comment.belongsTo(BlogPost, {
  foreignKey: "blogpost_id",
});

// Each Comment belongs to a User
Comment.belongsTo(User, {
  foreignKey: "user_id",
});

module.exports = { User, BlogPost, Comment };
