const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const helper = require('./test_helper')
const bcryptjs = require('bcryptjs')

const newUser = {
  username: 'TESTUSER',
  name: 'qwerty',
  password: 'heufydtd2uwiw92',
  adult: true,
  blogs: []
}

const newBlog = {
  title: 'BLOGTEST',
  author: 'Mr Test',
  url: 'http://no.log'
}

let token = ''

describe('Tests', () => {
  describe('User API Tests', () => {
    test('Get users', async () => {
      const db_users = await helper.usersInDatabase()

      const response = await api
        .get('/api/users')
        .expect(200)
        .expect('Content-Type', /application\/json/)

      expect(response.body.length).toBe(db_users.length)
    })

    test('Create user with too short password (should fail)', async () => {
      const db_users = await helper.usersInDatabase()

      const user = db_users.filter(user => user.username === newUser.username )
      if (user.length > 0) {
        // Already exists, remove it
        await helper.removeUserInDatabase(user[0]._id)
      }
      
      // Should fail as 400
      const badUser = {
        username: newUser.username,
        name: newUser.name,
        password: '11',
        adult: newUser.adult,
        blogs: newUser.blogs
      }
      await api
        .post('/api/users')
        .send(badUser)
        .expect(400)
    })

    test('Create user', async () => {
      const db_users = await helper.usersInDatabase()

      const user = db_users.filter(user => user.username === newUser.username )
      if (user.length > 0) {
        // Already exists, remove it
        await helper.removeUserInDatabase(user[0]._id)
      }
      
      const db_users_before = await helper.usersInDatabase()

      const response = await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      // Database should have a new user
      const db_users_after = await helper.usersInDatabase()
      expect(db_users_after.length).toBe(db_users_before.length + 1)

      // Check the user was created ok
      const dbuser = db_users_after.filter(user => user.username === newUser.username )
      expect(dbuser[0].name).toBe(newUser.name)
      expect(dbuser[0].username).toBe(newUser.username)
      expect(dbuser[0].adult).toBe(newUser.adult)
      const validPassword = await bcryptjs.compare(newUser.password, dbuser[0].passwordHash)
      expect(validPassword).toBe(true)
    })

    test('Recreate same user (should fail)', async () => {
      const response = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)
    })
  })

  describe('Login API Tests', () => {
    test('Login user with valid password', async () => {
      const loginUser = {
        username: newUser.username,
        password: newUser.password
      }

      const response = await api
        .post('/api/login')
        .send(loginUser)
        .expect(200)
        .expect('Content-Type', /application\/json/)
      
      expect(response.body.token.length).toBeGreaterThan(10)
      expect(response.body.name).toBe(newUser.name)
      expect(response.body.username).toBe(newUser.username)
    })

    test('Login user with invalid password', async () => {
      const loginUser = {
        username: newUser.username,
        password: 'THIS_SHOULD_FAIL'
      }

      await api
        .post('/api/login')
        .send(loginUser)
        .expect(401)
    })
  })

  describe('Blog API Tests', () => {
    test('Get blogs', async () => {
      const db_blogs = await helper.blogsInDatabase()
    
      const response = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    
      expect(response.body.length).toBe(db_blogs.length)
    })

    test('Create blog', async () => {
      // Get token for user
      const loginUser = {
        username: newUser.username,
        password: newUser.password
      }
      const response = await api
        .post('/api/login')
        .send(loginUser)
        .expect(200)
        .expect('Content-Type', /application\/json/)
      const token = response.body.token

      const db_blogs_before = await helper.blogsInDatabase()

      const responseBlog = await api
        .post('/api/blogs')
        .set('Authorization', 'bearer ' + token)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)      

      const db_blogs_after = await helper.blogsInDatabase()

      expect(db_blogs_after.length).toBe(db_blogs_before.length + 1)
    })

    test('Create blog (no auth)', async () => {
      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(401)
        .expect('Content-Type', /application\/json/)      
    })

    test('Create blog (bad auth)', async () => {
      await api
        .post('/api/blogs')
        .set('Authorization', 'bearer 123')
        .send(newBlog)
        .expect(401)
        .expect('Content-Type', /application\/json/)      
    })

    test('Create blog (no title)', async () => {
      // Get token for user
      const loginUser = {
        username: newUser.username,
        password: newUser.password
      }
      const response = await api
        .post('/api/login')
        .send(loginUser)
        .expect(200)
        .expect('Content-Type', /application\/json/)
      const token = response.body.token

      const badBlog = {
        author: 'Mr Test',
        url: 'http://no.log'
      }
      
      await api
        .post('/api/blogs')
        .set('Authorization', 'bearer ' + token)
        .send(badBlog)
        .expect(400)
        .expect('Content-Type', /application\/json/)      
    })

    test('Create blog (no url)', async () => {
      // Get token for user
      const loginUser = {
        username: newUser.username,
        password: newUser.password
      }
      const response = await api
        .post('/api/login')
        .send(loginUser)
        .expect(200)
        .expect('Content-Type', /application\/json/)
      const token = response.body.token

      const badBlog = {
        title: 'Hello',
        author: 'Mr Test'
      }
      
      await api
        .post('/api/blogs')
        .set('Authorization', 'bearer ' + token)
        .send(badBlog)
        .expect(400)
        .expect('Content-Type', /application\/json/)      
    })

    test('Add likes by 3', async () => {
      // Get token for user
      const loginUser = {
        username: newUser.username,
        password: newUser.password
      }
      const response = await api
        .post('/api/login')
        .send(loginUser)
        .expect(200)
        .expect('Content-Type', /application\/json/)
      const token = response.body.token

      // Create new blog
      const responseBlog = await api
        .post('/api/blogs')
        .set('Authorization', 'bearer ' + token)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      expect(responseBlog.body.likes).toBe(0)

      // Add likes by 3
      likeBlog = {
        likes: 3,
        author: responseBlog.body.author,
        title: responseBlog.body.title,
        url: responseBlog.body.url
      }
      const responseBlogLike = await api
        .put('/api/blogs/' + responseBlog.body.id)
        .set('Authorization', 'bearer ' + token)
        .send(likeBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      expect(responseBlogLike.body.likes).toBe(3)
    })

    test('Add comment to blog', async () => {
      // Get token for user
      const loginUser = {
        username: newUser.username,
        password: newUser.password
      }
      const response = await api
        .post('/api/login')
        .send(loginUser)
        .expect(200)
        .expect('Content-Type', /application\/json/)
      const token = response.body.token

      // Create new blog
      const responseBlog = await api
        .post('/api/blogs')
        .set('Authorization', 'bearer ' + token)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      expect(responseBlog.body.comments.length).toBe(0)

      // Add comment
      commentBlog = {
        comment: 'THIS IS A COMMENT'
      }
      const responseBlogLike = await api
        .post('/api/blogs/' + responseBlog.body.id + '/comment')
        .set('Authorization', 'bearer ' + token)
        .send(commentBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      expect(responseBlogLike.body.comments.length).toBe(1)
      expect(responseBlogLike.body.comments[0].comment).toBe(commentBlog.comment)
    })
  })

  afterAll(() => {
    server.close()
  })
})