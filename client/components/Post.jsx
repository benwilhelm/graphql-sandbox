import React from 'react'
import ReactMarkdown from 'react-markdown'
import { Link } from 'react-router-dom'
import PostComment from './comment.jsx'

export default (props) => {
  const { post } = props
  const body = post.body || ''
  const authorLink = post.author ? `/authors/${post.author.id}` : '';
  return (
    <div className="post">
      <h3>{post.title}</h3>
      {post.author &&
        <p>by <Link to={authorLink}>
          {post.author.name}
          </Link>
        </p>
      }
      <ReactMarkdown source={body} />
      {post.comments && post.comments.map(comment => {
        return <PostComment key={comment.id} comment={comment} />
      })}
    </div>
  )
}
