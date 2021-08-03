import { FilterQuery } from "mongoose"
import Movie, { IMovieDoc, IMovieInput } from "../models/movie.model"
// import IService from "./IService"

export default {
  getMovies: async (query: FilterQuery<IMovieDoc>) => {
    try {
      const movies = await Movie.find(query)
      return movies
    } catch (e) {
      throw new Error(`Error @getAllMovies: ${e}`)
    }
  },

  postMovie: async (movie: IMovieInput) => {
    try {
      await Movie.create<IMovieInput>(movie)
    } catch (e) {
      throw new Error(`Error @postMovie: ${e}`)
    }
  },
} /*  as IService */
