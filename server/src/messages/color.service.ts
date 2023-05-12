import { Injectable } from '@nestjs/common';

@Injectable()
export class ColorService {
  constructor() {}

  private HEXToRGB(hexColor: string): [number, number, number] {
    const bigint = parseInt(hexColor.replace(/^#/, ''), 16);
    return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
  }

  private RGBToHEX(r: number, g: number, b: number): string {
    const toHex = (value: number): string => {
      const hex = value.toString(16);
      return hex.length === 1 ? `0${hex}` : hex;
    };
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  }

  generateContrastColor(color: string): string {
    const baseColorRGB = this.HEXToRGB(color);
    if (baseColorRGB[0] + baseColorRGB[1] + baseColorRGB[2] > 382) {
      // For lighter base colors, generate a darker contrast color
      const red = Math.round(Math.random() * 128);
      const green = Math.round(Math.random() * 128);
      const blue = Math.round(Math.random() * 128);
      return this.RGBToHEX(red, green, blue).toUpperCase();
    }
    // For darker base colors, generate a lighter contrast color
    const red = Math.round(128 + Math.random() * 127);
    const green = Math.round(128 + Math.random() * 127);
    const blue = Math.round(128 + Math.random() * 127);
    return this.RGBToHEX(red, green, blue).toUpperCase();
  }
}
