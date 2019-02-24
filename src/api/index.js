import config from "config"
import { logFactory } from "../setup/logging"
import { middlewareFactory } from "../middleware"
import { serverRoutes } from "../routes"
import { expressFactory } from "../express"
import packageConfig from "../../package.json"

export function api({ config: serviceConfig, routes: serviceRoutes }) {
  const { name, host: { port, name: hostName }, logging } = config
  const log = logFactory({ name, ...logging, pattern: process.env.DEBUG })

  const app = {
    config: { ...config, ...serviceConfig },
    log,
    start() {
      app.server.listen(port, hostName, () => {
        const { name: serviceCoreName, version: serviceCoreVersion } = packageConfig

        app.log.info("%s@%s", serviceCoreName, serviceCoreVersion)
        app.log.info("%s started, listening on port %d", name, port)
      })
    }
  }

  const routes = serverRoutes(app, serviceRoutes)

  app.middleware = middlewareFactory(app)
  app.server = expressFactory(app, routes, serviceRoutes)

  return app
}
