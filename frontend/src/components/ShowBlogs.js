import React from 'react'
import NewBlogForm from './NewBlogForm'
import { connect } from 'react-redux'
import Blog from './Blog'
import { deleteBlog } from './../reducers/blogReducer'
import { notificationError, notificationInfo } from './../reducers/notificationReducer'
import { usersInitialization } from './../reducers/usersReducer'

class ShowBlogsBase extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      togglable: false
    }
  }

  toggleVisibility = (event) => {
    this.setState({ togglable: !this.state.togglable })
  }

  deleteBlog = (event,blog) => {
    event.preventDefault()
    const result = window.confirm('Delete "' + blog.title + '" by ' + blog.author + '?')
    if (result) {
      this.props.deleteBlog(blog)
      .then( () => {
        const msg = 'The blog "' + blog.title + '" was removed.'
        this.props.notificationInfo(msg)

        // Because we deleted a blog, the user count has changed. Reload users.
        this.props.usersInitialization()
      })
      .catch( (exception) => {
        if (exception.response.data.error) {
          this.props.notificationError(exception.response.data.error)
        } else {
          this.props.notificationError('Unable to remove blog')
        }
      })
    }
  }

  render() {
    return (
      <div>
        <h3>Blogs</h3>
        <NewBlogForm 
          togglable={this.state.togglable}
          toggleVisibility={this.toggleVisibility}
          buttonLabel="New Blog"
        />
        <br></br>
        {this.props.blogs
          .sort(function(a,b) {
            return b.likes - a.likes
          })
          .map(blog => 
            <Blog
              key={blog.id}
              blog={blog}
              onRemove={this.deleteBlog}
            />
          )
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs
  }
}

const ShowBlogs = connect(
  mapStateToProps,
  { deleteBlog, notificationError, notificationInfo, usersInitialization }
)(ShowBlogsBase)

export default ShowBlogs