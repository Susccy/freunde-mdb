import { Document, Schema, model } from "mongoose"
import { IGenre } from "./genre.model"

export interface IMovieInput {
  title: {
    original: string
    eng?: string
    ger?: string
  }
  rating: { ch: number; rt: number }
  dateSeen?: Date
  yearReleased?: number
  length?: number
  genres?: IGenre["name"][]
  fsk?: number
  starring?: string[]
  img?: { data: Buffer; contentType: string }
  reviews?: string[]
  series?: string
}

export interface IMovieDoc extends IMovieInput, Document {
  rating: IMovieInput["rating"] & { total: number }
}

const MovieSchema = new Schema<IMovieDoc>({
  title: {
    original: { type: String, required: true, unique: true, index: true },
    eng: {
      type: String,
      index: {
        unique: true,
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
  img: { data: Buffer, contentType: String },
  reviews: [String],
  series: String,
})

MovieSchema.virtual("rating.total", function (this: IMovieDoc) {
  const { ch, rt } = this.rating
  // Movies rated prior to the beginning of the FREUNDE Filmliste 2 didn't receive individual ratings, only a total.
  // If a user only inputs a total rating instead of individual ratings, one of the individuals will be automatically set to -1.
  // That's why we check if either value is negative here, in which case we simply return the other value, otherwise we calculate the average.
  return Math.min(ch, rt) < 0
    ? Math.max(ch, rt)
    : (this.rating.ch + this.rating.rt) / 2
})

export default model<IMovieDoc>("Movie", MovieSchema)
