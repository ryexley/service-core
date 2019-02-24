export function requestLoggerFactory(log) {
  return (req, res, next) => {
    req.log = log.child({ requestCorrelationId: req.correlationId })
    req.log.info({ req })
    next()
  }
}
