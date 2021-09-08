import { LeanDocument } from "mongoose"
import { MovieInput, MovieDoc } from "../server/api/models/movie.model"

export { MovieInput }

export interface MovieResponse extends LeanDocument<MovieDoc> {}
