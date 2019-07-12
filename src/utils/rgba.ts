import { hexToRgb } from 'utils/hexToRgb';
import { obj } from 'typings/utils';

const rgbCache: obj<string> = {};

export default function rgba(hex: string, alpha: number) {
  if (!rgbCache[hex]) {
    rgbCache[hex] = hexToRgb(hex).join(',');
  }

  return `rgba(${rgbCache[hex]}, ${alpha})`;
};

export function createRbgaFunction(hex: string) {
  const rgb = hexToRgb(hex).join(',');

  return (a: number) => `rgba(${rgb}, ${a})`;
}
