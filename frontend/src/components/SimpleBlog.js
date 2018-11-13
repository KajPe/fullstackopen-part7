import React from 'react'
import { Button, Row, Col, Panel } from 'react-bootstrap'

const SimpleBlog = ({ blog, onClick }) => (
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
          </Panel.Body>
        </Panel>
      </Col>
    </Row>
  </div>
)


export default SimpleBlog