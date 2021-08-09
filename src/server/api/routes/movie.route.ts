import { Router } from "express"
import MovieController from "../controllers/movie.controller"

const router = Router()

router.get("/", MovieController.get)
router.get("/:id", MovieController.getById)

router.post("/", MovieController.post)

router.put("/:id", MovieController.put)

router.delete("/:id", MovieController.delete)

export default router
