import { FilterQuery, UpdateQuery, Document, Types } from "mongoose"
import { PartialDeep } from "type-fest"
import Movie, { RatingIndividual, RatingTotal } from "../models/movie.model"
import tmdb from "../misc/axiosConfig"
import { IMovieInsert, IMovieRequest } from "~e/movie.entity"

interface IMovieUpdate extends PartialDeep<IMovieInsert> {
  rating?: RatingTotal | RatingIndividual
}

export default {
  find: async (
    where: Types.ObjectId | FilterQuery<IMovieRequest> = {},
    options: { page?: number; limit?: number } = {}
  ) => {
    const { page = 0, limit = 0 } = options
    console.log({ where })
    const idRequest = typeof where === "string"

    const freundeData = await (idRequest
      ? Movie.findById(where)
      : Movie.find(where)
          .skip(page * limit)
          .limit(limit)
    )
      .select("-__v")
      .exec()

    // const tmdbData = (
    //   await tmdb.get("/search/movie", {
    //     params: { query: "amityville" },
    //   })
    // ).data

    return freundeData
  },

  insert: async (doc: IMovieInsert) =>
    await (new Movie(doc) as Document).save(),

  update: async (id: Types.ObjectId, doc: UpdateQuery<IMovieUpdate>) =>
    await Movie.findByIdAndUpdate(id, doc, { new: true }).exec(),

  delete: async (id: Types.ObjectId) =>
    await Movie.findByIdAndDelete(id).exec(),
}
