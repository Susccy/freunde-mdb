import { NextFunction, Request, Response } from "express"

type ControllerMethod = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<Response>

export default interface IController {
  [methodName: string]: ControllerMethod
}
