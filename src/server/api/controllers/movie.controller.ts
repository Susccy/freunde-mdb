import { BadRequestError, NotFoundError } from "../misc/CustomError"
import MovieService from "../services/movie.service"
import { ControllerMethodChain, ExpressRequest } from "./shared/types"
import { MovieInput, MovieResponse } from "~/entities/movie.entity"

export default {
  get: [
    async (
      req: ExpressRequest<
        { id?: string },
        { limit?: string; page?: string } & { [k: string]: string }
      >,
      res,
      next
    ) => {
      try {
        const { id } = req.params

        let results: MovieResponse | MovieResponse[] | null

        if (id) {
          results = await MovieService.findById(id)
          if (!results) throw new NotFoundError()
        }
        else {
          const { limit, page, ...query } = req.query

          const where = query
          const options = {
            ...(limit && { limit: parseInt(limit) }),
            ...(page && { page: parseInt(page) }),
          }

          results = await MovieService.find(where, options)
        }

        res.status(200).json(results)
      } catch (e) {
        next(e)
      }
    },
  ] as ControllerMethodChain,

  post: [
    async (req: ExpressRequest<void, void, MovieInput>, res, next) => {
      try {
        const doc = req.body

        const inserted = await MovieService.insert(doc)

        res.status(201).json(inserted)
      } catch (e) {
        next(e)
      }
    },
  ] as ControllerMethodChain,

  put: [
    async (
      req: ExpressRequest<
        { id: string },
        void,
        Omit<Partial<MovieInput>, "tmdb" | "rating"> & {
          "rating.total"?: number
          "rating.individual"?: number
          tmdb?: number
          // @todo add flattened CustomMovieDetailsInput props
        }
      >,
      res,
      next
    ) => {
      try {
        const updated = await MovieService.update(req.params.id, req.body)
        if (!updated) throw new NotFoundError()
        return res.status(201).json(updated)
      } catch (e) {
        next(e)
      }
    },
  ] as ControllerMethodChain,

  delete: [
    async (req: ExpressRequest<{ id: string }>, res, next) => {
      try {
        const { id } = req.params
        const deleted = await MovieService.delete(id)
        if (!deleted) throw new NotFoundError()
        return res.status(200).json(deleted)
      } catch (e) {
        next(e)
      }
    },
  ] as ControllerMethodChain,
}
