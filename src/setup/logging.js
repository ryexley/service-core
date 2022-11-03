import pino from "pino"

export function logFactory({ name, level = "debug" }) {
  return pino({
    name,
    level,
    serializers: pino.stdSerializers
  })
}
