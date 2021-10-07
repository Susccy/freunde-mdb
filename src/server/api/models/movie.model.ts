import { Schema, Model, model, models } from "mongoose"
import mongooseUniqueValidator from "mongoose-unique-validator"

export type RatingIndividual = { ch: number; rt: number }
export type RatingTotal = { total: number }

export interface Movie {
  // custom input
  rating: RatingIndividual
  dateSeen?: Date
  fsk?: number
  mm?: boolean

  // tmdb api data
  tmdbID: number
  title: { original: string; german?: string }
  genres: string[]
  releaseDate: Date
  runtime?: number
  posterURL?: string
  // reserved for custom movie input
  // posterFile?: { data: Buffer; contentType: string }
  budget: number
  revenue: number
  tagline?: string
  overview?: string
}

export interface MovieVirtuals {
  rating: RatingTotal
}

type MovieModel = Model<Movie, {}, MovieVirtuals>

const movieSchema = new Schema<Movie, MovieModel, MovieVirtuals>({
  // custom input
  rating: {
    ch: { type: Number, required: true },
    rt: { type: Number, required: true },
    // ch: { type: Number, required: true },
    // rt: { type: Number, required: true },
  },
  dateSeen: Date,
  fsk: Number,
  mm: Boolean,

  // tmdb api data
  tmdbID: { type: Number, required: true, unique: true },
  title: {
    original: { type: String, required: true },
    german: String,
  },
  releaseDate: { type: Date, required: true },
  runtime: { type: Number, required: true },
  genres: [String],
  posterURL: String,
  // reserved for custom movie input
  // posterFile: {
  //   data: { type: Buffer, required: true },
  //   contentType: { type: String, required: true },
  // },
  budget: { type: Number, required: true },
  revenue: { type: Number, required: true },
  tagline: String,
  overview: String,
})

movieSchema
  .virtual("rating.total")
  .get(function (this: Movie) {
    const { ch, rt } = this.rating
    // Movies rated prior to the beginning of the FREUNDE Filmliste 2 didn't receive individual ratings, only a total.
    // If a user only inputs a total rating instead of individual ratings, one of the individuals will be automatically set to -1.
    // That's why we check if either value is negative here, in which case we simply return the other value, otherwise we calculate the average.
    return Math.min(ch, rt) < 0 ? Math.max(ch, rt) : (ch + rt) / 2
  })
  .set(function (this: Movie, v: number) {
    this.rating = { ch: v, rt: -1 }
  })

movieSchema.set("toJSON", { getters: true, virtuals: true })

movieSchema.plugin(mongooseUniqueValidator)

// Try to use the existing model if it's been created before.
// Used to suppress a mongoose error on nuxt hot reload.
export default (models.Movie as MovieModel) ||
  model<Movie>("Movie", movieSchema)
