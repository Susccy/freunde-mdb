import { ObjectId } from "mongoose"
import { IMovieInput } from "~s/api/models/movie.model"

export default interface IMovie extends IMovieInput {
  _id: ObjectId
}
