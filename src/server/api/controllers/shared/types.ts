import { NextFunction, Request, Response } from "express"

export type ControllerMethod = (
  req: Request,
  res: Response,
  next: NextFunction
) => Response | Promise<Response> | void

export type ControllerMethodChain = ControllerMethod[]
