import HttpStatus from "http-status"

export function errorHandlerFactory() {
  return (err, req, res) => {
    const error = err.originalError || err

    req.log.error({ err: error }, "Error")

    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      message: HttpStatus[HttpStatus.INTERNAL_SERVER_ERROR]
    })
  }
}
