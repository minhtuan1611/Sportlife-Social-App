import request from 'supertest'
import mongoose from 'mongoose'
import app from '../index.js'
import User from '../models/User.js'
import Post from '../models/Post.js'

let token
let userId
let postId

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URL_TEST)

  // Register and log in a user
  const registerRes = await request(app)
    .post('/auth/register')
    .send({
      firstName: 'Tuan',
      lastName: 'Nguyen',
      email: `tuannguyen+${Date.now()}@example.com`,
      password: '123412341234',
      location: 'Helsinki Finland',
      occupation: 'Developer',
      picturePath: 'image.jpg',
    })

  expect(registerRes.statusCode).toBe(201)
  userId = registerRes.body._id

  const loginRes = await request(app).post('/auth/login').send({
    email: registerRes.body.email,
    password: '123412341234',
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
  postId = res.body._id
})

describe('Post Routes', () => {
  it('should create a post successfully', async () => {
    const res = await request(app)
      .post('/posts')
      .set('Authorization', `Bearer ${token}`)
      .send({
        userId,
        description: 'Another test post',
        picturePath: 'anotherImage.jpg',
      })

    expect(res.statusCode).toBe(201)
    expect(res.body).toHaveProperty('_id')
    expect(res.body).toHaveProperty('description', 'Another test post')
  })

  it('should fetch all posts', async () => {
    const res = await request(app)
      .get('/posts')
      .set('Authorization', `Bearer ${token}`)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeInstanceOf(Array)
    expect(res.body.length).toBeGreaterThan(0)
  })

  it('should like and unlike a post successfully', async () => {
    const likeRes = await request(app)
      .patch(`/posts/${postId}/like`)
      .set('Authorization', `Bearer ${token}`)
      .send({ userId })

    expect(likeRes.statusCode).toBe(200)
    expect(likeRes.body.likes).toHaveProperty(userId)

    const unlikeRes = await request(app)
      .patch(`/posts/${postId}/like`)
      .set('Authorization', `Bearer ${token}`)
      .send({ userId })

    expect(unlikeRes.statusCode).toBe(200)
    expect(unlikeRes.body.likes[userId]).toBeUndefined()
  })

  it('should add a comment to a post', async () => {
    const commentPayload = { userId, comment: 'This is a test comment' }

    const res = await request(app)
      .patch(`/posts/${postId}/comment`)
      .set('Authorization', `Bearer ${token}`)
      .send(commentPayload)

    expect(res.statusCode).toBe(200)
    expect(res.body.comments.length).toBe(1)
    expect(res.body.comments[0]).toMatchObject(commentPayload)
  })
})
