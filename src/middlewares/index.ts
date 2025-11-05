import compression from "compression"
import cors from "cors"
import { json, urlencoded } from "express"
import helmet from "helmet"
import morgan from "morgan"

const middlewares = [morgan("dev"), helmet(), compression(), json(), urlencoded({ extended: true }), cors()]

export default middlewares
