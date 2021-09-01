import { Router } from "express"
import MovieController from "../controllers/movie.controller"

const router = Router()

router.get("/:id?", MovieController.get)

router.post("/", MovieController.post)

router.put("/:id", MovieController.put)

router.delete("/:id", MovieController.delete)

export default router
