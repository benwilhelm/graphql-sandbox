import React from 'react'
import { Link } from 'react-router-dom'

export default (props) => {

  const { posts, preview } = props

  return (
    <div className='post-list'>
      {posts.map(post => {
        return <div key={post.id}>
          <hr />
          <Link to={`/posts/${post.id}`}><h4>{post.title}</h4></Link>
          <div>
            {post.author &&
              <p>By {post.author.name}</p>
            }
            <p>{ preview && abbreviate(post.body)}</p>
            <p>{post.commentCount} comments</p>
          </div>
        </div>
      })}
    </div>
  )
}

const abbreviate = (text) => {
  let words = text.split(' ');
  return words.slice(0, 50).join(' ') + "..."
}
