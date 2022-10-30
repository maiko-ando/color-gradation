import Color from 'color';
/** @format */
import { COLOR_CODE } from './constants';
export const gradation = (colors, steps, colorCode = COLOR_CODE.object) => {
    if (colors.length < 2) {
        throw new Error('Colors is two or more elements are required.');
    }
    if (Array.isArray(steps)) {
        if (colors.length - 1 !== steps.length) {
            throw new Error('Steps must have one less elements than Colors.');
        }
    }
    else {
        const stepCount = steps;
        steps = Array(colors.length - 1);
        steps.fill(stepCount);
    }
    const colorList = [];
    colors.forEach((colorCode) => {
        colorList.push(Color(colorCode));
    });
    let gradationColorArray = [];
    for (let i = 0; i < colorList.length - 1; i++) {
        if (gradationColorArray.length > 0) {
            gradationColorArray.pop();
        }
        gradationColorArray = [
            ...gradationColorArray,
            ...generateGradient(colorList[i], colorList[i + 1], steps[i]),
        ];
    }
    const gradationColorCodes = gradationColorArray.map((color) => {
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
    function generateGradient(startColor, endColor, step) {
        let d = 1 / (step + 1);
        const generateGradientColors = [startColor];
        for (let i = 0; i < step; i++) {
            const r1 = startColor.red();
            const r2 = endColor.red();
            const g1 = startColor.green();
            const g2 = endColor.green();
            const b1 = startColor.blue();
            const b2 = endColor.blue();
            const r = Math.round((r2 - r1) * d + r1);
            const g = Math.round((g2 - g1) * d + g1);
            const b = Math.round((b2 - b1) * d + b1);
            const color = Color({ r, g, b });
            generateGradientColors.push(color);
            d = d + d;
        }
        generateGradientColors.push(endColor);
        return generateGradientColors;
    }
};
