import express from "express"

export type ExpressRequest<
  Params = unknown,
  Query = unknown,
  Body = unknown
> = express.Request<Params, unknown, Body, Query>

type ControllerMethod = (
  req: ExpressRequest,
  res: express.Response,
  next: express.NextFunction
) => express.Response | Promise<express.Response> | void | Promise<void>

export type ControllerMethodChain = ControllerMethod[]
