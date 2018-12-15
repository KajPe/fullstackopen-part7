const User = require('../models/user')
const Blog = require('../models/blog')

const usersInDatabase = async () => {
  const users = await User.find({})
  return users
}

const removeUserInDatabase = async (id) => {
  await User.findByIdAndRemove(id)
}

const blogsInDatabase = async () => {
  const blogs = await Blog.find({})
  return blogs
}

module.exports = {
  usersInDatabase,
  removeUserInDatabase,
  blogsInDatabase
}