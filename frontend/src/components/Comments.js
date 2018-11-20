import React from 'react'
import { Well } from 'react-bootstrap'

const Comment = ({ comment }) => (
  <Well bsSize="small" style={{ marginBottom: '5px' }}>
    {comment}
  </Well>
)

export default Comment