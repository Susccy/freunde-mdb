import {
  FilterQuery,
  UpdateQuery,
  Document,
  Types,
  LeanDocument,
} from "mongoose"
import { PartialDeep } from "type-fest"
import Movie, {
  IMovieDoc,
  RatingIndividual,
  RatingTotal,
} from "../models/movie.model"
import tmdb from "../misc/axiosConfig"
import { IMovieInsert, IMovieRequest, IMovieResponse } from "~e/movie.entity"

interface IMovieUpdate extends PartialDeep<IMovieInsert> {
  rating?: RatingTotal | RatingIndividual
}

export default {
  find: async (
    where: FilterQuery<IMovieDoc> = {},
    options: { page?: number; limit?: number } = {}
  ) => {
    const { page = 0, limit = 0 } = options

    const freundeData = await Movie.find(where)
      .skip(page * limit)
      .limit(limit)
      .select("-__v")
      .exec()

    const freundeDataLean = freundeData.map((mongooseDocument) =>
      mongooseDocument.toJSON()
    )

    const tmdbDataAsync = []

    for (const movie of freundeDataLean) {
      typeof movie.tmdbId === "number" &&
        tmdbDataAsync.push(
          tmdb.get(`/movie/${movie.tmdbId}`, {
            params: { language: "de-DE", append_to_response: "images" },
          })
        )
    }

    const tmdbData = await Promise.all(tmdbDataAsync).then((ress) =>
      ress.map((res) => res.data)
    )

    const tmdbDataObject: {
      [k: number]: {
        posterPath: string
        genres: { id: number; name: string }[]
        title: { original: string; ger: string }
        overview: string
        releaseDate: string
        runtime: number
        tagline: string
      }
    } = {}
    for (const movie of tmdbData) {
      const {
        id,
        title,
        original_title: originalTitle,
        poster_path: posterPath,
        release_date: releaseDate,
        ...other
      } = movie
      tmdbDataObject[id] = {
        title: { original: originalTitle, ger: title },
        posterPath,
        releaseDate,
        ...other,
      }
    }

    const combinedData: IMovieResponse[] = []
    for (const movie of freundeDataLean) {
      if (!movie.tmdbId || !(movie.tmdbId in tmdbDataObject)) continue
      const { posterPath, genres, ...tmdbMovie } = tmdbDataObject[movie.tmdbId]
      combinedData.push({
        ...movie,
        img: { __type: "uri", uri: posterPath },
        genres: genres.map((genre) => genre.name),
      })
    }

    // console.dir({ freundeData })
    console.log({ freundeData })
    return combinedData
  },

  insert: async (doc: IMovieInsert) => await new Movie(doc).save(),

  update: async (id: Types.ObjectId, doc: UpdateQuery<IMovieUpdate>) =>
    await Movie.findByIdAndUpdate(id, doc, { new: true }).exec(),

  delete: async (id: Types.ObjectId) =>
    await Movie.findByIdAndDelete(id).exec(),
}
