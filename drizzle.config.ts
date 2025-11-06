import { defineConfig } from "drizzle-kit"
import "dotenv/config"

export default defineConfig({
  dbCredentials: { url: process.env["DATABASE_URL"]! },
  dialect: "postgresql",
  out: "./src/database/migrations",
  schema: "./src/database/schema",
})
