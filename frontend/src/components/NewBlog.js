import React from 'react'
import { Grid, Row, Col, Panel, Button, Form, FormGroup, ControlLabel, FormControl } from 'react-bootstrap'
import { addBLog } from './../reducers/blogReducer'
import { connect } from 'react-redux'
import { notificationError, notificationInfo } from './../reducers/notificationReducer'
import { usersInitialization } from './../reducers/usersReducer'

class NewBlogBase extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      author: '',
      url: '',
    }
  }

  onNewBlog = (event) => {
    event.preventDefault()
    this.props.addBLog(this.state.title,this.state.author,this.state.url)
    .then( () => {
      this.props.toggleVisibility()
      const msg = 'A new blog "' + this.state.title + '" by ' + this.state.author + ' added.'
      this.props.notificationInfo(msg)
      this.setState({
        title:'',
        author:'',
        url:''
      })

        // Because we added a blog, the user count has changed. Reload users.
        this.props.usersInitialization()
    })
    .catch( () => {
      this.props.notificationError('Unable to save blog')
    })
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
                <Form horizontal className="loginform" onSubmit={event => this.onNewBlog(event) }>
                  <FormGroup>
                    <Col componentClass={ControlLabel} sm={2}>
                      Author :
                    </Col>
                    <Col sm={9}>
                      <FormControl
                        type="text"
                        name="title"
                        value={this.state.title}
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
                        value={this.state.author}
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
                        value={this.state.url}
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

const NewBlog = connect(
  null,
  { addBLog, notificationInfo, notificationError, usersInitialization }
)(NewBlogBase)

export default NewBlog