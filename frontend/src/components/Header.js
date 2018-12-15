import React from 'react'
import { Button, Navbar, Nav, NavItem, Label } from 'react-bootstrap'
import { Link  } from 'react-router-dom'
import PropTypes from 'prop-types'

class Header extends React.Component {
  render() {
    const Links = () => (
      <div>
        <Nav pullRight className="menuLink">
          <NavItem componentClass={Link} href='/' to='/'>
            { (this.props.url.startsWith('/blogs') || this.props.url === '/' ) ?
              <Label className="menuitemAct">Blogs</Label> : <Label className="menuitem">Blogs</Label> }
          </NavItem>
          <NavItem componentClass={Link} href="/users" to="/users">
            {this.props.url.startsWith('/users') ?
              <Label className="menuitemAct">Users</Label> : <Label className="menuitem">Users</Label> }
          </NavItem>
          <NavItem className="marginLeft50px">
            Logged in as {this.props.login.name}
            <Button className="logoutbutton" onClick={this.props.processLogout} bsSize="small" bsStyle="warning">Logout</Button>
          </NavItem>
        </Nav>
      </div>
    )

    return (
      <div className="marginTop10px">
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="/" className="headerapp">Blog Application</a>
            </Navbar.Brand>
          </Navbar.Header>
          { this.props.login.username !== undefined && <Links /> }
        </Navbar>
      </div>
    )
  }
}

Header.propTypes = {
  url: PropTypes.string.isRequired,
  login: PropTypes.oneOfType([ PropTypes.array.isRequired, PropTypes.object.isRequired ]),
  processLogout: PropTypes.func.isRequired
}

export default Header