import React from 'react'
import Post from '../components/Post.jsx'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const postQuery = gql`
  query Post($postId: Int!) {
    post(id: $postId) {
      id
      title
      body
      author {
        id
        name
      }
      comments {
        id
        body
        author {
          id
          name
        }
      }
    }
  }
`

const PostContainer = (props) => {
  const post = (props.data && props.data.post) ? props.data.post : {}
  return <Post post={post} />
}

export default graphql(postQuery, {
  options: ({match}) => ({ variables: { postId: +match.params.id} })
})(PostContainer)
