import express from "express"

const app = express()

app.use(express.json())
app.use(express.urlencoded({ limit: "10mb", extended: false }))

export default app
