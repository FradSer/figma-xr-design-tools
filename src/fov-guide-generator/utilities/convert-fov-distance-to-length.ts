export function convertFOVDistanceToLength(
  fov: null | number,
  distance: null | number
) {
  let _distance = distance === null ? 0 : distance
  let _fov = fov === null ? 0 : fov

  const vault = Math.ceil(
    2 * _distance * Math.tan((_fov * (Math.PI / 180) / 2) ) * 10
  )
  if (vault % 2 != 0) {
    return vault + 1
  }
  return vault
}
