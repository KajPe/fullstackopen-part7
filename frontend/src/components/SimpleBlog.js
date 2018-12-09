import React from 'react'
import { Button, Form, FormControl } from 'react-bootstrap'
import Comment from './Comments'

const SimpleBlog = ({ blog, onClick, onSubmitComment, newcomment, handleChange }) => (
  <div>
    <h3><i>Blog: &quot;{blog.title}&quot;</i></h3>
    <h4>... by: {blog.author}</h4>
    <h4>... added by : {blog.user ? blog.user.name : 'Unknown' }</h4>
    <div className="marginLeft50px marginTop30px marginBottom50px">URL: <a href={blog.url}>{blog.url}</a></div>
    <div className="likes">
      Blog has {blog.likes} likes
      <Button className="buttonlike" bsStyle="primary" bsSize="xsmall" onClick={onClick}>like</Button>
    </div>
    <div className="marginTop20px">{ blog.comments.length > 0 ? 'Comments' : 'Blog has no comments' }</div>
    <ul>
      {blog.comments.map(comment =>
        <Comment key={comment._id} comment={comment.comment} />
      )}
    </ul>
    <Form horizontal className="loginform marginBottom20px" onSubmit={onSubmitComment}>
      <FormControl
        type="text"
        name="newcomment"
        value={newcomment}
        onChange={handleChange}
      />
      <Button type="submit" bsStyle="primary" className="buttoncomment">Add Comment</Button>
    </Form>
  </div>
)

export default SimpleBlog