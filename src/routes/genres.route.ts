import { Router } from "express"

import { genreGetAll } from "../controllers/genres.controller.js"
import { resolveAuthToken } from "../middlewares/custom.mw.js"

const route = Router()

route.get("/", resolveAuthToken, genreGetAll)

export default route
