import React from 'react'
import { Grid, Form, Button, FormGroup, Row, Col, FormControl, ControlLabel, Panel } from 'react-bootstrap'

class LoginForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      password: ''
    }
  }

  handleFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  onSubmit = (event) => {
    event.preventDefault()
    this.props.handleSubmit(this.state.username, this.state.password)
  }

  render() {
    return (
      <Grid>
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
    )
  }
}

export default LoginForm