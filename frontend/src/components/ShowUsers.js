import React from 'react'
import { Link } from 'react-router-dom'
import userService from '../services/users'

class ShowUsers extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      users: []
    }
  }

  async componentDidMount() {
    try {
      const users = await userService.getAll()
      this.setState({ users })
    } catch(exception) {
      console.log('Failed to retrieve users')
    }
  }

  render() {
    return (
      <div>
        <h2>Users</h2>
        <table><tbody>
        <tr className="usersheader"><td>User</td><td>Blogs added</td></tr>
        {
          this.state.users
            .map(user =>
              <tr key={user.id}>
                <td><Link to={`/users/${user.id}`}>{user.name}</Link></td><td>{user.blogs.length}</td>
              </tr>
            )
        }
        </tbody></table>
      </div>
    )
  }
}

export default ShowUsers