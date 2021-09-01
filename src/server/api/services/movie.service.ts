import { mongo, FilterQuery, ObjectId, UpdateQuery, Document } from "mongoose"
import { PartialDeep } from "type-fest"
import Movie, { RatingIndividual, RatingTotal } from "../models/movie.model"
import { IMovieInsert, IMovieRequest } from "~e/movie.entity"

interface IMovieUpdate extends PartialDeep<IMovieInsert> {
  rating?: RatingTotal | RatingIndividual
}

export default {
  get: async (
    where: ObjectId | FilterQuery<IMovieRequest> = {},
    options: { page?: number; limit?: number } = {}
  ) => {
    const { page = 0, limit = 0 } = options

    return await (where instanceof mongo.ObjectId
      ? Movie.findById(where)
      : Movie.find(where)
          .skip(page * limit)
          .limit(limit)
    ).exec()
  },

  insert: async (doc: IMovieInsert) =>
    await (new Movie(doc) as Document).save(),

  update: async (id: ObjectId, doc: UpdateQuery<IMovieUpdate>) =>
    await Movie.findByIdAndUpdate(id, doc, { new: true }).exec(),

  delete: async (id: ObjectId) => await Movie.findByIdAndDelete(id).exec(),
}
