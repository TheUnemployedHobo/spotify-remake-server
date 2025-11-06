import type { RequestHandler } from "express"

import db from "@database/index"
import { favorites } from "@database/schema/favorite.schema"
import { and, eq } from "drizzle-orm"

export const favoriteGet: RequestHandler = async (req, res) => {
  try {
    const { userId } = req.body

    const data = await db.select().from(favorites).where(eq(favorites.user_id, userId))

    res.json(data).status(200)
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
}

export const favoriteInsertOrDelete: RequestHandler = async (req, res) => {
  try {
    const { userId } = req.body
    const { songId } = req.params

    const data = await db
      .select()
      .from(favorites)
      .where(and(eq(favorites.user_id, userId), eq(favorites.song_id, +songId!)))

    if (!data.length) {
      await db.insert(favorites).values({ song_id: +songId!, user_id: userId })
      res.sendStatus(201)
      return
    }

    await db.delete(favorites).where(and(eq(favorites.user_id, userId), eq(favorites.song_id, +songId!)))

    res.sendStatus(200)
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
}
