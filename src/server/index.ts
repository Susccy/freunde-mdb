import server, { init as initServer } from "./config/server"
import connectDB from "./config/database"

connectDB()
  .then(() => {
    console.log("Connected to database.")
    initServer()
  })
  .catch((e) => console.error("Couldn't connect to database:", e))

export default { path: "/api", handler: server }
