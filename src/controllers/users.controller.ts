import type { RequestHandler } from "express"

import { compare, hash } from "bcrypt"
import { eq } from "drizzle-orm"
import jwt from "jsonwebtoken"

import db from "../database/index.js"
import { users } from "../database/schema/user.schema.js"

export const userSignUp: RequestHandler = async (req, res) => {
  try {
    const { password, username } = req.body

    const hashedPassword = await hash(password, 12)
    await db.insert(users).values({ password: hashedPassword, username })

    res.sendStatus(201)
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
}

export const userSignIn: RequestHandler = async (req, res) => {
  try {
    const { password, username } = req.body

    const [theUser] = await db.select().from(users).where(eq(users.username, username))
    if (!theUser) {
      res.sendStatus(401)
      return
    }

    const isPassCorrect = await compare(password, theUser.password)
    if (!isPassCorrect) {
      res.sendStatus(401)
      return
    }

    const token = jwt.sign({ userId: theUser.id }, process.env["JWT_SECRET"]!, { expiresIn: "24h" })

    res.send(token).status(200)
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
}

export const userDelete: RequestHandler = async (req, res) => {
  try {
    const { userId } = req.body

    await db.delete(users).where(eq(users.id, userId))

    res.sendStatus(204)
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
}

export const userUpdate: RequestHandler = async (req, res) => {
  try {
    const { password, prevPassword, userId, username } = req.body

    if (username) await db.update(users).set({ username }).where(eq(users.id, +userId))

    if (prevPassword && password) {
      const [theUser] = await db.select().from(users).where(eq(users.id, userId))

      if (!(await compare(prevPassword, theUser!.password))) {
        res.sendStatus(401)
        return
      }

      const hashedPassword = await hash(password, 12)

      await db.update(users).set({ password: hashedPassword }).where(eq(users.id, +userId))
    }

    res.sendStatus(200)
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
}
