import responseTime from "response-time"

export function responseLoggerFactory(log) {
  return responseTime((req, res, time) => {
    (req.log || log).info({ res, time }, "Completed request (%s %s) in %dms", req.method, req.originalUrl, time)
  })
}
