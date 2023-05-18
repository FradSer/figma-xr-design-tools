import {
  convertFOVDistanceToLength
} from '../../src/fov-guide-generator/utilities/convert-fov-distance-to-length'

describe('convertFOVDistanceToLength', () => {
  test('Calculate object width', () => {
    const distance = 100;
    const fov = 90;
    const expectedWidth = 2000;

    const calculatedWidth = convertFOVDistanceToLength(fov, distance);

    expect(calculatedWidth).toBe(expectedWidth);
  });

  test('Handle null values', () => {
    // 定义测试用例的输入和预期输出
    const distance = null;
    const fov = null;
    const expectedWidth = 0;

    const calculatedWidth = convertFOVDistanceToLength(fov, distance);

    expect(calculatedWidth).toBe(expectedWidth);
  });
});
