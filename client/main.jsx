import React from 'react'
import AuthorList from './components/AuthorList.jsx'
import HomeContainer from './containers/Home.jsx'
import PostContainer from './containers/Post.jsx'
import AuthorContainer from './containers/Author.jsx'
import {Router} from 'react-router'
import { Switch, Route, Link } from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory'
import { ApolloProvider } from 'react-apollo'
import apolloClient from './apollo-client'
const history = createBrowserHistory()

import data from './static-data'

export default () => {
  return (
    <ApolloProvider client={apolloClient} >
      <Router history={history}>
        <div className='container main'>
          <p>
            <Link to="/">Home</Link>
          </p>
          <Switch>
            <Route exact path='/' component={HomeContainer} />
            <Route path='/posts/:id' component={PostContainer} />
            <Route path='/authors/:id' component={AuthorContainer} />
          </Switch>
        </div>
      </Router>
    </ApolloProvider>
  )
}
