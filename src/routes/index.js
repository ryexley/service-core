import { Router as routeFactory } from "express"
import bodyParser from "body-parser"
import { rootResource } from "../resources/root"

export function serverRoutes(app) {
  const router = routeFactory()
  const root = rootResource(app)

  router
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: true }))

  router.route("/").get(root.self)
  router.route("/").options(root.self)

  return router
}
