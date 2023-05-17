export function convertLengthDistanceToFOV(
  length: number,
  distance: null | number
) {
  let _distance = distance === null ? 0 : distance

  if (length == 0 || _distance == 0) {
    return null
  }

  return (
    (Math.atan(length / 2 / (_distance / 100) / 1000) / (Math.PI / 180)) *
    2
  ).toFixed(2)
}
