import express from "express"
import indexRoute from "../api/routes/index.route"

const app = express()

app.use(express.json())
app.use(express.urlencoded({ limit: "10mb", extended: false }))

app.use("/", indexRoute)

export default app
