export function convertFOVDistanceToLength(
  fov: null | number,
  distance: null | number
) {
  const defaultDistance = 0
  const defaultFOV = 0

  const actualDistance = distance ?? defaultDistance
  const actualFOV = fov ?? defaultFOV

  if (actualFOV < 0 || actualDistance < 0) {
    return 0
  }

  const vaultLength = Math.ceil(
    2 * actualDistance * Math.tan((actualFOV * Math.PI) / 360) * 10
  )

  const isVaultLengthOdd = vaultLength % 2 !== 0
  if (isVaultLengthOdd) {
    return vaultLength + 1
  }

  return vaultLength
}
