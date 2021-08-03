import { NextFunction, Request, Response } from "express"
import MovieService from "../services/movie.service"
// import IController from "./IController"

export default {
  // getMovies: async (req: Request, res: Response, next: NextFunction) => {
  //   // const page = req.params.page ? req.params.page : 1
  //   // const limit = req.params.limit ? req.params.limit : 10
  //   try {
  //     const users = await MovieService.getAllMovies()
  //     return res.status(200).json({
  //       status: 200,
  //       data: users,
  //       message: "Succesfully Users Retrieved",
  //     })
  //   } catch (e) {
  //     return res.status(400).json({ status: 400, message: e.message })
  //   }
  // },
  postMovie: async (req: Request, res: Response, next: NextFunction) => {
    try {
      await MovieService.postMovie(req.body)
      return res.sendStatus(200)
    } catch (e) {
      return res.status(400).json({ status: 400, message: e.message })
    }
  },
} /* as IController */
