abstract class HttpError {
  constructor (public readonly status: number) {
    this.status = status
  }
}
