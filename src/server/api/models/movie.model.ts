import { Document, Schema, model, models, Model, Types } from "mongoose"
import { TMDBMovieDetailsParsed } from "../services/movie.service"

export type RatingIndividual = { ch: number; rt: number }
export type RatingTotal = { total: number }

// only required when user submits a movie that's not registered on TMDB
type CustomMovieDetailsInput = Partial<Omit<TMDBMovieDetailsParsed, "poster">> &
  Pick<TMDBMovieDetailsParsed, "title"> & {
    poster?: string | { data: Buffer; contentType: string }
  }

interface CustomMovieDetailsDoc extends CustomMovieDetailsInput, Document {}

const CustomMovieDetailsSchema = new Schema<CustomMovieDetailsDoc>({
  title: {
    original: { type: String, required: true, unique: true },
    german: String,
  },
  releaseDate: Date,
  runtime: Number,
  genres: [String],
  poster: {
    type: Schema.Types.Mixed,
    validate: {
      validator (v: any) {
        return (
          typeof v === "string" ||
          (typeof v === "object" &&
            v.data instanceof Buffer &&
            typeof v.contentType === "string")
        )
      },
    },
  },
  // @todo add all CustomMovieDetailsInput props
})

export interface MovieInput {
  tmdb: number | CustomMovieDetailsInput
  rating: RatingIndividual | RatingTotal
  dateSeen?: Date
  fsk?: number
  mm?: boolean
}

export interface MovieDoc extends MovieInput, Document<Types.ObjectId> {
  rating: RatingIndividual & RatingTotal
}

const MovieSchema = new Schema<MovieDoc>(
  {
    tmdb: {
      type: Schema.Types.Mixed,
      required: true,
      validate: {
        validator (v: any) {
          return typeof v === "number" || v === CustomMovieDetailsSchema
        },
      },
    },
    rating: {
      ch: { type: Number, required: true },
      rt: { type: Number, required: true },
    },
    dateSeen: Date,
    fsk: Number,
    mm: Boolean,
  },
  {
    // toObject: { getters: true, virtuals: true },
    toJSON: { getters: true, virtuals: true },
  }
)

MovieSchema.virtual("rating.total")
  .get(function (this: MovieDoc) {
    const { ch, rt } = this.rating
    // Movies rated prior to the beginning of the FREUNDE Filmliste 2 didn't receive individual ratings, only a total.
    // If a user only inputs a total rating instead of individual ratings, one of the individuals will be automatically set to -1.
    // That's why we check if either value is negative here, in which case we simply return the other value, otherwise we calculate the average.
    return Math.min(ch, rt) < 0 ? Math.max(ch, rt) : (ch + rt) / 2
  })
  .set(function (this: MovieInput, v: number) {
    this.rating = { ch: v, rt: -1 }
  })

// Try to use the existing model if it's been created before.
// Used to suppress a mongoose error on nuxt hot reload.
export default (models.Movie as Model<MovieDoc>) ||
  model<MovieDoc>("Movie", MovieSchema)
