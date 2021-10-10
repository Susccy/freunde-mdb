import { RequestHandler } from "express"
import { NotFoundError } from "../errors/HTTPError"
import MovieService from "../services/movie.service"
import { MovieInput, MovieResponse } from "~/entities/movie.entity"

type ID = { id: string }

// @todo { [k: string]: string } best practice?
interface MovieController {
  get: [
    RequestHandler<{}, MovieResponse[], {}, { [k: string]: string | undefined }>
  ]
  getByID: [RequestHandler<ID, MovieResponse>]
  post: [RequestHandler<{}, MovieResponse, MovieInput>]
  put: [RequestHandler<ID, MovieResponse, { [k: string]: string }>]
  delete: [RequestHandler<ID>]
}

const movieController: MovieController = {
  get: [
    async (req, res, next) => {
      try {
        const { limit, page, sort, ...query } = req.query
        // query.dateSeen = query.dateSeen && JSON.parse(query.dateSeen)
        const options = {
          ...(limit && { limit: parseInt(limit) }),
          ...(page && { page: parseInt(page) }),
          sort,
        }

        const results: MovieResponse[] = await MovieService.find(query, options)

        res.status(200).json(results)
      } catch (e) {
        next(e)
      }
    },
  ],

  getByID: [
    async (req, res, next) => {
      try {
        const { id } = req.params

        const result: MovieResponse | null = await MovieService.findByID(id)

        if (!result) throw new NotFoundError()

        res.status(200).json(result)
      } catch (e) {
        next(e)
      }
    },
  ],

  post: [
    async (req, res, next) => {
      try {
        const doc = req.body

        const inserted: MovieResponse = await MovieService.insert(doc)

        res.status(201).json(inserted)
      } catch (e) {
        next(e)
      }
    },
  ],

  put: [
    async (req, res, next) => {
      try {
        const updated: MovieResponse | null = await MovieService.update(
          req.params.id,
          req.body
        )
        if (!updated) throw new NotFoundError()
        return res.status(201).json(updated)
      } catch (e) {
        next(e)
      }
    },
  ],

  delete: [
    async (req, res, next) => {
      try {
        const { id } = req.params
        const deleted = await MovieService.delete(id)
        if (!deleted.deletedCount) throw new NotFoundError()
        return res.status(200).json(deleted)
      } catch (e) {
        next(e)
      }
    },
  ],
}

export default movieController
