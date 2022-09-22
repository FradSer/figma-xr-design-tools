export function convertFOVDistanceToLength(fov: number, distance: number) {
  const vault = Math.ceil(
    2 * (distance / 100) * Math.tan((fov / 2) * (Math.PI / 180)) * 1000
  )
  if (vault % 2 != 0) {
    return vault + 1
  }
  return vault
}
