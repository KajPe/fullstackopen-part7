import React from 'react'
import { Link } from 'react-router-dom'
import userService from '../services/users'
import { Badge, Well, Grid, Row, Col } from 'react-bootstrap'
import { notificationError } from './../reducers/notificationReducer'
import { connect } from 'react-redux'

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
      this.props.notificationError('Failed to retrieve users')
    }
  }

  render() {
    return (
      <div>
        <h3>Users</h3>
        <Grid>
          <Row>
            <Col sm={2} style={{ paddingLeft: '50px' }}>User</Col>
            <Col sm={2} className="text-center">Blogs added</Col>
          </Row>
          {
            this.state.users
              .map(user =>
                <Well key={user.id} bsSize="small" style={{ marginBottom: '5px' }}>
                  <Row>
                    <Col sm={2}><Link to={`/users/${user.id}`}>{user.name}</Link></Col>
                    <Col sm={2} className="text-center"><Badge>{user.blogs.length}</Badge></Col>
                  </Row>                
                </Well>
              )
          }
        </Grid>
      </div>
    )
  }
}

export default connect(
  null,
  { notificationError }
)(ShowUsers)