import React from 'react'
import { Well } from 'react-bootstrap'
import userService from '../services/users'

class ShowUser extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: null
    }
  }

  async componentDidMount() {
    try {
      const user = await userService.getUser(this.props.id)
      this.setState({ user })
    } catch(exception) {
      console.log('Failed to retrieve user')
    }
  }


  render() {
    if (this.state.user) {
      return (
        <div>
          <h3>User: {this.state.user.name}</h3>
          <div style={{ paddingLeft: '20px', paddingTop: '10px' }}>Added blogs</div>
          <ul>
            {
              this.state.user.blogs
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

export default ShowUser