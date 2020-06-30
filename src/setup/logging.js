import pino from "pino"

export function logFactory({ name, level = "debug" }) {
  const prettyOutput = level.toString() === "debug"

  return pino({
    name,
    level,
    serializers: pino.stdSerializers,
    prettyPrint: prettyOutput
  })
}
