import express from 'express'
import { sendMessage, getMessages } from '../controllers/message.js'
import { verifyToken } from '../middleware/auth.js'

const router = express.Router()

router.get('/:id', verifyToken, getMessages)
router.post('/send/:id', verifyToken, sendMessage)

export default router
