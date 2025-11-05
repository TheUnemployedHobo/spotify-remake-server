import usersRoute from "@routes/users.route"
import express from "express"
import "dotenv/config"
import middlewares from "middlewares"

const app = express()

app.use(middlewares)
app.use("/api/users", usersRoute)
app.use((_, res) => res.sendStatus(404))

const PORT = process.env["PORT"]
const SERVER_URL = process.env["SERVER_URL"]

app.listen(PORT, () => console.log(`Server running on ${SERVER_URL}`))
