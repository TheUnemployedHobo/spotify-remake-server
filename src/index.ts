import artistsRoute from "@routes/artists.route"
import favoritesRoute from "@routes/favorites.route"
import genresRoute from "@routes/genres.route"
import playlistsRoute from "@routes/playlists.route"
import songsRoute from "@routes/songs.route"
import usersRoute from "@routes/users.route"
import express from "express"
import middlewares from "middlewares"
import "dotenv/config"

const app = express()

app.use(middlewares)

app.use("/api/users", usersRoute)
app.use("/api/songs", songsRoute)
app.use("/api/genres", genresRoute)
app.use("/api/artists", artistsRoute)
app.use("/api/playlist", playlistsRoute)
app.use("/api/favorites", favoritesRoute)

app.use((_, res) => res.sendStatus(404))

const PORT = process.env["PORT"]
const SERVER_URL = process.env["SERVER_URL"]

app.listen(PORT, () => console.log(`Server running on ${SERVER_URL}`))
