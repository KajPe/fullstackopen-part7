import React from 'react'
import { Well } from 'react-bootstrap'
import PropTypes from 'prop-types'

const Comment = ({ comment }) => (
  <Well bsSize="small" className="marginBottom5px wellhighlight">
    {comment}
  </Well>
)

Comment.propTypes = {
  comment: PropTypes.string.isRequired
}

export default Comment