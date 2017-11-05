import React from 'react'
// import data from '../static-data'

export default (props) => {
  const { authors } = props
  return (
    <div className="author-list">
      <h2>Authors</h2>
      {authors.map(user => {
        return <p key={user.id}>{user.name}</p>
      })}
    </div>
  )
}
