/**
 * Utility for conditionally joining classNames together
 */
export function cx(...args: (string | anyObject<boolean|undefined>)[]) {
  const classNames = [];

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (!arg) continue;

    const argType = typeof arg;

    if (argType === 'string' || argType === 'number') {
      classNames.push(arg);
      // } else if (Array.isArray(arg) && arg.length) {
      //   const inner = classNames(...arg);
      //   if (inner) {
      //     classNames.push(inner);
      //   }
    } else if (argType === 'object') {
      for (let i2 = 0, keys = Object.keys(arg); i2 < keys.length; i2++) {
        if ((arg as anyObject<boolean>)[keys[i2]]) {
          classNames.push(keys[i2]);
        }
      }
    }
  }

  return classNames.join(' ');
}
