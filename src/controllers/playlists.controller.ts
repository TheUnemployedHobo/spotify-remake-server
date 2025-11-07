import type { RequestHandler } from "express"

import { eq } from "drizzle-orm"

import db from "../database/index.js"
import { playlistInfo, playlists } from "../database/schema/playlists.schema.js"

export const playlistInfoGet: RequestHandler = async (req, res) => {
  try {
    const { userId } = req.body

    const data = await db.select().from(playlistInfo).where(eq(playlistInfo.user_id, userId))

    res.json(data).status(200)
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
}

export const playlistInfoInsert: RequestHandler = async (req, res) => {
  try {
    const { description, title, userId } = req.body

    await db.insert(playlistInfo).values({ description, title, user_id: userId })

    res.sendStatus(201)
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
}

export const playlistInfoDelete: RequestHandler = async (req, res) => {
  try {
    const { playlistId } = req.params

    await db.delete(playlistInfo).where(eq(playlistInfo.id, +playlistId!))

    res.sendStatus(204)
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
}

export const playlistGet: RequestHandler = async (req, res) => {
  try {
    const { userId } = req.body

    const data = await db
      .select({
        playlistId: playlists.pli_id,
        songId: playlists.song_id,
        userId: playlistInfo.user_id,
      })
      .from(playlists)
      .innerJoin(playlistInfo, eq(playlists.pli_id, playlistInfo.id))
      .where(eq(playlistInfo.user_id, userId))

    res.json(data).status(200)
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
}

export const playlistInsert: RequestHandler = async (req, res) => {
  try {
    const { playlistId, songId } = req.body

    await db.insert(playlists).values({ pli_id: playlistId, song_id: songId })

    res.sendStatus(201)
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
}

export const playlistDelete: RequestHandler = async (req, res) => {
  try {
    const { songId } = req.params

    await db.delete(playlists).where(eq(playlists.song_id, +songId!))

    res.sendStatus(204)
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
}
