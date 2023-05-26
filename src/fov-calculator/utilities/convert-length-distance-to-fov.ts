export function convertLengthDistanceToFOV(
  length: number,
  distance: null | number
) {
  let actualDistance = distance === null ? 0 : distance

  if (length === 0 || actualDistance === 0) {
    return null
  }

  const fovRadians = Math.atan(length / 2 / (actualDistance / 100) / 1000)

  const fovDegrees = ((fovRadians / (Math.PI / 180)) * 2).toFixed(2)

  return fovDegrees
}
