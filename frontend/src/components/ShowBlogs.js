import React from 'react'
import { connect } from 'react-redux'
import Blog from './Blog'
import { deleteBlog } from './../reducers/blogReducer'
import { notificationError, notificationInfo } from './../reducers/notificationReducer'
import { usersInitialization } from './../reducers/usersReducer'
import NewBlog from './NewBlog'
import { Button, Modal } from 'react-bootstrap'
import PropTypes from 'prop-types'

class ShowBlogsBase extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      togglable: false,
      show: false,
      blog: ''
    }
  }

  toggleVisibility = () => {
    this.setState({ togglable: !this.state.togglable })
  }

  confirm = (event, blog) => {
    event.preventDefault()
    this.setState({
      blog: blog
    })
    this.modalShow()
  }

  modalShow = () => {
    this.setState({ show: true })
  }

  modalHide = () => {
    this.setState({ show: false })
  }

  deleteBlog = () => {
    this.props.deleteBlog(this.state.blog)
      .then( () => {
        this.modalHide()
        const msg = 'The blog "' + this.state.blog.title + '" was removed.'
        this.props.notificationInfo(msg)

        // Because we deleted a blog, the user count has changed. Reload users.
        this.props.usersInitialization()
      })
      .catch( (exception) => {
        this.modalHide()
        if (exception.response.data.error) {
          this.props.notificationError(exception.response.data.error)
        } else {
          this.props.notificationError('Unable to remove blog')
        }
      })
  }

  render() {
    return (
      <div>
        <Modal show={this.state.show} onHide={this.modalHide}>
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-lg">Remove Blog</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Delete {this.state.blog.title} by {this.state.blog.author} ?
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.deleteBlog} bsStyle="primary">Remove</Button>
            <Button onClick={this.modalHide}>Cancel</Button>
          </Modal.Footer>
        </Modal>

        <h3><i>Blogs</i></h3>
        <NewBlog buttonLabel="New Blog" />
        <br></br>
        {this.props.blogs
          .sort(function(a,b) {
            return b.likes - a.likes
          })
          .map(blog =>
            <Blog
              key={blog.id}
              blog={blog}
              onRemove={this.confirm}
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

ShowBlogsBase.propTypes = {
  deleteBlog: PropTypes.func.isRequired,
  notificationInfo: PropTypes.func.isRequired,
  usersInitialization: PropTypes.func.isRequired,
  notificationError: PropTypes.func.isRequired,
  blogs: PropTypes.oneOfType([ PropTypes.array.isRequired, PropTypes.object.isRequired ])
}

const ShowBlogs = connect(
  mapStateToProps,
  { deleteBlog, notificationError, notificationInfo, usersInitialization }
)(ShowBlogsBase)

export default ShowBlogs