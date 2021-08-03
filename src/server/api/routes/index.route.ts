import { Router } from "express"
import MovieController from "../controllers/movie.controller"

const router = Router()

// router.get("/", MovieController.getMovies)

router.post("/", MovieController.postMovie)

export default router
