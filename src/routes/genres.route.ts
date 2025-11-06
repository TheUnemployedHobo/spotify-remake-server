import { genreGetAll } from "@controllers/genres.controller.js"
import { resolveAuthToken } from "@middlewares/custom.mw.js"
import { Router } from "express"

const route = Router()

route.get("/", resolveAuthToken, genreGetAll)

export default route
