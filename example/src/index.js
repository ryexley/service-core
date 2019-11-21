import config from "config"
import service from "../../src"
import { sampleRouter } from "./routes/sample-router"

const serviceConfig = {
  config,
  configure() {
    // initialize app dependencies here
    // the object that is returned will
    // be merged in with the "app" object
    // during initialization
    return {
      db: { getSomethingFromTheDb() {} },
      services: {
        someService: {
          fetchSomeData() {}
        }
      }
    }
  },
  routes: [
    { path: "/sample", router: sampleRouter }
  ]
}

export default service(serviceConfig).start()
