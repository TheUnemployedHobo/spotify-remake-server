import middlewares from "@middlewares/index.js"
import artistsRoute from "@routes/artists.route.js"
import favoritesRoute from "@routes/favorites.route.js"
import genresRoute from "@routes/genres.route.js"
import playlistsRoute from "@routes/playlists.route.js"
import songsRoute from "@routes/songs.route.js"
import usersRoute from "@routes/users.route.js"
import express from "express"
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
