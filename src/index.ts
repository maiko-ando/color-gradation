import Color from 'color';

/** @format */
import { COLOR_CODE } from './constants';

export const gradation = (
  colors: Array<string>,
  steps: number | Array<number>,
  colorCode = COLOR_CODE.object
): Array<string | number | object> => {
  if (colors.length < 2) {
    throw new Error('Colors is two or more elements are required.');
  }

  if (Array.isArray(steps)) {
    if (colors.length - 1 !== steps.length) {
      throw new Error('Steps must have one less elements than Colors.');
    }
  } else {
    const stepCount = steps;
    steps = Array(colors.length - 1);
    steps.fill(stepCount);
  }

  const colorList: Array<Color> = [];
  colors.forEach((colorCode: string) => {
    colorList.push(Color(colorCode));
  });

  let gradationColorArray: Array<Color> = [];
  for (let i = 0; i < colorList.length - 1; i++) {
    if (gradationColorArray.length > 0) {
      gradationColorArray.pop();
    }
    gradationColorArray = [
      ...gradationColorArray,
      ...generateGradient(colorList[i], colorList[i + 1], steps[i]),
    ];
  }

  const gradationColorCodes: Array<string | number | object> =
    gradationColorArray.map((color: Color) => {
      switch (colorCode) {
        case COLOR_CODE.rgb:
          return color.rgb().array();
        case COLOR_CODE.rgbNumber:
          return color.rgbNumber();
        case COLOR_CODE.hex:
          return color.hex();
        case COLOR_CODE.hsl:
          return color.hsl().string();
        default:
          return color.object();
      }
    });
  return gradationColorCodes;

  function generateGradient(
    startColor: Color,
    endColor: Color,
    step: number
  ): Array<Color> {
    const addVolume = 1 / (step + 1);
    let d = addVolume;

    const generateGradientColors: Array<Color> = [startColor];
    for (let i = 0; i < step; i++) {
      const r1 = startColor.red();
      const r2 = endColor.red();
      const g1 = startColor.green();
      const g2 = endColor.green();
      const b1 = startColor.blue();
      const b2 = endColor.blue();

      const r = Math.ceil((r2 - r1) * d + r1);
      const g = Math.ceil((g2 - g1) * d + g1);
      const b = Math.ceil((b2 - b1) * d + b1);
      const color: Color = Color({ r, g, b });
      generateGradientColors.push(color);

      d += addVolume;
    }
    generateGradientColors.push(endColor);
    return generateGradientColors;
  }
};
