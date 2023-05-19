import { convertLengthDistanceToFOV } from '../../src/fov-calculator/utilities/convert-length-distance-to-fov'

describe('convertLengthDistanceToFOV', () => {
  test('should return null when length or distance is 0', () => {
    expect(convertLengthDistanceToFOV(0, 10)).toBeNull()
    expect(convertLengthDistanceToFOV(10, 0)).toBeNull()
    expect(convertLengthDistanceToFOV(0, 0)).toBeNull()
  })

  test('should calculate FOV correctly when length and distance are non-zero', () => {
    expect(convertLengthDistanceToFOV(10, 100)).toBe('0.57')
    expect(convertLengthDistanceToFOV(200, 10)).toBe('90.00')
  })
})
