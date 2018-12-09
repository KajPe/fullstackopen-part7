import React from 'react'
import { Row, Col, Button, Form, FormGroup, ControlLabel, FormControl, Modal } from 'react-bootstrap'
import { addBLog } from './../reducers/blogReducer'
import { connect } from 'react-redux'
import { notificationError, notificationInfo } from './../reducers/notificationReducer'
import { usersInitialization } from './../reducers/usersReducer'

class NewBlogBase extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      show: false,
      title: '',
      author: '',
      url: '',
    }
  }

  onNewBlog = (event) => {
    event.preventDefault()
    this.props.addBLog(this.state.title,this.state.author,this.state.url)
    .then( () => {
      this.modalHide()
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

  modalShow = () => {
    this.setState({ show: true })
  }

  modalHide = () => {
    this.setState({ show: false })
  }

  handleFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  render() {
    return (
      <div>
        <Button bsStyle="primary" onClick={this.modalShow}>{this.props.buttonLabel}</Button>
        <Modal show={this.state.show} onHide={this.modalHide} dialogClassName="cumodal">
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-lg">Create New Blog</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col>
                <Form horizontal className="loginform" onSubmit={event => this.onNewBlog(event) }>
                  <FormGroup>
                    <Col componentClass={ControlLabel} sm={2}>
                      Title :
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
                    <Col sm={11}>
                      <Button className="pull-right" type="submit" bsSize="large" bsStyle="primary" style={{ width: '150px' }}>Create</Button>
                    </Col>
                  </FormGroup>
                </Form>
              </Col>
            </Row>
          </Modal.Body>
        </Modal>
      </div>
    )
  }
}

const NewBlog = connect(
  null,
  { addBLog, notificationInfo, notificationError, usersInitialization }
)(NewBlogBase)

export default NewBlog