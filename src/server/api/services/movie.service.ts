import { FilterQuery, ObjectId, UpdateQuery } from "mongoose"
import Movie, { IMovieDoc, IMovieInput } from "../models/movie.model"

export default {
  getAll: async (
    where: FilterQuery<IMovieDoc> = {},
    options: { page?: number; limit?: number } = {}
  ) => {
    const { page = 0, limit = 0 } = options

    /* @todo currently doesn't work due to whiny typescript
    // If a mongo id is sent we try to construct it to a proper ObjectId.
    // Throws an error if it's an invalid id.
    where._id &&= new mongo.ObjectId(where._id)
    */

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
