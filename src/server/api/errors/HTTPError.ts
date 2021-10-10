abstract class HTTPError {
  constructor (public status: number) {
    this.status = status
  }
}

export class BadRequestError extends HTTPError {
  constructor () {
    super(400)
  }
}

export class UnauthorizedError extends HTTPError {
  constructor () {
    super(401)
  }
}

export class ForbiddenError extends HTTPError {
  constructor () {
    super(403)
  }
}

export class NotFoundError extends HTTPError {
  constructor () {
    super(404)
  }
}

export class ConflictError extends HTTPError {
  constructor () {
    super(409)
  }
}

export class InternalServerError extends HTTPError {
  constructor () {
    super(500)
  }
}
