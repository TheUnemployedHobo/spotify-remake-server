import { genreGetAll } from "@controllers/genres.controller"
import { resolveAuthToken } from "@middlewares/custom.mw"
import { Router } from "express"

const route = Router()

route.get("/", resolveAuthToken, genreGetAll)

export default route
