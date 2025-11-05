import { artistGet } from "@controllers/artists.controller"
import { resolveAuthToken } from "@middlewares/custom.mw"
import { Router } from "express"

const route = Router()

route.get("/:genre", resolveAuthToken, artistGet)

export default route
