import React from 'react'
import { Well } from 'react-bootstrap'
import { notificationError } from './../reducers/notificationReducer'
import { connect } from 'react-redux'

const getUser = (users, id) => {
  return users.find(a => a.id === id)
}

class ShowUserBase extends React.Component {
  render() {
    if (this.props.user) {
      return (
        <div>
          <h3>User: {this.props.user.name}</h3>
          <div style={{ paddingLeft: '20px', paddingTop: '10px' }}>Added blogs</div>
          <ul>
            {
              this.props.user.blogs
                .map(blog =>
                  <Well key={blog._id} bsSize="small" style={{ marginBottom: '5px' }}>
                    {blog.title} by {blog.author}
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