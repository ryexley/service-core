import bunyan from "bunyan"
import PrettyStream from "bunyan-pretty-colors"

export function logFactory({ name, level = "debug" }) {
  let prettyStdOut = null
  const prettyOutput = level.toString() === "debug"

  if (prettyOutput) {
    prettyStdOut = new PrettyStream()
    prettyStdOut.pipe(process.stdout)
  }

  return bunyan.createLogger({
    name,
    level,
    serializers: bunyan.stdSerializers,
    ...(prettyOutput ? { stream: prettyStdOut } : null)
  })
}
