import HttpStatus from "http-status"

export function acceptsOnly(types) {
  return (req, res, next) => {
    if (req.accepts(types)) {
      next()
      return
    }

    req.log.debug({ req, invalidAcceptHeader: true }, "Request has invalid 'Accept' header")
    req.status(HttpStatus.NOT_ACCEPTABLE).send("Not Acceptable")
  }
}
