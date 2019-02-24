import HttpStatus from "http-status"

export function rootResource(app) {
  const { config: { name } } = app

  return {
    async self(req, res) {
      res.status(HttpStatus.OK).send({ service: `${name} root` })
    }
  }
}
