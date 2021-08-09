import { NotFoundError } from "../helpers/CustomError"
import MovieService from "../services/movie.service"
import { ControllerMethodChain } from "./shared/types"

export default {
  getById: [
    async (req, res) => {
      const { id: _id } = req.params
      const results = await MovieService.getAll({ _id }, { limit: 1 })
      if (!results.length) throw new NotFoundError()
      return res.status(200).json(results[0])
    },
  ] as ControllerMethodChain,

  get: [
    async (req, res) => {
      const { limit, page, ...where } = req.query
      const options = {
        limit: parseInt(limit as string) || undefined,
        page: parseInt(page as string) || undefined,
      }
      const results = await MovieService.getAll(where, options)
      return res.status(200).json(results)
    },
  ] as ControllerMethodChain,

  post: [
    async (req, res) => {
      const doc = req.body
      const inserted = await MovieService.insert(doc)
      return res.status(201).json(inserted)
    },
  ] as ControllerMethodChain,

  put: [
    async (req, res) => {
      const { id, ...doc } = req.body
      const updated = await MovieService.update(id, doc)
      return res.status(201).json(updated)
    },
  ] as ControllerMethodChain,

  delete: [
    async (req, res) => {
      const { id } = req.body
      const deleted = await MovieService.delete(id)
      return res.status(200).json(deleted)
    },
  ] as ControllerMethodChain,
}
