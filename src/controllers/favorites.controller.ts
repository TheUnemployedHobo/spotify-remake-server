import type { RequestHandler } from "express"

import { and, eq } from "drizzle-orm"

import db from "../database/index.js"
import { artists } from "../database/schema/artist.schema.js"
import { favorites } from "../database/schema/favorite.schema.js"
import { genres } from "../database/schema/genre.schema.js"
import { songs } from "../database/schema/song.schema.js"

export const favoriteGet: RequestHandler = async (req, res) => {
  try {
    const { userId } = req.body

    const data = await db
      .select({
        artist: artists.name,
        genre: genres.name,
        img: songs.img,
        songId: favorites.song_id,
        songSrc: songs.src,
        title: songs.title,
      })
      .from(favorites)
      .leftJoin(songs, eq(favorites.song_id, songs.id))
      .leftJoin(artists, eq(songs.artist_id, artists.id))
      .leftJoin(genres, eq(artists.genre_id, genres.id))
      .where(eq(favorites.user_id, userId))

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

    res.sendStatus(204)
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
}
