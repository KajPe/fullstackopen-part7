import React from 'react'
import { Button, Row, Col, Panel, Form, FormControl } from 'react-bootstrap'
import Comment from './Comments'

const SimpleBlog = ({ blog, onClick, onSubmitComment, newcomment, handleChange }) => (
  <div style={{ paddingTop: '50px' }}>
    <Row>
      <Col smOffset={1} sm={10}>
        <Panel bsStyle="primary">
          <Panel.Heading>
            <Panel.Title componentClass="h1">"{blog.title}" by {blog.author}</Panel.Title>
          </Panel.Heading>
          <Panel.Body>
            <a href={blog.url}>{blog.url}</a>
            <br></br>
            <br></br>
            <div className="likes">
              Blog has {blog.likes} likes
              <Button style={{ marginLeft: '10px', width: '70px' }} bsStyle="primary" bsSize="xsmall" onClick={onClick}>like</Button>
            </div>
            <br></br>
            Added by : {blog.user ? blog.user.name : 'Unknown' }
            <div style={{ marginTop: '30px' }}>
              <b>Comments</b>
              {blog.comments.map(comment =>
                <Comment key={comment._id} comment={comment.comment} />
              )}
              <br></br>
              <Form horizontal className="loginform" onSubmit={onSubmitComment}>
                <FormControl
                  type="text"
                  name="newcomment"
                  value={newcomment}
                  onChange={handleChange}
                />
                <Button type="submit" bsStyle="primary" style={{ width: '200px' }}>Add Comment</Button>
              </Form>                
            </div>
          </Panel.Body>
        </Panel>
      </Col>
    </Row>
  </div>
)

export default SimpleBlog