import React from 'react'
import { Modal, Grid, Form, Button, FormGroup, Row, Col, FormControl, ControlLabel, Panel } from 'react-bootstrap'
import PropTypes from 'prop-types'

class LoginForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      password: '',
      show: false
    }
  }

  modalShow = () => {
    this.setState({ show: true })
  }

  modalHide = () => {
    this.setState({ show: false })
  }

  handleFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  onSubmit = (event) => {
    event.preventDefault()
    this.props.handleSubmit(this.state.username, this.state.password, this.modalShow)
  }

  render() {
    return (
      <div>
        <Modal show={this.state.show} onHide={this.modalHide}>
          <Modal.Header className="center loginfailed">
            Login Failed
          </Modal.Header>
          <Modal.Body className="center">
            <h4>Bad username or password</h4>
            <Button bsStyle="primary" className="loginfailedbutton" onClick={this.modalHide}>Ok</Button>
          </Modal.Body>
        </Modal>

        <Grid className="logingrid">
          <Row>
            <Col smOffset={3} sm={6}>
              <Panel bsStyle="primary">
                <Panel.Heading>
                  <Panel.Title componentClass="h1">Login to application</Panel.Title>
                </Panel.Heading>
                <Panel.Body>
                  <Form horizontal className="loginform" onSubmit={(event) => this.onSubmit(event)}>
                    <FormGroup>
                      <Col componentClass={ControlLabel} sm={3}>
                        Username :
                      </Col>
                      <Col sm={8}>
                        <FormControl
                          type="text"
                          name="username"
                          value={this.state.username}
                          onChange={this.handleFieldChange}
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup>
                      <Col componentClass={ControlLabel} sm={3}>
                        Password :
                      </Col>
                      <Col sm={8}>
                        <FormControl
                          type="password"
                          name="password"
                          autoComplete="on"
                          value={this.state.password}
                          onChange={this.handleFieldChange}
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup>
                      <Col smOffset={4} sm={4}>
                        <Button type="submit" bsStyle="success" block>Login</Button>
                      </Col>
                    </FormGroup>
                  </Form>
                </Panel.Body>
              </Panel>
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired
}

export default LoginForm