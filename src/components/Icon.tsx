import iconsSet from '@src/data/icons';
import * as React from 'react';
import { colorPrimary } from '@src/style/theme';
import { obj } from '@src/typings/utils';

export type JsonIcon = {
  viewBox?: string;
  paths?: (obj | string)[];
};


export type Icons = keyof typeof iconsSet;

type Icon = {
  name: Icons;
  color?: string;
  size?: number;
};

const Icon = ({ name, color = colorPrimary, size = 24 }: Icon) => {
  if (import.meta.env.DEV && !iconsSet[name]) throw new Error(`Icon ${name} do not exists`);

  const { viewBox, paths }: JsonIcon = iconsSet[name];

  return (
    <svg
      css={{
        height: size,
        width: size,
        fill: color,
      }}
      className="icon"
      viewBox={viewBox}
    >
      {paths &&
        paths.map((attributes, i) => (
          <path
            key={i}
            {...(typeof attributes === 'string'
              ? { d: attributes }
              : attributes
            )}
          />
        ))}
    </svg>
  );
};

export default Icon;
