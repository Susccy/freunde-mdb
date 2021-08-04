import { NextFunction, Request, Response } from "express"
import Service from "../services/Service"

export type ControllerMethod = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<Response>

export default abstract class Controller {
  constructor (private readonly service: typeof Service) {
    this.service = service
  }

  getOne: ControllerMethod = async (req, res, next) => {
    return await this.service.getAll()
  }
}
