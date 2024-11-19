import request from 'supertest'
import mongoose from 'mongoose'
import app from '../index.js'
import User from '../models/User.js'

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URL_TEST)
})

afterAll(async () => {
  await User.deleteMany({})
  await mongoose.connection.close()
})

describe('Auth Routes', () => {
  const mockUser = {
    firstName: 'Tuan',
    lastName: 'Nguyen',
    email: 'tuannguyen@example.com',
    password: '123412341234',
    location: 'Helsinki Finland',
    occupation: 'Developer',
    picturePath: 'image.jpg',
    friends: [],
  }

  describe('POST /auth/register', () => {
    it('should register a user successfully', async () => {
      const res = await request(app).post('/auth/register').send(mockUser)
      expect(res.statusCode).toBe(201)
      expect(res.body).toHaveProperty('_id')
      expect(res.body.email).toBe(mockUser.email)
    })

    it('should not register a user with an existing email', async () => {
      const res = await request(app).post('/auth/register').send(mockUser)

      expect(res.statusCode).toBe(500)
      expect(res.body).toHaveProperty('error')
    })
  })

  describe('POST /auth/login', () => {
    it('should log in an existing user successfully', async () => {
      const res = await request(app).post('/auth/login').send({
        email: mockUser.email,
        password: mockUser.password,
      })

      expect(res.statusCode).toBe(200)
      expect(res.body).toHaveProperty('token')
      expect(res.body).toHaveProperty('user')
    })

    it('should not log in with incorrect credentials', async () => {
      const res = await request(app).post('/auth/login').send({
        email: mockUser.email,
        password: 'wrongpassword',
      })

      expect(res.statusCode).toBe(400)
      expect(res.body).toHaveProperty('msg', 'Invalid credentials. ')
    })

    it('should not log in a non-existent user', async () => {
      const res = await request(app).post('/auth/login').send({
        email: 'nonexistent@example.com',
        password: 'randompassword',
      })

      expect(res.statusCode).toBe(400)
      expect(res.body).toHaveProperty('msg', 'User does not exist. ')
    })
  })
})
