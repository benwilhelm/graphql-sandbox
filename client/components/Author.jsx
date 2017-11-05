import React from 'react'
import ReactMarkdown from 'react-markdown'
import PostList from './PostList.jsx'

export default (props) => {
  // console.log("AUTHOR")
  const { author } = props
  const bioText = author.bio || ''
  const posts = author.posts || []

  return (
    <div className='author'>
      <h2>{author.name}</h2>
      <ReactMarkdown source={bioText} />
      <PostList posts={posts} preview={true} />
    </div>
  )
}
