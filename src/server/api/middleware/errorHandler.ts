/**
 * https://stackoverflow.com/questions/69709998/express-error-handling-not-working-in-nuxt-js-servermiddleware
 */

import type { ErrorRequestHandler } from "express"

const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  console.error(err, `\n${JSON.stringify(err, null, 2)}`)
  res
    .header("content-type", "application/json")
    .status(err.status || err.statusCode || 500)
    .end(JSON.stringify(err.details))
}

export default errorHandler
