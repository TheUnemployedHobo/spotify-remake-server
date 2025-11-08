import { Router } from "express"

import { userDelete, userSignIn, userSignUp, userUpdate } from "../controllers/users.controller.js"
import { resolveAuthToken } from "../middlewares/custom.mw.js"

const route = Router()

route.post("/signup", userSignUp)
route.post("/signin", userSignIn)
route.put("/", resolveAuthToken, userUpdate)
route.delete("/", resolveAuthToken, userDelete)

export default route
