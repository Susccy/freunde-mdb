import express, { Express } from "express"
import setRoutes from "./routes"

const app: Express = express()

app.use(express.json())
app.use(express.urlencoded({ limit: "10mb", extended: false }))

export const createServerRoutes = () => setRoutes(app)

export default app
