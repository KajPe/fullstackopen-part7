import React from 'react'
import { Well } from 'react-bootstrap'

const Comment = ({ comment }) => (
  <Well bsSize="small" className="marginBottom5px wellhighlight">
    {comment}
  </Well>
)

export default Comment