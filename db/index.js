const Sequelize = require("sequelize")
const db = new Sequelize('postgres://localhost:5432/graphql-sandbox', {
  logging: false
})

const User = db.define('user', {
  name: Sequelize.STRING,
  bio: Sequelize.TEXT
})

const Post = db.define('post', {
  title: Sequelize.STRING,
  body: Sequelize.TEXT
})

const Comment = db.define('comment', {
  body: Sequelize.TEXT
})

User.hasMany(Post, {
  foreignKey: 'authorId'
})
Post.belongsTo(User, {
  as: 'author',
  foreignKey: 'authorId'
})

Comment.belongsTo(User, {
  as: 'author',
  foreignKey: 'authorId'
})
Comment.belongsTo(Post)

Post.hasMany(Comment)
User.hasMany(Comment, {
  foreignKey: 'authorId'
})

module.exports = db
