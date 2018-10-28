import React from 'react'
import PropTypes from 'prop-types'

class NewBlog extends React.Component {
  render() {
    return (
      <div>
        <h2>Create new blog</h2>
        <form onSubmit={this.props.addNewBlog}>
          <div>
            Title: <input type="text" name="title" value={this.props.title} onChange={this.props.handleFieldChange} />
          </div>
          <div>
            Author: <input type="text" name="author" value={this.props.author} onChange={this.props.handleFieldChange} />
          </div>
          <div>
            URL: <input type="text" name="url" value={this.props.url} onChange={this.props.handleFieldChange} />
          </div>
          <div>
            <button type="submit">Create</button>
          </div>
        </form>
      </div>
    )
  }
}

NewBlog.propTypes = {
  addNewBlog: PropTypes.func.isRequired,
  handleFieldChange: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
}

export default NewBlog