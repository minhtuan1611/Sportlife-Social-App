import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import multer from 'multer'
import helmet from 'helmet'
import morgan from 'morgan'
import path from 'path'
import { fileURLToPath } from 'url'
import authRoutes from './routes/auth.js'
import userRoutes from './routes/users.js'
import postRoutes from './routes/posts.js'
import messageRoutes from './routes/messages.js'
import { register } from './controllers/auth.js'
import { createPost } from './controllers/posts.js'
import { verifyToken } from './middleware/auth.js'

dotenv.config()

// Conditional paths to handle testing environment
const isTestEnvironment = process.env.NODE_ENV === 'test'
const __filename = isTestEnvironment
  ? 'index.js' // Mock filename for tests
  : fileURLToPath(import.meta.url)

const __dirname = isTestEnvironment
  ? process.cwd() // Use current directory in tests
  : path.dirname(__filename)

const app = express()
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }))
app.use(morgan('common'))
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))

const REACT_APP_CLIENT = process.env.REACT_APP_CLIENT

app.use(
  cors({
    origin: REACT_APP_CLIENT,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  })
)

// Only use static files in non-test environments
if (!isTestEnvironment) {
  app.use('/assets', express.static(path.join(__dirname, 'public/assets')))
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'public/assets'),
  filename: (req, file, cb) => cb(null, file.originalname),
})
const upload = multer({ storage })

app.post('/auth/register', upload.single('picture'), register)
app.post('/posts', verifyToken, upload.single('picture'), createPost)
app.use('/auth', authRoutes)
app.use('/users', userRoutes)
app.use('/posts', postRoutes)
app.use('/messages', messageRoutes)

export default app

// Only start the server if not in test mode
if (!isTestEnvironment) {
  const PORT = process.env.PORT || 6001
  mongoose
    .connect(process.env.MONGO_URL, {})
    .then(() => {
      app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
    })
    .catch((err) => console.error(err))
}
