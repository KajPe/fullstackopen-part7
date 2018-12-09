import React from 'react'
import Togglable from './Togglable'
import NewBlog from './NewBlog'

const NewBlogForm = ({ togglable, toggleVisibility, buttonLabel }) => (
  <Togglable buttonLabel={buttonLabel} visible={togglable} toggleVisibility={toggleVisibility}>
    <NewBlog toggleVisibility={toggleVisibility} />
  </Togglable>
)

export default NewBlogForm