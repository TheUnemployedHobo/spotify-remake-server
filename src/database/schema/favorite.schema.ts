import { integer, pgTable, primaryKey } from "drizzle-orm/pg-core"

export const favorites = pgTable(
  "favorites",
  {
    song_id: integer("song_id").notNull(),
    user_id: integer("user_id").notNull(),
  },
  (table) => [primaryKey({ columns: [table.user_id, table.song_id] })],
)
