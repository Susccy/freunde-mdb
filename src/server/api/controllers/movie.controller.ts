import Movie, { IMovieDoc, IMovieInput } from "../models/movie.model"
import MovieService from "../services/movie.service"
import Controller, { ControllerMethodChain } from "./Controller"

class MovieController extends Controller<IMovieDoc, IMovieInput> {
  getById: ControllerMethodChain = [
    (req, res, next) => {
      console.log("sample middleware")
      next()
    },
    ...this.getById,
  ]
}

export default new MovieController(new MovieService(Movie))
