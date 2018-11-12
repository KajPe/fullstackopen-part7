import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

class Blog extends React.Component {

  render() {
    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }

    return (
      <div style={blogStyle}>
        <div className="blogTitle">
          <Link to={`/blogs/${this.props.blog.id}`}>{this.props.blog.title}</Link>
        </div>
      </div>
    )
  }
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired
}

export default Blog