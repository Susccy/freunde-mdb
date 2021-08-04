import { FilterQuery, UpdateQuery } from "mongoose"
import Movie, { IMovieDoc, IMovieInput } from "../models/movie.model"
import Service from "./Service"

export default class MovieService extends Service<IMovieDoc, IMovieInput> {}
