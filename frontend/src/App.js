import React from 'react'
import ShowBlogs from './components/ShowBlogs'
import { Route, Redirect, withRouter, NavLink } from 'react-router-dom'
import { Button } from 'react-bootstrap'
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

class AppBase extends React.Component {
  constructor(props) {
    super(props)

    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      // Already logged in
      this.props.tokenLogin(loggedUserJSON)
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

  processLogin = (username, password) => {
    this.props.dologin(username, password)
    .then( () => {
      window.localStorage.setItem('loggedBlogUser', JSON.stringify(this.props.login))
      const msg = 'User ' + this.props.login.name + ' successfully logged in.'
      this.props.notificationInfo(msg)
    })
    .catch( (exception) => {
      this.props.notificationError('Bad username or password')
    })
  }

  processLogout = () => {
    window.localStorage.removeItem('loggedBlogUser')
    const msg = 'User ' + this.props.login.name + ' logged out.'
    this.props.dologout()
    this.props.notificationInfo(msg)
  }

  render() {
    const header = () => (
      <div>
        <h1>Blog Application</h1>
        {this.props.login.username !== undefined &&
          <div className="menuBackground">
            <div className="menuDiv">
              <NavLink className="menuStyle" exact to='/' activeClassName="selectedMenu">Blogs</NavLink>
            </div>
            <div className="menuDiv">
              <NavLink className="menuStyle" exact to='/users' activeClassName="selectedMenu">Users</NavLink>
           </div>
            <div className="menuDivLogin">
              {this.props.login.name} logged in <Button onClick={this.processLogout} className="loginbutton" bsSize="small" bsStyle="warning">Logout</Button>
            </div>
          </div>
        }
      </div>
    )

    if ((this.props.login.username === undefined) && (this.props.history.location.pathname !== '/login')) {
      // Redirect to login page
      blogService.setToken("")
      return (
        <div>
          <Redirect to="/login" />
         </div>
      );
    }
    if ((this.props.login.username !== undefined) && (this.props.history.location.pathname === '/login')) {
      // Redirect to blogs page, if loggedin and trying to get to /login url
      blogService.setToken(this.props.login.token)
      return (
        <div>
          <Redirect to="/" />
        </div>
      );
    }

    // <Router> is already set in index.js for <App>
    return (
      <div className="container">
        {header()}
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