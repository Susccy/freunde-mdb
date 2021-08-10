import server, { createServerRoutes } from "./config/server"
import connectDB from "./config/database"

connectDB()
  .then(() => {
    console.log("Connected to database.")
    createServerRoutes()
  })
  .catch((e) => console.error("Couldn't connect to database:", e))

export default server
