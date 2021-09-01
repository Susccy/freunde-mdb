import { PartialDeep } from "type-fest"
import { ObjectId } from "mongoose"
import { NotFoundError } from "../helpers/CustomError"
import MovieService from "../services/movie.service"
import { RatingIndividual, RatingTotal } from "../models/movie.model"
import { ControllerMethodChain, ExpressRequest } from "./shared/types"
import { IMovieInsert, IMovieRequest } from "~e/movie.entity"

export interface GetMovieParams {
  id?: ObjectId
}
export interface GetMovieQuery extends IMovieRequest {
  limit?: string
  page?: string
}

export interface PostMovieBody extends IMovieInsert {}

export interface PutMovieParams {
  id: ObjectId
}
export interface PutMovieBody extends PartialDeep<IMovieInsert> {
  rating?: RatingTotal | RatingIndividual
}

export interface DeleteMovieParams {
  id: ObjectId
}

export default {
  get: [
    async (req: ExpressRequest<GetMovieParams, GetMovieQuery>, res) => {
      const { limit, page, ...query } = req.query
      const { id } = req.params

      const where = id || query
      const options = {
        limit: limit ? parseInt(limit) : undefined,
        page: page ? parseInt(page) : undefined,
      }

      const results = await MovieService.get(where, options)

      if (!results.length) throw new NotFoundError()

      return res.status(200).json(results)
    },
  ] as ControllerMethodChain,

  post: [
    async (req: ExpressRequest<void, void, PostMovieBody>, res) => {
      const doc = req.body
      const inserted = await MovieService.insert(doc)
      return res.status(201).json(inserted)
    },
  ] as ControllerMethodChain,

  put: [
    async (req: ExpressRequest<PutMovieParams, void, PutMovieBody>, res) => {
      const updated = await MovieService.update(req.params.id, req.body)
      return res.status(201).json(updated)
    },
  ] as ControllerMethodChain,

  delete: [
    async (req: ExpressRequest<DeleteMovieParams>, res) => {
      const { id } = req.params
      const deleted = await MovieService.delete(id)
      return res.status(200).json(deleted)
    },
  ] as ControllerMethodChain,
}
