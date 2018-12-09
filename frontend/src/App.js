import React from 'react'
import ShowBlogs from './components/ShowBlogs'
import { Route, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import ShowUsers from './components/ShowUsers'
import ShowUser from './components/ShowUser'
import ShowBlog from './components/ShowBlog'
import Notification from './components/Notification'
import { notificationInfo, notificationError } from './reducers/notificationReducer'
import { usersInitialization } from './reducers/usersReducer'
import { blogsInitialization } from './reducers/blogReducer'
import { dologin, dologout, tokenLogin } from './reducers/loginReducer'
import Header from './components/Header'

class AppBase extends React.Component {
  constructor(props) {
    super(props)

    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      // Already logged in
      if (this.props.history.location.pathname === '/login') {
        // Redirect to main page
        this.props.history.push('/')
      }
      this.props.tokenLogin(loggedUserJSON)
      .then( () => {
        blogService.setToken(this.props.login.token)
      })
    } else {
      if (this.props.history.location.pathname !== '/login') {
        // Redirect to login page
        this.props.history.push('/login')
      }
    }
  }

  async componentDidMount() {
    this.props.usersInitialization().catch( () => {
      this.props.notificationError('Failed to retrieve users')
    })
    this.props.blogsInitialization().catch( () => {
      this.props.notificationError('Failed to retrieve blogs')
    })
  }

  processLogin = (username, password, loginfailed) => {
    this.props.dologin(username, password)
    .then( () => {
      window.localStorage.setItem('loggedBlogUser', JSON.stringify(this.props.login))
      const msg = 'User ' + this.props.login.name + ' successfully logged in.'
      this.props.notificationInfo(msg)
      blogService.setToken(this.props.login.token)
      this.props.history.push('/')
    })
    .catch( () => {
      loginfailed()
    })
  }

  processLogout = () => {
    const msg = 'User ' + this.props.login.name + ' logged out.'
    this.props.dologout()
    .then( () => {
      window.localStorage.removeItem('loggedBlogUser')
      blogService.setToken("")
      this.props.notificationInfo(msg)
      this.props.history.push('/login')
    })
  }

  render() {
    // <Router> is already set in index.js for <App>
    return (
      <div className="container">
        <Header
          login={this.props.login} 
          url={this.props.history.location.pathname}
          processLogout={this.processLogout}
        />
        <Notification />
        <Route exact path='/users' render={() => <ShowUsers /> } />
        <Route exact path='/users/:id' render={({match}) => <ShowUser id={match.params.id} /> } />
        <Route exact path='/login' render={() => <LoginForm handleSubmit={this.processLogin} /> } />
        <Route exact path='/' render={() => <ShowBlogs /> } />
        <Route exact path='/blogs/:id' render={({match}) => <ShowBlog id={match.params.id} /> } />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    login: state.login
  }
}

const App = connect(
  mapStateToProps,
  { notificationInfo, notificationError, usersInitialization, blogsInitialization, dologin, dologout, tokenLogin }
)(AppBase)

export default withRouter(App)