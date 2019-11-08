import express from "express"
import cors from "cors"

export function expressFactory(app, routes, serviceRoutes) {
  const server = express()

  // Pre-routing middleware
  server
    .use(cors()) // TODO: add whitelist configuration to cors middleware
    .use(app.middleware.requestCorrelationId)
    .use(app.middleware.requestLogger)
    .use(app.middleware.responseLogger)

  serviceRoutes.forEach(({ path, router }) => {
    server.use(path, router(app))
  })

  server.use("/", routes)

  // Post-routing middleware
  server
    .use(app.middleware.notFound)
    .use(app.middleware.errorHandler)

  return server
}
