import React from 'react'
import { Link } from 'react-router-dom'
import { Badge, Well, Grid, Row, Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import { usersInitialization } from './../reducers/usersReducer'

class ShowUsersBase extends React.Component {
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
            this.props.users
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

const mapStateToProps = (state) => {
  return {
    users: state.users
  }
}

const ShowUsers = connect(
  mapStateToProps,
  { usersInitialization }
)(ShowUsersBase)

export default ShowUsers