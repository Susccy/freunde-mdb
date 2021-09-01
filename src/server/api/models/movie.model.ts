import { Document, Schema, model, models } from "mongoose"

export type RatingIndividual = { ch: number; rt: number }
export type RatingTotal = { total: number }

export interface IMovieInsert {
  title: {
    original: string
    eng?: string
    ger?: string
  }
  rating: RatingIndividual | RatingTotal
  dateSeen?: Date
  yearReleased?: number
  length?: number
  genres: string[]
  fsk?: number
  starring: string[]
  img?:
    | { __type: "buffer"; data: Buffer; contentType: string }
    | { __type: "uri"; uri: string; position?: number }
  reviews: string[]
  series?: string
}

interface IMovieDoc extends IMovieInsert, Document {}

const MovieSchema = new Schema<IMovieDoc>(
  {
    title: {
      original: { type: String, required: true, unique: true, index: true },
      eng: {
        type: String,
        index: {
          unique: true,
          // since eng and ger titles are not required to be set,
          // but we want them to be unique _if_ they are set,
          // we create a filter expression to only apply
          // the unique index when the value is a string (and not null)
          partialFilterExpression: { "title.eng": { $type: "string" } },
        },
      },
      ger: {
        type: String,
        index: {
          unique: true,
          partialFilterExpression: { "title.ger": { $type: "string" } },
        },
      },
    },
    rating: {
      ch: { type: Number, required: true },
      rt: { type: Number, required: true },
    },
    dateSeen: Date,
    yearReleased: Number,
    length: Number,
    genres: [{ type: Schema.Types.ObjectId, ref: "Genre" }],
    fsk: Number,
    starring: [String],
    img: { data: Buffer, contentType: String, uri: String, position: Number },
    reviews: [String],
    series: String,
  },
  {
    toObject: { getters: true, virtuals: true },
    toJSON: { getters: true, virtuals: true },
  }
)

MovieSchema.virtual("rating.total")
  .get(function (this: IMovieDoc) {
    const { ch, rt } = this.rating as RatingIndividual
    // Movies rated prior to the beginning of the FREUNDE Filmliste 2 didn't receive individual ratings, only a total.
    // If a user only inputs a total rating instead of individual ratings, one of the individuals will be automatically set to -1.
    // That's why we check if either value is negative here, in which case we simply return the other value, otherwise we calculate the average.
    return Math.min(ch, rt) < 0 ? Math.max(ch, rt) : (ch + rt) / 2
  })
  .set(function (this: IMovieDoc, v: number) {
    this.rating = { ch: v, rt: -1 }
  })

// Try to use the existing model if it's been created before.
// Used to suppress a mongoose error on nuxt hot reload.
export default models.Movie || model<IMovieDoc>("Movie", MovieSchema)
