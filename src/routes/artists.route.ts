import { artistGet } from "@controllers/artists.controller.js"
import { resolveAuthToken } from "@middlewares/custom.mw.js"
import { Router } from "express"

const route = Router()

route.get("/:genre", resolveAuthToken, artistGet)

export default route
