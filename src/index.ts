import artistsRoute from "@routes/artists.route"
import genresRoute from "@routes/genres.route"
import "dotenv/config"
import songsRoute from "@routes/songs.route"
import usersRoute from "@routes/users.route"
import express from "express"
import middlewares from "middlewares"

const app = express()

app.use(middlewares)

app.use("/api/users", usersRoute)
app.use("/api/genres", genresRoute)
app.use("/api/artists", artistsRoute)
app.use("/api/songs", songsRoute)

app.use((_, res) => res.sendStatus(404))

const PORT = process.env["PORT"]
const SERVER_URL = process.env["SERVER_URL"]

app.listen(PORT, () => console.log(`Server running on ${SERVER_URL}`))
