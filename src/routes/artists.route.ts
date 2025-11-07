import { Router } from "express"

import { artistGet, artistGetByGenre } from "../controllers/artists.controller.js"
import { resolveAuthToken } from "../middlewares/custom.mw.js"

const route = Router()

route.get("/", resolveAuthToken, artistGet)
route.get("/:genre", resolveAuthToken, artistGetByGenre)

export default route
