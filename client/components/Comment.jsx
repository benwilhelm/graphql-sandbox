import React from 'react'
import ReactMarkdown from 'react-markdown'

export default (props) => {
  const {comment} = props
  return (
    <div className='comment'>
      <hr />
      <p>{comment.author.name} says:</p>
      <ReactMarkdown source={comment.body} />
    </div>
  )
}
