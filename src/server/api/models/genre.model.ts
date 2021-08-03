import { Schema, model, Document } from "mongoose"

export interface IGenreInput {
  name: string
}

export interface IGenreDoc extends IGenreInput, Document {}

const GenreSchema = new Schema<IGenreDoc>({
  name: { type: String, required: true },
})

export default model<IGenreDoc>("Genre", GenreSchema)
