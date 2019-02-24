import { acceptsOnly } from "./accepts-only"
import { notFound } from "./not-found"
import { errorHandlerFactory } from "./error-handler"
import { requestCorrelationIdFactory } from "./request-correlation-id"
import { requestLoggerFactory } from "./request-logger"
import { responseLoggerFactory } from "./response-logger"

export function middlewareFactory(app) {
  return {
    acceptsOnly,
    notFound,
    errorHandler: errorHandlerFactory(),
    requestCorrelationId: requestCorrelationIdFactory(),
    requestLogger: requestLoggerFactory(app.log),
    responseLogger: responseLoggerFactory()
  }
}
