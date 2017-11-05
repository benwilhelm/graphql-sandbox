import React from 'react'
import Author from '../components/Author.jsx'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const authorQuery = gql`
  query Author($userId: Int!) {
    user(id: $userId) {
      id
      name
      bio
      posts {
        id
        title
        body
        commentCount
      }
    }
  }
`

const AuthorContainer = (props) => {
  const author = props.data && props.data.user ? props.data.user : {}
  return <Author author={author} />
}

export default graphql(authorQuery, {
  options: ({match}) => ({variables: { userId: +match.params.id }})
})(AuthorContainer)
