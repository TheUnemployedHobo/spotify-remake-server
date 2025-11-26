import { Router } from "express"

import { favoriteDelete, favoriteGet, favoriteInsert } from "../controllers/favorites.controller.js"
import { resolveAuthToken } from "../middlewares/custom.mw.js"

const route = Router()

route.get("/", resolveAuthToken, favoriteGet)
route.post("/:songId", resolveAuthToken, favoriteInsert)
route.delete("/:songId", resolveAuthToken, favoriteDelete)

export default route
