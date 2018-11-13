import React from 'react'
import { Grid, Form, Button, FormGroup, Row, Col, FormControl, ControlLabel, Panel } from 'react-bootstrap'

const LoginForm = ({ handleSubmit, handleChange, username, password }) => (
  <Grid>
    <Row>
      <Col smOffset={3} sm={6}>
        <Panel bsStyle="primary">
         <Panel.Heading>
            <Panel.Title componentClass="h1">Login to application</Panel.Title>
          </Panel.Heading>
          <Panel.Body>
            <Form horizontal className="loginform" onSubmit={handleSubmit}>
              <FormGroup>
                <Col componentClass={ControlLabel} sm={3}>
                  Username :
                </Col>
                <Col sm={8}>
                  <FormControl
                    type="text"
                    name="username"
                    value={username}
                    onChange={handleChange}
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
                    value={password}
                    onChange={handleChange}
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

export default LoginForm