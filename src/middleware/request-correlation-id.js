import { networkInterfaces } from "os"
import { v1 as uuid } from "uuid"
import { isNotEmpty } from "../util"

let nodeId = null

function getNodeId() {
  if (isNotEmpty(nodeId)) {
    return nodeId
  }

  // We only need to run this once and if it fails we'll always return null
  nodeId = null

  const all = networkInterfaces()
  let iface = all.eth0 || all.eth1 || all.en0 || all.en1

  if (!iface) {
    // Fall back to whichever interface is registered first
    iface = all[Object.keys(all)[0]]
  }

  if (iface) {
    const { mac } = iface[0]

    // Protect against 00:00:00:00:00:00 mac adressess
    if (!/^[0:]+$/.test(mac)) {
      nodeId = mac.split(":").map(b => parseInt(b, 16))
    }
  }

  return nodeId
}

function getUuid() {
  return uuid({ node: getNodeId() })
}

function getId(callback) {
  const id = getUuid()

  process.nextTick(callback.bind(null, id))
}

export function requestCorrelationIdFactory(options = {}) {
  const HEADER = options.header || "X-Request-Correlation-Id"
  const PROPERTY = options.property || "correlationId"
  const generateId = options.generateId || getId

  function setId(req, res, reqId, next) {
    res.set(HEADER, reqId)
    req[PROPERTY] = reqId // eslint-disable-line security/detect-object-injection
    next()
  }

  return (req, res, next) => {
    const reqId = req.get(HEADER)

    if (reqId) {
      setId(req, res, reqId, next)
    } else {
      generateId(_reqId => {
        setId(req, res, _reqId, next)
      })
    }
  }
}
