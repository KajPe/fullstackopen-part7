import React from 'react'
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
          <h2>{this.state.user.name}</h2>
          Added blogs
          <ul>
            {
              this.state.user.blogs
                .map(blog =>
                  <li key={blog._id}>{blog.title} by {blog.author}</li>
                )
            }
          </ul>
        </div>
      )
    } else {
      return (
        <div>
          User not found ..
        </div>
      )
    }
  }
}

export default ShowUser