import { integer, pgTable, serial, varchar } from "drizzle-orm/pg-core"

import { songs } from "./song.schema.js"
import { users } from "./user.schema.js"

export const playlistInfo = pgTable("playlist_info", {
  description: varchar("description"),
  id: serial("id").primaryKey(),
  img: varchar("img"),
  title: varchar("title").notNull(),
  user_id: integer("user_id")
    .notNull()
    .references(() => users.id),
})

export const playlists = pgTable("playlists", {
  pli_id: integer("pli_id")
    .notNull()
    .references(() => playlistInfo.id),
  song_id: integer("song_id")
    .notNull()
    .references(() => songs.id),
})
