export function clamp(num: number, min: number, max: number) {
  return num > max ? max : num < min ? min : num;
}

export function clampRange(num: number, v1: number, v2: number) {
  if (v2 > v1) {
    return clamp(num, v1, v2);
  }

  return clamp(num, v2, v1);
}

export const clampMin = (num: number, min: number) => (num < min ? min : num);

export const clampMax = (num: number, max: number) => (num > max ? max : num);
