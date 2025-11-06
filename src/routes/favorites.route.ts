import { Router } from "express"

import { favoriteGet, favoriteInsertOrDelete } from "../controllers/favorites.controller.js"
import { resolveAuthToken } from "../middlewares/custom.mw.js"

const route = Router()

route.get("/", resolveAuthToken, favoriteGet)
route.post("/:songId", resolveAuthToken, favoriteInsertOrDelete)

export default route
