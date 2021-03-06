import HttpStatus from "http-status"

export function rootResource(app) {
  const { env: { SERVICE_NAME } } = app

  return {
    async self(req, res) {
      res.status(HttpStatus.OK).send({ service: `${SERVICE_NAME} root` })
    }
  }
}
