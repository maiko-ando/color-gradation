/** @format */
import Color from 'color';
import { gradation } from '../src';
import { COLOR_CODE } from '../src/constants';

describe('引数の例外', () => {
  const log = jest.spyOn(console, 'log').mockReturnValue();
  test('色の要素が2以下', () => {
    expect(() => {
      gradation(['#000'], 1);
    }).toThrow('Colors is two or more elements are required.');
  });

  test('ステップを配列指定したときに要素数が不足', () => {
    expect(() => {
      gradation(['#000', '#000', '#000'], [1]);
    }).toThrow('Steps must have one less elements than Colors.');
  });

  test('ステップを配列指定したときに要素数が過剰', () => {
    expect(() => {
      gradation(['#000', '#000', '#000'], [1, 1, 1]);
    }).toThrow('Steps must have one less elements than Colors.');
  });

  test('色として認識できない文字列', () => {
    expect(() => {
      gradation(['000', '000'], 0);
    }).toThrow('Unable to parse color from string');

    expect(() => {
      gradation(['hoge', 'hoge'], 0);
    }).toThrow('Unable to parse color from string');
  });
  log.mockRestore();
});

describe('正常系', () => {
  it('ステップを数値で指定', () => {
    const result = gradation(['#000', '#FFF'], 2);
    expect(result.length).toBe(4);
  });

  it('ステップを配列で指定', () => {
    const result = gradation(['#000', '#666', '#FFF'], [2, 3]);
    expect(result.length).toBe(8);
  });

  it('数値の検証', () => {
    const result = gradation(['#000', '#FFF'], 1);
    const color = Color(result[1]);
    expect(color.red()).toBe(128);
  });

  it('rgb', () => {
    const result = gradation(['#000', '#FFF'], 1, COLOR_CODE.rgb);
    expect(result).toEqual([
      [0, 0, 0],
      [128, 128, 128],
      [255, 255, 255],
    ]);
  });

  it('rgbNumber', () => {
    const result = gradation(['#000', '#FFF'], 1, COLOR_CODE.rgbNumber);
    expect(result).toEqual([0, 8421504, 16777215]);
  });

  it('default', () => {
    const result = gradation(['#000', '#FFF'], 1);
    expect(result).toEqual([
      { r: 0, g: 0, b: 0 },
      { r: 128, g: 128, b: 128 },
      { r: 255, g: 255, b: 255 },
    ]);
  });

  it('hsl', () => {
    const result = gradation(['#000', '#FFF'], 1, COLOR_CODE.hsl);
    expect(result).toEqual([
      'hsl(0, 0%, 0%)',
      'hsl(0, 0%, 50.2%)',
      'hsl(0, 0%, 100%)',
    ]);
  });

  it('hex', () => {
    const result = gradation(['#000', '#FFF'], 1, COLOR_CODE.hex);
    expect(result).toEqual(['#000000', '#808080', '#FFFFFF']);
  });
});
