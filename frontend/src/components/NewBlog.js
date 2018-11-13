import React from 'react'
import PropTypes from 'prop-types'
import { Grid, Row, Col, Panel, Button, Form, FormGroup, ControlLabel, FormControl } from 'react-bootstrap'

class NewBlog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      author: '',
      url: '',
    }
  }

  handleFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  render() {
    return (
      <Grid>
        <Row>
          <Col smOffset={1} sm={10}>
            <Panel bsStyle="primary">
              <Panel.Heading>
                <Panel.Title componentClass="h1">Create new blog</Panel.Title>
              </Panel.Heading>
              <Panel.Body>
                <Form horizontal className="loginform" onSubmit={e => this.props.addNewBlog(e,this.state.title,this.state.author,this.state.url)}>
                  <FormGroup>
                    <Col componentClass={ControlLabel} sm={2}>
                      Author :
                    </Col>
                    <Col sm={9}>
                      <FormControl
                        type="text"
                        name="title"
                        value={this.title}
                        onChange={this.handleFieldChange}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup>
                    <Col componentClass={ControlLabel} sm={2}>
                      Author :
                    </Col>
                    <Col sm={9}>
                      <FormControl
                        type="text"
                        name="author"
                        value={this.author}
                        onChange={this.handleFieldChange}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup>
                    <Col componentClass={ControlLabel} sm={2}>
                      URL :
                    </Col>
                    <Col sm={9}>
                      <FormControl
                        type="text"
                        name="url"
                        value={this.url}
                        onChange={this.handleFieldChange}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup>
                    <Col smOffset={4} sm={4}>
                      <Button type="submit" bsStyle="primary" style={{ width: '200px' }}>Create</Button>
                    </Col>
                    <Col smOffset={2} sm={2}>
                      <Button onClick={this.props.toggleVisibility}>Cancel</Button>
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

NewBlog.propTypes = {
  addNewBlog: PropTypes.func.isRequired
}

export default NewBlog