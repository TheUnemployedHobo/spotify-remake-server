import { songGet } from "@controllers/songs.controller"
import { resolveAuthToken } from "@middlewares/custom.mw"
import { Router } from "express"

const route = Router()

route.get("/:artist", resolveAuthToken, songGet)

export default route
