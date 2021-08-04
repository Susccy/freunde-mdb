import express from "express"
import setRoutes from "./routes"

const app = express()

app.use(express.json())
app.use(express.urlencoded({ limit: "10mb", extended: false }))

setRoutes(app)

export default app
