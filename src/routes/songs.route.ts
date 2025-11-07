import { Router } from "express"

import { songGet, songGetByArtist } from "../controllers/songs.controller.js"
import { resolveAuthToken } from "../middlewares/custom.mw.js"

const route = Router()

route.get("/", resolveAuthToken, songGet)
route.get("/:artist", resolveAuthToken, songGetByArtist)

export default route
