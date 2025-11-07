import { Router } from "express"

import {
  playlistDelete,
  playlistGet,
  playlistInfoDelete,
  playlistInfoGet,
  playlistInfoInsert,
  playlistInsert,
} from "../controllers/playlists.controller.js"
import { resolveAuthToken } from "../middlewares/custom.mw.js"

const route = Router()

route.get("/", resolveAuthToken, playlistInfoGet)
route.post("/", resolveAuthToken, playlistInfoInsert)
route.delete("/:playlistId", resolveAuthToken, playlistInfoDelete)
route.get("/songs", resolveAuthToken, playlistGet)
route.post("/songs", resolveAuthToken, playlistInsert)
route.delete("/songs/:songId", resolveAuthToken, playlistDelete)

export default route
