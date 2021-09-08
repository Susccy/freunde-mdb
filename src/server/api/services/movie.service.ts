/* eslint-disable camelcase */
import {
  FilterQuery,
  UpdateQuery,
  Document,
  Types,
  LeanDocument,
} from "mongoose"
import { PartialDeep } from "type-fest"
import Movie, {
  MovieDoc,
  RatingIndividual,
  RatingTotal,
} from "../models/movie.model"
import { tmdbAPI, tmdbImage } from "../misc/axiosConfig"
import { MovieInput, MovieResponse } from "~/entities/movie.entity"
import { ExpandDeep } from "~~/.dev"

interface TMDBMovieDetails {
  adult: boolean
  backdrop_path: string | null
  belongs_to_collection: {
    id: number
    name: string
    poster_path: string
    backdrop_path: string
  } | null
  budget: number
  genres: { id: number; name: string }[]
  homepage: string | null
  id: number
  imdb_id: string | null
  original_language: string
  original_title: string
  overview: string | null
  popularity: number
  poster_path: string | null
  production_companies: {
    id: number
    logo_path: string | null
    name: string
    origin_country: string
  }[]
  production_countries: {
    iso_3166_1: string
    name: string
  }[]
  release_date: string
  revenue: number
  runtime: number | null
  spoken_languages: {
    iso_639_1: string
    name: string
  }[]
  status:
    | "Rumored"
    | "Planned"
    | "In Production"
    | "Post Production"
    | "Released"
    | "Canceled"
  tagline: string | null
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

export interface TMDBMovieDetailsParsedLean {
  title: { original: string; german?: string }
  releaseDate: string
  genres: string[]
  runtime?: number
  poster?: string
}

export interface TMDBMovieDetailsParsed extends TMDBMovieDetailsParsedLean {
  budget: number
  revenue: number
  tagline?: string
  overview?: string
  productionCompanies: {
    id: number
    logoPath?: string
    name: string
    originCountry: string
  }[]
}

const parseMovieDetailsResponse = (
  response: TMDBMovieDetails,
  lean = false
): TMDBMovieDetailsParsed | TMDBMovieDetailsParsedLean => {
  const { original_title, title, release_date, runtime, genres, poster_path } =
    response

  const parsedResponseLean: TMDBMovieDetailsParsedLean = {
    title: { original: original_title, ...(title && { german: title }) },
    releaseDate: release_date,
    genres: genres.map((genre) => genre.name),
    ...(runtime && { runtime }),
    ...(poster_path && { poster: poster_path }),
  }

  if (lean) return parsedResponseLean

  const { budget, revenue, tagline, overview, production_companies } = response

  const parsedResponse: TMDBMovieDetailsParsed = {
    ...parsedResponseLean,
    budget,
    revenue,
    ...(tagline && { tagline }),
    ...(overview && { overview }),
    productionCompanies: production_companies.map(
      ({ id, name, logo_path, origin_country }) => ({
        id,
        name,
        ...(logo_path && { logoPath: logo_path }),
        originCountry: origin_country,
      })
    ),
  }

  return parsedResponse
}

export default {
  find: async (
    query: FilterQuery<MovieDoc> = {},
    options: { page?: number; limit?: number } = {}
  ): Promise<MovieResponse[]> => {
    const { page = 0, limit = 0 } = options

    const freundeData = await Movie.find(query)
      .skip(page * limit)
      .limit(limit)
      .select("-__v")
      .exec()

    const freundeDataLean = freundeData.map((mongooseDocument) =>
      mongooseDocument.toJSON()
    )

    const tmdbDataAsync = []

    for (const movie of freundeDataLean) {
      typeof movie.tmdb === "number" &&
        tmdbDataAsync.push(
          tmdbAPI
            .get<TMDBMovieDetails>(`/movie/${movie.tmdb}`)
            .then((res) => res.data)
        )
    }

    const tmdbData = await Promise.allSettled(tmdbDataAsync).then((results) =>
      results.map((result) => ("value" in result ? result.value : null))
    )

    const tmdbDataIdObject = tmdbData.reduce<{
      [k: number]: TMDBMovieDetailsParsedLean
    }>((tmdbDataIdObject, tmdbDataItem) => {
      if (tmdbDataItem)
        tmdbDataIdObject[tmdbDataItem.id] = parseMovieDetailsResponse(
          tmdbDataItem,
          true
        )
      return tmdbDataIdObject
    }, {})

    const combinedData: MovieResponse[] = []
    for (const { tmdb, ...movie } of freundeDataLean) {
      combinedData.push({
        ...movie,
        tmdb:
          typeof tmdb === "number" && tmdb in tmdbDataIdObject
            ? tmdbDataIdObject[tmdb]
            : tmdb,
      })
    }

    return combinedData
  },

  findById: async (id: string): Promise<MovieResponse | null> => {
    const freundeData = await Movie.findById(id).exec()

    if (!freundeData) return null

    const { tmdb, ...movie } = freundeData
    const tmdbData =
      typeof tmdb === "number"
        ? await tmdbAPI
            .get<TMDBMovieDetails>(`/movie/${tmdb}`)
            .then((res) => (res ? parseMovieDetailsResponse(res.data) : tmdb))
            .catch(() => tmdb)
        : tmdb

    return { ...movie, tmdb: tmdbData }
  },

  insert: async (doc: MovieInput): Promise<MovieResponse> =>
    await new Movie(doc).save(),

  update: async (
    id: string,
    doc: UpdateQuery<MovieDoc>
  ): Promise<MovieResponse | null> =>
    await Movie.findByIdAndUpdate(id, doc, { new: true }).exec(),

  delete: async (id: string): Promise<MovieResponse | null> =>
    await Movie.findByIdAndDelete(id).exec(),
}
