import request from 'supertest'
import mongoose from 'mongoose'
import app from '../index.js'
import User from '../models/User.js'
import Post from '../models/Post.js'

let token
let userId
let postId
const dbName = `test_posts_${Date.now()}`
beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URL, {
    dbName,
  })
  const registerRes = await request(app)
    .post('/auth/register')
    .send({
      firstName: 'Tuann',
      lastName: 'Nguyenn',
      email: `tuannguyenn+${Date.now()}@example.com`,
      password: '123412341234n',
      location: 'Helsinki Finland',
      occupation: 'Developer',
      picturePath: 'imagee.jpg',
    })

  expect(registerRes.statusCode).toBe(201)
  userId = registerRes.body._id

  const loginRes = await request(app).post('/auth/login').send({
    email: registerRes.body.email,
    password: '123412341234n',
  })

  expect(loginRes.statusCode).toBe(200)
  token = loginRes.body.token
})

afterAll(async () => {
  await User.deleteMany({})
  await Post.deleteMany({})
  await mongoose.connection.close()
})

beforeEach(async () => {
  await Post.deleteMany({})
  const res = await request(app)
    .post('/posts')
    .set('Authorization', `Bearer ${token}`)
    .send({
      userId,
      description: 'This is a test post',
      picturePath: 'testImage.jpg',
    })

  expect(res.statusCode).toBe(201)
  expect(res.body).toBeInstanceOf(Array) // Updated to expect the entire feed
  expect(res.body.length).toBeGreaterThan(0)

  // Set `postId` to the first post in the feed for subsequent tests
  postId = res.body[0]._id
})

describe('Post Routes', () => {
  it('should create a post successfully and return the updated feed', async () => {
    const res = await request(app)
      .post('/posts')
      .set('Authorization', `Bearer ${token}`)
      .send({
        userId,
        description: 'Another test post',
        picturePath: 'anotherImage.jpg',
      })

    expect(res.statusCode).toBe(201)
    expect(res.body).toBeInstanceOf(Array) // Now returns the entire feed
    expect(res.body.length).toBeGreaterThan(1) // Ensure a new post is added
    expect(
      res.body.some((post) => post.description === 'Another test post')
    ).toBeTruthy()
  })

  it('should fetch all posts', async () => {
    const res = await request(app)
      .get('/posts')
      .set('Authorization', `Bearer ${token}`)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeInstanceOf(Array)
    expect(res.body.length).toBeGreaterThan(0)
  })

  it('should fetch posts for a specific user', async () => {
    const res = await request(app)
      .get(`/posts/${userId}/posts`)
      .set('Authorization', `Bearer ${token}`)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeInstanceOf(Array)
    res.body.forEach((post) => {
      expect(post).toHaveProperty('userId', userId)
    })
  })

  it('should like a post', async () => {
    const res = await request(app)
      .patch(`/posts/${postId}/like`)
      .set('Authorization', `Bearer ${token}`)
      .send({ userId })

    expect(res.statusCode).toBe(200)
    expect(res.body).toHaveProperty('likes')
    expect(res.body.likes).toHaveProperty(userId, true)
  })

  it('should unlike a post', async () => {
    await request(app)
      .patch(`/posts/${postId}/like`)
      .set('Authorization', `Bearer ${token}`)
      .send({ userId })

    const res = await request(app)
      .patch(`/posts/${postId}/like`)
      .set('Authorization', `Bearer ${token}`)
      .send({ userId })

    expect(res.statusCode).toBe(200)
    expect(res.body.likes[userId]).toBeUndefined()
  })

  it('should add a comment to a post', async () => {
    const comment = 'This is a test comment'
    const res = await request(app)
      .patch(`/posts/${postId}/comment`)
      .set('Authorization', `Bearer ${token}`)
      .send({ userId, comment })

    expect(res.statusCode).toBe(200)
    expect(res.body).toHaveProperty('comments')
    expect(res.body.comments).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          userId,
          comment,
        }),
      ])
    )
  })

  it('should return an empty array if no posts exist', async () => {
    await Post.deleteMany({})
    const res = await request(app)
      .get('/posts')
      .set('Authorization', `Bearer ${token}`)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeInstanceOf(Array)
    expect(res.body.length).toBe(0)
  })

  it('should return 404 for an invalid user ID when creating a post', async () => {
    const res = await request(app)
      .post('/posts')
      .set('Authorization', `Bearer ${token}`)
      .send({
        userId: 'invalidUserId',
        description: 'Invalid user test post',
        picturePath: 'invalidImage.jpg',
      })

    expect(res.statusCode).toBe(404)
    expect(res.body).toHaveProperty('message', 'User not found')
  })

  it('should return 404 for an invalid post ID when commenting', async () => {
    const res = await request(app)
      .patch('/posts/invalidPostId/comment')
      .set('Authorization', `Bearer ${token}`)
      .send({ userId, comment: 'Invalid post comment' })

    expect(res.statusCode).toBe(404)
    expect(res.body).toHaveProperty('message', 'Post not found')
  })

  it('should return 401 if no authorization token is provided', async () => {
    const res = await request(app).get('/posts')

    expect(res.statusCode).toBe(401)
    expect(res.body).toHaveProperty('message', 'Unauthorized')
  })
})
