import { PartialDeep } from "type-fest"
import {
  IMovieInsert,
  RatingIndividual,
  RatingTotal,
} from "~s/api/models/movie.model"

export { IMovieInsert }

export interface IMovieResponse extends IMovieInsert {
  rating: RatingIndividual & RatingTotal
  id: string
}

export interface IMovieRequest extends PartialDeep<IMovieResponse> {}
