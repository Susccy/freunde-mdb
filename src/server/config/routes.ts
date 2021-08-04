import { Express } from "express"
import { index, movie } from "../api/routes"

export default (app: Express) => {
  app.use("/", index)
  app.use("/movie", movie)
}
