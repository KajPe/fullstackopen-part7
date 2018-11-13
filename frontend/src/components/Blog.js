import React from 'react'
import { Link } from 'react-router-dom'
import { Well } from 'react-bootstrap'

export const Blog = ({ blog }) => (
  <Well bsSize="small" style={{ marginBottom: '5px' }}>
    <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
  </Well>
)

export default Blog