import React from 'react'
import Blog from './components/Blog'
import { Route, Redirect, withRouter, NavLink } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import NewBlog from './components/NewBlog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import ShowUsers from './components/ShowUsers'
import ShowUser from './components/ShowUser'
import SimpleBlog from './components/SimpleBlog'

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
      blogs: [],
      error: null,
      info: null,
      username: '',
      password: '',
      user: user,
      title: '',
      author: '',
      url: '',
      togglable: false
    }
  }

  async componentDidMount() {
    try {
      const blogs = await blogService.getAll()
      this.setState({ blogs })
    } catch(exception) {
      this.setState({
        error: 'Failed to retrieve blogs',
      })
    }
  }

  toggleVisibility = (event) => {
    this.setState({ togglable: !this.state.togglable })
  }

  clearNotification = () => {
    this.setState({
      error: null,
      info: null
    })
  }

  handleFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  addBLog = async (event,title,author,url) => {
    event.preventDefault()
    try {
      const blogObj = {
        title: title,
        author: author,
        url: url
      }

      const anewBlog = await blogService.create(blogObj)
      const msg = 'A new blog "' + title + '" by ' + author + ' added.'
      this.setState({
        blogs: this.state.blogs.concat(anewBlog),
        title:'',
        author:'',
        url:'',
        info: msg,
        togglable: false
      })
    } catch(exception) {
      this.setState({
        error: 'Unable to save blog',
      })
    }
  }

  likeBlog = async (blog) => {
    try {
      const blogObj = {
        id: blog.id,
        user: blog.user,
        likes: blog.likes + 1,
        author: blog.author,
        title: blog.title,
        url: blog.url
      }

      const updBlog = await blogService.update(blogObj)
      const msg = 'The blog "' + blog.title + '" was liked.'
      const blogs = this.state.blogs.map(ab => ab.id !== blog.id ? ab : updBlog)
      this.setState({
        blogs: blogs,
        info: msg
      })
    } catch(exception) {
      this.setState({
        error: 'Unable to update blog',
      })
    }
  }

  updateLike = (event, blog) => {
    event.preventDefault()
    this.likeBlog(blog)
  }

  deleteBlog = async (blog) => {
    try {
      await blogService.remove(blog.id)
      const msg = 'The blog "' + blog.title + '" was removed.'
      const blogs = this.state.blogs.filter(ab => ab.id !== blog.id)
      this.setState({
        blogs: blogs,
        info: msg
      })
    } catch(exception) {
      if (exception.response.data.error) {
        this.setState({
          error: exception.response.data.error
        })
      } else {
        this.setState({
          error: 'Unable to remove blog',
        })
      }
    }
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
      this.setState({ username:'', password:'', user:user, info:msg })
      this.props.history.push('/')

    } catch(exception) {
      this.setState({
        error: 'Bad username or password',
      })
    }
  }

  logout = () => {
    window.localStorage.removeItem('loggedBlogUser')
    const msg = 'User ' + this.state.user.name + ' logged out.'
    this.setState({ user: null, info: msg })
    this.props.history.push('/login')
  }

  render() {
    const NewBlogForm = () => (
      // ref didn't work here as any change in state by this.handleFieldChange re-renders the App
      // This would reset Togglable to hidden again.
      <Togglable buttonLabel="New Blog" visible={this.state.togglable} toggleVisibility={this.toggleVisibility}>
        <NewBlog 
          title={this.state.title}
          author={this.state.author}
          url={this.state.url}
          addNewBlog={this.addBLog}
          handleFieldChange={this.handleFieldChange}
          toggleVisibility={this.toggleVisibility}
        />
      </Togglable>
    )

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

    const showUsers = () => (
      <div>
        <ShowUsers />          
      </div>
    )

    const showUser = (id) => (
      <div>
        <ShowUser id={id} />          
      </div>
    )

    const showBlogs = () => (
      <div>
        <h3>Blogs</h3>
        <NewBlogForm />
        <br></br>
        {this.state.blogs
          .sort(function(a,b) {
            return b.likes - a.likes
          })
          .map(blog => 
            <Blog
              key={blog.id}
              blog={blog}
            />
          )
        }
      </div>
    )

    const showBlog = (id) => {
      const blog = this.state.blogs.find(ab => ab.id === id)
      if (blog !== undefined) {
        return (
          <SimpleBlog 
            blog={blog} 
            onClick={(e) => this.updateLike(e, blog)} 
          />
        )
      } else {
        return (
          <div>Blog not found ..</div>
        )
      }
    }
    
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
        <Notification
          message={this.state.error}
          info={this.state.info}
          clearNotification={this.clearNotification}
        />
        <Route exact path='/users' render={() => showUsers() } />
        <Route exact path='/users/:id' render={({match}) => showUser(match.params.id) } />
        <Route exact path='/login' render={() => loginForm() } />
        <Route exact path='/' render={() => showBlogs() } />
        <Route exact path='/blogs/:id' render={({match}) => showBlog(match.params.id) } />
      </div>
    )
  }
}

export default withRouter(App);