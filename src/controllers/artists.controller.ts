import type { RequestHandler } from "express"

import { eq } from "drizzle-orm"

import db from "../database/index.js"
import { artists } from "../database/schema/artist.schema.js"
import { genres } from "../database/schema/genre.schema.js"

export const artistGet: RequestHandler = async (req, res) => {
  try {
    const { genre } = req.params

    if (genre === "all") {
      const data = await db
        .select({
          cover: artists.cover,
          genreName: genres.name,
          id: artists.id,
          name: artists.name,
        })
        .from(artists)
        .innerJoin(genres, eq(artists.genre_id, genres.id))

      res.json(data).status(200)
      return
    }

    const data = await db
      .select({
        cover: artists.cover,
        genreName: genres.name,
        id: artists.id,
        name: artists.name,
      })
      .from(artists)
      .innerJoin(genres, eq(artists.genre_id, genres.id))
      .where(eq(genres.name, genre!))

    res.json(data).status(200)
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
}
