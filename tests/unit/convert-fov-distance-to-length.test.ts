import { convertFOVDistanceToLength } from '../../src/fov-guide-generator/utilities/convert-fov-distance-to-length'

describe('convertFOVDistanceToLength', () => {
  test('should calculate object width correctly', () => {
    const distance = 100
    const fov = 90
    const expectedWidth = 2000

    const calculatedWidth = convertFOVDistanceToLength(fov, distance)

    expect(calculatedWidth).toBe(expectedWidth)
  })

  test('should handle null values and return 0 width', () => {
    const distance = null
    const fov = null
    const expectedWidth = 0

    const calculatedWidth = convertFOVDistanceToLength(fov, distance)

    expect(calculatedWidth).toBe(expectedWidth)
  })

  test('should handle negative values and return 0 width', () => {
    const distance = -100
    const fov = -90
    const expectedWidth = 0

    const calculatedWidth = convertFOVDistanceToLength(fov, distance)

    expect(calculatedWidth).toBe(expectedWidth)
  })
})
