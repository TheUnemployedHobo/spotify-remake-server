import type { RequestHandler } from "express"

import jwt from "jsonwebtoken"

export const resolveAuthToken: RequestHandler = (req, res, next) => {
  try {
    const authToken = req.headers.authorization
    if (!authToken) {
      res.sendStatus(401)
      return
    }

    const verifiedToken = jwt.verify(authToken, process.env["JWT_SECRET"]!) as {
      exp: number
      iat: number
      userId: number
    }

    req.body = { ...req.body, userId: verifiedToken.userId }

    next()
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
}
