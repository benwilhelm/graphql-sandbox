const express = require('express')
const bodyParser = require('body-parser')
const { graphqlExpress, graphiqlExpress } = require('graphql-server-express')
const { makeExecutableSchema } = require('graphql-tools')

const db = require('./db')
const User = db.models.user
const Post = db.models.post
const Comment = db.models.comment

const typeDefs = [`
  type Query {
    users: [User]
    user(id: Int!): User
    posts: [Post]
    post(id: Int!): Post
    comment(id: Int!): Comment
  }
`,`
  schema {
    query: Query
  }
`,`
  type User {
    id: ID!
    name: String!
    bio: String!
    posts: [Post]
    postCount: Int
    comments: [Comment]
    commentCount: Int
  }
`,`
  type Post {
    id: ID!
    title: String!
    body: String!
    author: User!
    comments: [Comment]
    commentCount: Int
  }
`,`
  type Comment {
    id: ID!
    body: String!
    post: Post!
    author: User!
  }
`]

const resolvers = {
  Query: {
    users(obj, args, context) {
      return User.findAll()
    },
    user(obj, args, context) {
      return User.findById(args.id)
    },
    posts(obj, args, context) {
      return Post.findAll()
    },
    post(obj, args, context) {
      return Post.findById(args.id)
    },
    comment(obj, args, context) {
      return Comment.findById(args.id)
    }
  },
  User: {
    posts(user, args, context) {
      return Post.findAll({where: {authorId: user.id}})
    },
    postCount(user, args, context) {
      return Post.count({ where: {authorId: user.id}})
    },
    comments(user, args, context) {
      return Comment.findAll({ where: {authorId: user.id}})
    },
    commentCount(user, args, context) {
      return Comment.count({ where: {authorId: user.id}})
    },
  },
  Post: {
    comments(post, args, context) {
      return Comment.findAll({where: {postId: post.id}})
    },
    commentCount(post, args, context) {
      return Comment.count({ where: {postId: post.id}})
    },
    author(post, args, context) {
      return User.findById(post.authorId)
    }
  },
  Comment: {
    post(comment, args, context) {
      return Post.findById(comment.postId)
    },
    author(comment, args, context) {
      return User.findById(comment.authorId)
    }
  }
}


const schema = makeExecutableSchema({typeDefs, resolvers})
const app = express()
app.use('/graphql', bodyParser.json(), graphqlExpress({schema}))
app.use('/graphiql', graphiqlExpress({endpointURL: '/graphql'}))
app.use(express.static('./public'))
app.use('*', (req, res, next) => {
  res.sendFile(__dirname + '/public/index.html')
})
app.listen(4000, () => console.log('Graphiql listening at localhost:4000/graphiql'))
