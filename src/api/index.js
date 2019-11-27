import { cleanEnv, str, host, port } from "envalid"
import { logFactory } from "../setup/logging"
import { middlewareFactory } from "../middleware"
import { serverRoutes } from "../routes"
import { expressFactory } from "../express"
import packageConfig from "../../package.json"

export function api({
  env: serviceEnv,
  routes: serviceRoutes,
  configure: configureService
}) {
  const env = {
    ...cleanEnv(process.env, {
      SERVICE_NAME: str(),
      SERVICE_HOST: host(),
      SERVICE_PORT: port(),
      LOG_LEVEL: str()
    }),
    ...serviceEnv
  }
  const {
    SERVICE_NAME: name,
    SERVICE_HOST: hostName,
    SERVICE_PORT: servicePort,
    LOG_LEVEL: logLevel
  } = env

  const log = logFactory({ name, ...{ level: logLevel }, pattern: process.env.DEBUG })
  const PORT = process.env.PORT || servicePort

  let app = {
    env,
    log,
    start() {
      app.server.listen(PORT, hostName, () => {
        const { name: serviceCoreName, version: serviceCoreVersion } = packageConfig

        app.log.info("%s@%s", serviceCoreName, serviceCoreVersion)
        app.log.info("%s started, listening on port %d", name, PORT)
      })
    }
  }

  app = {
    ...app,
    ...configureService(app)
  }

  const routes = serverRoutes(app, serviceRoutes)

  app.middleware = middlewareFactory(app)
  app.server = expressFactory(app, routes, serviceRoutes)

  return app
}
