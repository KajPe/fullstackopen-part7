import React from 'react'
import ShowBlogs from './components/ShowBlogs'
import { Route, Redirect, withRouter, NavLink } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import ShowUsers from './components/ShowUsers'
import ShowUser from './components/ShowUser'
import ShowBlog from './components/ShowBlog'
import Notification from './components/Notification'
import { notificationInfo, notificationError } from './reducers/notificationReducer'
import { usersInitialization } from './reducers/usersReducer'
import { blogsInitialization } from './reducers/blogReducer'

class App extends React.Component {
  constructor(props) {
    super(props)

    // Is user loggedin? Check it in early stage
    let user = null
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
    }

    this.state = {
      username: '',
      password: '',
      user: user
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

  login = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })
      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
      blogService.setToken(user.token)
      const msg = 'User ' + user.name + ' successfully logged in.'
      this.props.notificationInfo(msg)
      this.setState({ username:'', password:'', user:user })
      this.props.history.push('/')
    } catch(exception) {
      this.props.notificationError('Bad username or password')
    }
  }

  logout = () => {
    window.localStorage.removeItem('loggedBlogUser')
    const msg = 'User ' + this.state.user.name + ' logged out.'
    this.props.notificationInfo(msg)
    this.setState({
      user: null 
    })
    this.props.history.push('/login')
  }

  render() {
    const header = () => (
      <div>
        <h1>Blog Application</h1>
        {this.state.user !== null &&
          <div className="menuBackground">
            <div className="menuDiv">
              <NavLink className="menuStyle" exact to='/' activeClassName="selectedMenu">Blogs</NavLink>
            </div>
            <div className="menuDiv">
              <NavLink className="menuStyle" exact to='/users' activeClassName="selectedMenu">Users</NavLink>
           </div>
            <div className="menuDivLogin">
              {this.state.user.name} logged in <Button onClick={this.logout} className="loginbutton" bsSize="small" bsStyle="warning">Logout</Button>
            </div>
          </div>
        }
      </div>
    )

    const loginForm = () => {
      return (
        <div>
          <LoginForm
            handleSubmit={this.login}
            handleChange={this.handleFieldChange}
            username={this.state.username}
            password={this.state.password}
          />
        </div>
      )
    }

    if ((this.state.user == null) && (this.props.history.location.pathname !== '/login')) {
      // Redirect to login page
      return (
        <div>
          <Redirect to="/login" />
        </div>
      );
    }
    if ((this.state.user !== null) && (this.props.history.location.pathname === '/login')) {
      // Redirect to blogs page, if loggedin and trying to get to /login url
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
        <Route exact path='/login' render={() => loginForm() } />
        <Route exact path='/' render={() => <ShowBlogs /> } />
        <Route exact path='/blogs/:id' render={({match}) => <ShowBlog id={match.params.id} /> } />
      </div>
    )
  }
}

export default withRouter(
  connect(
    null,
    { notificationInfo, notificationError, usersInitialization, blogsInitialization }
  )(App)
)