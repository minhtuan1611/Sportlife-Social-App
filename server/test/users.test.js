import request from 'supertest'
import mongoose from 'mongoose'
import app from '../index.js'
import User from '../models/User.js'

let token // Authentication token
let userId // User ID for testing
let friendId // Friend ID for testing

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URL_TEST)

  // Create and log in a user
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

  // Create a second user for testing friendships
  const friendRes = await request(app)
    .post('/auth/register')
    .send({
      firstName: 'Friend',
      lastName: 'Tester',
      email: `friend+${Date.now()}@example.com`,
      password: '123412341234',
      location: 'Espoo Finland',
      occupation: 'Tester',
      picturePath: 'friend.jpg',
    })

  expect(friendRes.statusCode).toBe(201)
  friendId = friendRes.body._id
})

afterAll(async () => {
  await User.deleteMany({})
  await mongoose.connection.close()
})

describe('Users API', () => {
  describe('GET /users/:id', () => {
    it('should fetch user details successfully', async () => {
      const res = await request(app)
        .get(`/users/${userId}`)
        .set('Authorization', `Bearer ${token}`)

      expect(res.statusCode).toBe(200)
      expect(res.body).toHaveProperty('_id', userId)
    })

    it('should return 404 for a non-existent user', async () => {
      const nonExistentId = new mongoose.Types.ObjectId()
      const res = await request(app)
        .get(`/users/${nonExistentId}`)
        .set('Authorization', `Bearer ${token}`)

      expect(res.statusCode).toBe(404)
      expect(res.body).toHaveProperty('message', 'User not found')
    })
  })

  describe('GET /users/:id/friends', () => {
    it('should fetch user friends successfully', async () => {
      await request(app)
        .patch(`/users/${userId}/${friendId}`)
        .set('Authorization', `Bearer ${token}`)

      const res = await request(app)
        .get(`/users/${userId}/friends`)
        .set('Authorization', `Bearer ${token}`)

      expect(res.statusCode).toBe(200)
      expect(res.body).toBeInstanceOf(Array)
      expect(res.body[0]).toHaveProperty('_id', friendId)
    })
  })
})
