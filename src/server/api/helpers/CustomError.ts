abstract class HttpError {
  constructor (public readonly status: number) {
    this.status = status
  }
}

export class BadRequestError extends HttpError {
  constructor () {
    super(400)
  }
}

export class UnauthorizedError extends HttpError {
  constructor () {
    super(401)
  }
}

export class ForbiddenError extends HttpError {
  constructor () {
    super(403)
  }
}

export class NotFoundError extends HttpError {
  constructor () {
    super(404)
  }
}

export class ConflictError extends HttpError {
  constructor () {
    super(409)
  }
}

export class InternalServerError extends HttpError {
  constructor () {
    super(500)
  }
}
