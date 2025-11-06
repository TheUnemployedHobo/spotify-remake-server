import { integer, pgTable, serial, varchar } from "drizzle-orm/pg-core"

import { artists } from "./artist.schema.js"

export const songs = pgTable("songs", {
  artist_id: integer("artist_id")
    .notNull()
    .references(() => artists.id),
  id: serial("id").primaryKey(),
  img: varchar("img").notNull(),
  src: varchar("src").notNull(),
  title: varchar("title").notNull(),
})
