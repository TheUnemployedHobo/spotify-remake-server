import type { RequestHandler } from "express"

import db from "@database/index"
import { genres } from "@database/schema/genre.schema"

export const genreGetAll: RequestHandler = async (_, res) => {
  try {
    const data = await db.select().from(genres)

    res.json(data).status(200)
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
}
