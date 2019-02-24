import HttpStatus from "http-status"

export function notFound(req, res) {
  req.log.debug({ req, notFound: true }, "Request url not found")
  res.status(HttpStatus.NOT_FOUND).send({ message: "Not Found" })
}
