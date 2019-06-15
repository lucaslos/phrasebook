import { hexToRgb } from 'utils/hexToRgb';

function createRbgaFunction(hex: string) {
  const rgb = hexToRgb(hex).join(',');

  return (a: number) => `rgba(${rgb}, ${a})`;
}

/* colors hex */
export const colorPrimary = '#000';
export const colorSecondary = '#fff';

/* rgba colors */


/* fonts */
export const fontPrimary = 'Roboto, sans-serif';

export const easeInOut = 'cubic-bezier(0.4, 0, 0.2, 1)';
export const easeOut = 'cubic-bezier(0, 0, 0.2, 1)';
