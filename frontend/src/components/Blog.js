import React from 'react'
import PropTypes from 'prop-types'

class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }
  }

  toggleVisibility = () => {
    this.setState({ visible: !this.state.visible })
  }

  delete = (event) => {
    event.preventDefault()
    const result = window.confirm('Delete "' + this.props.blog.title + '" by ' + this.props.blog.author + '?')
    if (result) {
      this.props.delete(this.props.blog)
    }
  }

  updateLike = (event) => {
    event.preventDefault()
    this.props.like(this.props.blog)
  }

  removeButton = () => {
    if ((!this.props.blog.user) || (this.props.blog.user.username.toString() === this.props.user.username.toString())) {
      return (
        <div>
          <button onClick={this.delete} >Delete</button>
        </div>
      )
    }
  }

  render() {
    const showWhenVisible = { display: this.state.visible ? '' : 'none' }

    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }

    const mouseStyle = {
      cursor: 'pointer'
    }

    const paddingStyle = {
      paddingLeft: 20
    }

    return (
      <div style={blogStyle}>
        <div className="blogTitle" style={mouseStyle} onClick={this.toggleVisibility}>{this.props.blog.title}</div>
        <div className="showBlog" style={{...showWhenVisible,...paddingStyle}}>
          <div><a href={this.props.blog.url}>{this.props.blog.url}</a></div>
          <div>{this.props.blog.likes} likes <button onClick={this.updateLike} >like</button></div>
          <div>Added by: {this.props.blog.author}</div>
          {this.removeButton()}
        </div>
      </div>
    )
  }
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  delete: PropTypes.func.isRequired,
  like: PropTypes.func.isRequired
}

export default Blog