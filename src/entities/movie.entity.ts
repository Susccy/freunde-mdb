type RatingIndividual = { ch: number; rt: number }
type RatingTotal = { total: number }

interface Movie {
  // content
  slug: string

  // custom input
  rating: RatingTotal | (RatingTotal & RatingIndividual)
  dateSeen?: Date
  fsk?: number
  mm?: boolean

  // tmdb api data
  tmdbID: number
  title: { original: string; german?: string }
  genres: string[]
  releaseDate: string
  runtime?: number
  posterURL?: string
  budget: number
  revenue: number
  tagline?: string
  overview?: string
}

// @todo? change rating type to `RatingTotal | RatingIndividual`
export type MovieInput = Pick<
  Movie,
  "tmdbID" | "dateSeen" | "fsk" | "mm" | "rating"
>

export type MovieResponse = Omit<Movie, "dateSeen"> & { dateSeen?: string }
