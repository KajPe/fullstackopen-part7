import React from 'react'

const SimpleBlog = ({ blog, onClick }) => (
  <div>
    <div className="titleauthor">
      {blog.title} {blog.author}
    </div>
    <a href={blog.url}>{blog.url}</a>
    <div className="likes">
      blog has {blog.likes} likes
      <button onClick={onClick}>like</button>
    </div>
    Added by : {blog.user ? blog.user.name : 'Unknown' }
  </div>
)

export default SimpleBlog
