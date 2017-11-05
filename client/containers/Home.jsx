import React from 'react'
import PostList from '../components/PostList.jsx'

import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const postsForHome = gql`
  query PostsForHome {
    posts {
      id
      title
      body
      author {
        id
        name
      }
      commentCount
    }
  }
`

const HomeContainer = (props) => {
  const posts = props.data.posts || []
  return <PostList posts={posts} preview={true} />
}

export default graphql(postsForHome)(HomeContainer);
