import { Router } from "express"

import {
  playlistGet,
  playlistInfoDelete,
  playlistInfoGet,
  playlistInfoInsert,
} from "../controllers/playlists.controller.js"
import { resolveAuthToken } from "../middlewares/custom.mw.js"

const route = Router()

route.get("/", resolveAuthToken, playlistInfoGet)
route.post("/", resolveAuthToken, playlistInfoInsert)
route.delete("/:playlistId", resolveAuthToken, playlistInfoDelete)
route.get("/songs", resolveAuthToken, playlistGet)

export default route
