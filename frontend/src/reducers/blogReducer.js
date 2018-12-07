import blogService from './../services/blogs'

const blogReducer = (store = [], action) => {
  switch (action.type) {
  case 'BLOGINIT': {
    return action.data
  }
  case 'BLOGCOMMENT': {
    const blogs = store.filter(a => a.id !== action.data.blog.id)
    return [...blogs, action.data.blog ]
  }
  case 'BLOGLIKE': {
    const blogs = store.filter(a => a.id !== action.data.blog.id)
    return [...blogs, action.data.blog ]
  }
  case 'BLOGNEW': {
    return [...store, action.data.blog ]
  }
  case 'BLOGREMOVE': {
    const blogs = store.filter(a => a.id !== action.data.blog.id)
    return [...blogs ]
  }
  default:
    return store
  }
}

export const addBLog = (title,author,url) => {
  return async (dispatch) => {
    const blogObj = {
      title: title,
      author: author,
      url: url
    }
    const blog = await blogService.create(blogObj)
    dispatch({
      type: 'BLOGNEW',
      data: { blog }
    })
  }
}

export const addBlogComment = (blogid, comment) => {
  return async (dispatch) => {
    const commentObj = {
      comment: comment
    }
    const blog = await blogService.addComment(blogid, commentObj)
    dispatch({
      type: 'BLOGCOMMENT',
      data: { blog }
    })
  }
}

export const likeBlog = (bblog) => {
  return async (dispatch) => {
    const blogObj = {
      id: bblog.id,
      user: bblog.user,
      likes: bblog.likes + 1,
      author: bblog.author,
      title: bblog.title,
      url: bblog.url
    }

    const blog = await blogService.update(blogObj)
    dispatch({
      type: 'BLOGLIKE',
      data: { blog }
    })
  }
}

export const deleteBlog = (blog) => {
  return async (dispatch) => {
    await blogService.removeBlog(blog.id)
    dispatch({
      type: 'BLOGREMOVE',
      data: { blog }
    })
  }
}

export const blogsInitialization = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'BLOGINIT',
      data: blogs
    })
  }
}

export default blogReducer