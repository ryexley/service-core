export const isProduction = process.env.NODE_ENV === "production"

export function isEmpty(target) {
  if (Array.isArray(target)) {
    return target.length === 0
  }

  return (
    typeof target === "undefined" ||
    target === null ||
    target === ""
  )
}

export function isNotEmpty(target) {
  return !isEmpty(target)
}
