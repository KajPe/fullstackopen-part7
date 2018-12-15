import React from 'react'
import { Link } from 'react-router-dom'
import { Well, Button, Glyphicon, Row, Col } from 'react-bootstrap'
import PropTypes from 'prop-types'

const Blog = ({ blog, onRemove }) => (
  <Well bsSize="small" className="marginBottom5px wellhighlight">
    <Row>
      <Col md={10}>
        <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
      </Col>
      <Col md={2}>
        <Button className="pull-right" onClick={(event) => onRemove(event,blog)}>Remove <Glyphicon glyph="remove-sign" /></Button>
      </Col>
    </Row>
  </Well>
)

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  onRemove: PropTypes.func.isRequired
}

export default Blog