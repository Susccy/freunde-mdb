import { Schema, model, Document } from "mongoose"

export interface IGenrePublic {
  name: string
}

export interface IGenre extends IGenrePublic, Document {}

const GenreSchema = new Schema<IGenre>({
  name: { type: String, required: true },
})

export default model<IGenre>("Genre", GenreSchema)
