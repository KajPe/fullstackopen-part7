import React from 'react'
import Togglable from './Togglable'
import NewBlog from './NewBlog'
import PropTypes from 'prop-types'

const NewBlogForm = ({ togglable, toggleVisibility, buttonLabel }) => (
  <Togglable buttonLabel={buttonLabel} visible={togglable} toggleVisibility={toggleVisibility}>
    <NewBlog toggleVisibility={toggleVisibility} />
  </Togglable>
)

NewBlogForm.propTypes = {
  togglable: PropTypes.bool.isRequired,
  toggleVisibility: PropTypes.func.isRequired,
  buttonLabel: PropTypes.string.isRequired,
}

export default NewBlogForm