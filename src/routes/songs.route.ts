import { Router } from "express"

import { songGet } from "../controllers/songs.controller.js"
import { resolveAuthToken } from "../middlewares/custom.mw.js"

const route = Router()

route.get("/:artist", resolveAuthToken, songGet)

export default route
