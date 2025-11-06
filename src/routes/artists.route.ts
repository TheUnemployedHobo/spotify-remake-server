import { Router } from "express"

import { artistGet } from "../controllers/artists.controller.js"
import { resolveAuthToken } from "../middlewares/custom.mw.js"

const route = Router()

route.get("/:genre", resolveAuthToken, artistGet)

export default route
