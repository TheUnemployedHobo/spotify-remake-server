import { favoriteGet, favoriteInsertOrDelete } from "@controllers/favorites.controller"
import { resolveAuthToken } from "@middlewares/custom.mw"
import { Router } from "express"

const route = Router()

route.get("/", resolveAuthToken, favoriteGet)
route.post("/:songId", resolveAuthToken, favoriteInsertOrDelete)

export default route
