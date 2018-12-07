import React from 'react'
import Togglable from './Togglable'
import NewBlog from './NewBlog'

const NewBlogForm = ({ togglable, toggleVisibility, title, author, url, addBLog, handleFieldChange, buttonLabel }) => (
  <Togglable buttonLabel={buttonLabel} visible={togglable} toggleVisibility={toggleVisibility}>
    <NewBlog 
      title={title}
      author={author}
      url={url}
      addNewBlog={addBLog}
      handleFieldChange={handleFieldChange}
      toggleVisibility={toggleVisibility}
    />
  </Togglable>
)

export default NewBlogForm