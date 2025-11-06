import { userDelete, userSignIn, userSignUp, userUpdate } from "@controllers/users.controller.js"
import { requestValidator, resolveAuthToken } from "@middlewares/custom.mw.js"
import { Router } from "express"
import z from "zod"

const route = Router()

const commonBodySchema = z.object({
  password: z.string().min(8),
  username: z.string().min(3),
})

const userUpdateBodySchema = z.object({
  password: z.string().nullable(),
  prevPassword: z.string().nullable(),
  username: z.string().nullable(),
})

route.post("/signup", requestValidator(commonBodySchema, "body"), userSignUp)
route.post("/signin", requestValidator(commonBodySchema, "body"), userSignIn)
route.put("/", resolveAuthToken, requestValidator(userUpdateBodySchema, "body"), userUpdate)
route.delete("/", resolveAuthToken, userDelete)

export default route
