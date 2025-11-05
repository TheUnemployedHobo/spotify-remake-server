import { pgTable, serial, varchar } from "drizzle-orm/pg-core"

export const genres = pgTable("genres", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(),
})
