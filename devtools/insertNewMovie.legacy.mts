/* eslint-disable camelcase */
import { promises as fs } from "fs"
import path from "path"
import { fileURLToPath } from "url"
import axios from "axios"
import urlSlug from "url-slug"
import type { MovieDetails } from "tmdb-ts"
import movie from "./movie.json"
// @ts-ignore
import CONFIG from "./config.json"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

type NewMovieData = {
  tmdbID: number
  rating:
    | {
        ch: number
        rt: number
      }
    | { total: number }
  dateSeen: string
  mm?: boolean
  fsk?: number
}

const { TMDB_TOKEN } = CONFIG as { TMDB_TOKEN: string }

const MOVIE_CONTENT_PATH = path.join(
  __dirname,
  "..",
  "client",
  "content",
  "movies"
)

const tmdbAPI = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: `Bearer ${TMDB_TOKEN}`,
  },
  params: { language: "de-DE" },
})

const allCurrentMovies = await Promise.all(
  (
    await fs.readdir(MOVIE_CONTENT_PATH)
  ).map(async (fileName) =>
    JSON.parse(
      await fs.readFile(path.join(MOVIE_CONTENT_PATH, fileName), {
        encoding: "utf-8",
      })
    )
  )
)

const validateNewMovieFile = (movie: {
  [k: string]: unknown
}): NewMovieData => {
  const valueIsValidNumber = (value: unknown): value is number =>
    typeof value === "number" && !isNaN(value)

  const valueIsValidObjectWithProperties = <T extends string>(
    value: unknown,
    properties: T[]
  ): value is Record<T, unknown> =>
    typeof value === "object" &&
    value !== null &&
    properties.every((propName) => propName in value)

  const valueIsValidRating = (
    value: unknown,
    isTotal = false
  ): value is number =>
    valueIsValidNumber(value) &&
    value >= 0 &&
    value <= 1000 &&
    value % (isTotal ? 25 : 50) === 0

  const optional = (value: unknown, condition: boolean) =>
    typeof value === "undefined" || value === null || condition

  const { tmdbID, rating, dateSeen, mm, fsk } = movie

  const conditions: [boolean, string][] = [
    // tmdbID
    [
      valueIsValidNumber(tmdbID) &&
        !allCurrentMovies.some(
          ({ tmdbID: existingTmdbID }) => existingTmdbID === tmdbID
        ),
      `Invalid or duplicate tmdbID (${tmdbID})`,
    ],
    // rating
    [
      (valueIsValidObjectWithProperties(rating, ["ch", "rt"]) &&
        [rating.ch, rating.rt].every((rating) => valueIsValidRating(rating))) ||
        (valueIsValidObjectWithProperties(rating, ["total"]) &&
          valueIsValidRating(rating.total, true)),
      `Invalid rating (${rating})`,
    ],
    // dateSeen
    [
      typeof dateSeen === "string" && !isNaN(Date.parse(dateSeen)),
      `Invalid dateSeen (${dateSeen})`,
    ],
    // mm
    [optional(mm, typeof mm === "boolean"), `Invalid mm (${mm})`],
    // fsk
    [
      optional(
        fsk,
        valueIsValidNumber(fsk) && [0, 6, 12, 16, 18].includes(fsk)
      ),
      `Invalid fsk (${fsk})`,
    ],
  ]

  const [, inputError] = conditions.find(([condition]) => !condition) ?? []

  const movieData = { tmdbID, rating, dateSeen, mm, fsk }

  if (inputError) throw new Error(`Invalid movie file: ${inputError}`)

  return movieData as NewMovieData
}

function parseMovieDetailsResponse (response: MovieDetails) {
  const {
    original_title,
    title,
    release_date,
    runtime,
    genres,
    poster_path,
    budget,
    revenue,
    tagline,
    overview,
  } = response

  const parsedResponse = {
    title: { original: original_title, german: title },
    releaseDate: new Date(release_date),
    genres: genres.map((genre) => genre.name),
    posterURL: poster_path,
    runtime,
    budget,
    revenue,
    tagline,
    overview,
  }

  return parsedResponse
}

const sanitizeMovieContentData = (
  movie: NewMovieData & ReturnType<typeof parseMovieDetailsResponse>
) => {
  const allCurrentSlugs = [
    ...new Set(allCurrentMovies.map(({ slug }) => slug || "")),
  ]

  let i = 0
  let newSlug
  do {
    newSlug = encodeURIComponent(
      urlSlug(movie.title.original) + (i++ ? `-${i}` : "")
    )
  } while (newSlug !== "" && allCurrentSlugs.includes(newSlug))

  return {
    ...movie,
    rating: {
      ...("ch" in movie.rating && "rt" in movie.rating
        ? {
            ch: movie.rating.ch,
            rt: movie.rating.rt,
            total: (movie.rating.ch + movie.rating.rt) / 2,
          }
        : { total: movie.rating.total }),
    },
    slug: newSlug,
  }
}

;(async function () {
  if (!TMDB_TOKEN) throw new Error("No TMDB auth token set.")

  const validatedNewMovieData = validateNewMovieFile(movie)

  const tmdbMovieData = await tmdbAPI
    .get<MovieDetails>(`/movie/${movie.tmdbID}`)
    .then((r) => r.data)
    .catch((e) => {
      throw new Error(
        e.response.status === 404
          ? `No movie found with TMDB ID ${movie.tmdbID}.`
          : e
      )
    })

  const parsedTMDBMovieData = parseMovieDetailsResponse(tmdbMovieData)

  const combinedMovieData = {
    ...validatedNewMovieData,
    ...parsedTMDBMovieData,
  }

  const sanitizedMovieData = sanitizeMovieContentData(combinedMovieData)

  const fileName = `${sanitizedMovieData.tmdbID}.json`

  await fs.writeFile(
    path.join(MOVIE_CONTENT_PATH, fileName),
    JSON.stringify(sanitizedMovieData, null, 2)
  )

  return fileName
})()
  .then((fileName) => console.log(`${fileName} created.`))
  .catch(console.error)
