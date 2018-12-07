import React from 'react'
import { connect } from 'react-redux'
import SimpleBlog from './SimpleBlog'
import { addBlogComment, likeBlog } from './../reducers/blogReducer'
import { notificationError, notificationInfo } from './../reducers/notificationReducer'

const getBlog = (blogs, id) => {
  return blogs.find(a => a.id === id)
}

class ShowBlogBase extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      newcomment: ''
    }
  }

  handleFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  updateLike = (event) => {
    event.preventDefault()
    this.props.likeBlog(this.props.blog)
    .then( () => {
      const msg = 'The blog "' + this.props.blog.title + '" was liked.'
      this.props.notificationInfo(msg)
    })
    .catch( () => {
      this.props.notificationError('Unable to update blog')
    })
  }

  addNewComment = async (event) => {
    event.preventDefault()
    this.props.addBlogComment(this.props.blog.id, this.state.newcomment)
    .then( () => {
      this.setState({ newcomment: '' })
      this.props.notificationInfo('Added new comment')
    })
    .catch( () => {
      this.props.notificationError('Failed to save comment')
    })
  }

  render() {
    if (this.props.blog !== undefined) {
      return (
        <SimpleBlog 
          blog={this.props.blog}
          onClick={(event) => this.updateLike(event)}
          onSubmitComment={(event) => this.addNewComment(event)}
          newcomment={this.state.newcomment}
          handleChange={this.handleFieldChange}
        />
      )
    } else {
      return (
        <div>Blog not found ..</div>
      )
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    blog: getBlog(state.blogs, ownProps.id)
  }
}

const ShowBlog = connect(
  mapStateToProps,
  { addBlogComment, likeBlog, notificationInfo, notificationError }
)(ShowBlogBase)

export default ShowBlog