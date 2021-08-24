import { mongo, FilterQuery, ObjectId, UpdateQuery } from "mongoose"
import Movie, { IMovieDoc, IMovieInput } from "../models/movie.model"

export default {
  getAll: async (
    where: FilterQuery<IMovieDoc> = {},
    options: { page?: number; limit?: number } = {}
  ) => {
    const { page = 0, limit = 0 } = options

    where._id && (where._id = new mongo.ObjectId(where._id))

    return await Movie.find(where)
      .skip(page * limit)
      .limit(limit)
      .exec()
  },

  insert: async (doc: IMovieInput) => await new Movie(doc).save(),

  update: async (id: ObjectId, doc: UpdateQuery<IMovieDoc>) =>
    await Movie.findByIdAndUpdate(id, doc, { new: true }).exec(),

  delete: async (id: ObjectId) => await Movie.findByIdAndDelete(id).exec(),
}
