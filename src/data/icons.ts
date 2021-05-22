import { JsonIcon } from '@src/components/Icon';

const iconSet = {
  moreVert: {
    viewBox: '0 0 32 32',
    paths: [
      'M16 4A2 2 0 1 0 16 8A2 2 0 1 0 16 4Z',
      'M16 14A2 2 0 1 0 16 18A2 2 0 1 0 16 14Z',
      'M16 24A2 2 0 1 0 16 28A2 2 0 1 0 16 24Z',
    ],
  },
  close: {
    viewBox: '0 0 32 32',
    paths: [
      'M24 9.4L22.6 8 16 14.6 9.4 8 8 9.4l6.6 6.6L8 22.6 9.4 24l6.6-6.6 6.6 6.6 1.4-1.4-6.6-6.6L24 9.4z',
    ],
  },
};

if (import.meta.env.DEV) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const testIconTypes: {
    [k: string]: JsonIcon;
  } = iconSet;
}

export default iconSet;
