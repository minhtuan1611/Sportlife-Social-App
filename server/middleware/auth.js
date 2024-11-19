import jwt from 'jsonwebtoken'

export const verifyToken = (req, res, next) => {
  try {
    let token = req.header('Authorization')
    if (!token) {
      return res.status(403).json({ error: 'Access Denied' })
    }

    if (token.startsWith('Bearer ')) {
      token = token.slice(7).trim()
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET)
    req.user = verified
    next()
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' })
  }
}
