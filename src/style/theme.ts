import rgba from '@src/utils/rgba';
import { css } from '@emotion/react';

/* colors hex */
export const colorPrimary = '#E75590';
export const colorSecondary = '#448CFD';
export const colorBg = '#f8f8f8';
export const colorRed = '#E53558';

/* gradients */
export const colorGradient = (
  alpha: number = 1,
  deg: number = 45,
) => `linear-gradient(${deg}deg, ${rgba(colorPrimary, alpha)} 0%, ${rgba(
  colorSecondary,
  alpha,
)} 100%);
`;

export const textGradient = css`
  background: ${colorGradient()};
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
`;

/* fonts */
export const fontPrimary = 'Open Sans, sans-serif';
export const fontDecorative = 'Source Code Pro, sans-serif';
export const fontSecondary = 'Source Sans Pro, sans-serif';

export const easeInOut = 'cubic-bezier(0.4, 0, 0.2, 1)';
export const easeOut = 'cubic-bezier(0, 0, 0.2, 1)';
