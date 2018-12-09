import React from 'react'
import { Well } from 'react-bootstrap'
import { notificationError } from './../reducers/notificationReducer'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const getUser = (users, id) => {
  return users.find(a => a.id === id)
}

class ShowUserBase extends React.Component {
  render() {
    if (this.props.user) {
      return (
        <div>
          <h3><i>User: {this.props.user.name}</i></h3>
          <div className="paddingLeft30px paddingTop10px">
            { this.props.user.blogs.length > 0 ? 'Added blogs' : 'User has no blogs written' }</div>
          <ul>
            {
              this.props.user.blogs
                .map(blog =>
                  <Well key={blog._id} bsSize="small" className="marginBottom5px wellhighlight">
                    <Link to={`/blogs/${blog._id}`}>{blog.title}</Link> by {blog.author}
                  </Well>
                )
            }
          </ul>
        </div>
      )
    }
    // Return null if no user
    return null
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: getUser(state.users, ownProps.id)
  }
}

const ShowUser = connect(
  mapStateToProps,
  { notificationError }
)(ShowUserBase)

export default ShowUser