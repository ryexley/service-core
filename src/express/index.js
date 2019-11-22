import express from "express"
import bodyParser from "body-parser"
import cors from "cors"

export function expressFactory(app, routes, serviceRoutes) {
  const server = express()

  // Pre-routing middleware
  server
    .use(cors()) // TODO: add whitelist configuration to cors middleware
    .use(app.middleware.requestCorrelationId)
    .use(app.middleware.requestLogger)
    .use(app.middleware.responseLogger)

  serviceRoutes.forEach(({ path, router: routeFactory }) => {
    const router = routeFactory(app)

    router
      .use(bodyParser.json())
      .use(bodyParser.urlencoded({ extended: true }))

    server.use(path, router)
  })

  server.use("/", routes)

  // Post-routing middleware
  server
    .use(app.middleware.notFound)
    .use(app.middleware.errorHandler)

  return server
}
