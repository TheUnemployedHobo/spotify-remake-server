import type { RequestHandler } from "express"

import { eq } from "drizzle-orm"

import db from "../database/index.js"
import { artists } from "../database/schema/artist.schema.js"
import { genres } from "../database/schema/genre.schema.js"
import { songs } from "../database/schema/song.schema.js"

export const songGet: RequestHandler = async (req, res) => {
  try {
    const data = await db.select().from(songs)
    res.json(data).status(200)

    res.json(data).status(200)
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
}

export const songGetByArtist: RequestHandler = async (req, res) => {
  try {
    const { artist } = req.params

    const data = await db
      .select({
        artist: artists.name,
        genre: genres.name,
        id: songs.id,
        img: songs.img,
        src: songs.src,
        title: songs.title,
      })
      .from(songs)
      .innerJoin(artists, eq(artists.id, songs.artist_id))
      .innerJoin(genres, eq(genres.id, artists.genre_id))
      .where(eq(artists.name, artist!))

    res.json(data).status(200)
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
}
