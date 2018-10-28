import React from 'react'
import Blog from './components/Blog'
import NewBlog from './components/NewBlog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      error: null,
      info: null,
      username: '',
      password: '',
      user: null,
      title: '',
      author: '',
      url: ''
    }
  }

  async componentDidMount() {
    try {
      const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
      if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON)
        this.setState({ user })
        blogService.setToken(user.token)
      }            
  
      const blogs = await blogService.getAll()
      this.setState({ blogs })
    } catch(exception) {
      this.setState({
        error: 'Failed to retrieve blogs',
      })
    }
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

  addBLog = async (event) => {
    event.preventDefault()
    try {
      const blogObj = {
        title: this.state.title,
        author: this.state.author,
        url: this.state.url
      }

      const anewBlog = await blogService.create(blogObj)
      const msg = 'A new blog "' + this.state.title + '" by ' + this.state.author + ' added.'
      this.setState({
        blogs: this.state.blogs.concat(anewBlog),
        title:'',
        author:'',
        url:'',
        info: msg
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
  }

  render() {
    const newBlogForm = () => (
      <Togglable buttonLabel="New Blog" ref={component => this.blogForm = component}>
        <NewBlog 
          title={this.state.title}
          author={this.state.author}
          url={this.state.url}
          addNewBlog={this.addBLog}
          handleFieldChange={this.handleFieldChange}
        />
      </Togglable>
    )

    const showBlogs = () => (
      <div>
        <h2>Blogs</h2>
        <p>{this.state.user.name} logged in <button onClick={this.logout}>Logout</button></p>
        {newBlogForm()}
        <br />
        {this.state.blogs
          .sort(function(a,b) {
            return b.likes - a.likes
          })
          .map(blog => 
          <Blog
            key={blog.id}
            blog={blog}
            like={this.likeBlog}
            delete={this.deleteBlog}
            user={this.state.user}
          />
        )}
      </div>
    )
  
    const loginForm = () => {
      return (
        <div>
          <h2>Login to application</h2>
          <LoginForm
            handleSubmit={this.login}
            handleChange={this.handleFieldChange}
            username={this.state.username}
            password={this.state.password}
          />
        </div>
      )
    }

    return (
      <div>
        <Notification
          message={this.state.error}
          info={this.state.info}
          clearNotification={this.clearNotification}
        />

        { this.state.user === null ? loginForm() : showBlogs() }
      </div>
    )
  }
}

export default App;