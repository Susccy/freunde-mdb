import { NextFunction, Request, Response } from "express"
import { Document, FilterQuery } from "mongoose"
import { NotFoundError } from "../helpers/CustomError"
import Service from "../services/Service"

type ControllerMethod = (
  req: Request,
  res: Response,
  next: NextFunction
) => Response | Promise<Response> | void

export type ControllerMethodChain = ControllerMethod[]

export default abstract class Controller<
  IModelDoc extends Document,
  IModelInput
> {
  constructor (private readonly service: Service<IModelDoc, IModelInput>) {
    this.service = service
  }

  getById: ControllerMethodChain = [
    async (req, res) => {
      const { id: _id } = req.params
      const results = await this.service.getAll(
        { _id } as FilterQuery<IModelDoc>,
        { limit: 1 }
      )
      if (!results.length) throw new NotFoundError()
      return res.status(200).json(results[0])
    },
  ]

  get: ControllerMethodChain = [
    async (req, res) => {
      const { limit, page, ...where } = req.query
      const options = {
        limit: parseInt(limit as string) || undefined,
        page: parseInt(page as string) || undefined,
      }
      const results = await this.service.getAll(
        where as FilterQuery<IModelDoc>,
        options
      )
      return res.status(200).json(results)
    },
  ]

  post: ControllerMethodChain = [
    async (req, res) => {
      const doc = req.body
      const inserted = await this.service.insert(doc)
      return res.status(201).json(inserted)
    },
  ]

  put: ControllerMethodChain = [
    async (req, res) => {
      const { id, ...doc } = req.body
      const updated = await this.service.update(id, doc)
      return res.status(201).json(updated)
    },
  ]

  delete: ControllerMethodChain = [
    async (req, res) => {
      const { id } = req.body
      const deleted = await this.service.delete(id)
      return res.status(200).json(deleted)
    },
  ]
}
